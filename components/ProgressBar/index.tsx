import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.track, width: `${progress}%` }}></div>
    </div>
  );
};

const styles = {
  container: {
    height: 10,
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  track: {
    height: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#334139",
  },
};

export default ProgressBar;
