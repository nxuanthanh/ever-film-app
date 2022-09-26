import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionQuery } from 'hooks';
import { db } from 'models';
import { FunctionComponent, useState } from 'react';

import CommentUserData from './CommentUserData';

interface ReplyProps {
  commendId: string;
}

const Reply: FunctionComponent<ReplyProps> = ({ commendId }) => {
  const [commentLimit, setCommentLimit] = useState(5);

  const {
    data: commentData,
    isLoading,
    isError,
  } = useCollectionQuery(
    commendId,
    query(collection(db, `replyTo-${commendId}`), orderBy('createdAt', 'desc'))
  );

  return (
    <>
      {commentData && commentData.size > 0 && (
        <div className="mt-5">
          <CommentUserData
            role="reply"
            isLoading={isLoading}
            isError={isError}
            sortType="latest"
            commentData={commentData}
            commentLimit={commentLimit}
            media_type="replyTo"
            id={commendId}
          />
        </div>
      )}
      {commentData && commentData.size > commentLimit && (
        <button className="font-medium mt-3" onClick={() => setCommentLimit((prev) => prev + 5)}>
          Load more replies ({commentLimit}/{commentData.size})
        </button>
      )}
    </>
  );
};

export default Reply;
