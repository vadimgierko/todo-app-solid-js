// @refresh reload
import { createSignal, For, Show } from "solid-js";
import "./app.css";

const initTodos: string[] = ["test", "test1", "test2"];

export default function App() {
  const [todos, setTodos] = createSignal(initTodos);

  function addTodo() {
    const newTodo = prompt("Input your new todo")

    if (!newTodo) return

    setTodos(t => [...t, newTodo])
  }

  function deleteTodo(index: number) {
    setTodos(t => t.filter((t, i) => i !== index));
  }

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
            <For each={todos()}>
              {(todo, i) => <li>{todo} <button onClick={() => deleteTodo(i())}>X</button></li>}
            </For>
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
