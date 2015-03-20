$(document).ready(function(){
	
	var websiteUPS=60;
	
	var subHeaderHidden=1;
	var subHeaderAnimTime=0;
	var subHeaderHideSpeed=350;
	
	$('#subHeader').mouseenter(function(){
		subHeaderHidden=2;
	})
	$('#subHeader').mouseleave(function(){
		subHeaderHidden=0;
	})
	$('#header').mouseenter(function(){
		subHeaderHidden=2;
	})
	
	function subHeaderUpdate(){
		if(subHeaderHidden===0 && subHeaderAnimTime==0){
			$('#subHeader').animate({top: '58px'}, subHeaderHideSpeed);
			subHeaderHidden=1;
			subHeaderAnimTime=subHeaderHideSpeed;
		}
		if(subHeaderHidden===2 && subHeaderAnimTime==0){
			$('#subHeader').animate({top: '98px'}, subHeaderHideSpeed);
			subHeaderHidden=1;
			subHeaderAnimTime=subHeaderHideSpeed;
		}
		if(subHeaderAnimTime > 0) subHeaderAnimTime-=(1000/websiteUPS)
		if(subHeaderAnimTime < 0) subHeaderAnimTime=0;
	}
	
	function update(){
		subHeaderUpdate();
		
	}
	
	function run(){
			requestAnimFrame(function(){
				run();
			});
			update();
	}
	run();
});
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
		console.log("RequestAnimationFrame: Failed")
	};
})();