"use client";

import WaiterNavBar from './components/WaiterNavBar';

const Layout = ({ children }: { children: React.ReactNode }) => {

	return (
		<div>
			<WaiterNavBar />
			{children}
		</div>
	);
};

export default Layout;
