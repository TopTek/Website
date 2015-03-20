$(document).ready(function(){
	
	var subHeaderHidden=1;
	
	/*$('#subHeader').hover(function(){
		if(subHeaderHidden){
			$('#subHeader').animate({top: '+=42px'}, 500);
			subHeaderHidden=false;
		}else{
			$('#subHeader').animate({top: '-=42px'}, 500);
			subHeaderHidden=true;
		}
		console.log(subHeaderHidden);
	}) */
	
	$('#subHeader').mouseenter(function(){
			subHeaderHidden=2;
	})
	$('#subHeader').mouseleave(function(){
			subHeaderHidden=0;
	})
	
	function update(){
		if(subHeaderHidden===0){
			$('#subHeader').animate({top: '-=40px'}, 500);
			subHeaderHidden=1;
		}
		if(subHeaderHidden===2){
			$('#subHeader').animate({top: '+=40px'}, 500);
			subHeaderHidden=1;
		}
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