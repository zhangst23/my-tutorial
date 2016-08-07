'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router';

class Index extends React.Component{
	render(){
		return(
			<div>
				<img src="http://7xkinp.com1.z0.glb.clouddn.com/bg.png" alt="" id="imgBg" className="dim">
				<article className="indexBg">
					<p className="indexMe">
						<img src="" alt="">
						<span className="indexName">2015柚子总结</span>
					</p>
					<p class="indexBtn">
						<i class="icon-music"></i>
						<Link to="Music">Just relax ~Click Me!!</Link>
					</p>
					
					<footer className="footer">powered by youzi.</footer>
				</article>
			</div>
		)
	}
}

export default Index