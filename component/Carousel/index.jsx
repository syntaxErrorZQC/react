import React from 'react';
import './style';

export default class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { index: 0,f5: false,clienX: null };
	}
	next() {
		const carousel = this.refs.carousel;
		const index    = this.state.index;
		const next     = index >= carousel.childNodes.length-1 ? 0 :index + 1; 
		carousel.childNodes[index].setAttribute('class','slide_left');
		carousel.childNodes[next].setAttribute('class','slide_cur');
		this.setState({
			index: next,
			f5: false
		})
	}
	prev() {
		const carousel = this.refs.carousel;
		const index    = this.state.index;
		const prev     = index <= 0? carousel.childNodes.length-1 :index - 1; 
		carousel.childNodes[index].setAttribute('class','slide_right');
		carousel.childNodes[prev].setAttribute('class','slide_cur');
		this.setState({
			index: prev,
			f5: false
		})
	}
	init() {
		const carousel = this.refs.carousel;
		carousel.childNodes.forEach((v,k)=>{
			const className = this.state.index == k ? 'slide_cur nodong' : 'slide_right nodong';
			v.setAttribute('class', className);
		});
		this.setState({
			index:this.state.index,
			f5:true
		})
	}
	autoPlay() {
		const {speed} = this.props;
		this.timer = setInterval(()=>{
			this.next();
		},speed)
	}
	componentDidUpdate(prevProps, prevState) {
		setTimeout(()=>{
			this.init(true);
		},400);
	}
	componentDidMount() {
		this.init();
		this.autoPlay();
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	slideStart(e) {
		clearInterval(this.timer);
		this.startX = e.changedTouches[0].clientX;
	}
	slideEnd(e) {
		let start = this.startX;
		let end   = e.changedTouches[0].clientX;
		if (start < end) {
			this.prev();
		} else {
			this.next();
		}
		this.autoPlay();
	}
	init(type=false) {
		let carousel = this.refs.carousel;
		let index    = this.state.index;
		let next     = index >= carousel.childNodes.length-1 ? 0 :index + 1;
		let prev     = index <= 0 ? carousel.childNodes.length-1 :index - 1; 
		let isdong   = type ? ' nodong' : '';
		carousel.childNodes.forEach((v,k)=>{
			let className = '';
			switch(k) {
				case index:
					className = 'slide_cur' + isdong;
					break;
				case prev:
					className = 'slide_left' + isdong;
					break;
				default:
					className = 'slide_right' + isdong;
					break;
			}
			v.setAttribute('class', className);
		});
	}
	render() {
		const { items } = this.props;
		return (
			<section style={{'position':'relative'}}>
				<ul className="carousel"
				 ref="carousel"
				 onTouchStart={this.slideStart.bind(this)}
				 onTouchEnd={this.slideEnd.bind(this)}
				 >
					{items.map((v,k)=>{
						return (
							<li key={k}>
							<a href={v.url}>
								<img src={v.img}/>
							</a></li>
						)
					})}
				</ul>
				<ul className="point">
					{
						items.map((v,k)=>{
							return (
								<li key={k} className={this.state.index==k?'cur':''}></li>
							)
						})
					}
				</ul>
			</section>
		)
	}
}