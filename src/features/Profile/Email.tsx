import { useAppSelector } from 'hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { notifyError } from 'utils';
interface EmailProps {
  isUpdatingEmail: boolean;
  setIsShowPromptReAuthFor: Function;
  setIsUpdatingEmail: Function;
  setEmailValue: Function;
}

interface FormInput {
  email: string;
}

function Email({
  isUpdatingEmail,
  setIsShowPromptReAuthFor,
  setIsUpdatingEmail,
  setEmailValue,
}: EmailProps) {
  const { register, handleSubmit } = useForm<FormInput>();
  const currentUser = useAppSelector((state) => state.auth.user);

  const changeEmail: SubmitHandler<FormInput> = ({ email }: FormInput) => {
    if (!email.trim().length) {
      notifyError('You gotta type something', 'top-right');
      return;
    }
    setEmailValue(email);
    setIsShowPromptReAuthFor('email');
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <div>
        <p className="text-white text-lg">Email</p>

        {!isUpdatingEmail ? (
          <div className="flex justify-between mt-1">
            <p>{currentUser?.email}</p>
            <button
              className="hover:text-primary transition duration-300"
              onClick={() => setIsUpdatingEmail(true)}
            >
              <AiOutlineEdit size={25} />
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(changeEmail)} className="flex justify-between gap-48 mt-1">
              <input
                type="email"
                {...register('email')}
                defaultValue={currentUser?.email || ''}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsUpdatingEmail(false);
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

export default Email;
