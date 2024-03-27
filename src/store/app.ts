import { uss, devtools } from '@enforcer-squad/uss';

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

type Filter = 'all' | 'completed';

interface Store {
  key: string;
  todos: Todo[];
  filter: Filter;
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, value: boolean) => void;
  toggleFilter: (filter: Filter) => void;
}

let defaultId = 1;

const model = uss<Store>({
  key: 'app',
  todos: [],
  filter: 'all',
  addTodo(todo) {
    model.todos.push({
      ...todo,
      id: defaultId++,
    });
  },
  removeTodo(id) {
    model.todos = model.todos.filter(todo => todo.id !== id);
  },
  updateTodo(id, value) {
    const ret = model.todos.find(todo => todo.id === id);
    if (ret) {
      ret.completed = value;
    }
  },
  toggleFilter(filter) {
    model.filter = filter;
  },
});
devtools(model);

export const filters: Filter[] = ['all', 'completed'];

export default model;
