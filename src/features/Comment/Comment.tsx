import { Message, Sort } from 'assets/icons';
import { Button } from 'components/common';
import config from 'config';
import { addDoc, collection, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useAppSelector, useCollectionQuery } from 'hooks';
import { db } from 'models';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import CommentUserData from './CommentUserData';

interface CommentProps {
  id?: number;
  media_type: string;
}

function Comment({ id, media_type }: CommentProps) {
  const currentUser = useAppSelector((state) => state.auth.user);

  const [commentInputValue, setCommentInputValue] = useState('');
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [commentLimit, setCommentLimit] = useState(5);
  const [sortType, setSortType] = useState('latest');

  const handlerSubmitComment = (e: FormEvent) => {
    e.preventDefault();

    if (!commentInputValue) return;

    setIsSendingComment(true);
    addDoc(collection(db, `${media_type}-${id as number}`), {
      user: currentUser,
      value: commentInputValue.trim().slice(0, 500),
      reactions: {},
      createdAt: serverTimestamp(),
      isEdited: false,
    }).finally(() => setIsSendingComment(false));

    setCommentInputValue('');
  };

  const {
    data: commentData,
    isLoading,
    isError,
  } = useCollectionQuery(
    id,
    query(collection(db, `${media_type}-${id}`), orderBy('createdAt', 'desc'))
  );

  return (
    <div className="mb-16">
      {currentUser ? (
        <div className="border-t-[#4a4a4a] border-t-solid border-t">
          <div className="flex pl-10 gap-3 pt-5 text-xl font-merriweather">
            <Message /> Bình luận phim
          </div>
          <form
            className="mt-5 mb-6 flex flex-col items-end text-[#363636]"
            onSubmit={handlerSubmitComment}
          >
            <div className="flex w-full">
              {/* <LazyLoadImage
                src={currentUser.photoURL as string}
                alt=""
                effect="opacity"
                className="w-10 h-10 mr-4 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              /> */}
              <textarea
                value={commentInputValue}
                onChange={(e) => setCommentInputValue(e.target.value)}
                name="comment"
                id="comment_box"
                rows={2}
                className="w-full rounded p-3 mb-[.75rem] flex-1 block"
                placeholder="Nhập bình luận"
              />
            </div>
            {isSendingComment ? (
              <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent border-primary animate-spin"></div>
            ) : (
              <Button
                className="border-white px-3 py-[6px] gap-[10px] w-fit rounded-sm text-xs"
                title="Gửi"
              />
            )}
          </form>
        </div>
      ) : (
        <p className="text-[#b5b5b5]">
          Để gửi bình luận phim, vui lòng
          <Link to={config.routes.login} className="text-Link hover:text-hover-link">
            {' đăng nhập '}
          </Link>
        </p>
      )}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-[140px] flex">
          <p className="text-white font-medium">{commentData?.size} bình luận</p>
        </div>
        <div className="flex relative text-white group">
          <Sort className="mr-2" />
          <p className="uppercase font-normal">Sắp xếp theo</p>
          <div className="absolute transition duration-300 top-8 z-30 left-0 hidden bg-white group-hover:block min-w-max rounded">
            <div className="flex flex-col py-2 after:content-[''] after:w-40 after:h-3 after:bg-transparent after:-top-3 after:absolute ">
              <button
                onClick={() => setSortType('latest')}
                className={`px-4 py-1 transition duration-300 text-[#4a4a4a] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] w-full text-start`}
              >
                Mới nhất
              </button>
              <button
                onClick={() => setSortType('popular')}
                className={`px-4 py-1 transition duration-300 text-[#4a4a4a] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] w-full text-start`}
              >
                Bình luận hàng đầu
              </button>
            </div>
          </div>
        </div>
      </div>

      <CommentUserData
        isLoading={isLoading}
        isError={isError}
        sortType={sortType}
        commentData={commentData}
        commentLimit={commentLimit}
        media_type={media_type}
        id={id}
        role="comment"
      />

      {commentData && commentData.size > commentLimit && (
        <button className="font-medium" onClick={() => setCommentLimit((prev) => prev + 5)}>
          Load more comments ({commentLimit}/{commentData.size})
        </button>
      )}
    </div>
  );
}

export default Comment;
