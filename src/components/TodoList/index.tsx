import {
	createSignal,
	For,
	Show,
	Index,
	onMount,
	createEffect,
	batch,
} from "solid-js";

export default function TodoList() {
	const [todos, setTodos] = createSignal([] as string[]);
	const [newTodo, setNewTodo] = createSignal("");

	//======================= CRUD =======================//

	function addTodo(e: SubmitEvent) {
		e.preventDefault();

		console.log(newTodo());

		if (!newTodo() || !newTodo().trim().length)
			return alert(
				"You didn't provide new todo! Cannot add new todo... Try again!"
			);

		batch(() => {
			setTodos((t) => [...t, newTodo()]);
			setNewTodo("");
		});
	}

	function deleteTodo(index: number) {
		setTodos((t) => t.filter((t, i) => i !== index));
	}

	//===================== CRUD END ====================//

	//=================== LOCAL STORAGE ==================//

	function fetchTodosFromLocalStorage() {
		const todosFromLocalStorage = localStorage.getItem("todos");

		if (!todosFromLocalStorage) {
			console.log("There are no todos in local storage...");
			setTodos([]);
		} else {
			console.log("There are todos in local storage:", todosFromLocalStorage);
			setTodos(JSON.parse(todosFromLocalStorage));
		}
	}

	function updateTodosInLocalStorage() {
		localStorage.setItem("todos", JSON.stringify(todos()));
	}

	//================= LOCAL STORAGE END ================//

	onMount(fetchTodosFromLocalStorage);

	createEffect(updateTodosInLocalStorage);

	return (
		<>
			<h1>Your Todos</h1>

			<form onSubmit={addTodo}>
				<input
					value={newTodo()}
					onInput={(e) => setNewTodo(e.currentTarget.value)}
					placeholder="type your new todo here..."
				/>
				<button type="submit">add todo</button>
			</form>

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
