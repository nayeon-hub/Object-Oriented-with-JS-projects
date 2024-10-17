export default function TodoList({ $target, initialState }) {
  const $todo = document.createElement("div");

  $target.appendChild($todo);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading, todos } = this.state;
    console.log(todos);

    if (!isLoading && todos.length === 0) {
      $todo.innerHTML = "Todo가 없습니다";
      return;
    }

    $todo.innerHTML = `
    <ul>
      ${todos
        .map(
          ({ _id, content, isCompleted }) => `
          <li data-id='${_id}' class="todo-item"> 
            ${isCompleted ? `<s>${content}</s>` : content}
            <button class="remove">삭제</button>
          </li>`
        )
        .join("")}
        </ul>`;
  };

  this.render();
}
