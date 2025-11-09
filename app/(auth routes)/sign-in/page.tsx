'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginDetails } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';
import axios from 'axios'; // <-- ДОДАНО: Потрібно для isAxiosError

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    // Скидаємо помилку перед новою спробою
    setError('');

    try {
      const formValues = Object.fromEntries(
        formData,
      ) as unknown as LoginDetails;

      const response = await login(formValues);

      if (response) {
        setUser(response);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      // ВИПРАВЛЕНО: Використовуємо захисник типу isAxiosError для безпечного оброблення помилки
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
           {' '}
      <form action={handleSubmit} className={css.form}>
                <h1 className={css.formTitle}>Sign in</h1>       {' '}
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
                        Log in          {' '}
          </button>
                 {' '}
        </div>
                {error && <p className={css.error}>{error}</p>}     {' '}
      </form>
         {' '}
    </main>
  );
};

export default SignIn;
