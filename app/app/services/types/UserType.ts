export interface UserType {
  _id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  image?: any;
  is_admin: boolean;
}
