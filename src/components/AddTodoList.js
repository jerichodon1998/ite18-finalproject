import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import AddCircle from "@mui/icons-material/AddCircle";
import { TodoListModel } from "../models/TodoListModel";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
function AddTodoList() {
	const currentUser = useSelector((state) => state.authReducers);
	const dateFormat = "YYYY/MM/DD";
	const currentDate = moment();
	const [date, setDate] = useState(currentDate?._d);

	const onDatepickerChange = (e) => {
		setDate(e?._d);
	};

	const onAddList = () => {
		// ADD DOC
		const todoList = new TodoListModel(date, [], currentUser.uid);
		addDoc(collection(db, "todo_list"), {
			date: todoList.date,
			userId: currentUser.uid,
		});
	};

	const renderDatePicker = () => {
		return (
			<>
				<div style={{ marginBottom: "5px" }}>
					<DatePicker
						style={{
							border: "2px solid #000",
							borderRadius: "28px",
							width: "10rem",
							height: "2.5rem",
						}}
						defaultValue={currentDate}
						format={dateFormat}
						onChange={onDatepickerChange}
					/>
				</div>
				<Button variant="outlined" onClick={onAddList}>
					<AddCircle fontSize="large" style={{ color: "#000" }} />
				</Button>
			</>
		);
	};

	return (
		<Container
			style={{
				textAlign: "center",
				backgroundColor: "#fff",
				width: "20rem",
				height: "11rem",
				borderRadius: "25px",
				padding: ".75rem .5rem",
				marginBottom: "1rem",
				boxShadow: "3px 8px #606266",
			}}
		>
			<h3 style={{ fontFamily: "cursive", color: "#000" }}>New List</h3>
			<hr />
			{renderDatePicker()}
		</Container>
	);
}

export default AddTodoList;
