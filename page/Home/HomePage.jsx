import React from 'react';

import Header from '_c/Header';
import Carousel from '_c/Carousel';
import Room from '_c/Room';
import Footer from '_c/Footer';
import Hint from '_c/Hint';

import './style';

class Home extends React.Component {
	constructor(props) {
		loading();
		super(props);
		let data = sessionStorage.getItem('diyici');
		this.state = {
			tishi: data == '1'
		}
		sessionStorage.setItem('diyici', '0');
	}
	componentDidMount() {

		let login = localStorage.getItem('login');
		if (!login) {
			this.props.history.replace('/');
			return;
		}
		// console.log(this,12321);
		this.props.init();
	}
	close() {
		this.setState({tishi: false})
	}
	render() {
		let {nav, items, speed, room} = this.props;
		return (
		<section className="home">
			<Header nav={nav} cur={1}></Header>
			<Carousel items={items} speed={speed}></Carousel>
			{
				room.map((v,k)=>{
					return (<Room key={k} reg={v.reg} info={v.info} room={v.room}></Room>)
				})
			}
			{
				this.state.tishi && <Hint href={'/home'} hint={'欢迎新会员光临....'} onClick={this.close.bind(this)} color={'#E48B26'}></Hint>
				
			}
			<Footer cur={1} history={this.props.history}></Footer>
		</section>
		)
	}
}
Home.defaultProps = {
	nav:[],
	items:[],
	speed:3000,
	room:[]
}

export default Home;