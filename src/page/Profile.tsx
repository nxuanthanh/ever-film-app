import { Footer, Title } from 'components/common';
import {
  DeleteAccount,
  Email,
  EmailVerification,
  Name,
  Password,
  ProfileImage,
} from 'features/Profile';
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { useAppSelector } from 'hooks';
import { auth } from 'models';
import { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { convertErrorCodeToMessage, notifyError } from 'utils';

interface FormInput {
  password: string;
}
function Profile() {
  const [emailValue, setEmailValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatedPassword, setIsUpdatedPassword] = useState(false);
  const [isShowPromptReAuthFor, setIsShowPromptReAuthFor] = useState('');

  const navigate = useNavigate();

  const { register, handleSubmit, watch, resetField } = useForm<FormInput>();

  const firebaseUser = auth.currentUser;
  const currentUser = useAppSelector((state) => state.auth.user);

  const reAuthentication = async (type: string) => {
    const oldPassword = watch('password');

    if (!oldPassword.trim().length) {
      notifyError('You gotta type something', 'top-right');
      return;
    }

    const credential = EmailAuthProvider.credential(
      // @ts-ignore
      firebaseUser.email,
      oldPassword
    );

    reauthenticateWithCredential(
      // @ts-ignore
      firebaseUser,
      credential
    )
      .then(() => {
        if (type === 'password') {
          changePassword();
        } else if (type === 'email') {
          changeEmail();
        } else if (type === 'delete') {
          deleteAccount();
        }

        setIsShowPromptReAuthFor('');
      })
      .catch((error) => {
        notifyError(convertErrorCodeToMessage(error.code), 'top-right');
      });
  };

  const changeEmail = () => {
    if (!emailValue.trim().length) {
      notifyError('You gotta type something', 'top-right');
      return;
    }
    setIsUpdating(true);
    // @ts-ignore
    updateEmail(firebaseUser, emailValue)
      .then(() => {
        setIsUpdatingEmail(false);
        window.location.reload();
      })
      .catch((error) => {
        notifyError(convertErrorCodeToMessage(error.code), 'top-right');
      })
      .finally(() => setIsUpdating(false));
  };

  const changePassword = () => {
    const newPassword = newPasswordValue;
    if (!newPassword.trim().length) {
      notifyError('You gotta type something', 'top-right');
      return;
    }
    setIsUpdating(true);
    // @ts-ignore
    updatePassword(firebaseUser, newPassword)
      .then(() => {
        setIsUpdatedPassword(true);
        setNewPasswordValue('');
      })
      .catch((error) => {
        notifyError(convertErrorCodeToMessage(error.code), 'top-right');
      })
      .finally(() => setIsUpdating(false));
  };

  const deleteAccount = () => {
    setIsUpdating(true);

    if (!firebaseUser) {
      return;
    }

    deleteUser(firebaseUser)
      .then(() => navigate('/'))
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleSubmitReAuthForm: SubmitHandler<FormInput> = () => {
    reAuthentication(isShowPromptReAuthFor);
  };

  const handleTogglePoppup = (e: FormEvent) => {
    e.preventDefault();
    resetField('password');
    setIsShowPromptReAuthFor('');
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title value="Tài khoản" />
      <ToastContainer />

      {isShowPromptReAuthFor && (
        <>
          <form
            onSubmit={handleSubmit(handleSubmitReAuthForm)}
            className="z-10 fixed md:w-[500px] md:min-h-[200px] min-h-[230px] top-[40%] md:left-[35%] left-[5%] right-[5%] bg-dark-lighten rounded-md px-3 py-2"
          >
            <p className="text-white font-medium mb-3 text-lg text-center">
              Type your password again to reauthenticate
            </p>
            <input
              {...register('password')}
              type="password"
              autoFocus
              className="bg-dark-lighten-2 py-3 mt-3 rounded-md  outline-none px-5 text-[#4a4a4a] mb-4 w-full"
              placeholder="Type your password..."
            />
            <button className="px-6 py-4 bg-dark-lighten-2 rounded-xl hover:brightness-125 transition duration-300 text-white md:top-[130px] top-[160px] tw-absolute-center-horizontal">
              Continue
            </button>
            <button
              onClick={handleTogglePoppup}
              className="px-6 py-4 bg-dark-lighten-2 rounded-xl hover:brightness-125 transition duration-300 text-white md:top-[130px] top-[160px] tw-absolute-center-horizontal"
            >
              Cancel
            </button>
          </form>
          <div
            onClick={handleTogglePoppup}
            className="fixed top-0 left-0 w-full h-full z-[5] bg-black/60"
          ></div>
        </>
      )}

      {isUpdating && (
        <>
          <div className="border-[8px] border-primary border-t-transparent h-20 w-20 rounded-full animate-spin fixed top-[50%] left-[50%] z-10"></div>
          <div className="fixed top-0 left-0 w-full h-full z-[5]"></div>
        </>
      )}

      <section className="container">
        <div className="flex pt-24 mb-12">
          <div className="flex-grow p-3">
            <div className="pb-4 border-b border-dark-lighten-2">
              <h1 className="text-[35px] text-white font-semibold uppercase">Account settings</h1>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 ">
              <div className="flex-grow">
                <p className="text-white mt-5 text-xl font-medium mb-3">User Information</p>
                <p>Here you can edit public information about yourself.</p>
                <p>
                  If you signed in with Google or Facebook, you can't change your email and
                  password.
                </p>

                <div className="mt-7 max-w-[600px] w-full flex flex-col gap-3">
                  <Email
                    setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
                    isUpdatingEmail={isUpdatingEmail}
                    setIsUpdatingEmail={setIsUpdatingEmail}
                    setEmailValue={setEmailValue}
                  />
                  <Name setIsUpdating={setIsUpdating} />
                </div>

                <EmailVerification setIsUpdating={setIsUpdating} />

                <Password
                  isUpdatedPassword={isUpdatedPassword}
                  setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
                  setIsUpdatedPassword={setIsUpdatedPassword}
                  setNewPasswordValue={setNewPasswordValue}
                />

                <DeleteAccount setIsShowPromptReAuthFor={setIsShowPromptReAuthFor} />
              </div>
              <ProfileImage />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;
