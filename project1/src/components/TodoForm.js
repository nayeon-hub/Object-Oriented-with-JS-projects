import { getItem, removeItem, setItem } from "./storage.js";

export default function TodoForm({ $target, onSubmit }) {
  const $form = document.createElement("form");

  $target.appendChild($form);

  this.render = () => {
    $form.innerHTML = `<input type="text" placeholder="할 일을 입력하세요">
    <button>추가하기</button>`;
  };

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const $input = $form.querySelector("input");
    const content = $input.value;

    onSubmit(content);

    $input.value = "";
    removeItem(TODO_TEMP_SAVE_KEY);
  });

  this.render();

  const $input = $form.querySelector("input");
  $input.value = getItem(TODO_TEMP_SAVE_KEY, "");

  $input.addEventListener("keyup", (e) => {
    setItem(TODO_TEMP_SAVE_KEY, e.target.value);
  });
}
