"use client";
import { Button, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import { ListboxWrapper } from "./components/ListBoxWrapper";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
		<div className="flex h-full w-full">
			<aside className="max-w-fit bg-amber-500 h-full min-h-screen min-w-unit-64 overflow-x-auto ">
				<ScrollShadow
					hideScrollBar
					className="h-full overflow-auto min-h-screen"
				>
					<div className="flex flex-col justify-between items-center h-full min-h-screen">
						<ul className=" py-14 flex flex-col items-center gap-6 w-full">
							<ListboxWrapper>
								<Listbox
									items={items}
									aria-label="Dynamic Actions"
									
								>
									{(item) => (
										<ListboxItem
											key={item.key}
											className="text-center text-2xl"
                                            onClick={() => {
                                                window.location.href = item.url;
                                              }}
										>
											{item.label}
										</ListboxItem>
									)}
								</Listbox>
							</ListboxWrapper>
						</ul>
						<p className="py-14">Cerrar sesión</p>
					</div>
				</ScrollShadow>
			</aside>

			<section
				className="flex-grow p-4 bg-repeat bg-center"
				style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}
			>
				{children}
			</section>
		</div>
	);
};

export default Layout;
