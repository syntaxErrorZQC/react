import React from 'react';
import ajx from '_/services/request';

let {post} = ajx;
import './style';

class Video extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stream: './public/src.mp4'
		}
	}
	componentDidMount() {
		console.log(navigator)
		var self = this;
		var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);   
		getUserMedia.call(navigator, {   
			video: true,   
			audio: true   
		}, function(localMediaStream) {   
			// 这里的视频流
			self.setState({stream: window.URL.createObjectURL(localMediaStream)})
			// post('rtmp://push.secretbase.top/zb/zb/13012345678?token=e1da3e68dfed928638eacddcb89704a3bbe954657d4bb5f868a3cec9e7fc31be&expire=2017-10-07T19:36:37Z', window.URL.createObjectURL(localMediaStream));
		}, function(e) {   
			console.log('Reeeejected!', e);   
		});

	}
	tui() {

	}
	render() {
		let {stream} = this.state;
		return (
			<video className="video" src={this.state.stream} id="video" autoPlay></video>
		)
	}
}

export default Video;