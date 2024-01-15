"use client";

import { io } from "socket.io-client";

export const socket = io("https://nest-restaurant-api.onrender.com");
// export const socket = io("http://localhost:3001");
