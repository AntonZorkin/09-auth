// app/(private routes)/profile/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { getServerMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css'; 

const defaultAvatar = '/public/avatar.webp'; 

const ProfilePage = async () => {
  let user;
  

  try {
    user = await getServerMe();
  } catch (error) {
    return (
      <section className={css.container}>
        <h1>Error</h1>
        <p>Could not load profile data. Check if you are logged in.</p>
      </section>
    );
  }

  return (
    <section className={css.container}>
      <div className={css.header}>
        <div className={css.avatarWrapper}>
          <Image 
            src={user.avatarUrl || defaultAvatar}
            alt={`${user.userName}'s avatar`}
            width={120} 
            height={120}
            className={css.avatar}
          />
        </div>
        <div>
          <h1 className={css.title}>My Profile</h1>
          <Link href="/profile/edit" className={css.editLink}>
            Edit profile
          </Link>
        </div>
      </div>
      
      <div className={css.details}>
        <p><strong>Name:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </section>
  );
};

export default ProfilePage;