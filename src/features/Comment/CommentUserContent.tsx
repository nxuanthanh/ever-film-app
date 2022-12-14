import { useAutoAnimate } from '@formkit/auto-animate/react';
import { doc, DocumentData, QuerySnapshot, updateDoc } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { CommentDataType, db, User } from 'models';
import { Fragment, useRef, useState } from 'react';
import { AiFillHeart, AiTwotoneLike } from 'react-icons/ai';
import { BsEmojiLaughingFill } from 'react-icons/bs';
import { FaAngry, FaSadTear, FaSurprise } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { calculateTimePassed } from 'utils';
import EditComment from './EditComment';
import ReactionInfo from './ReactionInfo';
import Reply from './Reply';
import ReplyBox from './ReplyBox';

interface CommentUserContentProps {
  commentData: QuerySnapshot<DocumentData> | null;
  sortType: string;
  commentLimit: number;
  media_type: string;
  id?: number | string;
  role: string;
}

function CommentUserContent({
  commentData,
  sortType,
  commentLimit,
  media_type,
  id,
  role,
}: CommentUserContentProps) {
  const [parent] = useAutoAnimate<HTMLUListElement>();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [commentHiden, setCommentHiden] = useState<string[]>([]);
  const [showOptionFor, setShowOptionFor] = useState<string | undefined>(undefined);
  const [editingCommentFor, setEditingCommentFor] = useState<string | undefined>();
  const editValueRef = useRef<HTMLInputElement>(null!);
  const [isReplyingFor, setIsReplyingFor] = useState<string | undefined>();

  const sortComment = (commentData: QuerySnapshot<DocumentData> | null, type: string) => {
    if (!commentData) return undefined;

    if (type === 'popular') {
      return commentData.docs
        .slice()
        .sort(
          (a, b) =>
            Object.values(b.data()?.reactions).length - Object.values(a.data()?.reactions).length
        );
    } else if (type === 'latest') {
      return commentData.docs;
    }
  };

  const addReaction = (commentId: string, value: string) => {
    if (!currentUser) return;

    updateDoc(doc(db, `${media_type}-${id as number}`, commentId), {
      [`reactions.${currentUser.uid}`]: value,
    });
  };

  const determineReactionText = (reactions: { [key: string]: string }) => {
    if (!Object.keys(reactions).includes((currentUser as User).uid)) {
      return 'default';
    }

    // @ts-ignore
    const userReactionValue = Object.entries(reactions).find(
      (entry) => entry[0] === (currentUser as User).uid
    )[1];

    return userReactionValue[0].toUpperCase() + userReactionValue.slice(1);
  };

  const removeReaction = (docData: CommentDataType, commentId: string) => {
    const filteredReactionUsers = Object.entries(docData.reactions).filter(
      (entry) => entry[0] !== (currentUser?.uid as string)
    );

    const updatedReactionUserObj = filteredReactionUsers.reduce(
      (acc, current) => ({
        ...acc,
        [current[0]]: current[1],
      }),
      {} as { [key: string]: string }
    );

    updateDoc(doc(db, `${media_type}-${id as number}`, commentId), {
      reactions: updatedReactionUserObj,
    });
  };

  const handleEditComment = (commentId: string) => {
    const editText = editValueRef.current.value;

    if (!editText.trim()) return;

    updateDoc(doc(db, `${media_type}-${id}`, commentId), {
      value: editText,
    });

    setEditingCommentFor(undefined);

    updateDoc(doc(db, `${media_type}-${id as number}`, commentId), {
      isEdited: true,
    });
  };

  return (
    <ul ref={parent}>
      {sortComment(commentData, sortType)
        ?.slice(0, commentLimit)
        .map((doc) => {
          const docData = doc.data() as CommentDataType;

          return (
            <Fragment key={doc.id}>
              {!commentHiden.includes(doc.id) && (
                <li className="relative mb-6 flex gap-4 items-start font-roboto max-w-full">
                  <div className="shrink-0">
                    <LazyLoadImage
                      src={docData.user.photoURL as string}
                      alt=""
                      effect="opacity"
                      className={`${
                        role === 'comment' ? 'w-10 h-10' : 'w-6 h-6'
                      } rounded-full object-cover`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="peer flex-1">
                    <div
                      className={`relative ${
                        editingCommentFor === doc.id ? 'block' : 'inline-block'
                      }`}
                    >
                      <ReactionInfo docData={docData} />

                      <div className="flex justify-between items-center">
                        <div className="flex gap-1 items-center justify-center">
                          <p className="text-white text-[13px] font-medium leading-[1.3rem]">
                            {docData.user.displayName}
                          </p>
                          <p className="text-[#aaaaaa] text-xs">
                            {calculateTimePassed(docData.createdAt?.seconds * 1000 || 0)}
                          </p>
                        </div>
                      </div>
                      {editingCommentFor !== doc.id && (
                        <p className="text-sm mt-[6px] break-all">{docData.value}</p>
                      )}
                      {editingCommentFor === doc.id && (
                        <>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleEditComment(doc.id);
                            }}
                            className="flex mt-3 gap-2 items-center"
                          >
                            <input
                              onKeyDown={(e) => {
                                if (e.key === 'Escape') setEditingCommentFor(undefined);
                              }}
                              ref={editValueRef}
                              defaultValue={docData.value}
                              type="text"
                              className="w-full bg-transparent outline-none text-sm border-b-[1px] border-b-solid border-b-inherit"
                              autoFocus
                            />
                            <button type="submit">
                              <MdSend size={25} className="text-primary" />
                            </button>
                          </form>
                          <p className="mt-1 text-sm">Nh???n ph??m Esc ????? tho??t</p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-3 mt-1 items-center">
                      {currentUser && (
                        <div className="relative group text-xs">
                          <>
                            <button>
                              {determineReactionText(docData.reactions) === 'default' && (
                                <p>Th??ch</p>
                              )}
                            </button>
                            <button onClick={() => removeReaction(docData, doc.id)}>
                              {determineReactionText(docData.reactions) === 'Like' && (
                                <p className="text-primary">
                                  {determineReactionText(docData.reactions)}
                                </p>
                              )}
                              {determineReactionText(docData.reactions) === 'Love' && (
                                <p className="text-red-500">
                                  {determineReactionText(docData.reactions)}
                                </p>
                              )}
                              {determineReactionText(docData.reactions) === 'Haha' && (
                                <p className="text-yellow-500">
                                  {determineReactionText(docData.reactions)}
                                </p>
                              )}
                              {determineReactionText(docData.reactions) === 'Wow' && (
                                <p className="text-green-500">
                                  {determineReactionText(docData.reactions)}
                                </p>
                              )}
                              {determineReactionText(docData.reactions) === 'Sad' && (
                                <p className="text-purple-500">
                                  {determineReactionText(docData.reactions)}
                                </p>
                              )}
                              {determineReactionText(docData.reactions) === 'Angry' && (
                                <p className="text-orange-500">
                                  {determineReactionText(docData.reactions)}
                                </p>
                              )}
                            </button>
                          </>

                          <div className="group-hover:opacity-100 group-hover:visible opacity-0 invisible bg-dark-lighten-2 transition duration-300 shadow-md px-2 py-2 rounded-full absolute -top-8 -right-[105px] flex gap-2 z-40">
                            <button onClick={() => addReaction(doc.id, 'like')}>
                              <AiTwotoneLike
                                className="text-blue-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, 'love')}>
                              <AiFillHeart
                                className="text-red-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, 'haha')}>
                              <BsEmojiLaughingFill
                                className="text-yellow-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, 'wow')}>
                              <FaSurprise
                                className="text-green-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, 'sad')}>
                              <FaSadTear
                                className="text-purple-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, 'angry')}>
                              <FaAngry
                                className="text-orange-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                          </div>
                        </div>
                      )}
                      {role !== 'reply' && (
                        <button
                          onClick={() => {
                            if (!currentUser) return;
                            if (isReplyingFor !== doc.id) setIsReplyingFor(doc.id);
                            else setIsReplyingFor(undefined);
                          }}
                        >
                          <p className="hover:text-white transition duration-300 text-xs uppercase font-medium">
                            Ph???n h???i
                          </p>
                        </button>
                      )}

                      {docData.isEdited && <p className="text-xs">???? ch???nh s???a</p>}
                    </div>

                    {isReplyingFor === doc.id && (
                      <ReplyBox setIsReplyingFor={setIsReplyingFor} commendId={doc.id} />
                    )}

                    <Reply commendId={doc.id} />

                    <EditComment
                      setEditingCommentFor={setEditingCommentFor}
                      media_type={media_type}
                      id={id}
                      singleDoc={doc}
                      showOptionFor={showOptionFor}
                      setShowOptionFor={setShowOptionFor}
                      setCommentHiden={setCommentHiden}
                    />
                  </div>
                </li>
              )}
            </Fragment>
          );
        })}
    </ul>
  );
}

export default CommentUserContent;
