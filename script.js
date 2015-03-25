$(document).ready(function(){
	
	//Website Updates Per Second. Usually 60;
	var websiteUPS=60;
	
	//What page the website is currently on
	//0 = Home
	//1 = Information
	//2 = Projects
	//3 = About Us
	var currentPage=0;
	var homePosition=0;
	var informationPosition=110;
	var projectsPosition=110;
	var aboutUsPosition=110;
	var pageAnimTime=0;
	var pageAnimSpeed=1000;
	var pageAnimate=false;
	
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
	$('#subHeaderHomeButton').click(function(){
		if(currentPage!=0){
			currentPage=0;
			goToPage=0;
			pageAnimate=true;
		}
	})
	$('#subHeaderInformationButton').click(function(){
		if(currentPage!=1){
			currentPage=1;
			goToPage=1;
			pageAnimate=true;
		}
	})
	$('#subHeaderProjectsButton').click(function(){
		if(currentPage!=2){
			currentPage=2;
			goToPage=2;
			pageAnimate=true;
		}
	})
	$('#subHeaderAboutUsButton').click(function(){
		if(currentPage!=3){
			currentPage=3;
			goToPage=3;
			pageAnimate=true;
		}
	})
	
	//Updates whether the subHeader is pulled down or not
	function subHeader(){
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
	
	//Updates the page positions
	function pagePositions(){
		
		if(currentPage===0){
			homePosition=0;
			informationPosition=100;
			projectsPosition=200;
			aboutUsPosition=300;
		}
		
		if(currentPage===1){		
			homePosition= -100;
			informationPosition=0;
			projectsPosition=100;
			aboutUsPosition=200;
		}
		
		if(currentPage===2){
			homePosition= -200;
			informationPosition= -100;
			projectsPosition=0;
			aboutUsPosition=100;
		}
		
		if(currentPage===3){
			homePosition= -300;
			informationPosition= -200;
			projectsPosition= -100;
			aboutUsPosition=0;
		}
		
		if(pageAnimTime===0 && pageAnimate){
			$('#home').animate({left: homePosition+'%'}, pageAnimSpeed);
			$('#information').animate({left: informationPosition+'%'}, pageAnimSpeed);
			$('#projects').animate({left: projectsPosition+'%'}, pageAnimSpeed);
			$('#aboutUs').animate({left: aboutUsPosition+'%'}, pageAnimSpeed);
			pageAnimTime=pageAnimSpeed;
			pageAnimate=false;
		}
		if(pageAnimTime > 0) pageAnimTime-=(1000/websiteUPS)
		if(pageAnimTime < 0) pageAnimTime=0;
	}
	
	//Updates the website for javascript functions to work correctly
	function update(){
		subHeader();
		pagePositions();
	}
	
	//This function runs the updates, and if needed, renderings in this file.
	//Does not and should not be changed unless a Render(); function is added.
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