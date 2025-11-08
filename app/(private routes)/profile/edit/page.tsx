// app/(private routes)/profile/edit/page.tsx

import { getServerMe } from '@/lib/api/serverApi';
import { User } from '@/types/user';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';
import css from './EditProfilePage.module.css'; 

const EditProfilePage = async () => {
  let user: User | null = null;
  
  try {
    user = await getServerMe();
  } catch (error) { 
    
  }

  if (!user) {
    return <p className={css.loading}>Loading or error...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <EditProfileForm initialUser={user} />
      </div>
    </main>
  );
};

export default EditProfilePage;