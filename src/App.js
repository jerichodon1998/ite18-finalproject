import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "antd/dist/antd.less";
import Header from "./components/Header";
import Home from "./screens/Home";
import About from "./screens/About";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</Router>
	);
}

export default App;
