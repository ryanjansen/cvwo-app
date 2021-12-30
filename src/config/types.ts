export interface Todo {
  id: number;
  title: string;
  category: Category;
  done: boolean;
  due_date: string;
}

export interface Category {
  id: number;
  title: string;
  color: string;
}

export type status = 'idle' | 'loading' | 'succeeded' | 'failed';
