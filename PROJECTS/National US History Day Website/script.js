(function(){
	var startInitTime = (new Date()).getTime();
	console.log("---------------------Initializing--------------------")
	$(document).ready(function(){ 
		var canvas = document.getElementById("")

		var game = {};
		game.widthD = 1920;
		game.heightD = 1400;
		game.width = game.widthD;
		game.height = game.heightD;
		game.maxWidth = 1920;
		game.maxHeight = 1400;
		game.scale = 1;
		game.midWidth = game.width / 2;
		game.midHeight = game.height / 2;
		game.screen = 0;
		game.screenLength = [0, 26, 135, 19, 9];
		game.oldScreen = 0;
		game.renderButtonOverlay = 0;

		function setScreenScale(){
			var WDW = window.innerWidth/ game.widthD;
			var HDH = window.innerHeight / game.heightD;

			if(WDW > HDH){
				game.scale = HDH;
			}else{
				game.scale = WDW;
			}

			game.width = game.widthD * game.scale;
			game.height = game.heightD * game.scale;
			game.contextBackground.canvas.width = game.width;
			game.contextBackground.canvas.height = game.height;
		}

		game.oldTime = (new Date().getTime());
		game.time = 0;

		game.initImages = [];
		game.doneInitImages = 0;
		game.requiredInitImages = 0;

		game.imagesToLoadInit = ["GranColombiaMap2.png", "ScreenDarken.png", "ScreenDarkenBlue.png", 
		"ScreenBlue.png", "GranColombiaMap.png", "gran_colombia_flag_map-5555px.png", 
		"Jose_Antonio_Paez_000.png", "Francisco_de_Miranda_by_Tovar_y_Tovar.png", 
		"c-jamaica-manuscrito.png", "battle_boyaca.png", "carabobojpg-b85b-1fa3b.png",
		"Gran_Colombia.png", "2000px-Vertical_United_States_Flag.png", "Flag_of_the_Gran_Colombia.png",
		"bolivar1837.png"];
         //30 images
         //4 images per line


		game.updates = 0;
		game.frames = 0;

		game.mouseX = 0;
		game.mouseY = 0;
		game.mouseClick = false;
		game.canMouseClick = true;
		game.click= false;
		game.mouseDown;

		game.scrollHeight = 0;
		game.scrollHeightAbs = 0;
		game.scrolling = false;
		game.initScrollY = 0;
		game.showScroll = false;
		game.scrollDistance = false;

		game.hyperlinks = [];

		game.keys = [];

		game.contextBackground = document.getElementById("backgroundCanvas").getContext("2d");
		//game.contextForeground = document.getElementById("foregroundCanvas").getContext("2d");

		//sets game.mouseClick to false if the mouse is not being pressed
		$(document).mouseup(function(){
			game.mouseClick = false;
			game.mouseDown = false;
		})

		//sets game.mouseClick to true if the mouse is being pressed
		$(document).mousedown(function(){
			game.mouseClick = true;
			game.mouseDown = true;
		})

		//tells you the keyCode of the key that is being pressed
		$(document).keydown(function(e){
			//alert(e.keyCode);
			game.keys[e.keyCode] = true;
		})

		//tells you the keyCode of the key that is being unpressed
		$(document).keyup(function(e){
			game.keys[e.keyCode] = false;
		})

		$(document).mousemove(function(e){				
			game.mouseX = e.pageX;
			game.mouseY = e.pageY;
		})

		$(document).on({
			'mousewheel': function(e) {
				if(e.target.id == 'el') return;
				e.preventDefault();
				e.stopPropagation();
			}
		})

		document.documentElement.style.overflow = 'hidden';
		document.body.scroll = "no";

		/* Key Codes
		Up Arrow		38
		Down Arrow		40
		Left Arrow		37
		Right Arrow		39

		A 				65 ---
		B 				66
		C 				67
		D 				68 ---
		S 				83 ---
		W 				87 ---
		
		Space			32
		*/

  		//loads images used after the initialization process
  		function initImages(paths){ 
  			game.requiredInitImages = paths.length;
  			for(i in paths){ 
  				var img = new Image; 
  				img.src = paths[i]; 
  				game.initImages[i] = img; 
  				console.log(paths[i] + " Loaded"); 
  				game.initImages[i].onload = function(){ 
  					game.doneInitImages++;  
  				} 
  			} 
  		} 

  		//ensures that each image is loaded before starting the actual game
  		function checkInitImages(){ 
  			if(game.doneInitImages >= game.requiredInitImages){ 
  				init(); 
  			}else{ 
  				setTimeout(function(){ 
  					checkInitImages();   
  				}, 1); 
  			} 
  		}

		//adds what needs to be added before the first frame is drawn and ends the initialization process
		function init(){

			//all processes that need to be initialized go above this
			console.log("RequestAnimationFrame: Set");
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(2, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 29) + fixPos(86), 2);
			/*addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);
			addHyperlink(1, fixPos(0), fixPos(0), fixPos(1392), fixPos(48 * 2) + fixPos(86), 2);*/
			console.log("---------------------Initialized---------------------");
			var endInitTime = (new Date()).getTime();
			var timeElapsed = (endInitTime - startInitTime) / 1000;
			console.log("Loaded | Time: " + timeElapsed + " seconds");
			run();	
		}

		function addHyperlink(numb, x, y, xPos, yPos, screen){
			game.hyperlinks.push({
				numb: numb,
				x: x,
				y: y,
				xPos: 0,
				yPos: 0,
				xPosA: xPos,
				yPosA: yPos,
				screen: screen,
			})
		}

		function renderHyperlinks(){
			for(i in game.hyperlinks){
				var hyp = game.hyperlinks[i];
				if(hyp.screen == game.screen) fillFont(fixPos(16), "Calibri", "Black", "[" + hyp.numb + "]", hyp.xPos, hyp.yPos - game.scrollHeight + fixPos(16), game.contextBackground, 0);

			}
		}

		function updateHyperlinks(){
			for(i in game.hyperlinks){
				var hyp = game.hyperlinks[i];

				hyp.yPos = hyp.xPosA - game.scrollHeight;

				if(game.mouseX >= hyp.xPos && game.mouseX <= hyp.xPos + fixPos(16) && game.mouseY >= hyp.yPos && game.mouseY <= hyp.yPos + fixPos(16) && game.click && game.screen == hyp.screen){
					game.screen = 4;
				}
			}
		}

		function getImage(string){
			for(i in game.initImages){
				if(i == game.initImages.length - 1){
					return i;
				}

				if(string == game.imagesToLoadInit[i]){
					return i;
				}
			}
		}

		function updateTime(){
			var newTime = (new Date().getTime())
			game.time = newTime - game.oldTime
		}

		function getScreen(){
			if(game.click && game.renderButtonOverlay == 1) game.screen = 1;
			else if(game.click && game.renderButtonOverlay == 2) game.screen = 2;
			else if(game.click && game.renderButtonOverlay == 3) game.screen = 3;
			else if(game.click && game.renderButtonOverlay == 4) game.screen = 4;
			if(game.click && (game.mouseY >= fixPos(128) * 5) && (game.mouseY <= game.height) && (game.mouseX >= 0) && (game.mouseX <= fixPos(512))) game.screen = 0;

			if(game.screen != game.oldScreen) game.scrollHeightAbs = 0;

			game.oldScreen = game.screen;
		}

		function overButton(){
			if(game.mouseX >= 0 && game.mouseX <= fixPos(512)){
				if(game.mouseY >= (fixPos(128) * 0) && game.mouseY < (fixPos(128) * 1)){
					game.renderButtonOverlay = 1;
				}else if(game.mouseY >= (fixPos(128) * 1) && game.mouseY < (fixPos(128) * 2)){
					game.renderButtonOverlay = 2;
				}else if(game.mouseY >= (fixPos(128) * 2) && game.mouseY < (fixPos(128) * 4)){
					game.renderButtonOverlay = 3;
				}else if(game.mouseY >= (fixPos(128) * 4) && game.mouseY < (fixPos(128) * 5)){
					game.renderButtonOverlay = 4;
				}

			}else{
				game.renderButtonOverlay = 0
			}
		}

		function fillFont(pt, type, color, text, xPos, yPos, context, button){
			context.font = pt + "pt " + type;
			if(button != 0){
				if(game.renderButtonOverlay == button) context.fillStyle = "Black";
				if(game.renderButtonOverlay != button) context.fillStyle = "Cyan";
			}else{
				context.fillStyle = color;
			}
			
			context.fillText(text, xPos, yPos);
		}

		function checkClick(){
			if(game.mouseClick && game.canMouseClick){
				game.click = true;
			}else{
				game.click = false;
			}
			if(game.mouseClick){
				game.canMouseClick = false;
			}else{
				game.canMouseClick = true;
			}
		}

		function drawScreen(){
			game.contextBackground.drawImage(game.initImages[3], fixPos(640), 0, fixPos(1152), fixPos(1400))
			game.contextBackground.drawImage(game.initImages[1], fixPos(640), 0, fixPos(16), fixPos(1400))
			game.contextBackground.drawImage(game.initImages[1], fixPos(1776), 0, fixPos(16), fixPos(1400))
			drawScroll();

			if(game.screen == 1){	
				drawTextGranColombia();
				drawImagesGranColombia();
			}
			if(game.screen == 2){	
				drawTextSimonBolivar();
				drawImagesSimonBolivar();
			}
			if(game.screen == 3){	
				drawTextUnitedStatesandColombia();
				drawImagesUnitedStatesandColombia();
			}
			if(game.screen == 4){	
				drawTextCredits();
			}
		}

		function updateScroll(){
			if(!game.mouseDown) game.scrolling = false;

			if((game.mouseX >= fixPos(1776) && game.mouseX <= fixPos(1776 + 16) && game.mouseY >= game.scrollHeightAbs && game.mouseY <= fixPos(128) + game.scrollHeightAbs && game.mouseDown && game.showScroll) || game.scrolling){
				game.scrolling = true;
				game.scrollHeightAbs -= game.initScrollY - game.mouseY;
			}

			if(game.scrollHeightAbs < 0) game.scrollHeightAbs = 0;
			else if(game.scrollHeightAbs > fixPos(1400 - 128)) game.scrollHeightAbs = fixPos(1400 - 128);
			else game.initScrollY = game.mouseY;

			game.scrollHeight = game.scrollHeightAbs * (game.screenLength[game.screen] / 32); //56

			game.showScroll = false;
		}

		function scroll(numb){
			game.scrollHeightAbs = numb;
		}

		function drawScroll(){
			game.showScroll = true;
			game.contextBackground.drawImage(game.initImages[1], fixPos(1776), game.scrollHeightAbs, fixPos(16), fixPos(128))
		}

		function drawImagesGranColombia(){
			game.contextBackground.drawImage(game.initImages[1], fixPos(688), fixPos(48 * 0) - game.scrollHeight + fixPos(86), fixPos(1056), fixPos(1056 * .78125));
			game.contextBackground.drawImage(game.initImages[5], fixPos(704), fixPos(48 * 0) - game.scrollHeight + fixPos(86) + fixPos(12), fixPos(1024), fixPos(1024 * .78125));
			game.contextBackground.drawImage(game.initImages[1], fixPos(1392), fixPos(48 * 26) - game.scrollHeight + fixPos(86), fixPos(352), fixPos(352 * 1.24));
			game.contextBackground.drawImage(game.initImages[6], fixPos(1408), fixPos(48 * 26) - game.scrollHeight + fixPos(86)  + fixPos(16), fixPos(320), fixPos(320 * 1.24));
		}

		function drawImagesSimonBolivar(){
			game.contextBackground.drawImage(game.initImages[1], fixPos(1392), fixPos(48 * 2) - game.scrollHeight + fixPos(86), fixPos(352), fixPos(352 * 1.043));
			game.contextBackground.drawImage(game.initImages[14], fixPos(1408), fixPos(48 * 2) - game.scrollHeight + fixPos(86)  + fixPos(16), fixPos(320), fixPos(320 * 1.043));
			game.contextBackground.drawImage(game.initImages[1], fixPos(1392), fixPos(48 * 29) - game.scrollHeight + fixPos(86), fixPos(352), fixPos(352 * 1.35));
			game.contextBackground.drawImage(game.initImages[7], fixPos(1408), fixPos(48 * 29) - game.scrollHeight + fixPos(86)  + fixPos(16), fixPos(320), fixPos(320 * 1.35));
			game.contextBackground.drawImage(game.initImages[1], fixPos(1392), fixPos(48 * 52) - game.scrollHeight + fixPos(86), fixPos(352), fixPos(352 * 1.26));
			game.contextBackground.drawImage(game.initImages[8], fixPos(1408), fixPos(48 * 52) - game.scrollHeight + fixPos(86)  + fixPos(16), fixPos(320), fixPos(320 * 1.26));
			game.contextBackground.drawImage(game.initImages[1], fixPos(688), fixPos(48 * 69) - game.scrollHeight + fixPos(86), fixPos(1056), fixPos(1056 * 0.426));
			game.contextBackground.drawImage(game.initImages[9], fixPos(704), fixPos(48 * 69) - game.scrollHeight + fixPos(86) + fixPos(16), fixPos(1024), fixPos(1024 * 0.426 - 14));
			game.contextBackground.drawImage(game.initImages[1], fixPos(688), fixPos(48 * 92) - game.scrollHeight + fixPos(86), fixPos(1056), fixPos(1056 * 0.466 + 16));
			game.contextBackground.drawImage(game.initImages[10], fixPos(704), fixPos(48 * 92) - game.scrollHeight + fixPos(86) + fixPos(16), fixPos(1024), fixPos(1024 * 0.466));
			game.contextBackground.drawImage(game.initImages[1], fixPos(688), fixPos(48 * 109) - game.scrollHeight + fixPos(86), fixPos(1056), fixPos(1056 * 0.608 + 16));
			game.contextBackground.drawImage(game.initImages[11], fixPos(704), fixPos(48 * 109) - game.scrollHeight + fixPos(86) + fixPos(16), fixPos(1024), fixPos(1024 * 0.608));
		}

		function drawImagesUnitedStatesandColombia(){
			game.contextBackground.drawImage(game.initImages[1], fixPos(688), fixPos(48 * 0) - game.scrollHeight + fixPos(86), fixPos(1056), fixPos(750 + 32));
			game.contextBackground.drawImage(game.initImages[12], fixPos(688 + 16), fixPos(48 * 0) - game.scrollHeight + fixPos(86)  + fixPos(16), fixPos(500), fixPos(750));
			game.contextBackground.drawImage(game.initImages[13], fixPos(1236 - 8), fixPos(48 * 0) - game.scrollHeight + fixPos(86)  + fixPos(16), fixPos(500), fixPos(750));
		}

		function drawTextGranColombia(){
			fillFont(fixPos(32), "Calibri", "Black", "", fixPos(670 + (64 * 0)), fixPos(48 * 0) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(64), "Calibri", "Black", "Gran Colombia", fixPos(940), fixPos(72) - game.scrollHeight, game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Gran Colombia was a nation from 1819-1830, including", fixPos(670 + (64 * 1)), fixPos(48 * 19) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "modern-day Colombia, Panama, Venezuela, and Ecuador.  In", fixPos(670 + (64 * 0)), fixPos(48 * 20) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the fight for independence of Spain, Simon Bolivar led the", fixPos(670 + (64 * 0)), fixPos(48 * 21) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "nation to independence and united the country under a", fixPos(670 + (64 * 0)), fixPos(48 * 22) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "government similar to that of the British. The constitution", fixPos(670 + (64 * 0)), fixPos(48 * 23) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "states high central government powers with a bicameral", fixPos(670 + (64 * 0)), fixPos(48 * 24) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "legislative branch and a president elected for life.", fixPos(670 + (64 * 0)), fixPos(48 * 25) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "However, despite the good ideas and ", fixPos(670 + (64 * 1)), fixPos(48 * 26) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "initial success, internal jealousy sparked", fixPos(670 + (64 * 0)), fixPos(48 * 27) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "rebellions.  In 1826 General Jose Antonio ", fixPos(670 + (64 * 0)), fixPos(48 * 28) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Paez led a Venezuelan rebellion against ", fixPos(670 + (64 * 0)), fixPos(48 * 29) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Gran Colombia.  Other rebellions ", fixPos(670 + (64 * 0)), fixPos(48 * 30) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "occurred, but were all suppressed by the ", fixPos(670 + (64 * 0)), fixPos(48 * 31) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Gran Colombian military.  Bolivar ", fixPos(670 + (64 * 0)), fixPos(48 * 32) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "returned from Peru in 1827 and was ", fixPos(670 + (64 * 0)), fixPos(48 * 33) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "barely able to maintain his authority.  ", fixPos(670 + (64 * 0)), fixPos(48 * 34) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar assumed dictatorship over Gran ", fixPos(670 + (64 * 0)), fixPos(48 * 35) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Colombia in 1828.", fixPos(670 + (64 * 0)), fixPos(48 * 36) - game.scrollHeight + fixPos(72), game.contextBackground, 0);


			fillFont(fixPos(32), "Calibri", "Black", "In 1828, Bolivar, as dictator, attempted to draft another ", fixPos(670 + (64 * 1)), fixPos(48 * 37) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "constitution that was largely rejected by the populus.  At a ", fixPos(670 + (64 * 0)), fixPos(48 * 38) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "constitutional convention held in 1830, Bolivar resigned his ", fixPos(670 + (64 * 0)), fixPos(48 * 39) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "authority.  That same year, the rebellions in the republic had ", fixPos(670 + (64 * 0)), fixPos(48 * 40) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "several decisive victories.  Ecuador and Venezuela both ", fixPos(670 + (64 * 0)), fixPos(48 * 41) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "seceded and Gran Colombia fell with its founder, who died of ", fixPos(670 + (64 * 0)), fixPos(48 * 42) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Tuberculous that same year.", fixPos(670 + (64 * 0)), fixPos(48 * 43) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "The remnants of Gran Colombia called themselves the ", fixPos(670 + (64 * 1)), fixPos(48 * 44) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Republic of New Granada, which contained present day ", fixPos(670 + (64 * 0)), fixPos(48 * 45) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Colombia and Panama.  In 1886, the country was once again ", fixPos(670 + (64 * 0)), fixPos(48 * 46) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "renamed to be the Republic of Colombia.  Eventually in 1903, ", fixPos(670 + (64 * 0)), fixPos(48 * 47) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "present day Panama seceded from Colombia.", fixPos(670 + (64 * 0)), fixPos(48 * 48) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
		}

		function drawTextSimonBolivar(){
			fillFont(fixPos(64), "Calibri", "Black", "Simon Bolivar", fixPos(960), fixPos(72) - game.scrollHeight, game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Simon Bolivar was born on July 24, 1783 in Caracas", fixPos(670 + (64 * 1)), fixPos(48 * 1) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Venezuela.  He was born into a family of wealth and power.", fixPos(670 + (64 * 0)), fixPos(48 * 2) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "After the death of both his parents in", fixPos(670 + (64 * 0)), fixPos(48 * 3) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "1799, he moved to Spain to continue his", fixPos(670 + (64 * 0)), fixPos(48 * 4) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "education that began in Venezuela.", fixPos(670 + (64 * 0)), fixPos(48 * 5) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar even married and Spain and took", fixPos(670 + (64 * 0)), fixPos(48 * 6) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "his wife back to Venezuela, where she", fixPos(670 + (64 * 0)), fixPos(48 * 7) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "dies shortly of yellow fever.  As Napoleon", fixPos(670 + (64 * 0)), fixPos(48 * 8) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "approached his prime in 1804, Bolivar", fixPos(670 + (64 * 0)), fixPos(48 * 9) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "moved back to Europe. He met up with", fixPos(670 + (64 * 0)), fixPos(48 * 10) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Simon Rodriguez, a childhood teacher, taught Bolivar the", fixPos(670 + (64 * 0)), fixPos(48 * 11) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "writings of European rational thinkers such as Locke and", fixPos(670 + (64 * 0)), fixPos(48 * 12) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Hobbes.  The idea of liberating his country slowly began", fixPos(670 + (64 * 0)), fixPos(48 * 13) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "sprouting in his imagination.", fixPos(670 + (64 * 0)), fixPos(48 * 14) - game.scrollHeight + fixPos(72), game.contextBackground, 0);

			fillFont(fixPos(32), "Calibri", "Black", "When Bolivar returned to Venezuela, he joined the", fixPos(670 + (64 * 1)), fixPos(48 * 15) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "resistance movement against Spanish rule.  The Spanish", fixPos(670 + (64 * 0)), fixPos(48 * 16) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "governor was officially stripped of power on April 19, 1810.", fixPos(670 + (64 * 0)), fixPos(48 * 17) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "The junta takes power and appoints Bolivar to be", fixPos(670 + (64 * 0)), fixPos(48 * 18) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "representative to the British government.  His assignment was", fixPos(670 + (64 * 0)), fixPos(48 * 19) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "to explain to the British the plight of the revolutionary colony,", fixPos(670 + (64 * 0)), fixPos(48 * 20) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "to gain recognition for it, and to obtain arms and support. The", fixPos(670 + (64 * 0)), fixPos(48 * 21) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "initial negotiations failed, but did persuade exiled General", fixPos(670 + (64 * 0)), fixPos(48 * 22) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Francisco de Miranda, who tried in 1806 to liberate Venezuela,", fixPos(670 + (64 * 0)), fixPos(48 * 23) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "to take command of the resistance movement.", fixPos(670 + (64 * 0)), fixPos(48 * 24) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "Venezuela's independence was declared on July 5, 1811.", fixPos(670 + (64 * 1)), fixPos(48 * 25) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar joined Venezuela's army and was placed in charge of", fixPos(670 + (64 * 0)), fixPos(48 * 26) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Puerto Cabello. One of Bolivar's officers opened the port to", fixPos(670 + (64 * 0)), fixPos(48 * 27) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Spanish forces. General Miranda capitulated and was handed", fixPos(670 + (64 * 0)), fixPos(48 * 28) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "over to the spaniards to spend the rest of his life in spanish", fixPos(670 + (64 * 0)), fixPos(48 * 29) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "prisons after signing an armistice leaving", fixPos(670 + (64 * 0)), fixPos(48 * 30) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Venezuela in the control of Spain. ", fixPos(670 + (64 * 0)), fixPos(48 * 31) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "Venezuela's independence was", fixPos(670 + (64 * 1)), fixPos(48 * 32) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "declared on July 5, 1811. Bolivar joined", fixPos(670 + (64 * 0)), fixPos(48 * 33) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Venezuela's army and was placed in", fixPos(670 + (64 * 0)), fixPos(48 * 34) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "charge of Puerto Cabello.  One of", fixPos(670 + (64 * 0)), fixPos(48 * 35) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar's officers opened the port to", fixPos(670 + (64 * 0)), fixPos(48 * 36) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Spanish forces.  General Miranda", fixPos(670 + (64 * 0)), fixPos(48 * 37) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "capitulated and was handedover to the", fixPos(670 + (64 * 0)), fixPos(48 * 38) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "spaniards to spend the rest of his life in", fixPos(670 + (64 * 0)), fixPos(48 * 39) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "spanish prisons after signing an armistice leaving Venezuela in", fixPos(670 + (64 * 0)), fixPos(48 * 40) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the control of Spain.", fixPos(670 + (64 * 0)), fixPos(48 * 41) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "After taking the loss of General Miranda, Bolivar obtains a", fixPos(670 + (64 * 1)), fixPos(48 * 42) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "passport in order to leave the country.  He went to New", fixPos(670 + (64 * 0)), fixPos(48 * 43) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Granada which is present day Columbia.  There, Bolivar", fixPos(670 + (64 * 0)), fixPos(48 * 44) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "published ''El Manifiesto de Cartagena'', his first great political", fixPos(670 + (64 * 0)), fixPos(48 * 45) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "statement. In this statement, he blamed the cause of the fall of", fixPos(670 + (64 * 0)), fixPos(48 * 46) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the first nation on a weak government and called for a united", fixPos(670 + (64 * 0)), fixPos(48 * 47) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "effort to destroy Spanish power in the region.", fixPos(670 + (64 * 0)), fixPos(48 * 48) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "With the help of the patriots of New Granada, Bolivar", fixPos(670 + (64 * 1)), fixPos(48 * 49) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "retook Venezuela.  Bolivar entered the capital on August 6,", fixPos(670 + (64 * 0)), fixPos(48 * 50) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "1813, and assumed political dictatorship.  He was given the", fixPos(670 + (64 * 0)), fixPos(48 * 51) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "title of ''El Libertador'', but was once again defeated by the", fixPos(670 + (64 * 0)), fixPos(48 * 52) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Spanish, narrowly escaping the fate of ", fixPos(670 + (64 * 0)), fixPos(48 * 53) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "General Miranda and fled to Jamaica.", fixPos(670 + (64 * 0)), fixPos(48 * 54) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "It was when he was in Jamaica that ", fixPos(670 + (64 * 1)), fixPos(48 * 55) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "he wrote his most powerful political ", fixPos(670 + (64 * 0)), fixPos(48 * 56) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "statement: La Carta de Jamaica.  In this ", fixPos(670 + (64 * 0)), fixPos(48 * 57) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "letter, he wrote about his vision of a ", fixPos(670 + (64 * 0)), fixPos(48 * 58) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "united Latin America with a government ", fixPos(670 + (64 * 0)), fixPos(48 * 59) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "run in a way similar to the British ", fixPos(670 + (64 * 0)), fixPos(48 * 60) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "government.", fixPos(670 + (64 * 0)), fixPos(48 * 61) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar eventually gained the support ", fixPos(670 + (64 * 1)), fixPos(48 * 62) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "of Haiti and returned to attack New Granada.  He led one of the ", fixPos(670 + (64 * 0)), fixPos(48 * 63) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "most daring military assaults in history with 2500 soldiers, ", fixPos(670 + (64 * 0)), fixPos(48 * 64) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "traversing land that the Spanish thought to be impassible. At ", fixPos(670 + (64 * 0)), fixPos(48 * 65) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the Battle of Boyaca, the turning point of Northern South ", fixPos(670 + (64 * 0)), fixPos(48 * 66) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "America history, Bolivar caught the Spanish forces by surprise.  ", fixPos(670 + (64 * 0)), fixPos(48 * 67) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "On August 7, 1819, the majority of the Spanish army had ", fixPos(670 + (64 * 0)), fixPos(48 * 68) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "surrendered to Bolivar.", fixPos(670 + (64 * 0)), fixPos(48 * 69) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "", fixPos(670 + (64 * 0)), fixPos(48 * 70) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar immediately went to work to achieve his vision of a", fixPos(670 + (64 * 1)), fixPos(48 * 80) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "united Latin America.  Bolivar was made president and urged", fixPos(670 + (64 * 0)), fixPos(48 * 81) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "legislators to proclaim a new state.  Three days later, La", fixPos(670 + (64 * 0)), fixPos(48 * 82) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Republica de Colombia was created.  In 1820 a revolution in", fixPos(670 + (64 * 0)), fixPos(48 * 83) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Spain forced the Spanish king to recognize the ideals of", fixPos(670 + (64 * 0)), fixPos(48 * 84) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "liberalism on the home front, discouraging the Spanish forces", fixPos(670 + (64 * 0)), fixPos(48 * 85) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "in South America. Bolivar persuaded Morillo to open armistice", fixPos(670 + (64 * 0)), fixPos(48 * 86) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "negotiations, and the they met at Santa Ana, signing, in", fixPos(670 + (64 * 0)), fixPos(48 * 87) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "November 1820, a treaty that ended hostilities for a six-month", fixPos(670 + (64 * 0)), fixPos(48 * 88) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "period. When fighting was resumed, Bolivar easily, with his", fixPos(670 + (64 * 0)), fixPos(48 * 89) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "superior manpower, defeated the Spanish forces in Venezuela.", fixPos(670 + (64 * 0)), fixPos(48 * 90) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "The Battle of Carabobo, on June 1821, opened the gates of", fixPos(670 + (64 * 0)), fixPos(48 * 91) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Caracas, and Bolivar's homeland was liberated.", fixPos(670 + (64 * 0)), fixPos(48 * 92) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "In 1821, Gran Colombia was created, consisting of ", fixPos(670 + (64 * 1)), fixPos(48 * 104) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Colombia, Venezuela, Ecuador, and Panama.  The nation was ", fixPos(670 + (64 * 0)), fixPos(48 * 105) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "recognized by the United States.  Shortly after in 1824, Bolivar ", fixPos(670 + (64 * 0)), fixPos(48 * 106) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "became the dictator of Peru, and in 1825, Bolivia was liberated.  ", fixPos(670 + (64 * 0)), fixPos(48 * 107) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar had hit the high point of his career, with his power ", fixPos(670 + (64 * 0)), fixPos(48 * 108) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "going from the Caribbean Sea to the Pacific Ocean.", fixPos(670 + (64 * 0)), fixPos(48 * 109) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "Despite successfully uniting the countries, there was still ", fixPos(670 + (64 * 1)), fixPos(48 * 124) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "dispute within the country.  Civil war broke out between New ", fixPos(670 + (64 * 0)), fixPos(48 * 125) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Granada and Venezuela.  Bolivar was to draft a new ", fixPos(670 + (64 * 0)), fixPos(48 * 126) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "constitution that would appeal more to the grievances of ", fixPos(670 + (64 * 0)), fixPos(48 * 127) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Venezuela, but the liberals would not allow that.  A stalemate ", fixPos(670 + (64 * 0)), fixPos(48 * 128) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "developed and Bolivar assumed political dictatorship.  A group ", fixPos(670 + (64 * 0)), fixPos(48 * 129) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "of liberals invaded the presidential palace and almost killed ", fixPos(670 + (64 * 0)), fixPos(48 * 130) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar.  Rebellions broke out within and outside forces ", fixPos(670 + (64 * 0)), fixPos(48 * 131) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "attacked the country.  Although Gran Colombia held up against ", fixPos(670 + (64 * 0)), fixPos(48 * 132) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the forces, Bolivar was disheartened by this.", fixPos(670 + (64 * 0)), fixPos(48 * 133) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "Bolivar realized that his presence would upset the balance   ", fixPos(670 + (64 * 1)), fixPos(48 * 134) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "of peace in Gran Colombia and planned to head to Europe.  ", fixPos(670 + (64 * 0)), fixPos(48 * 135) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "However, his successor had been assassinated, and Bolivar ", fixPos(670 + (64 * 0)), fixPos(48 * 136) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "canceled his trip to Europe.  Instead, he headed to Santa ", fixPos(670 + (64 * 0)), fixPos(48 * 137) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Marta, where he eventually dies of Tuberculosis in 1830.", fixPos(670 + (64 * 0)), fixPos(48 * 138) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
		}

		function drawTextUnitedStatesandColombia(){
			fillFont(fixPos(64), "Calibri", "Black", "United States and Colombia", fixPos(720), fixPos(72) - game.scrollHeight, game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "The story of Gran Colombia was in ways, Similar to that of", fixPos(670 + (64 * 1)), fixPos(48 * 18) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the United States.  Both countries revolted against their king,", fixPos(670 + (64 * 0)), fixPos(48 * 19) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "and gained their independence.  They both started expansion,", fixPos(670 + (64 * 0)), fixPos(48 * 20) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "but one of the countries would become the wealthiest, most", fixPos(670 + (64 * 0)), fixPos(48 * 21) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "powerful in the world had ever seen, but the other would", fixPos(670 + (64 * 0)), fixPos(48 * 22) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "become one of the most problematic, poverty stricken regions", fixPos(670 + (64 * 0)), fixPos(48 * 23) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "of the world.  Why were their outcomes so different?", fixPos(670 + (64 * 0)), fixPos(48 * 24) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "The success of the United States can be found in the way", fixPos(670 + (64 * 1)), fixPos(48 * 25) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the constitution is written.  It called for a single market with", fixPos(670 + (64 * 0)), fixPos(48 * 26) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "one currency throughout the country, allowing for trade.  Also", fixPos(670 + (64 * 0)), fixPos(48 * 27) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "the rule of law provided emphasis on land ownership.  With the", fixPos(670 + (64 * 0)), fixPos(48 * 28) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "spirit of Manifest Destiny, settlers out west who were very", fixPos(670 + (64 * 0)), fixPos(48 * 29) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "poor could own land because of the homestead act and others", fixPos(670 + (64 * 0)), fixPos(48 * 30) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "of a similar nature.  With a large amount of people owning", fixPos(670 + (64 * 0)), fixPos(48 * 31) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "land, the United States was able to overcome civil war and", fixPos(670 + (64 * 0)), fixPos(48 * 32) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "solve their own problems without falling apart.", fixPos(670 + (64 * 0)), fixPos(48 * 33) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			
			fillFont(fixPos(32), "Calibri", "Black", "Gran Colombia was not like this.  Even though their origin ", fixPos(670 + (64 * 1)), fixPos(48 * 34) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "stories were similar, Gran Colombia's glory was short lived ", fixPos(670 + (64 * 0)), fixPos(48 * 35) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "and told a story of decline instead of expansion to greatness.  ", fixPos(670 + (64 * 0)), fixPos(48 * 36) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Unlike its North American counterpart, Gran Colombia had a ", fixPos(670 + (64 * 0)), fixPos(48 * 37) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "few elite that owned most of the land.  Instead of adding more ", fixPos(670 + (64 * 0)), fixPos(48 * 38) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "land, rebellions within caused Gran Colombia to lose land, and ", fixPos(670 + (64 * 0)), fixPos(48 * 39) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "eventually, its collapse as a country.  Now, all that is left of ", fixPos(670 + (64 * 0)), fixPos(48 * 40) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Gran Colombia is the country known as Colombia, far from its ", fixPos(670 + (64 * 0)), fixPos(48 * 41) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "North American Counterpart.", fixPos(670 + (64 * 0)), fixPos(48 * 42) - game.scrollHeight + fixPos(72), game.contextBackground, 0);

		}

		function drawTextCredits(){
			fillFont(fixPos(64), "Calibri", "Black", "Credits", fixPos(1080), fixPos(72) - game.scrollHeight, game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Website Design and Programming:", fixPos(670 + (64 * 0)), fixPos(48 * 1) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "	-Ethan Penn", fixPos(670 + (64 * 0)), fixPos(48 * 2) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Writer:", fixPos(670 + (64 * 0)), fixPos(48 * 4) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "	-Dennis Feng", fixPos(670 + (64 * 0)), fixPos(48 * 5) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "	-Sublime Text Editor 3", fixPos(670 + (64 * 0)), fixPos(48 * 3) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Primary Source Documents:", fixPos(670 + (64 * 0)), fixPos(48 * 7) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "	-Gran Colombian Constitution", fixPos(670 + (64 * 0)), fixPos(48 * 8) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "	-El Manifiesto de Cartagena", fixPos(670 + (64 * 0)), fixPos(48 * 9) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "	-La Carta de Jamaica", fixPos(670 + (64 * 0)), fixPos(48 * 10) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	[1]-http://www.militaryheritage.com/bolivar.htm", fixPos(670 + (64 * 0)), fixPos(48 * 11) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	[2]-http://upload.wikimedia.org/wikipedia/commons/b/b3/Francisco_de_Miranda_by_Tovar_y_Tovar.jpg", fixPos(670 + (64 * 0)), fixPos(48 * 12) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://4.bp.blogspot.com/-H-E4mklUZHs/Tl6ZBCj7MlI/AAAAAAAAADE/0cDF1Jx6rME/s1600/c-jamaica-manuscrito.jpg", fixPos(670 + (64 * 0)), fixPos(48 * 13) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://www.officeholidays.com/images/slider/battle_boyaca.jpg", fixPos(670 + (64 * 0)), fixPos(48 * 14) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-https://venezuelasolidarity.files.wordpress.com/2012/06/carabobojpg-b85b-1fa3b.jpg?w=358&h=167", fixPos(670 + (64 * 0)), fixPos(48 * 15) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://upload.wikimedia.org/wikipedia/commons/e/e3/Jose_Antonio_Paez_000.jpg", fixPos(670 + (64 * 0)), fixPos(48 * 16) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Flag_of_the_Gran_Colombia.svg/750px-Flag_of_the_Gran_Colombia.svg.png", fixPos(670 + (64 * 0)), fixPos(48 * 17) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(32), "Calibri", "Black", "Secondary Source Documents:", fixPos(670 + (64 * 0)), fixPos(48 * 18) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://www.infoplease.com/encyclopedia/history/new-granada.html", fixPos(670 + (64 * 0)), fixPos(48 * 19) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://countrystudies.us/colombia/13.htm", fixPos(670 + (64 * 0)), fixPos(48 * 20) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://www.britannica.com/EBchecked/topic/241012/Gran-Colombia", fixPos(670 + (64 * 0)), fixPos(48 * 21) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Vertical_United_States_Flag.svg/2000px-Vertical_United_States_Flag.svg.png", fixPos(670 + (64 * 0)), fixPos(48 * 22) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://www.pbs.org/wnet/civilization-west-and-rest/killer-apps/property/map-american-expansion-u-s-a-and-gran-colombia/#.VJGeKAC0JQ", fixPos(670 + (64 * 0)), fixPos(48 * 23) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://flagartist.com/art/svg/flags/gran-colombia-flag-map-scallywag-flag-svg/", fixPos(670 + (64 * 0)), fixPos(48 * 24) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://www.embavenez-us.org/kids.venezuela/simon.bolivar.htm", fixPos(670 + (64 * 0)), fixPos(48 * 25) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://www.biography.com/people/simon-bolivar-241196#el-libertador", fixPos(670 + (64 * 0)), fixPos(48 * 26) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://www.britannica.com/EBchecked/topic/72067/Simon-Bolivar", fixPos(670 + (64 * 0)), fixPos(48 * 27) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(14), "Calibri", "Black", "	-http://upload.wikimedia.org/wikipedia/en/c/cc/Gran_Colombia.PNG", fixPos(670 + (64 * 0)), fixPos(48 * 28) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "10 Lines of Css", fixPos(670 + (64 * 0)), fixPos(48 * 30) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "12 Lines of HTML", fixPos(670 + (64 * 0)), fixPos(48 * 31) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "671 Lines of Javascript", fixPos(670 + (64 * 0)), fixPos(48 * 32) - game.scrollHeight + fixPos(72), game.contextBackground, 0);
			fillFont(fixPos(24), "Calibri", "Black", "Thank You!", fixPos(670 + (64 * 0)), fixPos(48 * 34) - game.scrollHeight + fixPos(72), game.contextBackground, 0);

		}

		//upadates all logic and keeps track of how many updates the game has
		//uses few functions based on what needs to be updated
		function update(){
			setScreenScale();
			updateTime();
			updateScroll();
			checkClick();
			overButton();
			getScreen();
			//updateHyperlinks();

			game.updates++;
		}

		//renders all elements and objects and keeps trak of how many frames the game has
		//uses few functions based on what needs to be rendered
		function render(){
			game.contextBackground.clearRect(0, 0, game.maxWidth, game.maxHeight);
			//game.contextForeground.clearRect(0, 0, game.maxWidth, game.maxHeight);
			game.contextBackground.drawImage(game.initImages[0], 0, 0, game.width, game.height);
			game.contextBackground.drawImage(game.initImages[1], 0, 0, fixPos(512), game.height);

			if(game.renderButtonOverlay == 1) game.contextBackground.drawImage(game.initImages[2], 0, fixPos(128 * 0), fixPos(512), fixPos(128));
			if(game.renderButtonOverlay == 2) game.contextBackground.drawImage(game.initImages[2], 0, fixPos(128 * 1), fixPos(512), fixPos(128));
			if(game.renderButtonOverlay == 3) game.contextBackground.drawImage(game.initImages[2], 0, fixPos(128 * 2), fixPos(512), fixPos(256));
			if(game.renderButtonOverlay == 4) game.contextBackground.drawImage(game.initImages[2], 0, fixPos(128 * 4), fixPos(512), fixPos(128));


			fillFont(fixPos(60), "Calibri", 0, "Gran Colombia", fixPos(4), fixPos(96 + (128 * 0)), game.contextBackground, 1);
			fillFont(fixPos(60), "Calibri", 0, "Simon Bolivar", fixPos(4), fixPos(96 + (128 * 1)), game.contextBackground, 2);
			fillFont(fixPos(60), "Calibri", 0, "United States", fixPos(4), fixPos(96 + (128 * 2)), game.contextBackground, 3);
			fillFont(fixPos(60), "Calibri", 0, " and Colombia", fixPos(4), fixPos(96 + (128 * 3)), game.contextBackground, 3);
			fillFont(fixPos(60), "Calibri", 0, "Credits", fixPos(4), fixPos(96 + (128 * 4)), game.contextBackground, 4);

			if(game.screen != 0) drawScreen();

			//renderHyperlinks();

			game.frames++;
		}

		function fixPos(numb){
			var result = numb * game.scale;
			return result;
		}

		//creates a loop that the entire game runs on
		function run(){
			requestAnimFrame(function(){
				run();
			});
			update();
			render();
		}
		
		initImages(game.imagesToLoadInit);
		checkInitImages();
	}); 
})();

//returns how many frames the game should run from the current browser
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

//returns a random integer between the min and max, including the min and max
function randInt(min, max){
	if (min >= max) {
		console.log("Error: Could Not Calculate Random Integer")
		return 0;
	} else {
		return Math.round((Math.random() * (max - min)) + min);
	}
}

//renturns a long between the min and max, including the min and max
//a long is a "long" string of numbers - basically a lot of decimals
function randLong(min, max){
	if (min >= max) {
		console.log("Error: Could Not Calculate Random Long")
		return 0;
	} else {
		return (Math.random() * (max - min)) + min;
	}
}