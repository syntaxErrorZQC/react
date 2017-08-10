import React from 'react';

import './style';

const Usernav = ({items}) => {
	return (
		<section className="usernav">
			<ul>
				{items.map((v, k) => {
					return (<li key={k}><a href={v.href}>{v.name}</a></li>)
				})}
			</ul>
		</section>
	)
}
export default Usernav;