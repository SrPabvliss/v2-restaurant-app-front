"use client";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AdminItems = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("dashboard");

  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/administrador",
    },
    {
      key: "empleados",
      label: "Empleados",
      url: "/administrador/empleados",
    },
    {
      key: "clientes",
      label: "Clientes",
      url: "/administrador/clientes",
    },
    {
      key: "productos",
      label: "Productos",
      url: "/administrador/productos",
    },
    {
      key: "facturas",
      label: "Facturas",
      url: "/administrador/facturas",
    },
  ];

  return (
    <Listbox items={items} aria-label="Dynamic Actions">
      {(item) => (
        <ListboxItem
          key={item.key}
          className={
            "text-center mt-8" +
            (selected === item.key ? " bg-amber-900 text-white" : "")
          }
          onClick={() => {
            setSelected(item.key);
            router.push(item.url);
          }}
          textValue={item.label}
        >
          <p className="text-2xl ">{item.label}</p>
        </ListboxItem>
      )}
    </Listbox>
  );
};
