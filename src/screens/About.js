import React from "react";
import { Container } from "react-bootstrap";

function About() {
	return (
		<Container style={{ textAlign: "center" }}>
			<h1 style={{ color: "#fff" }}>
				A to-do list app lets you{" "}
				<span
					style={{
						fontWeight: "bold",
						fontSize: "3.5rem",
						fontFamily: "cursive",
						color: "#FEC37C",
					}}
				>
					write, organize, and reprioritize
				</span>{" "}
				your tasks more efficiently. They also let you attach notes, links, and files to a
				task, and many let you see when someone else has completed a task. In many ways, a
				good to-do app is the ultimate productivity app.
			</h1>
		</Container>
	);
}

export default About;
