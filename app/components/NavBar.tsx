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
import { PlusSmallIcon } from "@heroicons/react/20/solid";

const WaiterNavBar = () => {
	const { logout } = useUserStore();
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
								variant="shadow"
								className="capitalize"
								size="sm"
							>
								<PlusSmallIcon className="text-amber-900"/>
							</Button>
						</PopoverTrigger>
						{content}
					</Popover>
				</NavbarContent>
			</Navbar>
		</div>
	);
};

export default WaiterNavBar;
