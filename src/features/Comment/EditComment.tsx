import { deleteDoc, doc } from 'firebase/firestore';
import { FunctionComponent, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useAppSelector } from 'hooks';
import { db } from 'models';
import { AiOutlineDelete } from 'react-icons/ai';
interface EditCommentProps {
  singleDoc: any;
  showOptionFor: string | undefined;
  setShowOptionFor: any;
  media_type: string;
  id?: number | string;
  setEditingCommentFor: any;
  setCommentHiden: any;
}

const EditComment: FunctionComponent<EditCommentProps> = ({
  singleDoc,
  showOptionFor,
  setShowOptionFor,
  media_type,
  id,
  setEditingCommentFor,
  setCommentHiden,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isShowPrompt, setIsShowPrompt] = useState(false);
  const [show] = useAutoAnimate<HTMLDivElement>();
  return (
    <>
      <div className="absolute top-0 right-0 z-20">
        <button
          onClick={() =>
            showOptionFor === singleDoc.id
              ? setShowOptionFor(undefined)
              : setShowOptionFor(singleDoc.id)
          }
          className="transition duration-300 bg-transparent"
        >
          <BsThreeDotsVertical size={20} />
        </button>
        {showOptionFor === singleDoc.id && (
          <div className=" bg-white py-2 w-36 rounded absolute top-13 right-0 z-20">
            {currentUser && currentUser.uid === singleDoc.data()?.user.uid && (
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    setEditingCommentFor(singleDoc.id);
                    setShowOptionFor(undefined);
                  }}
                  className="transition duration-300 hover:bg-[#f5f5f5] text-[#4a4a4a] text-left px-4"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    setIsShowPrompt(true);
                    setShowOptionFor(undefined);
                  }}
                  className="transition duration-300 hover:bg-[#f5f5f5] text-[#4a4a4a] text-left px-4"
                >
                  Xoá
                </button>
              </div>
            )}
            {(!currentUser || currentUser.uid !== singleDoc.data()?.user.uid) && (
              <button
                onClick={() => setCommentHiden((prev: string[]) => prev.concat(singleDoc.id))}
                className="transition duration-300 hover:text-white text-[#4a4a4a] text-left px-4"
              >
                Ẩn
              </button>
            )}
          </div>
        )}
      </div>
      {showOptionFor === singleDoc.id && (
        <div
          onClick={() => setShowOptionFor(undefined)}
          className="fixed top-0 left-0 w-full h-full"
        ></div>
      )}
      <div ref={show}>
        {isShowPrompt && (
          <>
            <div className="fixed w-[520px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50  bg-[#06121e] rounded-md min-h-[100px] shadow-md px-6 py-5">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full border-[3px] border-primary flex items-center justify-center">
                <AiOutlineDelete size={32} className="text-primary " />
              </div>
              <p className="text-white text-xl text-center font-medium mb-4">
                Bạn có chắc muốn xóa bình luận này không
              </p>
              <div className="flex mt-8 justify-end">
                <button
                  onClick={() => setIsShowPrompt(false)}
                  className="px-6 py-1 rounded-md text-white hover:brightness-75 transition duration-300"
                >
                  Huỷ
                </button>
                <button
                  onClick={() => deleteDoc(doc(db, `${media_type}-${id}`, singleDoc.id))}
                  className="px-4 py-1 rounded text-white bg-primary hover:opacity-80 transition duration-300"
                >
                  Đồng ý
                </button>
              </div>
            </div>
            <div
              onClick={() => setIsShowPrompt(false)}
              className="fixed top-0 left-0 w-full h-full z-40 bg-black/60"
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default EditComment;
