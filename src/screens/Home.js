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
				<h1 style={{ color: "#fff" }}>LOGIN SA, AYAW PAG-TINANGA</h1>
			)}
		</Container>
	);
}

export default Home;
