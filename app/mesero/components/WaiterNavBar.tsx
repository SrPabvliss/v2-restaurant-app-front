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
								variant="flat"
								className="capitalize"
								size="sm"
							>
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-plus"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#7f5345"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M12 5l0 14" />
										<path d="M5 12l14 0" />
									</svg>
								</div>
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
