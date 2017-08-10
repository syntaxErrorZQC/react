import React from 'react';

import './style';

const Userbar = ({items}) => {
	return (
		<section className="Userbar">
			<ul>
				{items.map((v,k) => {
					return (<li key={k}><a href={v.href}><i className={v.icoClass+' left'}></i>{v.name}<i className="right"></i></a></li>)
				})}
			</ul>
		</section>
	)
}
export default Userbar;