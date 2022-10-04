import { doc, updateDoc } from 'firebase/firestore';
import { useAppSelector } from 'hooks';
import { db } from 'models';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { convertErrorCodeToMessage, notifyError, notifySuccess } from 'utils';

interface NameProps {
  setIsUpdating: any;
}

interface FormInput {
  yourname: string;
}

function Name({ setIsUpdating }: NameProps) {
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const currentUser = useAppSelector((state) => state.auth.user);

  const { register, handleSubmit, watch } = useForm<FormInput>();

  const changeName: SubmitHandler<FormInput> = () => {
    const yourName = watch('yourname');

    if (!currentUser) {
      notifyError('You need login to change user name', 'top-right');
      return;
    }

    if (!yourName.trim().length) {
      notifyError('You gotta type something', 'top-right');
      return;
    }

    setIsUpdating(true);

    updateDoc(doc(db, 'users', currentUser.uid), {
      displayName: yourName,
    })
      .then(() => {
        setIsUpdatingName(false);
        notifySuccess('Updating username successfully', 'top-right');
      })
      .catch((error: any) => {
        console.log(error);
        notifyError(convertErrorCodeToMessage(error.code), 'top-right');
      })
      .finally(() => setIsUpdating(false));
  };

  return (
    <>
      {' '}
      <ToastContainer theme="colored" />
      <div>
        <p className="text-white text-lg">User name</p>
        {!isUpdatingName ? (
          <div className="flex justify-between mt-1">
            <p>{currentUser?.displayName}</p>
            <button
              onClick={() => setIsUpdatingName(true)}
              className="hover:text-primary transition duration-300"
            >
              <AiOutlineEdit size={25} />
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(changeName)} className="flex justify-between gap-48 mt-1">
              <input
                type="text"
                {...register('yourname')}
                autoFocus
                placeholder="Your name"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsUpdatingName(false);
                }}
                className="outline-none bg-dark-lighten rounded-md py-1 px-2 w-full"
              />
              <button type="submit" className="hover:text-primary transition duration-300">
                <BiSend size={25} />
              </button>
            </form>
            <p className="text-sm mt-1">Press Esc to cancel</p>
          </>
        )}
      </div>
    </>
  );
}

export default Name;
