"use client";

import WaiterNavBar from './components/WaiterNavBar';

const Layout = ({ children }: { children: React.ReactNode }) => {

	return (
		<div className="bg-repeat bg-center min-h-screen"
		style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}>
			<WaiterNavBar />
			{children}
		</div>
	);
};

export default Layout;
