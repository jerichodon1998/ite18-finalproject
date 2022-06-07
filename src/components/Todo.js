import React from "react";

function Todo({ todo }) {
	const { description, isDone, title } = todo;
	return (
		<div style={{ justifyContent: "space-between" }}>
			<span>
				<h4>{title}</h4>
				<h6>{description}</h6>
			</span>
			<input type="checkbox" defaultValue={isDone} />
		</div>
	);
}

export default Todo;
