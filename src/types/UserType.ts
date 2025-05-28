export interface UserType {
  id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  image?: string;
  is_admin: boolean;
}
