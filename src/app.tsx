// @refresh reload

import "./app.css";
import Layout from "./layout";
import TodoList from "./components/TodoList";

export default function App() {
	return (
		<Layout>
			<TodoList />
		</Layout>
	);
}
