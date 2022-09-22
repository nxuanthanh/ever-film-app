import { Google } from 'assets/icons';
import { Button } from 'components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from 'models';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { convertErrorCodeToMessage, notifyError, notifySuccess } from 'utils';
import { signInWithProvider } from '../components';

interface FormInput {
  email: string;
  password: string | number;
  remember: Boolean;
}

function SignIn() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user_login') as string) || {};
  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      email: currentUser.email,
      password: currentUser.password,
      remember: currentUser.password,
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => handleFormSubmit(data);

  const handleFormSubmit = (data: FormInput) => {
    const email = data.email as string;
    const password = data.password as string;
    const remember = data.remember;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        notifySuccess('Đăng nhập thành công');

        if (remember) {
          const currentUser = {
            email,
            password,
            remember,
          };

          localStorage.setItem('user_login', JSON.stringify(currentUser));
        }

        setTimeout(() => {
          navigate('/');
        }, 3000);
      })

      .catch((error) => {
        const errorCode = error.code;
        notifyError(convertErrorCodeToMessage(errorCode));
      });
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('current_user') as string);
    if (currentUser) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleSignInGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential?.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       notifySuccess('Đăng nhập thành công!');
  //       setTimeout(() => {
  //         navigate('/');
  //       }, 3000);
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       notifyError(convertErrorCodeToMessage(errorCode));
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  return (
    <section className="p-12 mt-14">
      <div className="container">
        <div className="flex flex-col w-1/3 ml-[33.3333%] p-3">
          <h1 className="text-[2rem] font-semibold leading-[1.125] text-[#7a7a7a] mb-6">
            Đăng nhập
          </h1>
          <div className="flex flex-col items-start p-5 mb-6 shadow-[0_0.5em_1em_-0.125em_#0a0a0a1a] bg-[#363636] rounded-md border-[#dbdbdb]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder="Email"
                {...register('email')}
                className="mb-3 w-full py-[11px] px-[17px] text-2xl h-[60px] rounded placeholder:font-normal text-[#363636]"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                {...register('password')}
                className="mb-3 w-full py-[11px] px-[17px] text-2xl h-[60px] rounded placeholder:font-normal text-[#363636]"
              />
              <label
                htmlFor="remember"
                className="mb-3 hover:text-[#ffe08a] cursor-pointer text-[#7a7a7a] inline-block"
              >
                <input {...register('remember')} type="checkbox" id="remember" className="" /> Ghi
                nhớ
              </label>
              <button
                type="submit"
                className="py-2 px-4 bg-[#3e8ed0] rounded text-white w-full text-2xl h-[60px] hover:bg-[#3488ce]"
              >
                Đăng nhập
              </button>
            </form>

            <div
              data-content="Hoặc"
              className="border-t-[0.1rem] w-full border-t-s border-solid border-[#dbdbdb] h-[0.1rem] my-8 text-center after:content-[attr(data-content)] after:bg-white after:text-[#7a7a7a] after:inline-block after:text-xs after:py-[0.4rem] after:px-[0.8rem] after:translate-y-[-1.1rem] after:text-center after:uppercase"
            ></div>
            <Button
              iconLeft={<Google />}
              className="bg-secondary w-full py-3 px-6 text-2xl gap-4 h-[60px] border-transparent"
              title=" Đăng nhập với Google"
              onClick={() => signInWithProvider(googleProvider, 'google')}
              // onClick={handleSignInGoogle}
            />
          </div>
          {/* Login with google */}
          <p className="text-right text-[#428bca]">
            <Link to="/signup" className="hover:text-[#dcf836]">
              Đăng ký
            </Link>
            &nbsp;·&nbsp;&nbsp;
            <Link to="/forgot" className="hover:text-[#dcf836]">
              Quên mật khẩu
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </section>
  );
}

export default SignIn;
