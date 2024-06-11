import React from "react";

const styles = {
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    width: "96%",
    padding: 0,
  },

  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "60%",
    textDecoration: "none",
    alignItems: "center",
    listStyleType: "none",
  },
  text: {
    fontSize: "18px",
    color: "black",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  },
  logoContainer: {
    width: "120px",
  },
};
function Overlay({ colors, selectedIndex }) {
  return (
    <div>
      <ul style={styles.nav}>
        <div style={styles.logoContainer}>
          <img
            src={process.env.PUBLIC_URL + "jordan-logo.jpeg"}
            width="70px"
            height="60px"
            alt="logo"
          />
        </div>

        <div style={styles.links}>
          <li style={{ ...styles.text, color: colors[selectedIndex] }}>Home</li>
          <li style={styles.text}>About Us</li>
          <li style={styles.text}>Men</li>
          <li style={styles.text}>Women</li>
          <li style={styles.text}>Collection</li>
          <li style={styles.text}>Contact Us</li>
        </div>
      </ul>
    </div>
  );
}

export default Overlay;
