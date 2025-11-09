// // components/EditProfileForm/EditProfileForm.tsx

// 'use client'; 

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { User, UpdateUserPayload } from '@/types/user'; 
// import { clientApi } from '@/lib/api/clientApi'; 
// import { useAuthStore } from '@/lib/store/authStore'; 
// import css from '../../app/(private routes)/profile/edit/EditProfilePage.module.css';

// interface EditProfileFormProps {
//   initialUser: User;
// }

// const defaultAvatar = '/avatar.webp'; 

// const EditProfileForm: React.FC<EditProfileFormProps> = ({ initialUser }) => {
//   const [userName, setUserName] = useState(initialUser.userName);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const updateUser = useAuthStore((state) => state.updateUser);
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (userName === initialUser.userName) {
//       router.push('/profile');
//       return;
//     }

//     setIsLoading(true);
//     const payload: UpdateUserPayload = { userName };
    
//     try {

//       await clientApi.put('/auth/update', payload);
//       updateUser({ userName }); 
//       router.push('/profile'); 
      
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       alert('Failed to update profile. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push('/profile');
//   };

//   return (
//     <form className={css.profileInfo} onSubmit={handleSubmit}> 
//       <Image
//         src={initialUser.avatarUrl || defaultAvatar}
//         alt={`${initialUser.userName}'s avatar`}
//         width={100} 
//         height={100}
//         className={css.avatar} 
//       />
      
//       <div className={css.usernameWrapper}> 
//         <label htmlFor="username">
//           Username
//         </label>
//         <input
//           id="username"
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           className={css.input} 
//           required
//         />
//       </div>
      
//       <div className={css.usernameWrapper}>
//         <label>Email (read only)</label>
//         <p className={css.input} style={{ backgroundColor: '#f0f0f0' }}>
//           {initialUser.email}
//         </p>
//       </div>

//       <div className={css.actions}>
//         <button 
//           type="submit" 
//           className={css.saveButton}
//           disabled={isLoading || userName === initialUser.userName}
//         >
//           {isLoading ? 'Saving...' : 'Save'}
//         </button>
//         <button 
//           type="button" 
//           className={css.cancelButton}
//           onClick={handleCancel}
//           disabled={isLoading}
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditProfileForm;