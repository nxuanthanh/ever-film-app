import Skeleton from 'components/common/Skeleton';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import CommentUserContent from './CommentUserContent';

interface CommentUserDataProps {
  id?: number | string;
  media_type: string;
  commentLimit: number;
  isLoading: boolean;
  isError: boolean;
  commentData: QuerySnapshot<DocumentData> | null;
  sortType: string;
  role: string;
}

function CommentUserData({
  id,
  media_type,
  commentLimit,
  isLoading,
  isError,
  commentData,
  sortType,
  role,
}: CommentUserDataProps) {
  return (
    <>
      {isError ? (
        <p className="text-error text-lg text-center mb-6">
          ERROR: Loading comment failed. Your free service exceeded the limitation already.
        </p>
      ) : isLoading ? (
        <ul>
          {new Array(5).fill('').map((_, index) => (
            <li key={index} className="mb-6 flex gap-4 items-start">
              <div className="flex w-full">
                <Skeleton className="w-10 h-10 !rounded-full mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-[72px]" />
                  <div className="flex gap-3 mt-3">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : commentData?.size === 0 && role === 'comment' ? (
        <div className="text-white text-center text-lg">Không có bình luận nào.</div>
      ) : (
        <CommentUserContent
          commentData={commentData}
          commentLimit={commentLimit}
          media_type={media_type}
          sortType={sortType}
          id={id}
          role={role}
        />
      )}
    </>
  );
}

export default CommentUserData;
