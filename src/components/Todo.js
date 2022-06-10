import { Delete } from "@mui/icons-material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { db, storage } from "../firebaseConfig";
import { deleteObject, ref } from "firebase/storage";
import EditTask from "./EditTask";

function Todo({ data }) {
	const { description, done, title, id, fileUrl, fileName } = data;
	const [isDone, setIsDone] = useState(done);
	const onDoneChange = (e) => {
		setIsDone(e.target.checked);
		const docRef = doc(db, "todo", id);
		updateDoc(docRef, {
			done: e.target.checked,
		});
	};

	const onDeleteTodo = (e) => {
		e.preventDefault();
		const deleteRef = ref(storage, fileName);
		deleteObject(deleteRef)
			.then(() => {})
			.catch((err) => {});
		deleteDoc(doc(db, "todo", id));
	};

	return (
		<div style={{ marginTop: "1rem" }}>
			<Card style={{ backgroundColor: "#606266" }}>
				<Card.Body>
					<Card.Title
						style={{ color: "#fff", textDecoration: done ? "line-through" : "" }}
					>
						{title}
					</Card.Title>
					<Card.Subtitle
						style={{ color: "#fff", textDecoration: done ? "line-through" : "" }}
						className="mb-2 text-muted"
					>
						{description}
					</Card.Subtitle>
					{fileName !== "" ? (
						<a href={fileUrl} target="blank">
							<Button variant="warning">{fileName}</Button>
						</a>
					) : null}
					<div style={{ textAlign: "center", marginTop: ".5rem" }}>
						<EditTask data={data} />
						<Delete
							fontSize="large"
							style={{ marginBottom: "1rem", cursor: "pointer" }}
							onClick={onDeleteTodo}
						/>
						<Form.Check
							style={{ display: "inline", fontSize: "1.7rem" }}
							defaultChecked={isDone}
							value={isDone}
							onChange={onDoneChange}
							type="checkbox"
						/>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Todo;
