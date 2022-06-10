import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Edit from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function EditTask({ data }) {
	const { title, description, id, fileUrl, fileName } = data;
	const [show, setShow] = React.useState(false);

	const [file, setFile] = React.useState(null);
	const [newTitle, setNewtitle] = React.useState(title);
	const [newDescription, setNewDescription] = React.useState(description);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onUpdateTask = (e) => {
		e.preventDefault();
		if (file) {
			const storageRef = ref(storage, `${file?.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					// const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log("Upload is " + progress + "% done");
				},
				(error) => {
					// console.log(error);
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						if (fileUrl !== "" || fileName !== "") {
							const deleteRef = ref(storage, fileName);
							deleteObject(deleteRef)
								.then(() => {})
								.catch((err) => {});
						}

						const docRef = doc(db, "todo", id);
						updateDoc(docRef, {
							fileUrl: downloadURL,
							fileName: file?.name,
						});
					});
				}
			);
		}

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
						<Form.Group>
							<Form.Label>File</Form.Label>
							<Form.Control
								type="file"
								onChange={(e) => setFile(e.target?.files[0])}
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
