export interface Todo {
  id: number;
  title: string;
  category: string;
  done: boolean;
  due_date: string;
}

export interface Category {
  id: number;
  title: string;
}

export type status = 'idle' | 'loading' | 'succeeded' | 'failed';
