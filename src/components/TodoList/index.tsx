import {
	createSignal,
	For,
	Show,
	Index,
	onMount,
	createEffect,
} from "solid-js";

export default function TodoList() {
	const [todos, setTodos] = createSignal([] as string[]);

	function addTodo() {
		const newTodo = prompt("Input your new todo");

		if (!newTodo) return;

		setTodos((t) => [...t, newTodo]);
	}

	function deleteTodo(index: number) {
		setTodos((t) => t.filter((t, i) => i !== index));
	}

	onMount(() => {
		const todosFromLocalStorage = localStorage.getItem("todos");

		if (!todosFromLocalStorage) {
			console.log("There are no todos in local storage...");
			setTodos([]);
		} else {
			console.log("There are todos in local storage:", todosFromLocalStorage);
			setTodos(JSON.parse(todosFromLocalStorage));
		}
	});

	createEffect(() => localStorage.setItem("todos", JSON.stringify(todos())));

	return (
		<>
			<h1>Your Todos</h1>

			<button onClick={addTodo}>add todo</button>

			<Show
				when={todos().length}
				fallback={<p>There are no todos yet... Add one!</p>}
			>
				<ul>
					{/*
              <For> cares about each piece of data in your array, and the position of that data can change;
              <Index> cares about each index in your array, and the content at each index can change.
              It has a similar signature to <For>, except this time the item is the signal and the index is fixed.
              As a rule of thumb, when working with primitives use <Index>.
              */}

					{/* ===================> in this case <For> is less efficient:
              <For each={todos()}>
                {(todo, i) => <li>{todo} <button onClick={() => deleteTodo(i())}>X</button></li>}
              </For>
              */}

					<Index each={todos()}>
						{(todo, i) => (
							<li>
								{todo()} <button onClick={() => deleteTodo(i)}>X</button>
							</li>
						)}
					</Index>
				</ul>
			</Show>
		</>
	);
}
