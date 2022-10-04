import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { notifyError } from 'utils';
interface PasswordProps {
  isUpdatedPassword: boolean;
  setIsShowPromptReAuthFor: Function;
  setIsUpdatedPassword: Function;
  setNewPasswordValue: Function;
}

interface FormInput {
  password: string;
}

function Password({
  setIsShowPromptReAuthFor,
  isUpdatedPassword,
  setIsUpdatedPassword,
  setNewPasswordValue,
}: PasswordProps) {
  const { register, handleSubmit, watch, resetField } = useForm<FormInput>();

  const changePassword: SubmitHandler<FormInput> = () => {
    const password = watch('password');

    if (!password.trim().length) {
      notifyError('You gotta type something', 'top-right');
      return;
    }

    setNewPasswordValue(password);
    setIsShowPromptReAuthFor('password');
    resetField('password');
  };

  return (
    <>
      <ToastContainer theme="colored" />

      {isUpdatedPassword && (
        <>
          <div className="px-5 py-3 rounded-md z-10 bg-dark-lighten-2 md:w-[350px] fixed top-[35%] md:left-[35%] left-[5%] right-[5%] min-h-[100px]">
            <p className="text-white text-lg text-center">Updating password successfully</p>
            <button
              onClick={() => setIsUpdatedPassword(false)}
              className="px-6 py-1 bg-dark-lighten rounded-full mt-3 tw-absolute-center-horizontal hover:brightness-75 transition duration-300"
            >
              OK
            </button>
          </div>
          <div
            onClick={() => setIsUpdatedPassword(false)}
            className="fixed top-0 left-0 w-full h-full z-[5] bg-black/60"
          ></div>
        </>
      )}
      <div className="mt-10 max-w-[600px]">
        <p className="text-white text-lg font-medium mb-3">Change password</p>
        <form
          onSubmit={handleSubmit(changePassword)}
          className="flex justify-between gap-32 items-center"
        >
          <div className="flex-1">
            <input
              {...register('password')}
              type="password"
              className="bg-dark-lighten py-3 rounded-md  outline-none px-5 text-white w-full"
              placeholder="New password"
            />
          </div>
          <button className="px-6 py-4 bg-dark-lighten-2 rounded-xl hover:bg-dark-lighten transition duration-300 text-white">
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default Password;
