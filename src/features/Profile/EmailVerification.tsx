import { sendEmailVerification } from 'firebase/auth';
import { useAppSelector } from 'hooks';
import { auth } from 'models';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { convertErrorCodeToMessage, notifyError } from 'utils';

interface EmailVerificationProps {
  setIsUpdating: any;
}

function EmailVerification({ setIsUpdating }: EmailVerificationProps) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isShowSentButton, setIsShowSentButton] = useState(true);
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const firebaseUser = auth.currentUser;

  const sendVerificationEmail = () => {
    setIsUpdating(true);

    if (!firebaseUser) {
      notifyError('You need to login to verify email', 'top-right');
      return;
    }

    sendEmailVerification(firebaseUser)
      .then(() => {
        setIsVerificationEmailSent(true);
        setIsShowSentButton(false);
      })
      .catch((error: any) => notifyError(convertErrorCodeToMessage(error.code), 'top-right'))
      .finally(() => setIsUpdating(false));
  };
  return (
    <>
      <ToastContainer theme="colored" />

      {isVerificationEmailSent && (
        <>
          <div className="px-5 py-3 rounded-md z-10 bg-dark-lighten-2 md:w-[500px] fixed top-[35%] md:left-[35%] left-[5%] right-[5%] min-h-[150px]">
            <p className="text-white text-lg text-center">
              We've sent a email of verification to your email,
              <span className="text-primary">{currentUser?.email}</span>. Check it out!
            </p>
            <button
              onClick={() => setIsVerificationEmailSent(false)}
              className="px-6 py-1 bg-dark-lighten rounded-full mt-7 tw-absolute-center-horizontal hover:brightness-75 transition duration-300"
            >
              OK
            </button>
          </div>
          <div
            onClick={() => setIsVerificationEmailSent(false)}
            className="fixed top-0 left-0 w-full h-full z-[5] bg-black/60"
          ></div>
        </>
      )}
      <div className="mt-10 flex justify-between max-w-[600px]">
        <p className="text-white text-lg">
          {!currentUser?.emailVerified
            ? 'Your email is not verified yet.'
            : 'Your email is verified.'}
        </p>
        {isShowSentButton && !currentUser?.emailVerified && (
          <button onClick={sendVerificationEmail} className="text-primary underline text-lg">
            Send me verification email
          </button>
        )}
        {!isShowSentButton && <p className="text-lg ">Waiting for verify</p>}
      </div>
    </>
  );
}

export default EmailVerification;
