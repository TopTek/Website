(function(){
	var startInitTime = (new Date()).getTime();
	console.log("---------------------Initializing--------------------")
	$(document).ready(function(){ 
		var canvas = document.getElementById("")

		var game = {};
		game.width = 768;
		game.height = 512;
		game.midWidth = game.width / 2;
		game.midHeight = game.height / 2;

		game.oldTime = (new Date().getTime());
		game.time = 0;

		game.preInitImages = [];
		game.donePreInitImages = 0;
		game.requiredPreInitImages = 0;

		game.initImages = [];
		game.doneInitImages = 0;
		game.requiredInitImages = 0;

		game.clouds = [];
		game.buttons = [];
		game.booleanButtons = [];
		game.ynButtons = [];
		game.mouseParticles = [];
		game.screen = "menu";
		game.screenyn = 0;
		game.options = [true]
		game.font = "ABCDEFGHIJKLM" + // 
					"NOPQRSTUVWXYZ" + //
					"abcdefghijklm" + //
					"nopqrstuvwxyz" + //
					"?"
		game.fontX =   [94, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 
						118, 108, 104, 111, 0, 110, 0, 0, 0, 0, 0, 100, 0,
						53, 56, 38, 52, 44, 40, 58, 56, 23, 29, 63, 37, 94,
						62, 49, 55, 53, 46, 55, 34, 55, 52, 84, 58, 51, 37,
						58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
		game.fontY =   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 
						16, 0, 21, 5, , 0, 0, 0, 0, 0, 0, 32, 0,
						0, 0, 0, 0, 0, 0, 20, 17, 0, 20, 0, 0, 0,
						3, 0, 20, 20, 4, 4, 0, 3, 0, 0, 0, 25, 28,
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
		game.imagesToLoadInit = ["SkyBlue.png", "Cloud1.png", "Cloud2.png","MenuGrass.png",
								"Button1.png", "Button2.png", "Button3.png", "Button4.png", 
								"Button5.png", "Cursor.png", "MouseParticle.png", "OptionsBackground.png",
        				        "BooleanButton1.png", "BooleanButton2.png", "Button6.png", "r.png", 
        						"g.png", "a.png", "n.png", "t.png", 
                                "h.png", "i.png", "Font.png", "ScreenDarken.png", 
         						"ynButton1.png", "ynButton2.png", "ynButton3.png", "ynButton4.png", 
         						"startBackgroundTest.png", "Face1_0.png", "Face1_1.png", "Hair1_0.png",
         						"Hair1_1.png", "Eyes1_0.png", "Eyes1_1.png", "Mouth1_0.png",
         						"Mouth1_1.png", "Jacket1_0_1.png", "Jacket1_1_1.png", "ArmRight1_1_1.png",
         						"ArmLeft1_1_1.png", "ArmLeft1_0_1.png", "ArmRight1_0_1.png", "ArmRight1_1_0.png",
         						"ArmLeft1_1_0.png", "ArmLeft1_0_0.png", "ArmRight1_0_0.png", "Jacket1_1_0.png",
         						"Jacket1_0_0.png", "LegRight1_0_0.png", "LegRight1_1_0.png",
         						"MissingTexture.png"]
         //30 images
         //4 images per line


		game.updates = 0;
		game.frames = 0;

		game.mouseX = 0;
		game.mouseY = 0;
		game.mouseClick = false;
		game.canMouseClick = true;

		game.keys = [];

		game.players = [];
		game.playerStats = {
			damage: 100,
			health: 100,
			speed: 1,
			face: 1,
			hair: 1,
			eyes: 1,
			mouth: 1,
			clothes: 1,
			arm: 1,
			jumpHeight: 14,
		}

		game.contextBackground = document.getElementById("backgroundCanvas").getContext("2d");
		game.contextEntity = document.getElementById("entityCanvas").getContext("2d");
		game.contextMob = document.getElementById("mobCanvas").getContext("2d");
		game.contextPlayer = document.getElementById("playerCanvas").getContext("2d");
		game.contextAlert = document.getElementById("alertCanvas").getContext("2d");
		game.contextForeground = document.getElementById("foregroundCanvas").getContext("2d");

		//makes the mouse invisible while on the canvas
		$('body').mouseover(function(){
				$(this).css({cursor: 'none'});
		})

		//sets game.mouseClick to false if the mouse is not being pressed
		$(document).mouseup(function(){
			game.mouseClick = false;
			game.mouseClicked = false;
		})

		//sets game.mouseClick to true if the mouse is being pressed
		$(document).mousedown(function(){
			game.mouseClick = true;
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

		//loads images used during the initialization process
		function preInitImages(paths){ 
			game.requiredPreInitImages = paths.length; 
			for(i in paths){ 
				var img = new Image; 
				img.src = paths[i]; 
				game.preInitImages[i] = img; 
				console.log(paths[i] + " Loaded"); 
				game.preInitImages[i].onload = function(){ 
					game.donePreInitImages++; 

				} 
			} 
		} 

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
  					preInit();   
  				} 
  			} 
  		} 

  		//ensures that each image from the preInitImages is loaded before initializing
  		function checkPreInitImages() { 
  			if(game.donePreInitImages >= game.requiredPreInitImages){ 
  				preInit(); 

                //all images that need loading go here
                initImages(game.imagesToLoadInit);
                checkInitImages(); 
            }else{ 
            	setTimeout(function(){ 
            		checkPreInitImages();    
            	}, 1); 
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

        //draws the loading bar and orgathia icon during the initialization
        function preInit(){
        	game.contextBackground.drawImage(game.preInitImages[0], game.midWidth - 128, game.midHeight - 128, 256, 256);
        	game.contextBackground.drawImage(game.preInitImages[1], game.midWidth - 250 + 2, game.midHeight + 2 + 175, 496, 28);
        	game.contextBackground.drawImage(game.preInitImages[2], game.midWidth - 250 + 2, game.midHeight + 2 + 175, 496 * (game.doneInitImages / game.requiredInitImages), 28);
        	game.contextBackground.drawImage(game.preInitImages[3], game.midWidth - 250, game.midHeight + 175, 500, 32);
        }

		//adds what needs to be added before the first frame is drawn and ends the initialization process
		function init(){
			addInitClouds(game.width / 130)
			addButton(game.midWidth - 93, game.midHeight - 28, true, true, "Start", "menu")
			addButton(game.midWidth - 93, game.midHeight + 56, true, true, "Options", "menu")
			addButton(game.midWidth - 93, game.midHeight + 140, true, true, "Quit", "menu")
			addButton(50, 16, false, false, "Menu", "options")
			addBooleanButton(50, 96, 0, 0, 1, "Cursor Particles", "options")
			addButton(16, 16, false, false, "Quit", "start")
			addynButton(16, 16, false, "start", 1)
			createPlayer(100, 100, 0, game.playerStats)

			//all processes that need to be initialized go above this
			console.log("RequestAnimationFrame: Set");
			console.log("---------------------Initialized---------------------");
			var endInitTime = (new Date()).getTime();
			var timeElapsed = (endInitTime - startInitTime) / 1000;
			console.log("Loaded | Time: " + timeElapsed + " seconds");
			run();	
		}

		//creats clouds during the game
		function addClouds(num){
			for(i = 0; i < num; i++){
				game.clouds.push({
					x: -256,
					y: randInt(0, game.midHeight),
					width: randInt(128, 256),
					height: randInt(128, 256),
					speed: randInt(1, 10) /10,
				})
			}
		}

		//creates the clouds that appear across the screen on the first frame
		function addInitClouds(num){
			for(i = 0; i < num; i++){
				game.clouds.push({
					x: randInt(0, game.midWidth),
					y: randInt(0, game.midHeight),
					width: randInt(128, 256),
					height: randInt(128, 256),
					speed: randInt(1, 10) /10,
				})
			}
		}
		

		//moves clouds
		function moveClouds(){
			for(i in game.clouds){
				if(game.clouds[i].x <= -(game.width * 2)){
					game.clouds.splice(i, 1);
				}
				game.clouds[i].x += game.clouds[i].speed;
			}
		}

		//renders the clouds by drawing them on the background
		function renderClouds(){
			game.contextBackground.drawImage(game.initImages[2], 0, 0, game.width, game.height);
			for(i in game.clouds){
				var cloud = game.clouds[i];
				game.contextBackground.drawImage(game.initImages[1], cloud.x, cloud.y, cloud.width, cloud.height);
			}
		}

		//adds buttons into the game.buttons array
		function addButton(x, y, display, sideIcon, string, displayScreen) {
			game.buttons.push({
				x: x,
				y: y,
				width: 186,
				height: 64,
				click: 0,
				display: display,
				sideIcon: sideIcon,
				string: string,
				displayScreen: displayScreen,
			})
		}

		//renders buttons from the game.buttons array
		function renderButtons(){
			for(i in game.buttons){
				var button = game.buttons[i];
				if (button.display) {
					game.contextBackground.drawImage(game.initImages[button.click + 4], button.x + 4, button.y + 4);
					game.contextBackground.drawImage(game.initImages[6], button.x, button.y);
					
					if (button.click == 1 && button.sideIcon){
						game.contextBackground.drawImage(game.initImages[button.click + 6], button.x - 40, button.y + button.height / 4);
						game.contextBackground.drawImage(game.initImages[button.click + 7], button.x + button.width, button.y + button.height / 4);
					}

					drawFont(button.x - 8 + (button.width / 2) - (getFontLength(32, button.string) / 8), button.y - 4 + button.height / 4, 32, game.contextBackground, button.string)
				}else{
					continue;
				}
			}
		}

		//updates the buttons to determine if the mouse is hovering over it
		function updateButtons(){
			for(i in game.buttons){
				if(game.mouseX > game.buttons[i].x && game.mouseX < game.buttons[i].x + 186 && game.mouseY > game.buttons[i].y && game.mouseY < game.buttons[i].y + 64 && game.buttons[i].display && game.screenyn == 0){
					game.buttons[i].click = 1;
				}else{
					game.buttons[i].click = 0;
				}

				if(getScreen() == game.buttons[i].displayScreen){
					game.buttons[i].display = true;
				}else{
					game.buttons[i].display = false;
				}
			}
		}

		//adds buttons into the game.booleanButtons array
		function addBooleanButton(x, y, option, display, initialState, string, displayScreen) {
			game.booleanButtons.push({
				x: x,
				y: y,
				width: 186,
				height: 40,
				click: 0,
				option: option,
				display: display,
				sideIcon: initialState,
				string: string,
				displayScreen: displayScreen,
			})
		}

		//updates the buttons to determine if the mouse is hovering over it
		function updateBooleanButtons(){
			for(i in game.booleanButtons){
				var button = game.booleanButtons[i];

				if(game.mouseX > button.x && game.mouseX < button.x + 186 && game.mouseY > button.y && game.mouseY < button.y + 40 && button.display && game.mouseClick && game.canMouseClick && game.options[button.option]){
					game.options[button.option] = false;
					button.sideIcon = 0;
				}else if(game.mouseX > button.x && game.mouseX < button.x + 186 && game.mouseY > button.y && game.mouseY < button.y + 40 && button.display && game.mouseClick && game.canMouseClick && !game.options[button.option]){
					game.options[button.option] = true;
					button.sideIcon = 1;
				}

				if(getScreen() == game.booleanButtons[i].displayScreen){
					game.booleanButtons[i].display = true;
				}else{
					game.booleanButtons[i].display = false;
				}

				if(game.mouseX > button.x && game.mouseX < button.x + 186 && game.mouseY > button.y && game.mouseY < button.y + 40 && button.display && game.screenyn == 0){
					button.click = 1;
				}else{
					button.click = 0;
				}

			}
		}

		//renders buttons from the game.buttons array
		function renderBooleanButtons(){
			for(i in game.booleanButtons){
				var button = game.booleanButtons[i];
				if (button.display) {
					game.contextBackground.drawImage(game.initImages[4 + button.click], button.x + 4, button.y + 4, button.width - 8, button.height - 8);
					game.contextBackground.drawImage(game.initImages[14], button.x, button.y);
					game.contextBackground.drawImage(game.initImages[12 + button.sideIcon], button.width + 15, button.y + 7);

					drawFont(button.x - 64 + button.width - (getFontLength(18, button.string) / 8), button.y - 2 + button.height / 4, 18, game.contextBackground, button.string)
				}else{
					continue;
				}
			}
		}

		//adds buttons into the game.booleanButtons array
		function addynButton(x, y, display, displayScreen, buttonCall) {
			game.ynButtons.push({
				x: x,
				y: y,
				width: 128,
				height: 48,
				click: 0,
				clickY: 0,
				clickN: 0,
				display: display,
				displayScreen: displayScreen,
				buttonCall: buttonCall,
			})
		}

		//updates the buttons to determine if the mouse is hovering over it
		function updateynButtons(){
			for(i in game.ynButtons){
				var button = game.ynButtons[i];
				if(game.screenyn == i + 1){
					button.display = true;	
				}else{
					button.display = false;
				}

				if(game.mouseX > game.midWidth - 136 && game.mouseX < game.midWidth - 136 + 128 && game.mouseY > game.midHeight + 24 + 4 && game.mouseY < game.midHeight + 24 + 48 - 4 && button.display){
					button.clickY = 1;
				}else{
					button.clickY = 0;
				}

				if(game.mouseX > game.midWidth + 8 && game.mouseX < game.midWidth + 8 + 128 && game.mouseY > game.midHeight + 24 + 4 && game.mouseY < game.midHeight + 24 + 48 - 4 && button.display){
					button.clickN = 1;
				}else{
					button.clickN = 0;
				}

				if(button.clickN == 1 && game.mouseClick){
					button.click = 1;
				}else if(button.clickY == 1 && game.mouseClick){
					button.click = 1;
				}else{
					button.click = 0;
				}
			}
		}

		//renders buttons from the game.buttons array
		function renderynButtons(){
			for(i in game.ynButtons){
				var button = game.ynButtons[i];
				if (button.display) {
					game.contextAlert.drawImage(game.initImages[23], 0, 0)
					game.contextAlert.drawImage(game.initImages[24], 0, 0)
					game.contextAlert.drawImage(game.initImages[25 + button.clickY], game.midWidth - 136, game.midHeight + 24)
					game.contextAlert.drawImage(game.initImages[25+ button.clickN], game.midWidth + 8, game.midHeight + 24)
					game.contextAlert.drawImage(game.initImages[27], game.midWidth - 136, game.midHeight + 24)
					game.contextAlert.drawImage(game.initImages[27], game.midWidth + 8, game.midHeight + 24)

					drawFont(game.midWidth - 128, game.midHeight - 48, 40, game.contextAlert,"Are You Sure?")

					drawFont(game.midWidth - 96 - (getFontLength(28, "Yes") / 8) + 24, game.midHeight + 29, 28, game.contextAlert, "Yes")
					drawFont(game.midWidth + 48 - (getFontLength(28, "No") / 8) + 24, game.midHeight + 29, 28, game.contextAlert, "No")
				}else{
					continue;
				}
			}
		}

		function singleClick(){
			//if(game.mouseClick && game.canMouseClick){}
			if(game.mouseClick){
				game.canMouseClick = false;
			}else{
				game.canMouseClick = true;
			}
		}

		//adds the mouse particles
		function addMouseParticles(){
			game.mouseParticles.push({
				x: game.mouseX + randInt(0, 16) - 6,
				y: game.mouseY + randInt(0, 16) + 12,
				moveX: randInt(1, 4) / 2,
				moveY: randInt(2, 3),
				width: randInt(12, 20),
				height: randInt(12, 20),
				oldtime: (new Date()).getTime(),
				time: (new Date()).getTime(),
			})
		}

		//removes mouse particles from game.mouseParticles so it doesn't overflow
		function removeMouseParticles(){
			for (i in game.mouseParticles){
				if(game.mouseParticles[i].time >= 250) {
					game.mouseParticles.splice(i, 1);
				}
			}
		}

		//moves the mouse particles
		function moveMouseParticles(){
			for(i in game.mouseParticles){
				game.mouseParticles[i].x += game.mouseParticles[i].moveX;
				game.mouseParticles[i].y += game.mouseParticles[i].moveY;
			}
		}

		function resizeMouseParticles(){
			for(i in game.mouseParticles){
				game.mouseParticles[i].width -= game.mouseParticles[i].time / 250;
				game.mouseParticles[i].height -= game.mouseParticles[i].time / 250;
			}
		}

		//updates the mouse partilces' x, y, and time since creation
		function updateMouseParticles(){
			for(i in game.mouseParticles){
				game.mouseParticles[i].time = (new Date()).getTime() - game.mouseParticles[i].oldtime;
			}
			moveMouseParticles();
			resizeMouseParticles();
		}

		//updates the position of the cursor
		//aslo contains all elements that makeup the cusor such as the mouse particles
		function updateCursor(){
			$(document).mousemove(function(e){				
				game.mouseX = e.pageX;
				game.mouseY = e.pageY;
			})
			updateMouseParticles();
			removeMouseParticles();
			addMouseParticles();
		}

		//renders the mouse particles
		function renderMouseParticles(){
			for(i in game.mouseParticles){
				var part = game.mouseParticles[i];
				game.contextForeground.drawImage(game.initImages[10], part.x, part.y, part.width, part.height)
			}
		}

		//renders the actual cursor images and mouse particles
		function renderCursor(){
			if(game.options[0]){
			renderMouseParticles();
		}
			game.contextForeground.drawImage(game.initImages[9], game.mouseX, game.mouseY);
		}

		function createPlayer(x, y, directionFacing, stats){
			game.players.push({
				x: x,
				y: 512 - y,
				z: 128,
				directionFacing: directionFacing,
				stats: stats,
				startAirTime: 0,
				startWalkTime: 0,
				airTime: 0,
				gravity: .98,
				velocity: 0,
				action: 0,
				actionStartTime: [0, 0, 0, 0],
			})
		}

		function deletePlayer(){
			for(i in game.players){

			}
		}

		function updatePlayer(){
			for(i in game.players){
				var player = game.players[i];

				if(game.screenyn == 0){
					player.action = 0;
					movePlayer(i);
				}
			}
		}
			

		function movePlayer(i){
			var player = game.players[i];
			if(game.keys[65] && game.keys[16]){
				player.x -= 3;
				player.action = 2;
			}else if(game.keys[65]){
				player.x -= player.stats.speed;
				player.action = 1;
			}

			if(game.keys[68] && game.keys[16]){
				player.x += 3;
				player.action = 2;
			}else if(game.keys[68]){
				player.x += player.stats.speed;
				player.action = 1;
			}

			if(game.keys[65]){
				player.directionFacing = 0;
			}else if(game.keys[68]){
				player.directionFacing = 1;
			}
			if(game.keys[32] && player.startAirTime == 0){
				player.y -= 1;
				player.action = 0;
			}

			if(player.y >= game.height - 196){
				player.y = game.height - 196
				player.startAirTime = 0;
				player.airTime = 0;
			}else if(player.startAirTime == 0){
				player.startAirTime = (new Date().getTime());
				player.velocity = player.stats.jumpHeight;
				player.action = 0;
			}else{
				player.airTime += (new Date().getTime()) - player.startAirTime
				player.velocity -= player.gravity
				player.y -= player.velocity;
				player.action = 0;
			}
			if(player.y > game.height - 196){
				player.y = game.height - 196
			}

			for(j in player.actionStartTime){
				if(player.action != j){
					player.actionStartTime[j] = game.time;
				}
			}
		}

		function getActionStartTime(){
			for(i in game.players){
				var player = game.players[i]
				for(j in player.actionStartTime){
					if(player.action == j){
						return player.actionStartTime[j];
					}
				}
			}
		}

		function renderPlayer(){
			for(i in game.players){
				var player = game.players[i];
				var img0 = getImage("Jacket" + player.stats.clothes + "_" + player.directionFacing + "_1.png")
				var img1 = getImage("Face" + player.stats.face + "_" + player.directionFacing + ".png")
				var img2 = getImage("Mouth" + player.stats.mouth + "_" + player.directionFacing + ".png")
				var img3 = getImage("Eyes" + player.stats.eyes + "_" + player.directionFacing + ".png")
				var img4 = getImage("Hair" + player.stats.hair + "_" + player.directionFacing + ".png")
				var img5 = getImage("ArmRight" + player.stats.arm + "_" + player.directionFacing + "_" + player.action + ".png")
				var img6 = getImage("ArmLeft" + player.stats.arm + "_" + player.directionFacing + "_" + player.action + ".png")
				var img7 = getImage("Jacket" + player.stats.clothes + "_" + player.directionFacing + "_0.png")
				var img8 = getImage("LegRight" + player.stats.arm + "_" + player.directionFacing + "_" + player.action + ".png")

				if(player.action == 0){
					var img5_1X = 0
					var img6_1X = 0
				}else if(player.action == 1){
					var img5_1X = 96 * (Math.floor((game.time - getActionStartTime()) / 125) % 8)
					var img6_1X = 96 * (Math.floor((game.time - getActionStartTime()) / 125 + 4) % 8)
				}else{
					var img5_1X = 96 * (Math.floor((game.time - getActionStartTime()) / 125) % 8)
					var img6_1X = 96 * (Math.floor((game.time - getActionStartTime()) / 125 + 4) % 8)
				}

				game.contextPlayer.drawImage(game.initImages[img7], player.x, player.y)
				game.contextPlayer.drawImage(game.initImages[img8], player.x, player.y)
				game.contextPlayer.drawImage(game.initImages[img6], img6_1X, 0, 96, 144, player.x, player.y, 96, 144)
				game.contextPlayer.drawImage(game.initImages[img0], player.x, player.y)
				game.contextPlayer.drawImage(game.initImages[img1], player.x, player.y)
				game.contextPlayer.drawImage(game.initImages[img2], player.x, player.y)
				game.contextPlayer.drawImage(game.initImages[img3], player.x, player.y)
				game.contextPlayer.drawImage(game.initImages[img4], player.x, player.y)
				game.contextPlayer.drawImage(game.initImages[img5], img5_1X, 0, 96, 144, player.x, player.y, 96, 144)
				
			}
		}

		function drawFont(x, y, size, context, string){
			var proportion = size / 128
			var xx = 0;
			var yy = 0;
			var yyy = 0;
			var xxx = 0;
			var oldJ = 0;
			for(i = 0; i < string.length; i++){
				var character = string.charAt(i);

				if(character == " "){
					xxx += 64 * proportion;
					continue;
				}

				for(j = 0; j < game.font.length; j++){
					if(character == game.font.charAt(j)){
						xx = (j % 13) * 128;
						yy = Math.floor(j / 13) * 128;
						yyy = game.fontY[j];
						xxx += game.fontX[oldJ];
						context.drawImage(game.initImages[22], xx, yy, 128, 128, x + (i * 8 * proportion) + (xxx * proportion) - 24, y + (yyy * proportion), size, size);
						oldJ = j;
					}
				}
			}
		}

		function getFontLength(size, string){
			var proportion = size / 128
			var charLength = 0;

			for(i = 0; i < string.length; i++){
				var character = string.charAt(i);

				if(character == " "){
					charLength += 64 * proportion;
					continue;
				}

				for(j = 0; j < game.font.length; j++){
					if(character == game.font.charAt(j)){
						charLength += game.fontX[j];
					}
				}
			}

			var fontLength = ((string.length - 1) * 8 * proportion) + charLength;
			return fontLength;
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
		
		//quits the game
		function quitGame(){
			if(game.buttons[2].click == 1 && game.mouseClick){
				window.close();
			}
		}

		function screenMenu(){
			if(game.buttons[3].click == 1 && game.mouseClick){
				game.screen = "menu"
				game.mouseClick = false;
			}

			if(game.ynButtons[0].click == 1 && game.ynButtons[0].clickY == 1 && game.mouseClick){
				game.screenyn = 0;
				game.screen = "menu"
				game.mouseClick = false;
			}
		}

		function screenOptions(){
			if(game.buttons[1].click == 1 && game.mouseClick){
				game.screenyn = 0;
				game.screen = "options";
				game.mouseClick = false;
			}
		}

		function screenStart(){
			if(game.buttons[0].click == 1 && game.mouseClick){
				game.screen = "start";
				game.mouseClick = false;
			}
		}

		function callynButton(){
			if(game.buttons[4].click == 1 && game.mouseClick){
				game.screenyn = 1;
				game.mouseClick = false;
			}

			if(game.ynButtons[0].click == 1 && game.ynButtons[0].clickN == 1 && game.mouseClick){
				game.screenyn = 0;
				game.mouseClick = false;
			}
		}

		//updates the menu
		//holds all the functions that update all the objects that makeup the menu
		function updateMenu(){
			if (game.updates % 130 == 0) {
				addClouds(1);
			}
			moveClouds();
			updateButtons();
			updateBooleanButtons();
			updateynButtons();
		}

		//draws the menu
		//draws all the objects contained in the menu
		function renderMenu(){
			game.contextBackground.drawImage(game.initImages[0], 0, 0, game.width, game.height);
			renderClouds();
			game.contextBackground.drawImage(game.initImages[3], 0, 0, game.width, game.height);
			renderButtons();

			game.contextBackground.drawImage(game.preInitImages[0], 97, 0 + 8); 			//O
			game.contextBackground.drawImage(game.initImages[15], 136 + 97, 0 + 8); 		//r
			game.contextBackground.drawImage(game.initImages[16], 190 + 97, 23 + 8);		//g
			game.contextBackground.drawImage(game.initImages[17], 256 + 97, 5 + 8); 		//a
			game.contextBackground.drawImage(game.initImages[18], 317 + 97, 0 + 8); 		//n
			game.contextBackground.drawImage(game.initImages[19], 384 + 97, 0 + 8); 		//t
			game.contextBackground.drawImage(game.initImages[20], 426 + 97, 17 + 8); 		//h
			game.contextBackground.drawImage(game.initImages[21], 490 + 97, 0 + 8); 		//i
			game.contextBackground.drawImage(game.initImages[17], 521 + 97, 5 + 8); 		//a
		}

		function updateOptions(){
			updateButtons();
			updateBooleanButtons();
			updateynButtons();
		}

		function renderOptions(){
			game.contextBackground.drawImage(game.initImages[11], 0, 0)
			renderButtons();
			renderBooleanButtons();
		}

		function updateStart(){
			updateButtons();
			updateBooleanButtons();
			updateynButtons();
			updatePlayer();
		}

		function renderStart(){
			game.contextBackground.drawImage(game.initImages[28], 0, -512)
			renderButtons();
			renderynButtons();
			renderPlayer();
		}

		function updateTime(){
			var newTime = (new Date().getTime())
			game.time = newTime - game.oldTime
		}

		//returns which screen is currently running
		function getScreen(){
			return game.screen;
		}

		//upadates all logic and keeps track of how many updates the game has
		//uses few functions based on what needs to be updated
		function update(){
			updateTime();
			quitGame();
			screenMenu();
			screenOptions();
			screenStart();
			callynButton();

			switch (getScreen()){
				case "menu":
				updateMenu();
				updateCursor();

				break;
				case "options":
				updateOptions();
				updateCursor();

				break;
				case "start":
				updateStart();
				updateCursor();

				break;
			}
			singleClick();

			game.updates++;
		}

		//renders all elements and objects and keeps trak of how many frames the game has
		//uses few functions based on what needs to be rendered
		function render(){
			game.contextBackground.clearRect(0, 0, game.width, game.height);
			game.contextEntity.clearRect(0, 0, game.width, game.height);
			game.contextMob.clearRect(0, 0, game.width, game.height);
			game.contextPlayer.clearRect(0, 0, game.width, game.height);
			game.contextAlert.clearRect(0, 0, game.width, game.height);
			game.contextForeground.clearRect(0, 0, game.width, game.height);

			switch (getScreen()){
				case "menu":
				renderMenu();
				renderCursor();

				break;
				case "options":
				renderOptions();
				renderCursor();

				break;
				case "start":
				renderStart();
				renderCursor();

				break;
			}

			game.frames++;
		}

		//creates a loop that occurs before the game runs
		function preInitRun(){
			requestAnimFrame(function(){
				preInitRun();
			})
			
		}

		//creates a loop that the entire game runs on
		function run(){
			requestAnimFrame(function(){
				run();
			});
			update();
			render();
		}

		preInitImages(["OrganthiaIcon.png", "LoadingBar1.png", "LoadingBar2.png", "LoadingBar3.png"])
		checkPreInitImages();
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