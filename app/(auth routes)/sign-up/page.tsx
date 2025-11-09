// app/(public routes)/sign-up/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './SignUpPage.module.css';
import { register, RegistrationDetails } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState(''); 
  const setUser = useAuthStore((state) => state.setUser); 

  const handleSubmit = async (formData: FormData) => {
    setError('');
    try {
      const formValues = Object.fromEntries(
        formData,
      ) as unknown as RegistrationDetails;

      const response = await register(formValues);

      if (response) {
        setUser(response);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
 
      if (axios.isAxiosError(error)) {
        setError(
          (error.response?.data as { message?: string })?.message ||
            error.message ||
            'Oops... some error',
        );
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>     {' '}
      <form action={handleSubmit} className={css.form}>
               {' '}
        <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                   {' '}
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
                 {' '}
        </div>
               {' '}
        <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                   {' '}
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
                 {' '}
        </div>
               {' '}
        <div className={css.actions}>
                   {' '}
          <button type="submit" className={css.submitButton}>
                        Register          {' '}
          </button>
                 {' '}
        </div>
                {error && <p className={css.error}>{error}</p>}     {' '}
      </form>
         {' '}
    </main>
  );
};

export default SignUp;
