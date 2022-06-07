import { Google } from "@mui/icons-material";
import React, { useState } from "react";
import { Alert, Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	clearAuthError,
	loginWithEmailAndPassword,
	loginWithGoogle,
} from "../../redux/authentication/actions";

const buttonStyle = {
	borderRadius: "25px",
	color: "#fff",
	backgroundColor: "#606266",
};

function SigninModal() {
	const currentUser = useSelector((state) => state.authReducers);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [error, setError] = useState("");
	const handleClose = () => {
		setEmail("");
		setPassword("");
		setShow(false);
	};
	const handleShow = () => {
		setError("");
		setShow(true);
	};

	const showSpinner = () => {
		return <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />;
	};

	const showError = () => {
		return <Alert variant="danger">{error}</Alert>;
	};

	const signinWithGoogle = () => {
		dispatch(clearAuthError());
		dispatch(loginWithGoogle());
	};

	const renderOAuth = () => {
		return (
			<Button
				variant="outlined"
				onClick={signinWithGoogle}
				disabled={currentUser.loginRequest || currentUser.signupRequest}
				style={{
					...buttonStyle,
					border: "2px solid #D9D9D9",
					color: "#000",
					backgroundColor: "#fff",
				}}
			>
				{currentUser.loginRequest || currentUser.signupRequest ? showSpinner() : null}
				Sign in with Google <Google />
			</Button>
		);
	};

	const onSigninSubmit = (e) => {
		e.preventDefault();
		dispatch(loginWithEmailAndPassword(email, password));
	};

	return (
		<>
			<Button variant="outlined" onClick={handleShow} style={buttonStyle}>
				Signin
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Container style={{ paddingBottom: "20px", textAlign: "center" }}>
					<Modal.Header closeButton>
						<Modal.Title>Signin</Modal.Title>
					</Modal.Header>
					<Container style={{ paddingTop: "20px" }}>
						<Form onSubmit={onSigninSubmit}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Control
									required
									name="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter email"
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control
									required
									name="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
								/>
							</Form.Group>
							{error ? showError() : null}
							<Button
								variant="outlined"
								type="submit"
								disabled={currentUser.loginRequest || currentUser.signupRequest}
								style={{ ...buttonStyle, backgroundColor: "#000", color: "#fff" }}
							>
								{currentUser.loginRequest || currentUser.signupRequest
									? showSpinner()
									: null}
								Signin!
							</Button>
						</Form>
					</Container>
					<span style={{ display: "flex" }}>
						<hr style={{ flex: "1" }} />
						<h3 style={{ padding: "0 1rem" }}>Or</h3>
						<hr style={{ flex: "1" }} />
					</span>
					<Container>{renderOAuth()}</Container>
				</Container>
			</Modal>
		</>
	);
}

export default SigninModal;
