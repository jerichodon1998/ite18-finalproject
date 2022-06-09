import React from "react";
import Facebook from "@mui/icons-material/Facebook";
import moment from "moment";
import { Instagram, Twitter } from "@mui/icons-material";

const footerStyle = {
	backgroundColor: "#606266",
	borderTop: "1px solid #E7E7E7",
	textAlign: "center",
	position: "fixed",
	height: "7.5rem",
	padding: "1rem",
	bottom: 0,
	width: "100%",
};

const iconStyle = { cursor: "pointer", margin: "0 .15rem" };
const anchorStyle = { color: "#000" };

function Footer() {
	return (
		<div style={footerStyle}>
			<h4>Follow us on:</h4>
			<div style={{ paddingBottom: ".15rem" }}>
				<a
					href="https://www.facebook.com/profile.php?id=100003689202977"
					style={anchorStyle}
				>
					<Facebook style={iconStyle} />
				</a>
				<a
					href="https://www.facebook.com/profile.php?id=100003689202977"
					style={anchorStyle}
				>
					<Twitter style={iconStyle} />
				</a>
				<a href="https://www.instagram.com/dondon56800/" style={anchorStyle}>
					<Instagram style={iconStyle} />
				</a>
			</div>
			<h5>Copyright &copy; {moment().year()} by todoapp.</h5>
		</div>
	);
}

export default Footer;
