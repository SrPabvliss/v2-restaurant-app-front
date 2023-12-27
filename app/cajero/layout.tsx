"use client";

import WaiterNavBar from '../components/NavBar';

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
