import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { db, User } from 'models';
import { FormEvent, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ReplyBoxProps {
  commendId: string;
  setIsReplyingFor: Function;
}

function ReplyBox({ commendId, setIsReplyingFor }: ReplyBoxProps) {
  const currentUser = useAppSelector((state) => state.auth.user);

  const [commentInputValue, setCommentInputValue] = useState('');

  const [isSendingComment, setIsSendingComment] = useState(false);

  const commentSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!commentInputValue) return;

    setIsSendingComment(true);
    addDoc(collection(db, `replyTo-${commendId}`), {
      user: currentUser,
      value: commentInputValue.trim().slice(0, 500),
      reactions: {},
      createdAt: serverTimestamp(),
    }).finally(() => setIsSendingComment(false));

    setCommentInputValue('');
  };

  return (
    <form onSubmit={commentSubmitHandler} className="flex gap-3 items-center mt-4 relative">
      <LazyLoadImage
        src={(currentUser as User).photoURL as string}
        alt=""
        effect="opacity"
        className="w-6 h-w-6 rounded-full object-cover shrink-0"
        referrerPolicy="no-referrer"
      />
      <input
        onBlur={() => setIsReplyingFor(undefined)}
        value={commentInputValue}
        onChange={(e) => setCommentInputValue(e.target.value)}
        type="text"
        className="flex-1 bg-transparent outline-none text-sm border-b-[1px] border-b-solid border-b-inherit"
        placeholder="Phản hồi..."
      />
      {isSendingComment ? (
        <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent border-primary animate-spin"></div>
      ) : (
        <button>
          <MdSend size={24} className="text-primary " />
        </button>
      )}
    </form>
  );
}

export default ReplyBox;
