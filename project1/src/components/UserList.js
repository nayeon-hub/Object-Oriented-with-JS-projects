export default function UserList({ $target, initialState, onSelect }) {
  const $userList = document.createElement("div");
  $target.appendChild($userList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $userList.innerHTML = `
    <h1>UserList</h1>
    <ul>${this.state
      .map(
        (selectedUsername) =>
          `<li data-selectedusername='${selectedUsername}' style='cursor : pointer;'>${selectedUsername}</li>`
      )
      .join("")}
        <li>
          <form>
            <input class="new-user" type="text" placeholder="add selectedUsername"/>
          </form>
        </li>
      </ul>`;
  };

  this.render();

  $userList.addEventListener("click", (e) => {
    const $li = e.target.closest("li[data-selectedusername]");

    if ($li) {
      const { selectedusername } = $li.dataset;
      onSelect(selectedusername);
    }
  });

  $userList.addEventListener("submit", (e) => {
    const $newUser = $userList.querySelector(".new-user");
    const newUserValue = $newUser.value;

    if (newUserValue.length > 0) {
      onSelect($newUser.value);
      $newUser.value = "";
    }
  });
}
