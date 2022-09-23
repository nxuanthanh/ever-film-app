import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInput {
  email?: String;
  password?: string | number;
  remember?: Boolean;
}

function Forgot({ email, password, remember }: FormInput) {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <section className="p-12 mt-14">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-1/3 ml-[33.3333%] p-3">
            <h1 className="text-[2rem] font-semibold leading-[1.125] text-[#7a7a7a] mb-6">
              Lấy lại mật khẩu
            </h1>
            <div className="flex flex-col items-start p-5 mb-6 shadow-[0_0.5em_1em_-0.125em_#0a0a0a1a] bg-[#363636] rounded-md border-[#dbdbdb]">
              <input
                placeholder="Email đăng ký"
                {...register('email')}
                className="mb-3 w-full py-[11px] px-[17px] text-2xl h-[60px] rounded placeholder:font-normal text-[#363636]"
              />

              <button
                type="submit"
                className="py-2 px-4 bg-lam rounded text-white w-full text-2xl h-[60px] hover:bg-[#3488ce]"
              >
                Gửi
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Forgot;
