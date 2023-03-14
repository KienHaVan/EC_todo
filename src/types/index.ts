import { ReactNode } from 'react';

export type PropsType = { children: ReactNode };

export type todoType = {
  id: string;
  name: string;
  done: boolean;
  deadline?: string;
};
