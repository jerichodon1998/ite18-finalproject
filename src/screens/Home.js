import React from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import AddTodoList from "../components/AddTodoList";
import MapList from "../components/MapList";
function Home() {
	const currentUser = useSelector((state) => state.authReducers);

	const renderTodoList = () => {
		return (
			<>
				<div style={{ textAlign: "center" }}>
					<h2 style={{ color: "#fff" }}>Welcome, {currentUser.username}!</h2>
				</div>
				<AddTodoList />
				<MapList />
			</>
		);
	};

	return (
		<Container style={{ padding: "1rem" }}>
			{currentUser.isLoggedin ? (
				renderTodoList()
			) : (
				<div style={{ textAlign: "center" }}>
					<h1 style={{ color: "#fff", fontFamily: "cursive" }}>
						Welcome! Signup or Signin to make a{" "}
						<span style={{ fontWeight: " bold", fontSize: "3rem" }}>LIST!</span>
					</h1>
				</div>
			)}
		</Container>
	);
}

export default Home;
