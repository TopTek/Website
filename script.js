$(document).ready(function(){
	
	//Website Updates Per Second. Usually 60;
	var websiteUPS=60;
	var firstUP=true;
	
	var currentPage=0;
	//What page the website is currently on
	//0 = Home
	//1 = Information
	//2 = Projects
	//3 = About Us
	
	var homePosition=0;
	var informationPosition=100;
	var projectsPosition=200;
	var aboutUsPosition=300;
	//These keeps track of each individual page's position left
	
	//These are used for when the page animates or slides back and forth
	var pageAnimTime=0;
	//used to countdown when the next time a page can animate right or left
	//after another page animates
	var pageAnimSpeed=1000;
	//the speed that a page animate
	var pageAnimate=true;
	//when a page may animate, though nothing to do with pageAnimTime
	
	//These are used for when the subHeader animates or slides down or up
	var subHeaderHidden=1;
	//If the should hide or pull down
	//0 = slide up (hide)
	//1 = stay, don't change
	//2 = slide down
	var subHeaderAnimTime=0;
	//a countdown until the next time it may slide up or down
	//used to stop a bug where it will go up-down twice in a row when it shouldn't
	var subHeaderHideSpeed=350;
	//the speed that it slides up or down
	
	var registerImputs=["","","",""];
	var registerImputReady=[1,0,0,0];
	
	//Projects
	var projectWebsiteDown=false;
	var projectWebsiteAnim=true;
	var projectWebsiteLength=$('#projectWebsiteContent').outerHeight();
	var projectWebsiteAnimTime=0;
	var projectWebsiteHideSpeed=1000;
	
	var projectCalculatorDown=false;
	var projectCalculatorAnim=true;
	var projectCalculatorLength=$('#projectCalculatorContent').outerHeight();
	var projectCalculatorAnimTime=0;
	var projectCalculatorHideSpeed=1000;
	
	//-----< BEGINNING OF THE FUNCTIONS AND END OF VARIABLES >-----
	
	//-----< BEGINNING OF JQUERY FUNCTION >-----
	
	$('.scroller').draggable({axis: 'y'});
	$('.scroller').draggable({containment: 'parent'});
	
	$('#regLog').hide();
	
	//Triggers when the mouse enters the boarder within the subHeader
	$('#subHeader').mouseenter(function(){
		subHeaderHidden=2;
	})
	//Triggers when the mouse leaves the boarder within the subHeader
	$('#subHeader').mouseleave(function(){
		subHeaderHidden=0;
	})
	//Triggers when the mouse enters the boarder within the header
	$('#header').mouseenter(function(){
		subHeaderHidden=2;
	})
	
	$('#subHeaderHomeButton').click(function(){
		if(currentPage!=0){
			currentPage=0;
			pageAnimate=true;
		}
	})
	$('#subHeaderInformationButton').click(function(){
		if(currentPage!=1){
			currentPage=1;
			pageAnimate=true;
		}
	})
	$('#subHeaderProjectsButton').click(function(){
		if(currentPage!=2){
			currentPage=2;
			pageAnimate=true;
		}
	})
	$('#subHeaderAboutUsButton').click(function(){
		if(currentPage!=3){
			currentPage=3;
			pageAnimate=true;
		}
	})
	
	$('#projectWebsiteHeader').click(function(){
		if(projectWebsiteDown && !projectWebsiteAnim){
			projectWebsiteDown=false;
			}else if(!projectWebsiteDown && !projectWebsiteAnim){
			projectWebsiteDown=true;
		}
		projectWebsiteAnim=true;
	})
	
	$('#projectCalculatorHeader').click(function(){
		if(projectCalculatorDown && !projectCalculatorAnim){
			projectCalculatorDown=false;
			}else if(!projectCalculatorDown && !projectCalculatorAnim){
			projectCalculatorDown=true;
		}
		projectCalculatorAnim=true;
	})
	
	$('#registerButton').click(function(){
		$('#regLog').show();
	})
	
	$('#regClose').click(function(){
		$('#regLog').hide();
	})
	
	//-----< END OF JQUERY FUNCTIONS >-----
	
	//Updates whether the subHeader is pulled down or not
	function subHeader(){
		if(subHeaderHidden===0 && subHeaderAnimTime===0){
			$('#subHeader').animate({top: '58px'}, subHeaderHideSpeed);
			subHeaderHidden=1;
			subHeaderAnimTime=subHeaderHideSpeed;
		}
		if(subHeaderHidden===2 && subHeaderAnimTime===0){
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
	
	function projectsPullDown(){
		if(projectWebsiteDown && !projectWebsiteAnim && projectWebsiteAnimTime===0){
			$('#projectWebsiteContent').css({'height': 'auto'});
			projectWebsiteLength=$('#projectWebsiteContent').outerHeight();
		}
		else if(projectWebsiteDown && projectWebsiteAnim && projectWebsiteAnimTime===0){
			$('#projectWebsiteContent').animate({'height': projectWebsiteLength}, projectWebsiteHideSpeed);
			$('#projectWebsiteTriangle').css({transform: 'rotate(90deg)'});
			projectWebsiteAnim=false;
			projectWebsiteAnimTime=projectWebsiteHideSpeed;
		}
		else if(!projectWebsiteDown && projectWebsiteAnim && projectWebsiteAnimTime===0)
		{
			$('#projectWebsiteContent').animate({'height': '0px'}, projectWebsiteHideSpeed);
			$('#projectWebsiteTriangle').css({transform: 'rotate(0deg)'});
			projectWebsiteAnim=false;
			projectWebsiteAnimTime=projectWebsiteHideSpeed;
		}
		if(projectWebsiteAnimTime > 0) projectWebsiteAnimTime-=(1000/websiteUPS)
		if(projectWebsiteAnimTime < 0) projectWebsiteAnimTime=0;
		
		
		
		if(projectCalculatorDown && !projectCalculatorAnim && projectCalculatorAnimTime===0){
			$('#projectCalculatorContent').css({'height': 'auto'});
			projectCalculatorLength=$('#projectCalculatorContent').outerHeight();
		}
		else if(projectCalculatorDown && projectCalculatorAnim && projectCalculatorAnimTime===0){
			$('#projectCalculatorContent').animate({'height': projectCalculatorLength}, projectCalculatorHideSpeed);
			$('#projectCalculatorTriangle').css({transform: 'rotate(90deg)'});
			projectCalculatorAnim=false;
			projectCalculatorAnimTime=projectCalculatorHideSpeed;
		}
		else if(!projectCalculatorDown && projectCalculatorAnim && projectCalculatorAnimTime===0)
		{
			$('#projectCalculatorContent').animate({'height': '0px'}, projectCalculatorHideSpeed);
			$('#projectCalculatorTriangle').css({transform: 'rotate(0deg)'});
			projectCalculatorAnim=false;
			projectCalculatorAnimTime=projectCalculatorHideSpeed;
		}
		if(projectCalculatorAnimTime > 0) projectCalculatorAnimTime-=(1000/websiteUPS)
		if(projectCalculatorAnimTime < 0) projectCalculatorAnimTime=0;
	}
	
	function projectScroller(){
		var height = $('#projectScroller').position().top/($(window).height() - 195) * 100;
		var height2 = $('#projectsContent').outerHeight()- $(window).height();
		if(height2<0) height2=0;
		height *= height2/$(window).height();
		$('#projectsContent').css({top: -height + '%'})
	}
	
	function informationScroller(){
		var height = $('#informationScroller').position().top/($(window).height() - 195) * 100;
		var height2 = $('#informationContent').outerHeight()- $(window).height();
		if(height2<0) height2=0;
		height *= height2/$(window).height();
		$('#informationContent').css({top: -height + '%'})
	}
	
	function readRegister(){
		var element = document.getElementById("formRegister");
		var elementText="";
		for(var i = 0; i<element.length; i++){
			elementText=element.elements[i].value;
			registerImputs[i]=elementText;
		}
		
		if(registerImputs[1]!=""){
			$('#registerUsername').css('background-color', '#00ff00');
			registerImputReady[1]=1;
		}else{
			$('#registerUsername').css('background-color', '#ff0000');
			registerImputReady[1]=1;
		}
		if(registerImputs[2]!="" ){
			$('#registerPassword').css('background-color', '#00ff00');
			registerImputReady[2]=1;
		}else{
			$('#registerPassword').css('background-color', '#ff0000');
			registerImputReady[2]=0;
		}
		if(registerImputs[3]!="" && registerImputs[3]==registerImputs[2]){
			$('#registerPasswordConfirm').css('background-color', '#00ff00');
			registerImputReady[3]=1;
		}else{
			$('#registerPasswordConfirm').css('background-color', '#ff0000');
			registerImputReady[3]=0;
		}
	}
	
	//Updates the website for javascript functions to work correctly
	function update(){
		subHeader();
		pagePositions();
		readRegister();
		
		if(currentPage===1 || firstUP){
			informationScroller();
		}
		
		if(currentPage===2 || firstUP){
			projectsPullDown();
			projectScroller();
		}
		
		firstUP=false;
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
//Returns a function every x frames per second
//fps depends on computer and browser
//usually 60fps. if not, 30fps.
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