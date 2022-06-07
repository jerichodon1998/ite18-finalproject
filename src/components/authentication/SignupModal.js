import React, { useState } from "react";
import { Alert, Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import Google from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import {
	clearAuthError,
	loginWithGoogle,
	signupWithEmailAndPassword,
} from "../../redux/authentication/actions";
const buttonStyle = {
	borderRadius: "25px",
	backgroundColor: "#fff",
	color: "#000",
};

function SignupModal() {
	const currentUser = useSelector((state) => state.authReducers);
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("");
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const handleClose = () => {
		setEmail("");
		setFname("");
		setLname("");
		setPassword("");
		setShow(false);
	};
	const handleShow = () => {
		setError("");
		setShow(true);
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
				style={{ ...buttonStyle, border: "2px solid #D9D9D9" }}
			>
				{currentUser.loginRequest || currentUser.signupRequest ? showSpinner() : null}
				Sign in with Google <Google />
			</Button>
		);
	};

	const showSpinner = () => {
		return <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />;
	};

	const showError = () => {
		return <Alert variant="danger">{error}</Alert>;
	};

	const onSignupSubmit = (e) => {
		e.preventDefault();
		dispatch(signupWithEmailAndPassword(email, password, fname, lname));
		if (currentUser.error && currentUser.signupRequest !== false) {
			setError(currentUser.error.errorMessage);
		} else {
			handleClose();
		}
	};

	return (
		<>
			<Button variant="outlined" onClick={handleShow} style={buttonStyle}>
				Signup
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Container style={{ paddingBottom: "20px", textAlign: "center" }}>
					<Modal.Header closeButton>
						<Modal.Title>Signup</Modal.Title>
					</Modal.Header>
					<Container style={{ paddingTop: "20px" }}>
						<Form onSubmit={onSignupSubmit}>
							<Form.Group className="mb-3" controlId="formBasicFname">
								<Form.Control
									required
									name="fname"
									type="text"
									value={fname}
									onChange={(e) => setFname(e.target.value)}
									placeholder="First name"
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicLname">
								<Form.Control
									required
									name="lname"
									type="text"
									value={lname}
									onChange={(e) => setLname(e.target.value)}
									placeholder="Last name"
								/>
							</Form.Group>
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
								Signup!
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

export default SignupModal;
