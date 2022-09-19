import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface FormInput {
  email?: String;
  password?: GenderEnum;
  remember?: Boolean;
}

function SignIn({ email, password, remember }: FormInput) {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <section className="p-12 mt-14">
      <div className="container">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} />
            <input {...register('password')} />
            <input {...register('remember')} type="checkbox" />
            <input type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
