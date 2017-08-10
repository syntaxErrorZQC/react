import React from 'react';
import {Link} from 'react-router-dom';
import './style';
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cur: props.cur,
			display: false,
			search: false
		}
		this.scrollTop = 0;
		this.lock = false;
	}
	componentDidMount() {
		this.flag = true;
		window.addEventListener('scroll', this.handleScroll.bind(this));
	}
	handleScroll() {
		if (!this.flag) {
			return;
		}
		if (this.lock) {
			return;
		}
		this.timeout = setTimeout(()=>{
			this.lock = false;
		},100);
		this.lock = true;
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		let oldScrollTop = this.scrollTop;
		this.scrollTop = scrollTop;

		if (scrollTop - oldScrollTop < 0) {
			this.setState({display:false});
		} else {
			this.setState({display:true});
		}
	}
	componentWillUnmount() {
		this.flag = false;
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}
	showSearch() {
		this.setState({search: true})
	}
	render() {
		const {nav} = this.props;
		const {cur,display, search} = this.state;
		return (
			<div style={{transition: 'all 0.3s linear 0s',height:display?0:'50px'}}>
				<section className={display ? 'header down':'header top'}>
					<div className={search?'searchBar':'search'}>
						<i onClick={this.showSearch.bind(this)}></i>
						<input type="text" placeholder="请输入主播"/>
					</div>
					<ul className="nav">
						{nav.map((v, k)=> {
							if (k === cur) {
								return (<li key={k} className="cur"><Link to={v.href}>{v.item}</Link></li>);
							}
							return (<li key={k}><Link to={v.href}>{v.item}</Link></li>);
						})}
					</ul>
				</section>
			</div>
		)
	}	
}
export default Header;