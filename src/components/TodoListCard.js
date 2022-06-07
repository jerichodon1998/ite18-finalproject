// import { doc, getDoc } from "firebase/firestore";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { db } from "../firebaseConfig";
import { TodoModel } from "../models/TodoModel";
// import { db } from "../firebaseConfig";
import AddTodo from "./AddTodo";

function TodoListCard({ data }) {
	// todos, userUid
	const { date, id } = data;
	const [todos, setTodos] = useState([]);
	const currentDate = moment();

	const setBackgroundColor = () => {
		if (moment(date._d).isSame(currentDate._d, "day", "month", "year")) {
			return "#FEC37C";
		} else if (moment(date._d).isBefore(currentDate._d, "day", "month", "year")) {
			return "#606266";
		}
		return "green";
	};

	useEffect(() => {
		const getList = () => {
			const queryData = query(
				collection(db, "todo"),
				where("listId", "==", id),
				orderBy("timestamp", "asc")
			);
			onSnapshot(queryData, (snapshot) => {
				const list = snapshot.docs.map((doc) => {
					const id = doc.id;
					const title = doc.data().title;
					const description = doc.data().description;
					const listId = doc.data().listId;
					const done = doc.data().done;
					const timestamp = doc.data().timestamp;
					const task = new TodoModel(title, description, done, timestamp, listId, id);
					return task;
				});
				setTodos(list);
			});
		};
		getList();
	}, [id]);

	return (
		<Container
			style={{
				marginBottom: "1rem",
				backgroundColor: setBackgroundColor(),
				borderRadius: "25px",
				minHeight: "12rem",
				padding: "10px",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<h4 style={{ color: "#fff", fontFamily: "cursive", fontWeight: "bold" }}>
					{date.format("dddd, MMMM Do YYYY").toString()}
				</h4>
				<AddTodo data={data} />
				{todos.map((todo) => (
					<h6 key={todo.id}>{todo.title}</h6>
				))}
			</div>
		</Container>
	);
}

export default TodoListCard;
