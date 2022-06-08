import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../firebaseConfig";
import { TodoModel } from "../models/TodoModel";

const buttonStyle = {
	borderRadius: "25px",
	fontWeight: "bold",
};

function AddTodo({ data }) {
	const listId = data.id;

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const onSubmitButton = (e) => {
		e.preventDefault();
		// ADD TODO
		const newTodo = new TodoModel(title, description, false, serverTimestamp(), listId);
		addDoc(collection(db, "todo"), {
			title: newTodo.title,
			description: newTodo.description,
			done: newTodo.done,
			timestamp: newTodo.timestamp,
			listId: newTodo.listId,
		});
		setTitle("");
		setDescription("");
		handleClose();
	};

	const renderModal = () => {
		return (
			<>
				<Button variant="dark" onClick={handleShow} style={buttonStyle}>
					AddTask
				</Button>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add task</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={onSubmitButton}>
							<Form.Group className="mb-3" controlId="formBasicTitle">
								<Form.Label>Title</Form.Label>
								<Form.Control
									name="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									type="text"
									placeholder="Enter Title"
									autoFocus
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control
									value={description}
									name="description"
									onChange={(e) => setDescription(e.target.value)}
									type="text"
									required
									placeholder="Enter Description"
								/>
							</Form.Group>
							<div style={{ textAlign: "center" }}>
								<Button variant="dark" type="submit" style={buttonStyle}>
									Submit
								</Button>
							</div>
						</Form>
					</Modal.Body>
				</Modal>
			</>
		);
	};

	return <>{renderModal()}</>;
}

export default AddTodo;
