import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { todoType } from '../types';
import { AES, enc } from 'crypto-js';
import dayjs from 'dayjs';

const secretKey = 'kienvan';

const MainContext = createContext(null);

const initialTodo: todoType[] = [];

const todoReducer = (state: todoType[], action: any) => {
  switch (action.type) {
    case 'INIT_TODO':
      return action.payload.todos;
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'CONFIG_TODO':
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'TOGGLE_DONE':
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, done: !todo.done };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

function MainProvider(props: any) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodo);
  const [input, setInput] = useState<any>('');
  const [deadline, setDeadline] = useState<string>(dayjs().format());

  const value = { todos, dispatch, input, setInput };

  useEffect(() => {
    const encodedData = localStorage.getItem('todos');
    const todos = JSON.parse(
      AES.decrypt(encodedData, secretKey).toString(enc.Utf8)
    );
    if (todos) {
      dispatch({
        type: 'INIT_TODO',
        payload: { todos: todos },
      });
    }
  }, []);

  useEffect(() => {
    const encodedData = AES.encrypt(
      JSON.stringify(todos),
      secretKey
    ).toString();
    localStorage.setItem('todos', encodedData);
  }, [todos]);

  return <MainContext.Provider value={value} {...props}></MainContext.Provider>;
}

function useMain() {
  const context = useContext(MainContext);
  return context;
}

export { MainProvider, useMain };
