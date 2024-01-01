"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useOrdersSocketListeners } from "./api/useSocketOrders";

export function Providers({ children }: { children: React.ReactNode }) {
  useOrdersSocketListeners();

  return <NextUIProvider>{children}</NextUIProvider>;
}
