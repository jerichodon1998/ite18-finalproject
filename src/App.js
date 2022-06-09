import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "antd/dist/antd.less";
import Header from "./components/Header";
import Home from "./screens/Home";
import About from "./screens/About";
import Footer from "./components/Footer";

function App() {
	return (
		<Router>
			<div style={{ paddingBottom: "7.5rem" }}>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
