import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { db, storage } from "../firebaseConfig";
import Delete from "@mui/icons-material/Delete";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import { ProgressBar } from "react-bootstrap";
import { TodoModel } from "../models/TodoModel";
import { deleteObject, ref } from "firebase/storage";

function TodoListCard({ data }) {
	const { date, id } = data;
	const [todos, setTodos] = useState([]);
	const currentDate = moment();

	const setBackgroundColor = () => {
		if (moment(date._d).isSame(currentDate._d, "day", "month", "year")) {
			return "#FEC37C";
		} else if (moment(date._d).isBefore(currentDate._d, "day", "month", "year")) {
			return "#606266";
		}
		return "#F1E6B8";
	};
	const onDeleteList = () => {
		todos.forEach((todo) => {
			if (todo.fileName !== "") {
				const deleteRef = ref(storage, todo.fileName);
				deleteObject(deleteRef)
					.then(() => {})
					.catch((err) => {});
			}
			deleteDoc(doc(db, "todo", todo.id));
		});
		deleteDoc(doc(db, "todo_list", id));
	};

	const progressPercentage = () => {
		var total = 0;
		if (todos?.length !== 0) {
			todos?.forEach((todo) => {
				if (todo.done) {
					total += 1;
				}
			});
			const percentage = ((total / parseInt(todos?.length || 0)) * 100).toFixed(2);
			return (
				<ProgressBar
					variant="warning"
					style={{ borderRadius: "25px", height: "2rem", marginTop: ".5rem" }}
					animated
					now={percentage}
					label={`${percentage?.toString()} %`}
				/>
			);
		}
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
					const fileName = doc.data().fileName;
					const fileUrl = doc.data().fileUrl;
					const timestamp = doc.data().timestamp;
					const task = new TodoModel(
						title,
						description,
						done,
						timestamp,
						listId,
						fileUrl,
						fileName,
						id
					);
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
				boxShadow: "3px 8px #fff",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<h4
					style={{
						color: "#fff",
						fontFamily: "cursive",
						fontWeight: "bold",
						justifyContent: "space-between",
					}}
				>
					{date.format("ddd, MMMM Do YYYY").toString()}
					<Delete style={{ cursor: "pointer" }} onClick={onDeleteList} fontSize="large" />
				</h4>
				<AddTodo data={data} />
				<h4>{progressPercentage()}</h4>
				{todos.map((todo) => (
					<Todo key={todo.id} data={todo} />
				))}
			</div>
		</Container>
	);
}

export default TodoListCard;
