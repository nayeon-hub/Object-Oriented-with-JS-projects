import { request } from "./src/network/api.js";
import UserList from "./src/components/UserList.js";
import TodoList from "./src/components/TodoList.js";

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

  const todoList = new TodoList({
    $target: $todoListContainer,
    initialState: {
      todos: this.state.todos,
      isLoading: this.state.isLoading,
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
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
