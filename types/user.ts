export interface UserBase {
  userName: string;
  email: string;
  avatarUrl: string;
}

export interface User extends UserBase {
  id: string;
}

export interface UpdateUserPayload {
  userName: string;
}