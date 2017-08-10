import React from 'react';
import './style';


const Inputs = props => {
	let {input,style} = props;
	return (
		<section style={style} className="inputs">
			{
				input.map((v,k) => {
					return (
						<p key={k}>
							<span className="head">{v.head}</span>
							<input className="inp" type={v.type} placeholder={v.holder} />
						</p>)
				})
			}
		</section> 
	)
}

export default Inputs;