import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { db } from "../firebaseConfig";
import { TodoListModel } from "../models/TodoListModel";
import TodoListCard from "./TodoListCard";
import moment from "moment";
import { useSelector } from "react-redux";

function MapList() {
	const [todolist, setTodolist] = useState([]);
	const currentUser = useSelector((state) => state.authReducers);
	useEffect(() => {
		const getList = () => {
			const queryData = query(
				collection(db, "todo_list"),
				where("userId", "==", currentUser.uid),
				orderBy("date", "asc")
			);
			onSnapshot(queryData, (snapshot) => {
				const list = snapshot.docs.map((doc) => {
					const id = doc.id;
					const date = moment(doc.data().date?.toDate());
					const userId = doc.data().userId;
					const list = new TodoListModel(date, userId, id);
					return list;
				});
				setTodolist(list);
			});
		};
		getList();
	}, [currentUser.uid]);

	return (
		<Container>
			<Row xs={1} md={2} lg={3} xl={3}>
				{todolist.map((todo) => (
					<Col key={todo.id + todo.userId}>
						<TodoListCard key={todo.id} data={todo} />
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default MapList;
