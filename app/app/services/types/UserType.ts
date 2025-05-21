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

interface Link {
  next?: string;
  previous?: string;
}

export interface UsersType {
  results: UserType[];
  links: Link;
  count: number;
  numpages: number;
}
