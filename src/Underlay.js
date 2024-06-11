import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function Underlay({ colors, selectedIndex, handleNext, handlePrevious }) {
  const styles = {
    footer: {
      position: "absolute",
      bottom: 45,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      gap: "75%",
      zIndex: 100,
    },
    icon: {
      width: "50px",
      height: "50px",
      color: colors[selectedIndex],
    },
  };
  return (
    <div style={styles.footer}>
      <div>
        <ArrowCircleLeftIcon
          style={styles.icon}
          onClick={() => {
            handlePrevious();
          }}
        />
      </div>
      <div>
        <ArrowCircleRightIcon sx={styles.icon} onClick={() => handleNext()} />
      </div>
    </div>
  );
}

export default Underlay;
