import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Edit from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function EditTask({ data }) {
	const { title, description, id } = data;
	const [show, setShow] = React.useState(false);

	const [newTitle, setNewtitle] = React.useState(title);
	const [newDescription, setNewDescription] = React.useState(description);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onUpdateTask = (e) => {
		e.preventDefault();
		if (title !== newTitle || description !== newDescription) {
			const docRef = doc(db, "todo", id);
			updateDoc(docRef, {
				title: newTitle,
				description: newDescription,
			});
		}
		handleClose();
	};

	const onClose = () => {
		setNewtitle(title);
		setNewDescription(description);
		handleClose();
	};

	return (
		<>
			<Edit
				onClick={handleShow}
				fontSize="large"
				style={{ marginBottom: "1rem", cursor: "pointer" }}
			/>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Task</Modal.Title>
				</Modal.Header>
				<Form onSubmit={onUpdateTask}>
					<Modal.Body>
						<Form.Group className="mb-3" controlId="formBasicTitle">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={newTitle}
								onChange={(e) => setNewtitle(e.target.value)}
								placeholder="Enter title"
								autoFocus
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={newDescription}
								onChange={(e) => setNewDescription(e.target.value)}
								placeholder="Enter Description"
								required
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={onClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default EditTask;
