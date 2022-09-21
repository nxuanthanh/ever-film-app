import { yupResolver } from '@hookform/resolvers/yup';
import { Google } from 'assets/icons';
import { Button } from 'components';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from 'models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { convertErrorCodeToMessage, getRandomAvatar, notifyError, notifySuccess } from 'utils';
import * as yup from 'yup';
import { signInWithProvider } from '../components';

interface FormInput {
  email?: String;
  yourname?: string;
  password?: string | number;
  remember?: Boolean;
}
function SignUp() {
  const navigate = useNavigate();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Please enter an email address')
        .required('Please enter in email field'),
      yourname: yup.string().required('Please enter yourname'),
      password: yup
        .string()
        .required('Please enter ypur password')
        .min(6, 'Please enter at least 6 characters'),
    })
    .required();

  const handleSignUpSubmut = async (e: FormInput) => {
    const email = e.email as string;
    const name = e.yourname as string;
    const password = e.password as string;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setDoc(doc(db, 'users', user.uid), {
          displayName: name,
          photoUrl: getRandomAvatar(),
          bookmarks: [],
          recentlyWatch: [],
          timeStamp: serverTimestamp(),
        });
        notifySuccess('Đăng ký thành công');

        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        notifyError(convertErrorCodeToMessage(errorCode));
      });
  };

  // const handleSignInGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential?.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       notifySuccess();

  //       setTimeout(() => {
  //         navigate('/');
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       notifyError(convertErrorCodeToMessage(errorCode));
  //     });
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => handleSignUpSubmut(data);

  return (
    <section className="p-12 mt-14">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-1/3 ml-[33.3333%] p-3">
            <h1 className="text-[2rem] font-semibold leading-[1.125] text-[#7a7a7a] mb-6">
              Đăng ký
            </h1>
            <div className="flex flex-col items-start p-5 mb-6 shadow-[0_0.5em_1em_-0.125em_#0a0a0a1a] bg-[#363636] rounded-md border-[#dbdbdb]">
              <input
                placeholder="Email"
                {...register('email')}
                className="w-full py-[11px] px-[17px] text-2xl h-[60px] rounded placeholder:font-normal text-[#363636]"
              />
              <p className="mb-[10px] text-sm text-error">{errors.email?.message}</p>

              <input
                placeholder="Tên bạn"
                {...register('yourname')}
                className="w-full py-[11px] px-[17px] text-2xl h-[60px] rounded placeholder:font-normal text-[#363636]"
              />
              <p className="mb-[10px] text-sm text-error">{errors.yourname?.message}</p>

              <input
                type="password"
                placeholder="Mật khẩu"
                {...register('password')}
                className="w-full py-[11px] px-[17px] text-2xl h-[60px] rounded placeholder:font-normal text-[#363636]"
              />
              <p className="mb-[10px] text-sm text-error">{errors.password?.message}</p>

              <div className="mb-3">
                <label htmlFor="remember" className="mb-3 cursor-pointer text-white">
                  <input {...register('remember')} type="checkbox" id="remember" className="" />{' '}
                  Đăng ký nhận thông báo về trang web
                </label>
                <span className="text-[#7a7a7a] text-xs mt-1 block le">
                  Chúng tôi chỉ gửi những thông báo quan trọng
                </span>
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-[#3e8ed0] rounded text-white w-full text-2xl h-[60px] hover:bg-[#3488ce]"
              >
                Đăng ký
              </button>
              <div
                data-content="Hoặc"
                className="border-t-[0.1rem] w-full border-t-s border-solid border-[#dbdbdb] h-[0.1rem] my-8 text-center after:content-[attr(data-content)] after:bg-white after:text-[#7a7a7a] after:inline-block after:text-xs after:py-[0.4rem] after:px-[0.8rem] after:translate-y-[-1.1rem] after:text-center after:uppercase"
              ></div>
              <Button
                iconLeft={<Google />}
                className="bg-secondary w-full py-3 px-6 text-2xl gap-4 h-[60px]"
                title=" Đăng nhập với Google"
                onClick={() => () => signInWithProvider(new GoogleAuthProvider(), 'google')}
              />
            </div>
            <p className="text-right text-[#428bca]">
              <Link to="/login" className="hover:text-[#dcf836]">
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer theme="colored" />
    </section>
  );
}

export default SignUp;
