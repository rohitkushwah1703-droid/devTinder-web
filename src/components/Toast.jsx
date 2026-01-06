import React from "react";

const Toast = ({
  visible,
  message,
  type = "success",
  position = "top-center",
}) => {
  if (!visible) return null;

  const positionClass =
    position === "top-right"
      ? "toast-top toast-end"
      : position === "top-center"
      ? "toast-top toast-center"
      : "toast-bottom toast-center";

  return (
    <div className={`toast ${positionClass}`}>
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
