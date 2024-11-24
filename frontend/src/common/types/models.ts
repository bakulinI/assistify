
export interface User {
  id: number;
  username: string;
  role: string | null;
  email: string;
  categories: Category['name'][];
}
