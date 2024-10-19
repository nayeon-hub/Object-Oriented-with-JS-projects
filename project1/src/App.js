import { request } from "./network/api.js";
import UserList from "./components/UserList.js";
import TodoList from "./components/TodoList.js";
import Header from "./components/Header.js";

export default function App({ $target }) {
  const $userListContainer = document.createElement("div");
  const $todoListContainer = document.createElement("div");

  $target.appendChild($userListContainer);
  $target.appendChild($todoListContainer);

  this.state = {
    userList: [],
    selectedUsername: "",
    todos: [],
    isLoading: false,
  };

  const userList = new UserList({
    $target: $userListContainer,
    initialState: this.state.userList,
    onSelect: async (username) => {
      this.setState({
        ...this.state,
        selectedUsername: username,
      });

      await fetchTodos();
    },
  });

  const header = new Header({
    $target: $todoListContainer,
    initialState: {
      isLoading: this.state.isLoading,
      selectedUsername: this.state.selectedUsername,
    },
  });

  const todoList = new TodoList({
    $target: $todoListContainer,
    initialState: {
      todos: this.state.todos,
      isLoading: this.state.isLoading,
    },
    onToggle: async (id) => {
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);
      const nextTodos = [...this.state.todos];

      nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted;
      this.setState({
        ...this.state,
        todos: nextTodos,
      });

      await request(`/${this.state.selectedUsername}/${id}/toggle`, {
        method: "PUT",
      });
      await fetchTodos();
    },
    onRemove: async (id) => {
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);

      const nextTodos = [...this.state.todos];

      nextTodos.splice(todoIndex, 1);

      await request(`/${this.state.selectedUsername}/${id}`, {
        method: "DELETE",
      });
      await fetchTodos();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    header.setState({
      isLoading: this.state.isLoading,
      selectedUsername: this.state.selectedUsername,
    });

    userList.setState(this.state.userList);

    todoList.setState({
      isLoading: this.state.isLoading,
      todos: this.state.todos,
    });

    this.render();
  };

  this.render = () => {};

  const fetchUserList = async () => {
    const userList = await request("/users");

    this.setState({
      ...this.state,
      userList,
    });
  };

  const fetchTodos = async () => {
    const { selectedUsername } = this.state;

    if (selectedUsername) {
      this.setState({
        ...this.state,
        isLoading: true,
      });

      const todos = await request(`/${selectedUsername}`);

      this.setState({
        ...this.state,
        todos,
        isLoading: false,
      });
    }
  };

  const init = async () => {
    await fetchUserList();
  };

  this.render();
  init();
}
