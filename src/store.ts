import { makeAutoObservable } from 'mobx';

import { Todo } from './assets/interfaces';

class Store {
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    this.setTodo(this.getFromLocal());
  }
  todos: Todo[] = [];
  currentTodo: string = '';

  setTodo(todos: Todo[]) {
    this.todos = todos;
  }
  addTodo(value: string) {
    const id = this.todos.length + 1;
    this.todos.push({ id, task: value, done: false });
    this.currentTodo = '';
    this.saveToLocal();
  }
  handleInput({ target: { value } }: { target: { value: string } }) {
    this.currentTodo = value;
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos
      .filter(({ id }) => id !== todoId)
      .map((todo, i) => ({ ...todo, id: i + 1 }));
    this.saveToLocal();
  }

  editTodo(todoId: number) {
    const editingTodo = this.todos.find(({ id }) => id === todoId);
    this.currentTodo = editingTodo?.task || '';
    this.deleteTodo(todoId);
  }
  handleCheck(id: number) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    this.saveToLocal();
  }

  get completedTodoNumber() {
    return this.todos.filter(({ done }) => done).length;
  }

  get todosNumber() {
    return this.todos.length;
  }

  saveToLocal() {
    return localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getFromLocal(): Todo[] {
    const todofromStore = localStorage.getItem('todos') || '[]';
    return JSON.parse(todofromStore);
  }
}

export const store = new Store();
