import React from "react"
import Logo from "../Logo/Logo"

const Navigation = ({ onRouteChange }) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Logo />
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					className="f3 link dim white underline  pa4 pt3 pb3 pointer"
					onClick={() => onRouteChange('signin')}
				>Sign Out</p>
			</nav>
		</div >
	)
}

export default Navigation
