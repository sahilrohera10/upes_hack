import React from "react";

export default function ServiceCard(props) {
  return (
    <div className="serviceCard">
      <p
        style={{
          fontSize: "22px",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "0px",
        }}
      >
        {props.name}
      </p>
      <p style={{ marginLeft: "15px" }}>{props.descrip}</p>
    </div>
  );
}
