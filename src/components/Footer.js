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

function Footer() {
	return (
		<div style={footerStyle}>
			<h4>Follow us on:</h4>
			<div style={{ paddingBottom: ".15rem" }}>
				<Facebook
					href="https://www.facebook.com/profile.php?id=100003689202977"
					style={iconStyle}
				/>
				<Twitter
					href="https://www.facebook.com/profile.php?id=100003689202977"
					style={iconStyle}
				/>
				<Instagram href="https://www.instagram.com/dondon56800/" style={iconStyle} />
			</div>
			<h5>Copyright &copy; {moment().year()} by todoapp.</h5>
		</div>
	);
}

export default Footer;
