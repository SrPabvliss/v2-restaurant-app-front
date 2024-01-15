"use client";
import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { CheckIcon, HomeIcon, PlusSmallIcon } from "@heroicons/react/20/solid";
import { RssIcon } from "@heroicons/react/24/solid";
import { TagIcon } from "@heroicons/react/16/solid";

const NavBar = ({ type }: { type: string }) => {
  const { logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleOrders = () => {
    router.push("/mesero/orders");
  };

  const handleInvoices = () => {
    router.push("/cajero/invoices");
  };

  const content = (
    <PopoverContent className="w-[240px]">
      {() => (
        <div className="px-1 py-2 w-full">
          <div className="mt-2 flex flex-col gap-2 w-full">
            <Button onClick={handleLogout}>Cerrar sesión</Button>
          </div>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <div>
      <Navbar disableAnimation isBordered>
        <NavbarContent className="pr-3" justify="start">
          <NavbarBrand>
            <Button
              variant="ghost"
              className="capitalize bg-slate-200"
              onClick={() => router.push(`/${type}`)}
            >
              <HomeIcon className="text-amber-950 h-7" />

              <p className="text-amber-950 capitalize font-bold">LA JEFECITA</p>
            </Button>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="" justify="end">
          {type === "mesero" && (
            <Button
              onClick={handleOrders}
              className="capitalize"
              color="warning"
              variant="shadow"
              size="sm"
            >
              <TagIcon className="text-amber-900" />
            </Button>
          )}
          {type === "cajero" && (
            <Button
              onClick={handleInvoices}
              className="flex capitalize mr-20 text-lg font-semibold w-52"
              color="warning"
              variant="shadow"
              size="sm"
            >
              <div className="flex">
                <p className="flex">Facturas</p>
              </div>
              <TagIcon className="max-w-fit max-h-8 text-amber-900" />
            </Button>
          )}
          <Popover
            placement={"bottom-end"}
            backdrop="transparent"
            showArrow
            offset={10}
          >
            <PopoverTrigger>
              <Button
                color="warning"
                variant="shadow"
                className="capitalize"
                size="sm"
              >
                <PlusSmallIcon className="text-amber-900" />
              </Button>
            </PopoverTrigger>
            {content}
          </Popover>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default NavBar;
