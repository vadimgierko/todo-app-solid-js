// @refresh reload
import { createSignal, For, Show, Index, onMount, createEffect } from "solid-js";
import "./app.css";

//const initTodos: string[] = ["test", "test1", "test2"];

export default function App() {
  const [todos, setTodos] = createSignal(([] as string[]));

  function addTodo() {
    const newTodo = prompt("Input your new todo")

    if (!newTodo) return

    setTodos(t => [...t, newTodo])
  }

  function deleteTodo(index: number) {
    setTodos(t => t.filter((t, i) => i !== index));
  }

  onMount(() => {
    const todosFromLocalStorage = JSON.parse(localStorage.getItem("todos"));

    if (todosFromLocalStorage) {
      console.log("There are todos in local storage:", todosFromLocalStorage);
      setTodos(todosFromLocalStorage);
    } else {
      console.log("There are no todos in local storage...");
      setTodos([]);
    }
  })

  createEffect(() => localStorage.setItem("todos", JSON.stringify(todos())));

  return (
    <div class="layout">
      <main>
        <h1>Your Todos</h1>

        <button onClick={addTodo}>
          add todo
        </button>

        <Show
          when={todos().length}
          fallback={<p>There are no todos yet... Add one!</p>}
        >
          <ul>
            {
              /*
              <For> cares about each piece of data in your array, and the position of that data can change;
              <Index> cares about each index in your array, and the content at each index can change.
              It has a similar signature to <For>, except this time the item is the signal and the index is fixed.
              As a rule of thumb, when working with primitives use <Index>.
              */
            }

            {
              /* ===================> in this case <For> is less efficient:
              <For each={todos()}>
                {(todo, i) => <li>{todo} <button onClick={() => deleteTodo(i())}>X</button></li>}
              </For>
              */
            }

            <Index each={todos()}>
              {(todo, i) => <li>{todo()} <button onClick={() => deleteTodo(i)}>X</button></li>}
            </Index>
          </ul>
        </Show>


      </main>

      <footer style="text-align: center">
        <hr />
        <p><strong>Hello World Todo App</strong><br />
          developed with <a href="https://www.solidjs.com/" target="_blank">solid.js</a> <em>(to test the framework)</em><br />
          2023 &copy; Vadim Gierko</p>
      </footer>
    </div>
  );
}
