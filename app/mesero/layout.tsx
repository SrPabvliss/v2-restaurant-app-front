"use client";

import React from "react";
import { useUserStore } from "../store/userStore";
import { useRouter } from "next/navigation";
import {
	Button,
	Input,
	Navbar,
	NavbarBrand,
	NavbarContent,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@nextui-org/react";

import Logo from "@/public/images/jefa2.png";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const { logout, user } = useUserStore();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};
	const content = (
		<PopoverContent className="w-[240px]">
			{() => (
				<div className="px-1 py-2 w-full">
					<div className="mt-2 flex flex-col gap-2 w-full">
						<Button>Notificaciones</Button>
						<Button onClick={handleLogout}>Cerrar sesión</Button>
					</div>
				</div>
			)}
		</PopoverContent>
	);

	return (
		<div>
			<Navbar disableAnimation isBordered>
				<NavbarContent className="sm:hidden pr-3" justify="start">
					<NavbarBrand>
						<p className="text-amber-950 capitalize font-bold">LA JEFECITA</p>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent className="" justify="end">
					<Popover
						placement={"bottom-end"}
						backdrop="transparent"
						showArrow
						offset={10}
					>
						<PopoverTrigger>
							<Button
								color="warning"
								variant="flat"
								className="capitalize"
								size="sm"
							>
								<div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffbf00" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
</svg>
                                </div>
							</Button>
						</PopoverTrigger>
						{content}
					</Popover>
				</NavbarContent>
			</Navbar>
			
			{children}
		</div>
	);
};

export default Layout;
