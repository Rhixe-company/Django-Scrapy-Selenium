export interface Users {
  next_page?: any;
  previous_page?: any;
  total_results: number;
  total_pages: number;
  results: User[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  image?: any;
  is_admin: boolean;
}
