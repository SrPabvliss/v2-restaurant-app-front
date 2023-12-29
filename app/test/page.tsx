"use client";

import React from "react";
import { socket } from "../api/socket";

const Test = () => {
  React.useEffect(() => {
    socket.on("load-tables", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      Test
      <button
        onClick={() => {
          socket.emit("get-tables");
          socket.on("load-tables", (data: any) => {
            console.log(data);
          });
        }}
      >
        test
      </button>
    </div>
  );
};

export default Test;
