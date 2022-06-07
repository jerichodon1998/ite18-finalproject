import React, { useEffect } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../redux/authentication/actions";
import Logout from "@mui/icons-material/Logout";
import SigninModal from "./authentication/SigninModal";
import SignupModal from "./authentication/SignupModal";
// NOTE: catch login errors
function Header() {
	const currentUser = useSelector((state) => state.authReducers);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);

	const renderAuth = () => {
		if (currentUser.isLoggedin) {
			return (
				<Nav.Item style={{ marginRight: "10px", marginBottom: "5px" }}>
					<Button
						variant="outlined"
						style={{ borderRadius: "25px", backgroundColor: "#606266" }}
						onClick={() => {
							dispatch(logout());
						}}
					>
						<Logout style={{ color: "#fff" }} fontSize="large" />
					</Button>
				</Nav.Item>
			);
		}
		return (
			<>
				<Nav.Item style={{ marginRight: "10px", marginBottom: "5px" }}>
					<SigninModal />
				</Nav.Item>
				<Nav.Item>
					<SignupModal />
				</Nav.Item>
			</>
		);
	};

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			variant="dark"
			style={{
				padding: "5px 20px",
				color: "#fff",
				fontSize: "18px",
				fontWeight: "bold",
				borderBottom: "2px solid #606266",
				borderRadius: "30px",
			}}
		>
			<Navbar.Brand>
				<Button
					variant="outlined"
					style={{
						fontSize: "24px",
						fontWeight: "bold",
						color: "#fff",
					}}
					onClick={() => navigate("/")}
				>
					TODO-LIST
				</Button>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
					<Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
				</Nav>
				<Nav>{renderAuth()}</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
