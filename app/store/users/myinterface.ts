export interface User {
  _id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  image?: any;
  is_admin: boolean;
}

export interface UserAuthState {
  item: User;
  items?: User[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}
