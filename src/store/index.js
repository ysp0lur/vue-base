import { createStore } from "vuex";

const STORAGE_KEY = "vue-todo-pwa";

const defaultTodos = [
  { id: 1, text: "Learn JavaScript", done: true },
  { id: 2, text: "Learn Vue 3", done: true },
  { id: 3, text: "Learn Bootstrap 5", done: false },
  { id: 4, text: "Build something awesome!", done: false },
];

// initial state
const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defaultTodos,
};

// mutations
const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo);
  },

  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  editTodo(state, { todo, text = todo.text, done = todo.done }) {
    const index = state.todos.indexOf(todo);

    state.todos.splice(index, 1, {
      ...todo,
      text,
      done,
    });
  },
};

// actions
const actions = {
  addTodo({ commit }, text) {
    commit("addTodo", {
      id: Date.now(),
      text,
      done: false,
    });
  },

  removeTodo({ commit }, todo) {
    commit("removeTodo", todo);
  },

  toggleTodo({ commit }, todo) {
    commit("editTodo", { todo, done: !todo.done });
  },

  editTodo({ commit }, { todo, value }) {
    commit("editTodo", { todo, text: value });
  },

  toggleAll({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit("editTodo", { todo, done });
    });
  },

  clearCompleted({ state, commit }) {
    state.todos
      .filter((todo) => todo.done)
      .forEach((todo) => {
        commit("removeTodo", todo);
      });
  },
};

// plugins
const plugins = [
  (store) => {
    store.subscribe((mutation, { todos }) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    });
  },
];

export default createStore({
  state,
  mutations,
  actions,
  plugins,
});
