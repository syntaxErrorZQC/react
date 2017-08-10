import React from 'react';
import './style';

const Button = ({style, button, onClick}) => {
	var onClick = onClick || function(){};
	return (<button style={style} onClick={()=>onClick()} className={button.className} >{button.value}</button>)
}
export default Button; 