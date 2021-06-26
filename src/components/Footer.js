//import { FaBeer } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={footerStyle}>
        <nav style={navStyle}>
            <a style={anchorStyle} rel="noreferrer" target="_blank"  href="https://www.google.com">Blood Donors</a>
            <a style={anchorStyle} href="https://github.com/killjoy157/BloodDonors-React">Github</a>
            <a style={anchorStyle} href="https://www.twitter.com">Twitter</a>
            <a style={anchorStyle} href="https://www.facebook.com">Facebook</a>
        </nav>
    </footer>
    )
};

const bgc = "#282c44"

const footerStyle = {
    textDecoration: "none",
    backgroundColor: bgc,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "4vh",
    borderRadius: "15px 15px 0 0",
    position: "fixed",
    bottom: "0",
    width: "100%",
    borderTop: "3px solid gray"
};

const navStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    flexWrap: "wrap"
};

const anchorStyle = {
    textDecoration: "none",
    color: "whitesmoke",
    fontWeight: "bold"
};

export default Footer
