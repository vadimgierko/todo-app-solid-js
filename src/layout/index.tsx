export default function Layout(props: any) {
	return (
		<div class="layout">
			<div class="navbar">
				<span>
					<strong>Solid.js Todo App</strong>
				</span>
				<nav>
					<a href="/">home</a>
				</nav>
			</div>

			<main>{props.children}</main>

			<footer style="text-align: center">
				<hr />
				<p>
					<strong>Hello World Todo App</strong>
					<br />
					developed with{" "}
					<a href="https://www.solidjs.com/" target="_blank">
						solid.js
					</a>{" "}
					<em>(to test the framework)</em>
					<br />
					2023 &copy; Vadim Gierko
				</p>
			</footer>
		</div>
	);
}
