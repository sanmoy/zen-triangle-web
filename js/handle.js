var easyStage = 60;
var medStage = 240;
var hardStage = 335;

var canvas;
var dCanvas;
var tcanvas;

var ctx;
var dctx;
var tctx;

var WIDTH, HEIGHT;
var topElement;
var elementArray = [];
var tmpElementArray = [];
var xoffset = 0,
    yoffset = 0;
var isSelect = false;
var elementCount = 0;
var startTime;
var endTime;
var isMoved;
var center;
//var ontapTimer;
var enableMouse = true;
var runAnim = true;
var ref;
// var ref2;
var animref;
// var toffsetCal = true;
// var ystart;
// var yend;
var currstage = 1;

// var xinterpol;
// var yinterpol;

var events = true;
// var scroll = false;
//var tutstage = 1;
var bckgrnd = new Audio('./res/loop.mp3');
bckgrnd.loop = true;
var clickAudio = new Audio("./res/click.mp3");

var succAudio1 = new Audio("./res/succ1.mp3");
var succAudio2 = new Audio("./res/succ2.mp3");

// var userAgent = window.navigator.userAgent.toLowerCase();
// var ipad = /ipad/.test(userAgent);

//var struggleCount = 0;
//var struggle = false;
var info = "";

var lastPlayedGame = 1;
var gameNumber;
var skipTutorial;
var sound;
var haptics;
var promptRate;

var hintTime;
var hintCount;
const TIMESPAN_MS = 60 * 1000;

window.onfocus = playLoop;
window.onblur = pauseLoop;

firstMove = true;

//this is to check whether the current flow is from tutorial
var fromTutorial = false;

//wanted to preload lock image, but it doesn't work .. :-(
//var lockImg=new Image();
//lockImg.src=url('./img/lock_yellow.png');

// this is the entry point of the code.
/*(function main() {
    initButton();
    promptWeeklyChallengeDialog();
    storePreference("lastPlayedTime", Date.now());
//    setTimeout(initButton, 500);
}());*/
var runninInChrome = false;
// Inside my.js:
document.addEventListener('DOMContentLoaded', function() {
  //console.log('here');
  main();
});

function main() {
    initButton();
	setTimeout(showMainMenu, 300);
    //promptWeeklyChallengeDialog();
    //storePreference("lastPlayedTime", Date.now());
//    setTimeout(initButton, 500);
}

/* function promptWeeklyChallengeDialog()
{
    var lastPlayedGame = getPreference("lastPlayedGame");
    lastPlayedGame = parseInt(lastPlayedGame);
    var pro = getPreference("pro");
    
    var oldTime = getPreference("lastPlayedTime");
    oldTime = parseInt(oldTime);
    var currTime = Date.now();
    currTime = parseInt(currTime);
    var twoDays = 47*3600*1000;
    var twoMins = 120*1000;
    if(currTime-oldTime > twoDays && lastPlayedGame==61 && pro === "false")
    {
        setTimeout(showWeeklyChallengeDialog, 300);
    }
    else
    {
        setTimeout(showMainMenu, 300);
    }
} */

/* function main1() {
    initButton();
//    setTimeout(showWeeklyChallengeDialog, 500);
    setTimeout(showWeeklyChallengeDialog, 300);
    storePreference("lastPlayedTime", Date.now());
} */

function setBackgroundImage1() {
    document.body.style.backgroundImage = "url('./img/background1.jpg')";
}

function initButton() {
    initPreference();
	ratio = window.innerWidth / window.innerHeight;
	if(ratio>1.8)
	{
		calib = window.innerHeight * 1.8 / 18;
	}		
    calib = Math.round(calib);
    console.log("calib : " + calib);
    createMainMenu();
    //createTutorial();
    createNextPanel();
    // createSettings();
    createCongoDialog();
    createMessageBoard();
	//createAllStages();
    //createHintPurchaseDialog();
    //createStagePurchaseDialog();
    createPromptRateDialog();
    //createWeeklyChallengeDialog();
    createEMH();
    createHelp();
    createHintButton();
    showCanvases();
    //setTimeout(showMainMenu, 200);
    setTimeout(startAnimation, 200);
    animref = setTimeout(stopAnimation, 10000);
//    }
}

function getRandomString() {
    var seq = Math.floor(Math.random() * 20) + 1;
    // console.log(seq);
	var returnVal;
    switch (seq) {
    case 1:
        returnVal = "well done";
        break;
    case 2:
        returnVal = "Congrats..";
        break;
    case 3:
        returnVal = "Good Job";
        break;
    case 4:
        returnVal = "Great...";
        break;
    case 5:
        returnVal = "Bingo..";
        break;
    case 6:
        returnVal = "awesome...";
        break;
    case 7:
        returnVal = "Nice...";
        break;
    case 8:
        returnVal = "Cool...";
        break;
    case 9:
        returnVal = "Bravo...";
        break;
    case 10:
        returnVal = "Superb...";
        break;
    case 12:
        returnVal = "wonderful";
        break;
    case 13:
        returnVal = "fantastic";
        break;
    case 14:
        returnVal = "fabulous";
        break;
    case 15:
        returnVal = "terrific..";
        break;
    case 16:
        returnVal = "Kudos..";
        break;
    case 17:
        returnVal = "Good Job";
        break;
    case 18:
        returnVal = "Good Job";
        break;
    case 19:
        returnVal = "Good Job";
        break;
    case 20:
        returnVal = "Good Job";
        break;
    default:
        returnVal = "well done";
    }
	return returnVal;
}

function playLoop() {
    //var sound = "true";//getPreference("sound");
    if (sound === "true") {
        if (glasses === "ingameplay" || glasses === "intutorial" || glasses === "congo" || glasses === "wait")
        {
            return;
        }
        else
        {
            bckgrnd.play();
        }
    }
}

function pauseLoop() {
    bckgrnd.pause();
}

function createMainMenu() {
    var margin = Math.round(calib / 8);
    var ngame_div = document.createElement("div");
    ngame_div.setAttribute("id", "ngame");
    ngame_div.style.width = 5 * calib + "px";
    ngame_div.style.height = calib + "px";
    ngame_div.style.fontSize = calib + "px";
    ngame_div.style.margin =  margin + "px";
    ngame_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("new game");
    ngame_div.appendChild(node_text);
    ngame_div.setAttribute("class", "button blue anim1");


    var setting_div = document.createElement("div");
    setting_div.setAttribute("id", "settings");
    setting_div.style.width = 5 * calib + "px";
    setting_div.style.height = calib + "px";
    setting_div.style.fontSize = calib + "px";
    setting_div.style.margin = margin + "px";
    setting_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("OPTIONS");
    setting_div.appendChild(node_text);
    setting_div.setAttribute("class", "button blue anim2");

    var help_div = document.createElement("div");
    help_div.setAttribute("id", "help");
    help_div.style.width = 5 * calib + "px";
    help_div.style.height = calib + "px";
    help_div.style.fontSize = calib + "px";
    help_div.style.margin = margin + "px";
    help_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("HELP");
    help_div.appendChild(node_text);
    help_div.setAttribute("class", "button blue anim3");

    var container_div = document.createElement("div");
    container_div.setAttribute("id", "mainmenu");
    container_div.setAttribute("class", "buttonContainer");
    container_div.style.visibility = "hidden";
    container_div.style.opacity = "0";
    var padding = Math.round(calib / 4);
    container_div.style.height = (3 * calib+ 12 * margin + 6) + "px";
    container_div.style.width = Math.round(5.5 * calib) + "px";
    container_div.style.padding = padding + "px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.right = "0";
    container_div.appendChild(ngame_div);
    container_div.appendChild(setting_div);
    container_div.appendChild(help_div);

	var parent_div = document.getElementById("qcallDialog");
    document.body.insertBefore(container_div, document.body.firstChild);
    addEvent("ngame", nGameAction);
    addEvent("settings", settingAction);
    addEvent("help", helpAction);
}

function showMainMenu() {
    glasses = "mainmenu";
    var mainmenu = document.getElementById("mainmenu");
    // setTimeout(function(){mainmenu.style.visibility="visible";},400);
    mainmenu.style.visibility = "visible";
    hideBackButton();
    hideHintButton();
    mainmenu.style.opacity="1";
    // mainmenu.style.display = "initial";
}

function setLastPlayedGame(value)
{
    if(runninInChrome)
    {
	    chrome.storage.local.set({"lastPlayedGame": value});
    }
	else
	{
		localStorage.setItem("lastPlayedGame", value);
	}
	lastPlayedGame = value;
}

function setSound(value)
{
    if(runninInChrome)
    {
	    chrome.storage.local.set({"Sound": value});
    }
	else
	{
		localStorage.setItem("Sound", value);
	}
    sound = value;
}

function setHaptics(value)
{
    if(runninInChrome)
    {
	    chrome.storage.local.set({"Haptics": value});
    }
	else
	{
		localStorage.setItem("Haptics", value);
	}
    haptics = value;
}

function populateSkipTutorial()
{
    if(runninInChrome)
    {
        chrome.storage.local.get("skipTutorial", function (value)
        {
            if (value && value.skipTutorial)
            {
                skipTutorial = value.skipTutorial;
            }
            else
            {
                skipTutorial = "false";
            }
        });
    }
    else
    {
		skipTutorial = localStorage.getItem("skipTutorial") || "false";
    }
}

function setSkipTutorialTrue()
{
    if(runninInChrome)
    {
	    chrome.storage.local.set({"skipTutorial": "true"});
    }
	else
	{
		localStorage.setItem("skipTutorial", "true");
	}
    skipTutorial = "true";
}

function populateLastPlayedGame()
{
	if(runninInChrome)
    {
        chrome.storage.local.get("lastPlayedGame", function(value) {
          if (value && value.lastPlayedGame) {
            lastPlayedGame = value.lastPlayedGame;
          }
          else
          {
            setLastPlayedGame(1);
          }
        });
    }
    else
    {
		lastPlayedGame = localStorage.getItem("lastPlayedGame") || 1;
    }
}

function populateHintCount()
{
	if(runninInChrome)
    {
        chrome.storage.local.get("hintCount", function(value) {
          if (value && value.hintCount) {
            hintCount = value.hintCount;
          }
          else
          {
            setHintCount(2);
          }
        });
    }
    else
    {
		hintCount = localStorage.getItem("hintCount") || 2;
    }
}

function setHintCount(value)
{
    if(runninInChrome)
    {
	    chrome.storage.local.set({"hintCount": value});
    }
	else
	{
		localStorage.setItem("hintCount", value);
	}
	hintCount = value;
}

function populateHintTime()
{
	if(runninInChrome)
    {
        chrome.storage.local.get("hintTime", function(value) {
          if (value && value.hintTime) {
            hintTime = value.hintTime;
          }
          else
          {
            setHintTime(new Date().toISOString());
          }
        });
    }
    else
    {
		hintTime = localStorage.getItem("hintTime") || new Date().toISOString();
    }
}

function setHintTime(value)
{
    if(runninInChrome)
    {
	    chrome.storage.local.set({"hintTime": value});
    }
	else
	{
		localStorage.setItem("hintTime", value);
	}
	hintTime = value;
}

function populatePromptRate()
{
    if(runninInChrome)
    {
        chrome.storage.local.get("promptRate", function(value) {
          if (value && value.promptRate) {
            promptRate = value.promptRate;
          }
          else
          {
            setPromptRateTrue();
          }
        });
    }
    else
    {
		promptRate = localStorage.getItem("promptRate") || "true";
    }
}

function setPromptRateTrue()
{
	promptRate = "true";
	if(runninInChrome)
    {
		chrome.storage.local.set({"promptRate": "true"});
	}
	else
	{
		localStorage.setItem("promptRate", "true");
	}
}

function setPromptRateFalse()
{
	promptRate = "false";
	if(runninInChrome)
    {
		chrome.storage.local.set({"promptRate": "false"});
	}
	else
	{
		localStorage.setItem("promptRate", "false");
	}
}

function populateHaptics()
{
    if(runninInChrome)
    {
	chrome.storage.local.get("haptics", function(value) {
      if (value && value.haptics) {
        haptics = value.haptics;
      }
	  else
	  {
		setHapticsTrue();
	  }
	});
    }
    else
    {
		haptics = localStorage.getItem("haptics") || "true";
    }
}

function populateSound()
{
    if(runninInChrome)
    {
        chrome.storage.local.get("sound", function(value) {
          if (value && value.sound) {
            sound = value.sound;
            playLoop();
          }
          else
          {
            setSoundTrue();
            playLoop();
          }
        });
    }
    else
    {
        sound = localStorage.getItem("sound") || "true";
        playLoop();
    }
}

function setSoundTrue()
{
	if(runninInChrome)
    {
		chrome.storage.local.set({"sound": "true"});
	}
	else
	{
		localStorage.setItem("", "true");
	}
	sound = "true";
}

function setSoundFalse()
{
	if(runninInChrome)
    {
		chrome.storage.local.set({"sound": "false"});
	}
	else
	{
		localStorage.setItem("sound", "false");
	}
	sound = "false";
}

function setHapticsTrue()
{
	if(runninInChrome)
    {
		chrome.storage.local.set({"haptics": "true"});
	}
	else
	{
		localStorage.setItem("haptics", "true");
	}
	haptics = "true";
}

function setHapticsFalse()
{
	if(runninInChrome)
    {
		chrome.storage.local.set({"haptics": "false"});
	}
	else
	{
		localStorage.setItem("haptics", "false");
	}
	
	haptics = "false";
}

function initPreference() {
	populateLastPlayedGame();
	populateSkipTutorial();
	populateSound();
	populateHaptics();
	populatePromptRate();
	populateHintCount();
	populateHintTime();
    /* var sound = getPreference("sound");
    if (!sound) {
        storePreference("sound", true);
        sound = "true";
    }
    var haptics = getPreference("haptics");
    if (!haptics) {
        storePreference("haptics", true);
        haptics = "true";
    }
    // last played game is basically the last playable game which is
    // unlocked
    var lastPlayedGame = getPreference("lastPlayedGame");
    if (!lastPlayedGame) {
        storePreference("lastPlayedGame", 1);
    }
//        storePreference("lastPlayedGame", 80);
    var gameNumber = getPreference("gameNumber");
    if (!gameNumber) {
        storePreference("gameNumber", 1);
    }
    var skipTutorial = getPreference("skipTutorial");
    if (!skipTutorial) {
        storePreference("skipTutorial", "false");
    } */
//		storePreference("tsupported", "true");
    /* var pro = getPreference("pro");
    if (!pro) {
        storePreference("pro", "false");
    } */
//        storePreference("pro","true");

    //var hintCount = getPreference("hintCount");
    //if (!hintCount) {
      //  storePreference("hintCount", "2");
    //}
//        storePreference("hintCount","20");

    //var hintTime = getPreference("hintTime");
    //if (!hintTime) {
      //  storePreference("hintTime", Date.now());
    //}
    //setInterval(pollHint, 5000);
//            setInterval(increaseHint, 18640);
    
    //var lastPlayedTime = getPreference("lastPlayedTime");
    //if (!lastPlayedTime) {
      //  storePreference("lastPlayedTime", Date.now());
    //}
    
    //var promptRate = getPreference("promptRate");
    //if (!promptRate) {
      //  storePreference("promptRate", "true");
    //}
}

/* function pollHint()
{
    var oldTime = getPreference("hintTime");
    oldTime = parseInt(oldTime);
    var currTime = Date.now();
    currTime = parseInt(currTime);
    if(currTime-oldTime>28800000)
    {
        increaseHint();
    }
} */

function addEvent(elemid, func) {
    var element = document.getElementById(elemid);
    if (enableMouse) {
		element.onmousedown=null;
		element.addEventListener("mousedown", function() {
			element.style.bottom = "-" + Math.round(calib / 10) + "px";
			playSound("click");
		}, false);
		element.addEventListener("mouseup", func, false);
		element.addEventListener("mouseup", function() {
			restore(elemid);
		}, false);
	} else {
		element.ontouchstart=null;
		element.addEventListener("touchstart", function() {
			element.style.bottom = "-" + Math.round(calib / 10) + "px";
			playSound("click");
//			vibrate(50);
		}, false);
		element.addEventListener("touchend", func, false);
		element.addEventListener("touchend", function() {
			restore(elemid);
		}, false);
		element.onmousedown = disable;
		element.onclick = disable;
	}
}

function helpAction() {
    if (events) {
        disableEvents();
		stopAnimation();
//        showBackButton();
        glasses = "";
        var help_div = document.getElementById("help");
        hidemainMenu();
		//playTutorialAction();
//        showHelp();
//        setTimeout(hidemainMenu, 400);
        setTimeout(showHelp, 400);
        setTimeout(showBackButton, 400);
    }
}

function createHelp()
{
    var margin = Math.round(calib / 8);
    var tut_div = document.createElement("div");
    tut_div.setAttribute("id", "tut");
    tut_div.style.width = Math.round(calib * 5.5) + "px";
    tut_div.style.height = calib + "px";
    tut_div.style.fontSize = calib + "px";
    tut_div.style.margin = margin + "px";
    tut_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("TUTORIAL");
    tut_div.appendChild(node_text);
    tut_div.setAttribute("class", "button blue anim1");
    
    
    var sol_div = document.createElement("div");
    sol_div.setAttribute("id", "sol");
    sol_div.style.width = Math.round(calib * 5.5) + "px";
    sol_div.style.height = calib + "px";
    sol_div.style.fontSize = calib + "px";
    sol_div.style.margin = margin + "px";
    sol_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("SOLUTIONS");
    sol_div.appendChild(node_text);
    sol_div.setAttribute("class", "button blue anim2");
    
    
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.setAttribute("id", "helpmenu");
    container_div.style.width = Math.round(calib * 6.1) + "px";
    container_div.style.height = (2 * calib+ 8 * margin + 4) + "px";
    container_div.style.padding = Math.round(calib / 4) + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.right = "0";
    container_div.style.opacity = "0";
    container_div.style.visibility = "hidden";
    container_div.appendChild(tut_div);
    container_div.appendChild(sol_div);
    document.body.insertBefore(container_div, document.body.firstChild);
    addEvent("tut", playTutorialAction);
    addEvent("sol", solutionAction);
}

function showHelp() {
    glasses = "helpmenu";
    var helpmenu = document.getElementById("helpmenu");
        helpmenu.style.visibility = "visible";
         helpmenu.style.opacity="1";
        // helpmenu.style.display = "initial";
}

function hideHelpMenu() {
    var helpmenu = document.getElementById("helpmenu");
    if (helpmenu) {
        helpmenu.style.visibility = "hidden";
        // setTimeout(function(){helpmenu.style.visibility="hidden";},400);
        helpmenu.style.opacity="0";
        // helpmenu.style.display = "none";

    }
}

function solutionAction() {
    if (events) {
        disableEvents();
        glasses = "";
        var sol_div = document.getElementById("sol");
        hideHelpMenu();
//        setTimeout(hideHelpMenu, 400);
		setTimeout(function(){document.body.style.backgroundImage = "url('./img/background2.jpg')";}, 300);
        setTimeout(showSolutions, 400);
//        storePreference("refreshRequired", "true");
    }
}
 /*
function tutorialAction() {
    if (events) {
        disableEvents();
        glasses = "";
        storePreference("skipTutorial", "true");
        var tut_div = document.getElementById("tut");
        //hideHelpMenu();
//        setTimeout(hideHelpMenu, 400);
		showCanvases();
		//setTimeout(showLoadingGif, 400);
		//setTimeout(hideLoadingGif, 1000);
        setTimeout(startTutorial, 400);
        pauseLoop();
    }
}
*/

function startTutorial() {
    glasses = "intutorial";
	fromTutorial = true;
//    storePreference("silentZone", "true");
    document.body.style.backgroundImage = "url('./img/background2.jpg')";
	showCanvases();
    //elementArray = new Array();
    //topElement = elementArray[0] = RedElement;
    //elementArray[0].disable = false;
    //elementArray[0].setPos(WIDTH / 2, HEIGHT / 2);
    //elementArray[0].posinArray = 0;

    showMessageBoard("Click on the Element and drag..");
    //var mbdiv = document.getElementById("mbdiv");
    //mbdiv.innerHTML = "Click on the Element and drag..";

    init(-1);
    isMoved = false;
    //tutstage = 1;
    ref = setInterval(moveChecker, 500);
    startHandAnimation();
}

function createMessageBoard()
{
    var mbdiv = document.createElement("div");
    mbdiv.setAttribute("class", "messageboard");
    mbdiv.setAttribute("id", "mbdiv");
    mbdiv.style.width = Math.round(.96 * WIDTH) + "px";
    mbdiv.style.padding = Math.round(calib / 16) + "px";
    mbdiv.style.fontSize = Math.round(calib / 1.6) + "px";
    mbdiv.style.top = "1%";
    mbdiv.style.left = "0";
    mbdiv.style.right = "0";
    mbdiv.style.visibility = "hidden";
    mbdiv.style.opacity="0";
    cutter(mbdiv, 2);
    document.body.insertBefore(mbdiv, document.body.firstChild);
}

function showMessageBoard(message) {
    var messageboard = document.getElementById("mbdiv");
    messageboard.style.visibility = "visible";
    mbdiv.innerHTML = message;
    messageboard.style.opacity = "1";
}

/* function hideInfoBoard()
{
    var infoboard = document.getElementById("infodiv");
    if (infoboard) {
        infoboard.style.visibility = "hidden";
        //        messageboard.style.opacity="1";
    }
}

function showInfoBoard() {
    var infoboard = document.getElementById("infodiv");
    if (infoboard) {
        var width = Math.round(calib * 3.5);
        infoboard.style.top = elementArray[0].y + "px";
        infoboard.style.left = (elementArray[0].x - width -calib) + "px";
        infoboard.style.right = "initial";
        infoboard.style.bottom = "initial";
        infoboard.innerHTML = info;
        infoboard.style.visibility = "visible";
//        messageboard.style.opacity="1";
    } else {
        var infoboard = document.createElement("div");
        infoboard.setAttribute("class", "messageboard");
        infoboard.setAttribute("id", "infodiv");
        var width = Math.round(calib * 3.5);
        infoboard.style.width = width + "px";
        infoboard.style.padding = Math.round(calib / 8) + "px";
        infoboard.style.fontSize = Math.round(calib / 1.6) + "px";
        infoboard.style.top = elementArray[0].y + "px";
        infoboard.style.left = (elementArray[0].x - width -calib) + "px";
        infoboard.style.right = "initial";
        infoboard.style.bottom = "initial";
        infoboard.innerHTML = info;
//        mbdiv.style.visibility = "hidden";
//        mbdiv.style.opacity="0";
        cutter(infoboard, 2);
        document.body.insertBefore(infoboard, document.body.firstChild);
    }
} */

function hideMessageBoard() {
    var messageboard = document.getElementById("mbdiv");
    if (messageboard) {
        messageboard.style.visibility = "hidden";
        // setTimeout(function(){messageboard.style.visibility="hidden";},400);
        messageboard.style.opacity="0";
    }
}

function moveChecker() {
    if (isMoved) {
        // if(tutstage === 3)
        // {
            // clearTimeout(ontapTimer);
            // struggleCount+=1;
            // if(struggleCount%3 === 0)
            // {
                // info = "use your fingertip";
            // }
            // else
            // {
                // info = "hold finger steady";
            // }
            // showInfoBoard();
            // setTimeout(hideInfoBoard, 2000);
            // isMoved = false;
        // }
        // else
        // {
		clearInterval(ref);
		//showNextPanel();
		//addEvent("nxt", moveSuccess);
		stopAnimation();
        // }
    }
}

/*function hideNextPanel() {
    var nextpanel = document.getElementById("nextpanel");
    if (nextpanel) {
        nextpanel.style.visibility = "hidden";
        // setTimeout(function(){nextpanel.style.visibility="hidden";},400);
        nextpanel.style.opacity = "0";
    }
}

function moveSuccess() {
    console.log("outside :"+events);
    if (events) {
        console.log(events);
        disableEvents();
        //struggleCount = 0;
        var nxt_div = document.getElementById("nxt");
        hideNextPanel();
    //    setTimeout(hideNextPanel, 400);
        topElement = elementArray[0] = DeepBlueElement;
        elementArray[0].disable = false;
        elementArray[0].angle = 45;
        elementArray[0].setPos(WIDTH / 2, HEIGHT / 2);
        elementArray[0].posinArray = 0;
        var mbdiv = document.getElementById("mbdiv");
        mbdiv.innerHTML = "Left click on the Element to rotate..";
    //    initialDraw();
        initialDraw();
        startTapAnimation();
        ref = setInterval(rotationChecker, 300);
    }
}*/

function rotationChecker() {
    if (topElement && topElement.angle != 45) {
        stopAnimation();
        clearInterval(ref);
        //showNextPanel();
        //addEvent("nxt", startFlip);
    }
}

/*function startFlip() {
    if (events) {
        disableEvents();
        var nxt_div = document.getElementById("nxt");
        hideNextPanel();
    //    setTimeout(hideNextPanel, 400);
        elementArray = new Array();
        topElement = elementArray[0] = LightBlueElement;
        elementArray[0].disable = false;
        elementArray[0].flip = 1;
        elementArray[0].angle = 45;
        elementArray[0].setPos(WIDTH / 2, HEIGHT / 2);
        elementArray[0].posinArray = 0;

        var mbdiv = document.getElementById("mbdiv");
        mbdiv.innerHTML = "Right click on the Element to flip.";
        initialDraw();
    //    initialDraw();
        startHoldAnimation();
        ref = setInterval(flipChecker, 300);
        //tutstage = 3;
        isMoved = false;
        // ref2 = setInterval(moveChecker, 500);
        //struggleCount = 0;
    }
}*/

function flipChecker() {
    if (topElement && topElement.flip != 1) {
        isMoved = false;
        // clearInterval(ref2);
        clearInterval(ref);
        //showNextPanel();
        stopAnimation();
        //addEvent("nxt", startGame);
    }
}

/*function startGame() {
    if (events) {
        disableEvents();
        var nxt_div = document.getElementById("nxt");
        hideNextPanel();
    //    setTimeout(hideNextPanel, 400);
        //showReadyDiv();
        //setTimeout(hideReadyDiv, 4000);

        // get the least game unfinished ??
        var mbdiv = document.getElementById("mbdiv");
        mbdiv.innerHTML = "Lets start with a Simple Game";
        setTimeout(hideMessageBoard, 4000);

        holes = new Array();
        showCanvases();
        setTimeout(function(){init(-1);}, 400);
    }
}*/

function showReadyDiv() {
    var ready = document.getElementById("ready");
    if (ready) {
        ready.style.visibility = "visible";
        // ready.style.opacity = "1";
    } else {
        var ready_div = document.createElement("div");
        ready_div.setAttribute("id", "ready");
        ready_div.setAttribute("class", "ready");
        ready_div.style.width = 6 * calib + "px";
        ready_div.style.height = Math.round(calib / 1.6) + "px";
        ready_div.style.fontSize = Math.round(calib / 2) + "px";
        ready_div.style.borderRadius = Math.round(calib / 4) + "px";
        ready_div.style.opacity = ".8";
        ready_div.style.top = "0";
        ready_div.style.bottom = "0";
        ready_div.innerHTML = "You are ready..";
        document.body.insertBefore(ready_div, document.body.firstChild);
    }
}

function hideReadyDiv() {
    var ready = document.getElementById("ready");
    if (ready) {
        ready.style.visibility = "hidden";
        // setTimeout(function(){ready.style.visibility="hidden";},400);
        // ready.style.opacity = "0";
    }
}

function createNextPanel()
{
    var nxt_div = document.createElement("div");
    nxt_div.setAttribute("id", "nxt");
    nxt_div.style.width = 5 * calib + "px";
    nxt_div.style.height = Math.round(.7 * calib) + "px";
    nxt_div.style.fontSize = Math.round(calib / 1.6) + "px";
    nxt_div.style.margin = "auto";
    nxt_div.style.position = "absolute";
    nxt_div.style.top = "15%";
    nxt_div.style.left = "0";
    nxt_div.style.right = "0";
    nxt_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("got it...next >>");
    nxt_div.appendChild(node_text);
    nxt_div.setAttribute("class", "button blue anim1");
    
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.setAttribute("id", "nextpanel");
    container_div.style.width = Math.round(5.8 * calib) + "px";
    container_div.style.height = Math.round(1.2 * calib) + "px";
    container_div.style.borderRadius = Math.round(calib / 4) + "px";
    container_div.style.bottom = "1%";
    container_div.style.left = "1%";
    container_div.style.padding = Math.round(calib / 16) + "px";
    container_div.style.position = "fixed";
    container_div.style.visibility = "hidden";
    container_div.style.opacity = "0";
    
    container_div.appendChild(nxt_div);
    document.body.insertBefore(container_div, document.body.firstChild);
}

/*function showNextPanel() {
    var nextpanel = document.getElementById("nextpanel");
    var nxt_div = document.getElementById("nxt");
    var new_element = nxt_div.cloneNode(true);
    nxt_div.parentNode.replaceChild(new_element, nxt_div);
    nextpanel.style.visibility = "visible";
    nextpanel.style.opacity = "1";
}*/

/* function updateUi() {
    storePreference("pro", "true");
    hideWaitDialog();
    if(glasses === "gamestage")
    {
        removeStages();
        showMediumStages();
    }
}
 */
function showEasyStages() {
    glasses = "gamestage";
	createEasyStages();
    var container = document.getElementById("easygames");
    container.style.visibility = "visible";
	scrollToDiv();
	// setTimeout(scrollToDiv, 1000);
    //hideLoadingGif();
}

function showMediumStages() {
    glasses = "gamestage";
	createMediumStages();
    var container = document.getElementById("mediumgames");
    container.style.visibility = "visible";
	scrollToDiv();
	// setTimeout(scrollToDiv, 1000);
    //hideLoadingGif();
}

function showHardStages() {
    glasses = "gamestage";
	createHardStages();
    var container = document.getElementById("hardgames");
    container.style.visibility = "visible";
	scrollToDiv(); 
	// setTimeout(scrollToDiv, 1000);	
    //hideLoadingGif();
}

function scrollToDiv() {
    // gameNumber = getPreference("gameNumber");
	lastPlayedGame = parseInt(lastPlayedGame);
    var scrolldiv = document.getElementById("game" + lastPlayedGame);
    if (scrolldiv) {
        scrolldiv.scrollIntoView();
    }
	// var table = document.getElementById("tableid");
	// table.scrollTop = -calib;
}

function hideStages() {
    hideEasyStages();
    hideMediumStages();
    hideHardStages();
}

function hideEasyStages() {
    var container = document.getElementById("easygames");
    // container.style.visibility = "hidden";
	removeElement(container);
}

function hideMediumStages() {
    var container = document.getElementById("mediumgames");
    // container.style.visibility = "hidden";
	removeElement(container);
}

function hideHardStages() {
    var container = document.getElementById("hardgames");
    // container.style.visibility = "hidden";
	removeElement(container);
}


function easyAction() {
    if (events) {
        disableEvents();
        glasses = "";
        var easy_div = document.getElementById("easy");
        setTimeout(hideEMHMenu, 400);
		//setTimeout(showLoadingGif, 500);
        // showLoadingGif();
        setTimeout(showEasyStages, 600);
    }

}

function mediumAction() {
    if (events) {
        disableEvents();
        glasses = "";
        var med_div = document.getElementById("medium");
        setTimeout(hideEMHMenu, 400);
		//setTimeout(showLoadingGif, 500);
        // showLoadingGif();
        setTimeout(showMediumStages, 600);
    }
}

function hardAction() {
    if (events) {
        disableEvents();
        glasses = "";
        var harddiv = document.getElementById("hard");
        setTimeout(hideEMHMenu, 400);
		//setTimeout(showLoadingGif, 500);
        // showLoadingGif();
        setTimeout(showHardStages, 600);
    }
}

/* function getStageRange(number)
{
    if(ipad == true)
    {
        for(var i=1; i<360;i+=20)
        {
            if(number<i)
            {
                return {x:i-20, y:i-1};
            }
        }
    }
    else
    {
        for(var i=1; i<360;i+=15)
        {
            if(number<i)
            {
                return {x:i-15, y:i-1};
            }
        }
    }
}

function showEasyStages() {
    glasses = "gamestage";
    gameNumber = getPreference("gameNumber");
    gameNumber = parseInt(gameNumber);
    if(gameNumber<=easyStage && gameNumber>0)
    {
        var stageRange = getStageRange(gameNumber);
        createStages(stageRange.x, stageRange.y);
        currstage = gameNumber;
    }
    else
    {
        createStages(1, 20);
        currstage = 10;
    }
}

function showMediumStages() {
    glasses = "gamestage";
    gameNumber = getPreference("gameNumber");
    gameNumber = parseInt(gameNumber);
    if(gameNumber<=medStage && gameNumber>easyStage)
    {
        var stageRange = getStageRange(gameNumber);
        createStages(stageRange.x, stageRange.y);
        currstage = gameNumber;
    }
    else
    {
        createStages(easyStage+1, easyStage+20);
        currstage = easyStage+10;
    }
}

function showHardStages() {
    glasses = "gamestage";
    gameNumber = getPreference("gameNumber");
    gameNumber = parseInt(gameNumber);
    if(gameNumber>medStage)
    {
        var stageRange = getStageRange(gameNumber);
        createStages(stageRange.x, stageRange.y);
        currstage = gameNumber;
    }
    else
    {
        createStages(medStage+1, medStage+20);
        currstage = medStage+10;
    }
}

function scrollToDiv(containername) {
    gameNumber = getPreference("gameNumber");
    var scrolldiv = document.getElementById("game" + gameNumber);
    if (scrolldiv) {
//        scrolldiv.scrollIntoView();
        var container = document.getElementById(containername);
        container.scrollTop = scrolldiv.offsetParent.offsetTop;
    }
}

function removeStages()
{
    var container = document.getElementById("gamestage");
    removeElement(container);
}


function easyAction() {
    if (events) {
        disableEvents();
        glasses = "";
        var easy_div = document.getElementById("easy");
        hideEMHMenu();
        setTimeout(showEasyStages, 400);
    }

}

function mediumAction() {
    if (events) {
        disableEvents();
        glasses = "";
        var med_div = document.getElementById("medium");
        hideEMHMenu();
        setTimeout(showMediumStages, 400);
    }
}

function hardAction() {
    if (events) {
        disableEvents();
        glasses = "";
        var harddiv = document.getElementById("hard");
        hideEMHMenu();
        setTimeout(showHardStages, 400);
    }
} */

function showSolutions() {
    glasses = "solutionpanel";
    var solutionpanel = document.getElementById("solutioncontainer");
    // document.body.style.backgroundImage = "url('./img/background2.jpg')";
    if (solutionpanel) {
        solutionpanel.style.visibility = "visible";
        // solutionpanel.style.opacity="1";
    } else {
        var container_div = document.createElement("div");
        container_div.setAttribute("class", "buttonContainer");
        container_div.setAttribute("id", "solutioncontainer");
        container_div.style.width = Math.round(2.4 * calib) + "px";
        container_div.style.height = calib + "px";
        // container_div.style.right = "0";
        container_div.style.right = "2%";
        container_div.style.padding = Math.round(calib / 5) + "px";
        container_div.style.borderRadius = Math.round(calib / 5) + "px";
        container_div.style.top = "3%";
        container_div.style.backgroundColor = "rgba(255,255,255, .5)";
        container_div.style['-webkit-transition-duration'] = '0s';
//        glass_div.appendChild(container_div);
        document.body.appendChild(container_div);
    }
	var input = document.createElement("input");
	input.setAttribute("type", "number");
	input.setAttribute("id", "input");
	input.setAttribute("class", "text");
	input.style.width = (Math.round(2.4 * calib) - 2 * Math.round(calib / 4)) + "px";
    input.style.padding = Math.round(calib / 5) + "px";
	input.style.height = Math.round(calib / 1.4) + "px";
	input.style.fontSize = Math.round(calib / 1.3) + "px";
	input.style.margin = Math.round(calib / 16) + "px";
	input.style.paddingBottom = Math.round(calib / 11) + "px";
	input.style.color = "#c92200";
	input.style.fontFamily = "myFont";
	input.style.fontWeight = "bold";
	input.style.textAlign = "center";
	input.style.textShadow = "1px 1px 0px #ded17c";
	input.style.position = "relative";
	input.style.float = "left";
	input.onkeyup = generateSolution;
	var container_div = document.getElementById("solutioncontainer");
	container_div.appendChild(input);
	
    showCanvases();
    //var gameNumber = getPreference("gameNumber");
    //gameNumber = parseInt(gameNumber);
    // var lastPlayedGame = getPreference("lastPlayedGame");
    // lastPlayedGame = parseInt(lastPlayedGame);
    //do not show solution for last playable game
    // if(gameNumber>=lastPlayedGame)
    // {
        // gameNumber = lastPlayedGame-1;
    // }
    input.value = lastPlayedGame;
    initSolution(lastPlayedGame);
//    input.focus();
}

function hideSolutions() {
    var solutionpanel = document.getElementById("solutioncontainer");
    var input = document.getElementById("input");
    if (solutionpanel) {
        solutionpanel.style.visibility = "hidden";
        removeElement(input);
        // setTimeout(function(){solutionpanel.style.visibility="hidden";},400);
        // solutionpanel.style.opacity="0";
    }
}

function restore(elementid) {
    var gen_div = document.getElementById(elementid);
    gen_div.style.bottom = "initial";
}

function generateSolution() {
    var input = document.getElementById("input");
    if (input.value === "")
        return;
    initSolution(input.value);
}

/* function scrollUpHandler()
{
    //console.log("scroll up");
	if(ipad)
	{
		if (currstage > 20)
		{
			currstage = currstage-20;
			removeStages();
			var stageRange = getStageRange(currstage);
			createStages(stageRange.x, stageRange.y);
		}
	}
    else
    {
        if (currstage > 15)
		{
			currstage = currstage-15;
			removeStages();
			var stageRange = getStageRange(currstage);
			createStages(stageRange.x, stageRange.y);
		}
    }
}

function scrollDownHandler()
{
    console.log("scroll down");
    if(ipad)
    {
        if (currstage <= 320)
        {
            currstage = currstage+20;
            removeStages();
            var stageRange = getStageRange(currstage);
            createStages(stageRange.x, stageRange.y);
        }
    }
	else
    {
        if (currstage <= 330)
        {
            currstage = currstage+15;
            removeStages();
            var stageRange = getStageRange(currstage);
            createStages(stageRange.x, stageRange.y);
        }

    }
} */

/* function createStages(startNum, endNum) {
    // last played game is basically the last playable game which is unlocked
    var lastPlayedGame = getPreference("lastPlayedGame");
    var pro = getPreference("pro");
	var gameNumber = getPreference("gameNumber");
    console.log("lastPlayedGame : " + lastPlayedGame);
	console.log("pro : " + pro);
	console.log("gameNumber : " + gameNumber);
    var boxSide = Math.round(2.1 * calib);
    var margin = Math.floor(calib / 3);
    var container_div = document.createElement("div");
    container_div.setAttribute("id", "gamestage");
    container_div.setAttribute("class", "buttonContainer");
    container_div.style.width = 15 * calib + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    if(ipad)
    {
        container_div.style.height = 4 * (boxSide + 2 * margin + 4) + "px";
    }
    else
    {
        container_div.style.height = 3 * (boxSide + 2 * margin + 4) + "px";
    }
    container_div.style.right = "0";
    container_div.style.left = "0";
    container_div.style.bottom = "0";
    container_div.style.top = "0";
//    container_div.style.visibility = "hidden";
//    container_div.onscroll = scrollHandler;
    container_div.ontouchstart = elementstart;
    container_div.ontouchmove = elementmove;
    
    container_div.style.padding = "0px";
    container_div.style.position = "fixed";
    container_div.style.overflowY = "hidden";
	container_div.style.overflowX = "hidden";
//    container_div.style.overflow = "auto";
    document.body.appendChild(container_div);
    var tableElem = document.createElement('table');
    tableElem.style.width = "100%";
    container_div.appendChild(tableElem);

    // tableElem.style.overflow = "scroll";
    var startStage = startNum;

    for (var i = 0; i < 50; i++) {
        var rowElem = document.createElement('tr');
        // rowElem.style.width = "100%";
        for (var j = 0; j < 5; j++) {
            var colElem = document.createElement('td');
            // colElem.style.width = "100%";
            var game_div = document.createElement("div");
            game_div.setAttribute("id", "game" + startStage);
            game_div.style.width = boxSide + "px";
            game_div.style.borderRadius = Math.round(calib / 5) + "px";
            game_div.style.height = boxSide + "px";
            game_div.style.fontSize = Math.round(calib / 2.5) + "px";
            // game_div.style.padding = calib/8+"px";
            game_div.style.margin = margin + "px";
            game_div.setAttribute("class", "game");
            // last played game is basically the last playable game which is
            // unlocked
            lastPlayedGame = parseInt(lastPlayedGame);
			if (startStage > easyStage && pro === "false") {
				var box = document.createElement("div");
				box.setAttribute("class", "img");
				box.style.width = calib + "px";
				box.style.height = calib + "px";
				box.style.opacity = 1;
				box.innerHTML = "PRO";
				var lock_div = document.createElement("div");
				lock_div.setAttribute("id", "lock" + startStage);
				lock_div.style.backgroundColor = "rgba(255,255,255, .6)";
				lock_div.style.width = boxSide + "px";
				lock_div.style.height = boxSide + "px";
				// lock_div.style.opacity=.5;
				lock_div.style.borderRadius = Math.round(calib / 5) + "px";
				lock_div.style.position = "absolute";
				lock_div.style.zIndex = "4";
				lock_div.appendChild(box);
				game_div.appendChild(lock_div);
			}
            else if (startStage > lastPlayedGame) 
			{
				var box = document.createElement("div");
				box.setAttribute("class", "img");
				box.style.width = calib + "px";
				box.style.height = calib + "px";
				box.style.opacity = 1;
				box.style.backgroundImage = "url('./img/lock_yellow.png')";
				var lock_div = document.createElement("div");
				lock_div.setAttribute("id", "lock" + startStage);
				lock_div.style.backgroundColor = "rgba(255,255,255, .6)";
				lock_div.style.width = boxSide + "px";
				lock_div.style.height = boxSide + "px";
				// lock_div.style.opacity=.5;
				lock_div.style.borderRadius = Math.round(calib / 5) + "px";
				lock_div.style.position = "absolute";
				lock_div.style.zIndex = "4";
				lock_div.appendChild(box);
				game_div.appendChild(lock_div);
            }
            // game_div.style.textAlign = "center";
            // var node_text = document.createTextNode(startStage);
            // game_div.appendChild(node_text);
            (function (startStage) {
                    var num_box = getHeaderNumBox(startStage);
                    num_box.style.margin = Math.round(calib / 16) + "px";
                    game_div.appendChild(num_box);
                    var img_box;
                    if (startStage <= easyStage) {
                        img_box = getImageBox("Easy", 2);
                    }
                    if (startStage > easyStage && startStage <= medStage) {
                        img_box = getImageBox("Medium", 2);
                    }
                    if (startStage > medStage) {
                        img_box = getImageBox("Hard", 2);
                    }
                    img_box.style.position = "relative";
                    img_box.style.marginTop = Math.round(calib / 3 - 10) + "px";
                    game_div.appendChild(img_box);
                    if (true) {
                        game_div.onclick = function () {
                            startGameAction(startStage)
                        };
                        game_div.onmousedown = elementstart;
                    } else {
                        game_div.ontouchstart = function (e) {
                             this.style.opacity = .7;
                             isMoved = false;
                             scroll = true;
                             ystart = e.touches[0].pageY;
                        };
                        game_div.ontouchend = function () {
                            this.style.opacity = 1;
                            startGameAction(startStage)
                        };
                        game_div.ontouchmove = elementmove;
                        game_div.onmousedown = disable;
                        game_div.onclick = disable;
                    }
                }
                (startStage));
            colElem.appendChild(game_div); // to print cell number
            rowElem.appendChild(colElem);
            startStage++;
            if (startStage == endNum + 1 || (startStage > hardStage)) {
                tableElem.appendChild(rowElem);
                return;
            }
        }
        tableElem.appendChild(rowElem);
    }
}

function elementstart(e) {
    isMoved = false;
    scroll = true;
    ystart = e.touches[0].pageY;
}

function elementmove(e) {
    isMoved = true;
    yend = e.touches[0].pageY;
    if(scroll == true)
    {
        if(yend - ystart > calib)
        {
            scrollUpHandler();
            scroll = false;
        }
        if(ystart - yend > calib)
        {
            scrollDownHandler();
            scroll = false;
        }
    }
} */

function createAllStages() {
    createEasyStages();
    createMediumStages();
    createHardStages();
}

function createEasyStages() {
    createStages(1, easyStage, "easygames");
}

function createMediumStages() {
    createStages(easyStage+1, medStage, "mediumgames");
}

function createHardStages() {
    createStages(medStage+1, hardStage, "hardgames");
}

function createStages(startNum, endNum, containerid) {
    // last played game is basically the last playable game which is unlocked
    // var lastPlayedGame = getPreference("lastPlayedGame");
    // var pro = getPreference("pro");
	//var gameNumber = parseInt("gameNumber");
    console.log("lastPlayedGame : " + lastPlayedGame);
	// console.log("pro : " + pro);
	//console.log("gameNumber : " + gameNumber);
    var container_div = document.createElement("div");
    container_div.setAttribute("id", containerid);
    container_div.setAttribute("class", "stageContainer");
    container_div.style.width = 15 * calib + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.height = "98%";
    container_div.style.right = "0";
    container_div.style.left = "0";
    container_div.style.bottom = "0";
    container_div.style.visibility = "hidden";
    container_div.style.top = "0";
    container_div.style.padding = "0px";
    // container_div.style.position = "fixed";
    container_div.style.overflowY = "scroll";
	container_div.style.overflowX = "hidden";
	container_div.addEventListener ("mousewheel", mouseScroll, false);
	
    document.body.appendChild(container_div);
    var tableElem = document.createElement('table');
	tableElem.setAttribute("id", "tableid");
    tableElem.style.width = "100%";
    container_div.appendChild(tableElem);

    // tableElem.style.overflow = "scroll";
    var startStage = startNum;

    for (var i = 0; i < 50; i++) {
        var rowElem = document.createElement('tr');
        // rowElem.style.width = "100%";
        for (var j = 0; j < 5; j++) {
            var colElem = document.createElement('td');
            // colElem.style.width = "100%";
            var game_div = document.createElement("div");
            game_div.setAttribute("id", "game" + startStage);
            game_div.style.width = Math.round(2.1 * calib) + "px";
            game_div.style.borderRadius = Math.round(calib / 5) + "px";
            game_div.style.height = Math.round(2.2 * calib) + "px";
            game_div.style.fontSize = Math.round(calib / 2.5) + "px";
            // game_div.style.padding = calib/8+"px";
            game_div.style.margin = Math.floor(calib / 3) + "px";
            game_div.setAttribute("class", "game");
            // last played game is basically the last playable game which is
            // unlocked
            lastPlayedGame = parseInt(lastPlayedGame);
			/* if (startStage > 80 && pro === "false") {
				var box = document.createElement("div");
				box.setAttribute("class", "img");
				box.style.width = calib + "px";
				box.style.height = calib + "px";
				box.style.opacity = 1;
				box.innerHTML = "PRO";
				var lock_div = document.createElement("div");
				lock_div.setAttribute("id", "lock" + startStage);
				lock_div.style.backgroundColor = "rgba(255,255,255, .6)";
				lock_div.style.width = Math.round(2.1 * calib) + "px";
				lock_div.style.height = Math.round(2.2 * calib) + "px";
				// lock_div.style.opacity=.5;
				lock_div.style.borderRadius = Math.round(calib / 5) + "px";
				lock_div.style.position = "absolute";
				lock_div.style.zIndex = "4";
				lock_div.appendChild(box);
				game_div.appendChild(lock_div);
			}
            else  */
			
			if (startStage > lastPlayedGame) 
			{
				var box = document.createElement("div");
				box.setAttribute("class", "img");
				box.style.width = calib + "px";
				box.style.height = calib + "px";
				box.style.opacity = 1;
				box.style.backgroundImage = "url('./img/lock_yellow.png')";
				var lock_div = document.createElement("div");
				lock_div.setAttribute("id", "lock" + startStage);
				lock_div.style.backgroundColor = "rgba(255,255,255, .6)";
				lock_div.style.width = Math.round(2.1 * calib) + "px";
				lock_div.style.height = Math.round(2.2 * calib) + "px";
				// lock_div.style.opacity=.5;
				lock_div.style.borderRadius = Math.round(calib / 5) + "px";
				lock_div.style.position = "absolute";
				lock_div.style.zIndex = "4";
				lock_div.appendChild(box);
				game_div.appendChild(lock_div);
            }
            // game_div.style.textAlign = "center";
            // var node_text = document.createTextNode(startStage);
            // game_div.appendChild(node_text);
            (function (startStage) {
				var num_box = getHeaderNumBox(startStage);
				num_box.style.margin = Math.round(calib / 16) + "px";
				game_div.appendChild(num_box);
				var img_box;
				if (startStage <= easyStage) {
					img_box = getImageBox("Easy", 2);
				}
				if (startStage > easyStage && startStage <= medStage) {
					img_box = getImageBox("Medium", 2);
				}
				if (startStage >= medStage) {
					img_box = getImageBox("Hard", 2);
				}
				img_box.style.position = "relative";
				img_box.style.marginTop = Math.round(calib / 3 - 10) + "px";
				game_div.appendChild(img_box);
				if (enableMouse) {
					game_div.onclick = function () {
						startGameAction(startStage)
					};
					// game_div.onmousedown = elementstart;
				} else {
					game_div.ontouchstart = elementstart;
					game_div.ontouchend = function () {
						startGameAction(startStage)
					};;
					game_div.ontouchmove = elementmove;
					game_div.onmousedown = disable;
					game_div.onclick = disable;
				}

			}
            (startStage));
            colElem.appendChild(game_div); // to print cell number
            rowElem.appendChild(colElem);
            startStage++;
            if (startStage == endNum + 1) {
                tableElem.appendChild(rowElem);
                return;
            }
        }
        tableElem.appendChild(rowElem);
    }
}

function mouseScroll(event)
{
	var rolled = 0;
	if ('wheelDelta' in event) {
		rolled = event.wheelDelta;
	}
	var table = document.getElementById("tableid");
	table.scrollTop = rolled;
}

function hidemainMenu() {
    var container_div = document.getElementById("mainmenu");
    container_div.style.visibility = "hidden";
       container_div.style.opacity = 0;
}

function hideEMHMenu() {
    var container_div = document.getElementById("EMH");
    container_div.style.visibility = "hidden";
     container_div.style.opacity = 0;
}

function nGameAction() {
    if (events) {
//        showWeeklyChallengeDialog();
//        showPromptRateDialog();
//        return;
        //setTimeout(registerNotification, 3000);
        //setTimeout(productRequest, 1000);
        disableEvents();
		stopAnimation();
        glasses = "";
        var ngame_div = document.getElementById("ngame");
        hidemainMenu();
        //var skipTutorial = getPreference("skipTutorial");
        if (skipTutorial === "true") 
		{
            setTimeout(showEMH, 400);
        }
        else {
            setTimeout(playTutorialAction, 200);
        }
        setTimeout(showBackButton, 500);
    }
}

/* function productRequest()
{
    window.location  = 'ios:req';
}

function registerNotification()
{
    var pro = getPreference("pro");
    if (pro === "false") {
        window.location  = 'ios:snot';
    }
    else{
        window.location  = 'ios:lnot';
    }
}

function proAction() {
    if (events) {
        disableEvents();
        var pro_div = document.getElementById("iampro");
        hidePromptTutorial();
        showEMH()
        storePreference("skipTutorial", "true");
    }
}

function hidePromptTutorial() {
    var promptTutorialDiv = document.getElementById("promptTutorial");
    if (promptTutorialDiv) {
        promptTutorialDiv.style.visibility = "hidden";
        // setTimeout(function(){promptTutorialDiv.style.visibility="hidden";},400);
         promptTutorialDiv.style.opacity="0";
    }
} */

/* function createTutorial()
{
    var margin = Math.round(calib / 8);
    var tut_div = document.createElement("div");
    tut_div.setAttribute("id", "playtut");
    tut_div.style.width = Math.round(7.4 * calib) + "px";
    tut_div.style.height = calib + "px";
    tut_div.style.fontSize = calib + "px";
    tut_div.style.margin = margin + "px";
    tut_div.style.padding = Math.round(calib / 8) + "px";
    tut_div.style.textAlign = "center";
    tut_div.innerHTML = "Play Tutorial";
    tut_div.setAttribute("class", "button blue anim1");
    
    var pro_div = document.createElement("div");
    pro_div.setAttribute("id", "iampro");
    pro_div.style.width = Math.round(7.4 * calib) + "px";
    pro_div.style.height = calib + "px";
    pro_div.style.fontSize = calib + "px";
    pro_div.style.margin = margin + "px";
    pro_div.style.padding = Math.round(calib / 8) + "px";
    pro_div.style.textAlign = "center";
    pro_div.innerHTML = "I am a Pro";
    pro_div.setAttribute("class", "button blue anim2");
    
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.setAttribute("id", "promptTutorial");
    container_div.style.height = (2 * calib+ 8 * margin + 4) + "px";
    container_div.style.width = 8 * calib + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.padding = Math.round(calib / 4) + "px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.right = "0";
    container_div.style.opacity = "0";
    container_div.style.visibility = "hidden";
    container_div.style.opacity="0  ";
    container_div.appendChild(tut_div);
    container_div.appendChild(pro_div);
    
    document.body.insertBefore(container_div, document.body.firstChild);
    addEvent("playtut", playTutorialAction);
    addEvent("iampro", proAction);
} */

/* function promptTutorial() {
    glasses = "promptTutorial";
    var promptTutorialDiv = document.getElementById("promptTutorial");
    promptTutorialDiv.style.visibility = "visible";
    promptTutorialDiv.style.opacity="1";
} */

function playTutorialAction() {
		hideHelpMenu();
        // storePreference("skipTutorial", "true");
		setSkipTutorialTrue();
        var playtut_div = document.getElementById("playtut");
        //hidePromptTutorial();
//        setTimeout(hidePromptTutorial, 400);
        setTimeout(startTutorial, 400);
        pauseLoop();
}

function createEMH() {
    var easy_div = document.createElement("div");
    easy_div.setAttribute("id", "easy");
    easy_div.style.width = 4 * calib + "px";
    easy_div.style.height = 4 * calib + "px";
    easy_div.style.borderRadius = Math.round(calib / 2) + "px";
    easy_div.style.left = "2%";
    easy_div.style.top = "7%";
    easy_div.style.margin = "auto";
    easy_div.style.padding = Math.round(calib / 8) + "px";
    easy_div.style.position = "absolute";
    easy_div.setAttribute("class", "button blue anim1");
    var easy_box = getHeaderBox("Easy");
    var img_box = getImageBox("Easy", 4);
    easy_div.insertBefore(easy_box, easy_div.firstChild);
    easy_div.insertBefore(img_box, easy_div.firstChild);

    var medium_div = document.createElement("div");
    medium_div.setAttribute("id", "medium");
    medium_div.style.width = 4 * calib + "px";
    medium_div.style.height = 4 * calib + "px";
    medium_div.style.borderRadius = Math.round(calib / 2) + "px";
    medium_div.style.left = "0";
    medium_div.style.right = "0";
    // medium_div.style.top = "0";
    medium_div.style.top = "7%";
    medium_div.style.margin = "auto";
    medium_div.style.position = "absolute";
    medium_div.style.padding = Math.round(calib / 8) + "px";
    medium_div.setAttribute("class", "button blue anim2");
    var med_box = getHeaderBox("Medium");
    var img_box = getImageBox("Medium", 4);
    medium_div.insertBefore(med_box, medium_div.firstChild);
    medium_div.insertBefore(img_box, medium_div.firstChild);

    var hard_div = document.createElement("div");
    hard_div.setAttribute("id", "hard");
    hard_div.style.width = 4 * calib + "px";
    hard_div.style.height = 4 * calib + "px";
    hard_div.style.borderRadius = Math.round(calib / 2) + "px";
    hard_div.style.right = "2%";
    // hard_div.style.top = "0";
    hard_div.style.top = "7%";
    hard_div.style.margin = "auto";
    hard_div.style.position = "absolute";
    hard_div.style.padding = Math.round(calib / 8) + "px";
    var hard_box = getHeaderBox("Hard");
    var img_box = getImageBox("Hard", 4);
    hard_div.insertBefore(hard_box, hard_div.firstChild);
    hard_div.insertBefore(img_box, hard_div.firstChild);
    hard_div.setAttribute("class", "button blue anim3");

    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.setAttribute("id", "EMH");
    container_div.style.width = 15 * calib + "px";
    container_div.style.height = 5 * calib + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.right = "0";
    container_div.style.left = "0";
    container_div.style.bottom = "0";
    container_div.style.top = "0";
    container_div.style.padding = "0px";
    container_div.style.position = "absolute";
    container_div.style.visibility = "hidden";
    container_div.style.opacity = "0";

    container_div.insertBefore(easy_div, container_div.firstChild);
    container_div.insertBefore(medium_div, container_div.firstChild);
    container_div.insertBefore(hard_div, container_div.firstChild);

    document.body.insertBefore(container_div, document.body.firstChild);
    addEvent("easy", easyAction);
    addEvent("medium", mediumAction);
    addEvent("hard", hardAction);
}

function showEMH() {
    glasses = "EMH";
    holes = new Array();
    var EMH = document.getElementById("EMH");
    // setTimeout(function(){EMH.style.visibility="visible";},400);
    EMH.style.visibility = "visible";
    EMH.style.opacity="1";
    // EMH.style.display = "initial";
}

function getImageBox(type, factor) {
    var box = document.createElement("div");
    box.setAttribute("class", "img");
    box.style.width = factor * calib + "px";
    box.style.height = Math.round((factor / 1.8) * calib) + "px";
	if(factor===2)
	{
		box.style.bottom = 0;
	}
    if (type === "Easy") {
        box.style.backgroundImage = "url('./img/easy_sc.png')";
    }
    if (type === "Medium") {
        box.style.backgroundImage = "url('./img/medium_sc.png')";
    }
    if (type === "Hard") {
        box.style.backgroundImage = "url('./img/hard_sc.png')";
    }
    return box;
}

function getHeaderNumBox(text) {
    var box = document.createElement("div");
    box.setAttribute("class", "boxcutter");
    box.style.width = Math.round(1.8 * calib) + "px";
    box.style.height = Math.round(calib / 2) + "px";
    box.style.fontSize = Math.round(calib / 2) + "px";
    box.style.padding = Math.round(calib / 16) + "px";
    box.style.position = "relative";
	box.style.top = "4%";
    cutter(box, 5);
    box.innerHTML = text;
    // var node_text = document.createTextNode(text);
    // box.appendChild(node_text);
    return box;
}

function getHeaderBox(text) {
    var box = document.createElement("div");
    // box.setAttribute("id", "header");
    box.setAttribute("class", "boxcutter");
    box.style.width = Math.round(3.5 * calib) + "px";
    box.style.height = calib + "px";
    box.style.fontSize = Math.round(calib / 1.2) + "px";
    cutter(box, 2);
    box.innerHTML = text;
    // var node_text = document.createTextNode(text);
    // box.appendChild(node_text);
    return box;
}

function cutter(element, factor) {
    element.style['-webkit-border-top-left-radius'] = Math.round(calib / factor) + "px";
    element.style['-moz-border-radius-topleft'] = Math.round(calib / factor) + "px";
    element.style['border-top-left-radius'] = Math.round(calib / factor) + "px";
    element.style['-webkit-border-top-right-radius'] = '0px';
    element.style['-moz-border-radius-topright'] = '0px';
    element.style['border-top-right-radius'] = '0px';
    element.style['-webkit-border-bottom-right-radius'] = Math.round(calib / factor) + "px";
    element.style['-moz-border-radius-bottomright'] = Math.round(calib / factor) + "px";
    element.style['border-bottom-right-radius'] = Math.round(calib / factor) + "px";
    element.style['-webkit-border-bottom-left-radius'] = '0px';
    element.style['-moz-border-radius-bottomleft'] = '0px';
    element.style['border-bottom-left-radius'] = '0px';
}

/* function startStagePurchaseFlow()
{
    hideStagePurchaseDialog();
    showWaitDialog();
    window.location  = 'ios:pro';
//    setTimeout(updateUi, 5000);
}

function startStageRestoreFlow()
{
    hideStagePurchaseDialog();
    showWaitDialog();
    window.location  = 'ios:rest';
//    setTimeout(updateUi, 5000);
}
 */
function startGameAction(stage) {
//    if(!events)
//    {
//        return;
//    }
    //var pro = getPreference("pro");
//    console.log("pro : " + pro);
    // if (isMoved == true) {
        // return;
    // }
    // if (stage > easyStage) {
        // if (pro === "false") {
           // if(purchasing === false)
           // {
            // showStagePurchaseDialog();
               // purchasing = true;
           // }
            // return;
        // }
    // }
    // var lastPlayedGame = getPreference("lastPlayedGame");
    lastPlayedGame = parseInt(lastPlayedGame);
    if (stage > lastPlayedGame) {
        return;
    }
	hideStages();
    document.body.style.backgroundImage = "url('./img/background2.jpg')";
    glasses = "";
    var game_div = document.getElementById("game" + stage);
    playSound("click");
//    vibrate(50);
    //removeStages();
    showCanvases();
    setTimeout(function(){init(stage)},200);
    pauseLoop();
}

/* function playRandomStage()
{
    document.body.style.backgroundImage = "url('./img/background2.jpg')";
    var pro = getPreference("pro");
    var lastPlayedGame = getPreference("lastPlayedGame");
    lastPlayedGame = parseInt(lastPlayedGame);
    var stage = lastPlayedGame + 20 + Math.floor(Math.random()*80);
    if (lastPlayedGame<70) {
        stage+= 40;
    }
    if(stage>hardStage)
    {
        stage = hardStage - 20 + Math.floor(Math.random()*20);
    }
    setTimeout(function(){initRandomStage(stage)},200);
    //setTimeout(function(){storePreference("gameNumber", lastPlayedGame);},500);
    pauseLoop();
} */

function startAnimation()
{
	//return;
	showCanvases();
	runAnim = true; 
	var animx1 = Math.random()*(window.innerWidth-4*calib)+2*calib;
	var animy1 = Math.random()*(window.innerHeight-4*calib)+2*calib;
	// var animx2 = Math.floor(Math.random()*(window.innerWidth-2*calib));
	// var animy2 = Math.floor(Math.random()*(window.innerHeight-2*calib));
	// var animx3 = Math.floor(Math.random()*(window.innerWidth-2*calib));
	// var animy3 = Math.floor(Math.random()*(window.innerHeight-2*calib));
	setTimeout(function (){animFrame(dctx, getRandomBall(), 0, animx1, animy1)},0);
	//setTimeout(function (){animFrame(ctx, getRandomBall(), 0, animx2, animy2)},1000);
	//setTimeout(function (){animFrame(tctx, getRandomBall(), 0, animx3, animy3)},2000);
}

//window.requestAnimFrame = (function(callback) {
//   return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
//   function(callback) {
//   window.setTimeout(callback, 1000 / 30);
//   };
//})();

function animFrame(context, animBall, animcount, animx, animy)
{
	clear(context);
	context.globalAlpha -= .1;
	var increment = animcount*animcount;
	context.drawImage(animBall,Math.floor(animx-increment/2),Math.floor(animy-increment/2),Math.floor(calib+increment),Math.floor(calib+increment));
	animcount+=1;
	if(animcount>10)
	{
		context.globalAlpha = 1;
		animBall = getRandomBall();
		animx = Math.random()*(window.innerWidth-4*calib)+2*calib;
		animy = Math.random()*(window.innerHeight-4*calib)+2*calib;
		animcount=0;
	}
	if(runAnim)
	{
		setTimeout(function (){animFrame(context, animBall, animcount, animx, animy)},30);
//        requestAnimFrame(function() {
//            animFrame(context, animBall, animcount, animx, animy);
//        });
	}
    else
    {
        clearInterval(animref);
        //        setTimeout(showCanvases,300);
        clear(context);
    }
}

function stopAnimation()
{
	runAnim = false;
}

function startHoldAnimation() {
    runAnim = true;
    var holdImage = new Image();
    holdImage.src = './img/hold.png';
    clcikAnimFrame(dctx, holdImage, 0)
}

function startTapAnimation() {
    runAnim = true;
    var handImage = new Image();
    handImage.src = './img/cursor.png';
    clcikAnimFrame(dctx, handImage, 0);
}

function clcikAnimFrame(context, handImage, animcount) {
    clear(context);
    if (glasses != "ingameplay")
        return;
    // context.globalAlpha -= .1;
    if (topElement) {
        animElement = topElement;
    }
    elementDraw(dctx, animElement);
    if (animcount % 4 === 0) {
        context.drawImage(handImage, animElement.x + calib / 2, animElement.y + calib / 2, calib / 2, calib / 2);
    }
    if (runAnim) {
        setTimeout(function () {
            clcikAnimFrame(context, handImage, animcount)
        }, 250);
    }
    else {
        clearInterval(animref);
        //        setTimeout(showCanvases,300);
        clear(context);
        elementDraw(dctx, animElement);
    }
    animcount += 1;
}

//this is drag animation code
function startHandAnimation() {
    runAnim = true;
    var handImage = new Image();
    handImage.src = './img/cursor.png';
    setTimeout(function () {
        handAnimFrame(dctx, handImage, 0)
    }, 0);
}

function handAnimFrame(context, image, animcount) {
    clear(context);
    if (glasses != "ingameplay")
        return;
    // context.globalAlpha -= .1;
    var increment = animcount * calib / 15;
//    context.drawImage(image, WIDTH / 2 + calib / 2 + increment, HEIGHT / 2 + calib / 2, calib / 2, calib / 2);
    if (topElement) {
        animElement = topElement;
    }
    elementDraw(dctx, animElement);
    context.drawImage(image, animElement.x - increment, animElement.y + calib + increment, calib / 2, calib / 2);

    animcount += 1;
    if (animcount > 30) {
        animcount = 0;
    }
    if (runAnim) {
        setTimeout(function () {
            handAnimFrame(context, image, animcount)
        }, 25);
    }
    else {
        clearInterval(animref);
//        setTimeout(showCanvases,300);
        clear(context);
        elementDraw(dctx, animElement);
    }
}

function getRandomBall()
{
	var seq = Math.floor((Math.random()*10)+1);
	//console.log(seq);
	switch(seq)
	{
		case 1:
			return redBall;
			break;
		case 2:
			return darkGreenBall;
			break;
		case 3:
			return yellowBall;
			break;
		case 4:
			return pinkBall;
			break;
		case 5:
			return deepBlueBall;
			break;
		case 6:
			return coralBall;
			break;
		case 7:
			return violetBall;
			break;
		case 8:
			return lightGreenBall;
			break;
		case 9:
			return orangeBall;
			break;
		case 10:
			return lightBlueBall;
			break;
		case 11:
			return oliveBall;
			break;
	}
}

function showCanvases() {
    var canvas_div = document.getElementById("canvas");
    if (canvas_div) {
        clear(ctx);
        clear(tctx);
        clear(dctx);
		dctx.globalAlpha = 1;
//        canvas_div.style.visibility = "visible";
//        // canvas_div.style.opacity="1";
//        tcanvas = document.getElementById("tcanvas");
//        tcanvas.style.visibility = "visible";
//        // tcanvas.style.opacity="1";
//        dcanvas = document.getElementById("dcanvas");
//        dcanvas.style.visibility = "visible";
//        // dcanvas.style.opacity="1";
//		clear(dctx);
    } else {
        tcanvas = document.createElement("canvas");
        tcanvas.setAttribute("id", "tcanvas");
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        dcanvas = document.createElement("canvas");
        dcanvas.setAttribute("id", "dcanvas");
		dcanvas.oncontextmenu = disable;
		tcanvas.oncontextmenu = disable;
		canvas.oncontextmenu = disable;

        HEIGHT = window.innerHeight + calib;
        tcanvas.width = dcanvas.width = canvas.width = WIDTH = window.innerWidth;
        tcanvas.height = dcanvas.height = canvas.height = window.innerHeight;

        ctx = canvas.getContext('2d');
        dctx = dcanvas.getContext('2d');
        tctx = tcanvas.getContext('2d');

        document.body.insertBefore(tcanvas, document.body.firstChild);
        document.body.insertBefore(canvas, document.body.firstChild);
        document.body.insertBefore(dcanvas, document.body.firstChild);
    }
}

function playSound(type) {
//	console.log("playSound called");
    //var haptics = "true";//getPreference("haptics");
    if (haptics === "true") {
        if (type === "click") {
            clickAudio.play();
        }
        if (type === "success") {
            var rand = Math.random() * 2;
            if(rand>1)
            {
                succAudio1.play();
            }
            else
            {
                succAudio2.play();
            }
        }
    }
}

// element id and effect duration
/* function removeEffect(element, duration) {
    if (element) {
        element.style.transition = "opacity " + duration + "ms ease-in 0.1s";
        element.style.opacity = 0;
    }
}

function removeElementWithDelay(element, delay) {
    setTimeout(function () {
        removeElement(element)
    }, delay);
};
*/
function removeElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
 };

/* function showWaitDialog()
{
    lastGlass = glasses;
    glasses = "wait";
//    events = false;
    var glass_div = document.getElementById("wait");
    if (glass_div) {
//        congo_header_div = document.getElementById("congoheader")
//        congo_header_div.innerHTML = getRandomString();
        glass_div.style.visibility = "visible";
        glass_div.style.opacity="1";
    }
    else
    {
        var glass_div = document.createElement("div");
        glass_div.setAttribute("id", "wait");
        glass_div.setAttribute("class", "glass slowtrans");
        glass_div.style.width = window.innerWidth + "px";
        glass_div.style.height = window.innerHeight + "px";
        //    glass_div.style.visibility = "hidden";
        //    glass_div.style.opacity="0";
        
        var header = document.createElement("div");
        header.setAttribute("id", "waitheader");
        header.style.width = Math.round(8.6 * calib) + "px";
        header.style.height = Math.round(1.1 * calib) + "px";
        header.style.fontSize = calib + "px";
        header.style.color = "#c92200";
        header.innerHTML = "Please wait...";
        header.style.fontFamily = "myFont";
        header.style.fontWeight = "bold";
        header.style.textAlign = "center";
        //header.style.textShadow = "1px 1px 0px #ded17c";
        
        var container_div = document.createElement("div");
        container_div.setAttribute("class", "buttonContainer");
        container_div.style.width = Math.round(calib * 8.6) + "px";
        container_div.style.height = Math.round(calib * 1.1) + "px";
        container_div.style.borderRadius = Math.round(calib) / 2 + "px";
        // container_div.style.padding = "0px "+calib/4+"px "+calib/4+"px
        // "+calib/4+"px";
        container_div.style.bottom = "0";
        container_div.style.left = "0";
        container_div.style.top = "0";
        container_div.style.right = "0";
//        container_div.appendChild(nextGame_div);
//        container_div.appendChild(congomenu_div);
        container_div.appendChild(header);
        glass_div.appendChild(container_div);
        document.body.insertBefore(glass_div, document.body.firstChild);
    }
}

function hideWaitDialog()
{
    if(glasses === "wait")
    {
        glasses = lastGlass;
        //    events = true;
        var glass_div = document.getElementById("wait");
        if (glass_div) {
            //        congo_header_div = document.getElementById("congoheader")
            //        congo_header_div.innerHTML = getRandomString();
            glass_div.style.visibility = "hidden";
            glass_div.style.opacity="0";
        }
    }
} */

function createCongoDialog()
{
    var glass_div = document.createElement("div");
    glass_div.setAttribute("id", "congo");
    glass_div.setAttribute("class", "glass slowtrans");
    glass_div.style.width = window.innerWidth + "px";
    glass_div.style.height = window.innerHeight + "px";
    glass_div.style.visibility = "hidden";
    glass_div.style.opacity="0";
    
    var nextGame_div = document.createElement("div");
    nextGame_div.setAttribute("id", "nextGame");
    nextGame_div.style.width = Math.round(calib * 5.5) + "px";
    nextGame_div.style.height = calib + "px";
    nextGame_div.style.fontSize = calib + "px";
    nextGame_div.style.margin = "auto";
    nextGame_div.style.padding = Math.round(calib / 8) + "px";
    nextGame_div.style.position = "absolute";
    nextGame_div.style.top = "58%";
    nextGame_div.style.left = "2%";
    nextGame_div.style.textAlign = "center";
    var node_text = document.createTextNode("Next Game");
    nextGame_div.appendChild(node_text);
    nextGame_div.setAttribute("class", "button blue anim1");
    
    var congomenu_div = document.createElement("div");
    congomenu_div.setAttribute("id", "congomenu");
    congomenu_div.style.width = Math.round(calib * 5.5) + "px";
    congomenu_div.style.height = calib + "px";
    congomenu_div.style.fontSize = calib + "px";
    congomenu_div.style.margin = "auto";
    congomenu_div.style.padding = Math.round(calib / 8) + "px";
    congomenu_div.style.position = "absolute";
    congomenu_div.style.top = "58%";
    congomenu_div.style.right = "2%";
    congomenu_div.style.textAlign = "center";
    var node_text = document.createTextNode("Main Menu");
    congomenu_div.appendChild(node_text);
    congomenu_div.setAttribute("class", "button blue anim2");
    
    var header = document.createElement("div");
    header.setAttribute("id", "congoheader");
    header.style.width = Math.round(12.5 * calib) + "px";
    header.style.height = Math.round(1.5 * calib) + "px";
    header.style.fontSize = 2 * calib + "px";
    header.style.color = "#c92200";
    header.innerHTML = "well done";
    header.style.fontFamily = "myFont";
    header.style.fontWeight = "bold";
    header.style.textAlign = "center";
    //header.style.textShadow = "1px 1px 0px #ded17c";
    
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.style.width = Math.round(calib * 12.5) + "px";
    container_div.style.height = Math.round(calib * 3.8) + "px";
    container_div.style.borderRadius = Math.round(calib) / 2 + "px";
    // container_div.style.padding = "0px "+calib/4+"px "+calib/4+"px
    // "+calib/4+"px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.right = "0";
    container_div.appendChild(nextGame_div);
    container_div.appendChild(congomenu_div);
    container_div.appendChild(header);
    glass_div.appendChild(container_div);
    document.body.insertBefore(glass_div, document.body.firstChild);
    
    addEvent("nextGame", nextGame);
    addEvent("congomenu", congomenuAction);
}

function showCongoDialog() {
    glasses = "congo";
    var glass_div = document.getElementById("congo");
//    if (glass_div) {
	congo_header_div = document.getElementById("congoheader")
	congo_header_div.innerHTML = getRandomString();
	glass_div.style.visibility = "visible";
	glass_div.style.opacity="1";
    playSound("success");
//    vibrate(700);
}

function congomenuAction() {
    if (events) {
		fromTutorial = false;
        disableEvents();
        //var congomenu = document.getElementById("congomenu");
        hideBannerBox();
		hideMessageBoard();
//        setTimeout(hideBannerBox, 400);
//        storePreference("silentZone", "false");
        hideCongoDialog();
//        setTimeout(hideCongoDialog, 400);
        showCanvases();
//        setTimeout(showCanvases, 400);
        showMainMenu();
//        setTimeout(showMainMenu, 400);
        setBackgroundImage1();
//        setTimeout(setBackgroundImage1, 400);
        playLoop();
    }
}

function nextGame() {
    if (events) {
        disableEvents();
        var nextGame_div = document.getElementById("nextGame");
        //gameNumber = getPreference("gameNumber");
        //gameNumber = parseInt(gameNumber);        
        // var pro = getPreference("pro");
        // if (pro === "false" && gameNumber + 1 > easyStage) {
            // setTimeout(promptPurchase, 400);
            // return;
		// }
        if(gameNumber + 1 > hardStage)
        {
            hideCongoDialog();
            events = true;
            backHandler();
        }
        else
        {
            hideCongoDialog();
            init(gameNumber + 1);
        }
		
		if (fromTutorial == true) {
            if (gameNumber == 0) {
                //            stopAnimation();
                showMessageBoard("Left click on the Element to rotate..");
                ref = setInterval(rotationChecker, 300);
                startTapAnimation();
            }
            if (gameNumber == 1) {
                //            stopAnimation();
                showMessageBoard("Right click on the Element to flip.");
                ref = setInterval(flipChecker, 300);
                hideBannerBox();
                startHoldAnimation();
            }
            if (gameNumber == 2) {
                skipTutorial = "true";
//                saveSkipTutorial(skipTutorial);
                showMessageBoard("Let's start with a simple game");
                hideBannerBox();
            }
            if (gameNumber == 3) {
                showMessageBoard("You are ready now ..");
                hideBannerBox();
                fromTutorial = false;
                //glasses = "";
                setTimeout(function () {
                    glasses = "ingameplay";
					showBannerBox(gameNumber);
                }, 3500);
                setTimeout(hideMessageBoard, 3000);
                //setTimeout(showLeaderBoard, 3000);
                //setTimeout(showHintPanel, 3000);
            }
        }
    }
}

// as of now separate purchase flow is not implemented.
// will open the locked medium stages for further transaction
/* function promptPurchase() {
    hideCongoDialog();
    hideHintButton();
    setBackgroundImage1();
    // hideCanvases();
    showCanvases();
    hideBannerBox();
//    showLoadingGif();
    showMediumStages();
    playLoop();
} */

function hideCongoDialog() {
    glasses = "ingameplay";
    var glass_div = document.getElementById("congo");
    glass_div.style.visibility = "hidden";
    // setTimeout(function(){glass_div.style.visibility="hidden";},400);
    glass_div.style.opacity="0";
}

function initSolution(stageNumber) {
    showCanvases();
    //var lastPlayedGame = getPreference("lastPlayedGame");
    var stage = parseInt(stageNumber);
    lastPlayedGame = parseInt(lastPlayedGame);
    if(stage <= 1)
    {
        unboundedSolution(1);
        return;
    }
    if ((stage > 0 && stage <= lastPlayedGame) || stage <= 1)
    {
        unboundedSolution(stage);
    }
}

function unboundedSolution(stageNumber)
{
    var stage = parseInt(stageNumber);
    holes = new Array();
    drawTriangle();
    // get the game number from menu;
    loadSolution(stage);
    //initialDraw();
	clear(ctx);
		for (i = elementArray.length - 1; i >= 0; i--) {
			elementDraw(ctx, elementArray[i]);
		}
	clear(dctx);
}

function increaseHint()
{
    if(hintCount<=2)
    {
        if (hintTime) {
			const savedHintTime = new Date(hintTime);
			const now = new Date();
			if (now - savedHintTime > TIMESPAN_MS) {
				hintCount++;
				setHintCount(hintCount);
				setHintTime(now.toISOString());
			}
			var hintCounter = document.getElementById('hintCounter');
			if(hintCounter)
			{
				hintCounter.innerHTML = hintCount;
			}
		}
    }
}

// function hintPurchased()
// {
    // hideWaitDialog();
    // var hintCount = getPreference("hintCount");
    // hintCount = parseInt(hintCount);
    // hintCount+=20;
    // storePreference("hintCount", hintCount);
    // var hintCounter = document.getElementById('hintCounter');
    // if(hintCounter)
    // {
        // hintCounter.innerHTML = hintCount;
    // }
// }

// function initRandomStage(stageNumber)
// {
    // glasses = "ingameplay";
    // showBackButton();
    // showCanvases();
    // drawTriangle();
    // showHintButton();
    // loadGame(stageNumber);
    // struggle = false;
    // struggleCount = 0;
    // initGame();
// }

function init(stageNumber) {
    glasses = "ingameplay";

	increaseHint();
    showCanvases();
    drawTriangle();

    showBannerBox(stageNumber);
    // for help, need double initialization to reset full element array;
    if (stageNumber < 0) {
        loadGame(stageNumber);
    }
    if (stageNumber > 0 && fromTutorial == false) {
//        showHintCounter();
        showHintButton();
    }
    // if (stageNumber === 1)
    // {
        // struggle = true;
        // struggleCount = 0;
    // }
    // else
    // {
        // struggle = false;
        // struggleCount = 0;
    // }
    loadGame(stageNumber);
    initGame();
}

function hideBannerBox() {
    var banner_box = document.getElementById('banner');
    if (banner_box) {
        banner_box.style.visibility = "hidden";
        // setTimeout(function(){banner_box.style.visibility="hidden";},400);
        // banner_box.style.opacity="0";
    }
}

function showBannerBox(stageNumber) {
    var banner_box = document.getElementById('banner');
    if (stageNumber > 0) {
        if (banner_box) {
            banner_box.innerHTML = stageNumber;
            banner_box.style.visibility = "visible";
            // banner_box.style.opacity="1";
        } else {
            var banner_box = getHeaderBox(stageNumber);
            banner_box.setAttribute("id", "banner");
            banner_box.style.right = "1%";
            banner_box.style.top = "2%";
            banner_box.style.left = "initial";
//            banner_box.addEventListener("touchend", enableTutorial);
            document.body.insertBefore(banner_box, document.body.firstChild);
        }
    }
}

/* function enableTutorial() {
    enableTut++;
    if(enableTut > 5)
    {
        storePreference("skipTutorial", "false");
        storePreference("lastPlayedGame", 1);
    }
} */

function hideBackButton() {
    var backContainer = document.getElementById('backContainer');
    if (backContainer) {
        backContainer.style.visibility = "hidden";
        // setTimeout(function(){banner_box.style.visibility="hidden";},400);
        // banner_box.style.opacity="0";
    }
}

function showBackButton() {
    var backContainer = document.getElementById('backContainer');
    if (backContainer) {
        backContainer.style.visibility = "visible";
        // banner_box.style.opacity="1";
    } else {
        var backContainer = document.createElement("div");
        backContainer.setAttribute("id", "backContainer");
        backContainer.style.width = Math.round(1.5 * calib) + "px";
        backContainer.style.height = Math.round(.8 * calib) + "px";
        backContainer.style.zIndex = "5";
        backContainer.style.left = "2%";
		backContainer.style.top = "1.5%";
        // if(ipad)
        // {
            // backContainer.style.top = "1.5%";
        // }
        // else
        // {
            // backContainer.style.top = "1.8%";
        // }
        backContainer.style.position = "absolute";
        
        var backButton = document.createElement("div");
        backButton.setAttribute("class", "img");
        backButton.setAttribute("id", "backButton");
        backButton.style.width = 1.5 * calib + "px";
        backButton.style.height = Math.round(.8 * calib) + "px";
//        backButton.style.left = "2%";
//        backButton.style.top = "1.3%";
//        backButton.style.right = "initial";
        backButton.style.bottom = "0";
		backButton.style.cursor='pointer';
        backButton.style.backgroundImage = "url('./img/back.png')";
//        backButton.style.zIndex = "5";
        backContainer.appendChild(backButton);
        document.body.insertBefore(backContainer, document.body.firstChild);
        addEvent("backButton", backHandler);
    }
}

function createHintButton()
{
    var hintContainer = document.createElement("div");
    hintContainer.setAttribute("id", "hintContainer");
    hintContainer.style.width = Math.round(1.2 * calib) + "px";
    hintContainer.style.height = Math.round(1.2 * calib) + "px";
    hintContainer.style.zIndex = "5";
    hintContainer.style.left = "12%";
    hintContainer.style.right = "initial";
    hintContainer.style.visibility = "hidden";
    hintContainer.style.opacity="0";
    // if(ipad)
    // {
        // hintContainer.style.top = "1.5%";
    // }
    // else
    {
        hintContainer.style.top = "1.8%";
    }
    hintContainer.style.position = "absolute";
    
    var hintButton = document.createElement("div");
    hintButton.setAttribute("class", "img");
    hintButton.setAttribute("id", "hintButton");
    hintButton.style.width = Math.round(1.2 * calib) + "px";
    hintButton.style.height = Math.round(1.2 * calib) + "px";
    hintButton.style.bottom = "0";
    hintButton.style.backgroundImage = "url('./img/help.png')";
    hintContainer.appendChild(hintButton);
    document.body.insertBefore(hintContainer, document.body.firstChild);
    addEvent("hintButton", showHint);
    
    //create a dummy image div to preload image lock icon
    var dummyLock = document.createElement("div");
    dummyLock.setAttribute("class", "img");
    dummyLock.style.backgroundImage = "url('./img/lock_yellow.png')";
    dummyLock.style.visibility = "hidden";
    dummyLock.style.opacity="0";
    document.body.insertBefore(dummyLock, document.body.firstChild);
}

function showHintButton() {
    var hintContainer = document.getElementById('hintContainer');
    if (hintContainer) {
        hintContainer.style.visibility = "visible";
        hintContainer.style.opacity="1";
    }
    showHintCounter();
}

function showHintCounter() {
    var hintCounter = document.getElementById('hintCounter');
    //var hintCount = getPreference("hintCount");
    //    hintCount = parseInt(hintCount);
    if (hintCounter) {
        hintCounter.style.visibility = "visible";
        hintCounter.style.opacity="1";
    } else {
        var hintCounter = document.createElement("div");
        hintCounter.setAttribute("id", "hintCounter");
        var radius = Math.round(calib/1.3);
        hintCounter.style.width = radius + "px";
        hintCounter.style.height = radius + "px";
        hintCounter.style.zIndex = "6";
        hintCounter.style.left = "17%";
        hintCounter.style.right = "initial";
        hintCounter.style.borderRadius = radius + "px";
        hintCounter.style.backgroundColor = "#61d1f1";
        hintCounter.style.fontSize = radius/1.3 + "px";
        hintCounter.style.color = "#c92200";
        hintCounter.style.textAlign = "center";
        // if(ipad)
        // {
            // hintCounter.style.top = "0.5%";
        // }
        // else
        {
            hintCounter.style.top = "0.8%";
        }
        hintCounter.style.position = "absolute";
        document.body.insertBefore(hintCounter, document.body.firstChild);
    }
    hintCounter.innerHTML = hintCount;
}

function hideHintCounter() {
    var hintCounter = document.getElementById('hintCounter');
    //    var hintCount = getPreference("hintCount");
    //    hintCount = parseInt(hintCount);
    if (hintCounter) {
        hintCounter.style.visibility = "hidden";
        hintCounter.style.opacity="0";
    }
}

function showHint()
{
//    glasses = "hint";
//    loadSolution();
//    initialDraw();
    if(!events)
    {
        return;
    }
    if(glasses === "congo")
    {
        return;
    }
    //var gameNumber = getPreference("gameNumber");
    //gameNumber = parseInt(gameNumber);
    // var hintCount = getPreference("hintCount");
    // hintCount = parseInt(hintCount);
    if(hintCount>0)
    {
        events = false;
//        tmpElementArray = elementArray.slice(0);
        hintCount--;
        setHintCount(hintCount);
        var hintCounter = document.getElementById('hintCounter');
        hintCounter.innerHTML = hintCount;
        for (i = elementArray.length - 1; i >= 0; i--)
        {
//            elementDraw(ctx, elementArray[i]);
            if(!tmpElementArray[i])
            {
                tmpElementArray[i] = {};
            }
            tmpElementArray[i].name = elementArray[i]["name"];
            tmpElementArray[i].angle = elementArray[i]["angle"];
            tmpElementArray[i].flip = elementArray[i]["flip"];
            tmpElementArray[i].disable = elementArray[i]["disable"];
            tmpElementArray[i].x = elementArray[i]["x"];
            tmpElementArray[i].y = elementArray[i]["y"];
            tmpElementArray[i].posinArray = elementArray[i]["posinArray"];
        }
//            initSolution(gameNumber);
        showCanvases();
        unboundedSolution(gameNumber);
        setTimeout(clearHint, 3000);
    }
    else
    {
        //showHintPurchaseDialog();
    }
}

function clearHint()
{
//    glasses = "ingameplay";
//    loadSolution();
//    initialDraw();
    events = true;
//    var gameNumber = getPreference("gameNumber");
//    gameNumber = parseInt(gameNumber);
//    init(gameNumber);
    for (i = tmpElementArray.length - 1; i >= 0; i--)
    {
        //            elementDraw(ctx, elementArray[i]);
        if (tmpElementArray[i].name === "RedElement") {
            elementArray[i] = RedElement;
        }
        if (tmpElementArray[i].name === "DarkGreenElement") {
            elementArray[i] = DarkGreenElement;
        }
        if (tmpElementArray[i].name === "YellowElement") {
            elementArray[i] = YellowElement;
        }
        if (tmpElementArray[i].name === "DeepBlueElement") {
            elementArray[i] = DeepBlueElement;
        }
        if (tmpElementArray[i].name === "PinkElement") {
            elementArray[i] = PinkElement;
        }
        if (tmpElementArray[i].name === "GreyElement") {
            elementArray[i] = GreyElement;
        }
        if (tmpElementArray[i].name === "CoralElement") {
            elementArray[i] = CoralElement;
        }
        if (tmpElementArray[i].name === "VioletElement") {
            elementArray[i] = VioletElement;
        }
        if (tmpElementArray[i].name === "LightGreenElement") {
            elementArray[i] = LightGreenElement;
        }
        if (tmpElementArray[i].name === "OrangeElement") {
            elementArray[i] = OrangeElement;
        }
        if (tmpElementArray[i].name === "LightBlueElement") {
            elementArray[i] = LightBlueElement;
        }
        if (tmpElementArray[i].name === "OliveElement") {
            elementArray[i] = OliveElement;
        }
//        elementArray[i].name = tmpElementArray[i].name;
        elementArray[i].disable = tmpElementArray[i]["disable"];
        elementArray[i].angle = tmpElementArray[i]["angle"];
        elementArray[i].flip = tmpElementArray[i]["flip"];
        elementArray[i].setPos(tmpElementArray[i]["x"], tmpElementArray[i]["y"]);
        elementArray[i].posinArray = tmpElementArray[i]["posinArray"];
    }
    initialDraw();
}

function hideHintButton() {
    var hintContainer = document.getElementById('hintContainer');
    if (hintContainer) {
        hintContainer.style.visibility = "hidden";
        hintContainer.style.opacity="0";
    }
    hideHintCounter();
}

function hideHelpButton() {
    var backContainer = document.getElementById('helpContainer');
    if (backContainer) {
        backContainer.style.visibility = "hidden";
        // setTimeout(function(){banner_box.style.visibility="hidden";},400);
        // banner_box.style.opacity="0";
    }
}

//function showHelpButton() {
//    var backContainer = document.getElementById('helpContainer');
//    if (backContainer) {
//        backContainer.style.visibility = "visible";
//        // banner_box.style.opacity="1";
//    } else {
//        var backContainer = document.createElement("div");
//        backContainer.setAttribute("id", "helpContainer");
//        backContainer.style.width = Math.round(2 * calib) + "px";
//        backContainer.style.height = Math.round(2 * calib) + "px";
//        backContainer.style.zIndex = "5";
//        backContainer.style.left = "2%";
//        if(ipad)
//        {
//            backContainer.style.top = "1.5%";
//        }
//        else
//        {
//            backContainer.style.top = "1.8%";
//        }
//        backContainer.style.position = "absolute";
//        
//        var backButton = document.createElement("div");
//        backButton.setAttribute("class", "img");
//        backButton.setAttribute("id", "backButton");
//        backButton.style.width = 4 * calib + "px";
//        backButton.style.height = Math.round(.8 * calib) + "px";
//        //        backButton.style.left = "2%";
//        //        backButton.style.top = "1.3%";
//        //        backButton.style.right = "initial";
//        backButton.style.bottom = "0";
//        backButton.style.backgroundImage = "url('./img/back.png')";
//        //        backButton.style.zIndex = "5";
//        backContainer.appendChild(backButton);
//        document.body.insertBefore(backContainer, document.body.firstChild);
//        addEvent("backButton", backHandler);
//    }
//}

function initGame() {
    console.log("init game called");
    elementCount = elementArray.length;

    // setInterval(rotate,5000);
     initialDraw();
//     initialDraw();
//    setTimeout(initialDraw, 100);

    if (!dcanvas.onmousedown) {
        // make draw() fire every INTERVAL milliseconds
        // setInterval(draw, INTERVAL);

        // set our events. Up and down are for dragging,
        if (enableMouse) {
            dcanvas.onmousedown = mouseselect;
            dcanvas.onmousemove = mouseMove;
            dcanvas.onmouseup = deselect;
        } else {
            dcanvas.onmousedown = disable;
            dcanvas.onmousemove = disable;
            dcanvas.onmouseup = disable;
            dcanvas.onclick = disable;

            dcanvas.ontouchstart = touchselect;
            dcanvas.ontouchmove = touchMove;
            dcanvas.ontouchend = deselect;
        }
    }
}

function disable(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function drawline(x, y) {
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function draw() {
    // console.log("drawing out");
//    moveCount++;
    if (isSelect == true && topElement) {
        if(glasses === "ingameplay")
        {
            clear(dctx);
            // dctx.clearRect(topElement.x-2*calib,topElement.y-2*calib,4*calib,4*calib);
            elementDraw(dctx, topElement);
        }
        else
        {
            clear(ctx);
            // dctx.clearRect(topElement.x-2*calib,topElement.y-2*calib,4*calib,4*calib);
            elementDraw(ctx, topElement);
        }
        
    }
}

function initialDraw() {
//    console.log("glasses : " + glasses);
    if (glasses === "ingameplay" || glasses === "congo") {
        clear(ctx);
        for (i = elementArray.length - 1; i > 0; i--) {
            elementDraw(ctx, elementArray[i]);
        }
        clear(dctx);
        elementDraw(dctx, elementArray[0]);
    }
    else if(glasses === "intutorial")
    {
        clear(tctx);
        for (i = elementArray.length - 1; i > 0; i--) {
            elementDraw(tctx, elementArray[i]);
        }
        clear(ctx);
        elementDraw(ctx, elementArray[0]);
    }
//    else if(glasses === "hint")
//    {
//        clear(tctx);
//        for (i = elementArray.length - 1; i >= 0; i--) {
//            elementDraw(tctx, elementArray[i]);
//        }
//    }
	// else if(glasses === "solutionpanel")
	// {
		// clear(ctx);
		// for (i = elementArray.length - 1; i >= 0; i--) {
			// elementDraw(ctx, elementArray[i]);
		// }
		// clear(dctx);
	// }
}

function rotateElement(frame, element) {
    if (frame > 5) {
        return;
    }
    element.rotate(15);
    initialDraw();
    setTimeout(function () {
        rotateElement(++frame, element);
    }, 10);
}

function elementDraw(context, element) {
    if (!context) {
        return;
    }
    var ball;
    if (element.name === "RedElement") {
        ball = redBall;
    }
    if (element.name === "DarkGreenElement") {
        ball = darkGreenBall;
    }
    if (element.name === "YellowElement") {
        ball = yellowBall;
    }
    if (element.name === "DeepBlueElement") {
        ball = deepBlueBall;
    }
    if (element.name === "PinkElement") {
        ball = pinkBall;
    }
    if (element.name === "GreyElement") {
        ball = greyBall;
    }
    if (element.name === "CoralElement") {
        ball = coralBall;
    }
    if (element.name === "VioletElement") {
        ball = violetBall;
    }
    if (element.name === "LightGreenElement") {
        ball = lightGreenBall;
    }
    if (element.name === "OrangeElement") {
        ball = orangeBall;
    }
    if (element.name === "LightBlueElement") {
        ball = lightBlueBall;
    }
    if (element.name === "OliveElement") {
        ball = oliveBall;
    }

    for (var i = 0; i < element.posArray.length; i++) {
        if (element.disable) {
            context.globalAlpha = 0.8;
            context.drawImage(ball, Math.round(element.posArray[i].x), Math.round(element.posArray[i].y), calib, calib);
            context.globalAlpha = 1;
        } else {
            context.drawImage(ball, Math.round(element.posArray[i].x), Math.round(element.posArray[i].y), calib, calib);
        }
    }
}

function select(x, y) {
    startTime = Date.now();
//    moveCount = 0;
    isMoved = false;
    // console.log("inside select isMoved : "+isMoved);
    topElement = getElement(x, y);
    if (topElement.disable) {
        topElement = false;
    }
    if (topElement != false) {
        // console.log("select true");
        //ontapTimer = setTimeout(onTapHold, 1000);
        isSelect = true;
		// tsupported = getPreference("tsupported");
		// if(tsupported === "true")
		// {
		if(glasses === "ingameplay")
        {
            dctx.globalAlpha = 0.5;
        }
        else
        {
            ctx.globalAlpha = 0.5;
        }
		// }
        for (i = topElement.posinArray; i > 0; i--) {
            elementArray[i] = elementArray[i - 1];
            elementArray[i].posinArray++;
        }
        elementArray[0] = topElement;
        topElement.posinArray = 0;
        xoffset = x - topElement.x;
        yoffset = y - topElement.y;
//        txoffset = x;
//        tyoffset = y;
        initialDraw();
//        vibrate(40);
    }
}

function mouseselect(e) {
	if(e.which == 1)
	{
		select(e.pageX, e.pageY);
	}
	else if(e.which == 3)
	{
		onTapHold(e.pageX, e.pageY);
	}
	e.preventDefault();
	return false;
}

function touchselect(e) {
    // drawline(e.touches[0].pageX, e.touches[0].pageY);
    if (e.touches.length > 1) {
        return;
    }
    // if(struggle === true)
    // {
        // struggleCount+=1;
        // if(elementArray[0].flip === 1)
        // {
            // if(struggleCount === 4)
            // {
                // info = "longpress to flip";
                // showInfoBoard();
                // setTimeout(hideInfoBoard, 2000);
            // }
            // if(struggleCount === 7)
            // {
                // info = "use your fingertip";
                // showInfoBoard();
                // setTimeout(hideInfoBoard, 2000);
            // }
            // if(struggleCount === 10)
            // {
                // info = "longpress to flip";
                // showInfoBoard();
                // setTimeout(hideInfoBoard, 2000);
            // }
        // }
    // }
    select(e.touches[0].pageX, e.touches[0].pageY);
	e.preventDefault();
}

function onTapHold(x, y) {
    // console.log("onTapHold called, isMoved : "+isMoved);
	//select(x, y);
	topElement = getElement(x, y);
    if (topElement.disable) {
        topElement = false;
    }
    if (topElement != false) {
		isSelect = true;
		if(glasses === "ingameplay")
        {
            dctx.globalAlpha = 0.5;
        }
        else
        {
            ctx.globalAlpha = 0.5;
        }
		// }
        for (i = topElement.posinArray; i > 0; i--) {
            elementArray[i] = elementArray[i - 1];
            elementArray[i].posinArray++;
        }
        elementArray[0] = topElement;
        topElement.posinArray = 0;
		xoffset = x - topElement.x;
        yoffset = y - topElement.y;
        topElement.flipElement();
        // element can be flipped inside the triangle, so center should be
        // recalculated
        center = onTop(topElement.x + calib / 2, topElement.y + calib / 2);
        initialDraw();
    }
}

function deselect(e) {
	firstMove = true;
    if (isSelect && topElement) {
        center = onTop(topElement.x + calib / 2, topElement.y + calib / 2);
    }
    //clearTimeout(ontapTimer);
    endTime = Date.now();
    // console.log(endTime-startTime);
    //it is a click
	// console.log("inside deselect isMoved : "+isMoved);
    if (endTime - startTime < 500) {
        if (topElement != false && isMoved == false) {
            if (e.which == 1) {
                rotateElement(0, topElement);
            }
//                topElement.rotate(90);
            // element can be flipped inside the triangle, so center should be
            // recalculated
            center = onTop(topElement.x + calib / 2, topElement.y + calib / 2);
            initialDraw();
        }
    }

    if ( !! center) {
        // console.log("x : "+center.x+" y : "+center.y);
        topElement.setPos(center.x - calib / 2, center.y - calib / 2);
        topElement.ipos = center.ipos;
        topElement.jpos = center.jpos;
		initialDraw();
		setTimeout(function(){checkOccupancy(elementArray);}, 100);
        // checkOccupancy(elementArray);
    } else {
        topElement.ipos = null;
        topElement.jpos = null;
    }
    isSelect = false;
	// console.log("isSelect false");
    if(glasses === "ingameplay")
    {
        dctx.globalAlpha = 1;
    }
    else
    {
        ctx.globalAlpha = 1;
    }
    initialDraw();
    center = undefined;
    // toffsetCal = true;
	e.preventDefault();
}

function move(x, y) {
    if (isSelect && topElement) 
	{
		if(firstMove)
		{
			firstMove = false;
			return;
		}
//		console.log("move called "+x+":"+y);
        // moveCount++;
        // console.log("element moved");
        // calculate the offset for only once. When the first move event is
        // fired.
        // if (toffsetCal) {
//            txoffset = x - txoffset;
//            tyoffset = y - tyoffset;
            // xinterpol = x;
            // yinterpol = y;
            // toffsetCal = false;
        // }
        isMoved = true;
		// console.log("isMoved true");
        if ((x - xoffset) > 0 && (x - xoffset) < WIDTH - calib) {
            if ((y - yoffset) > 0 && (y - yoffset) < HEIGHT - calib) {
                // this is to double the draw, in every 1 sec, only 15-16
                // touchmove events are fired. which is not the desired frame
                // rate.
                // will remove this block after testing on low end devices.
                // var xtmp = (xinterpol + x) / 2;
                // var ytmp = (yinterpol + y) / 2;
                // topElement.setPos(xtmp - xoffset, ytmp - yoffset);
                // draw();
                // setTimeout(draw, 0);
                topElement.setPos(x - xoffset, y - yoffset);
                // xinterpol = x;
                // yinterpol = y;

                // reduce txoffset and tyoffset on every move
//                txoffset = txoffset - txoffset / 2;
//                tyoffset = tyoffset - tyoffset / 2;
				// setTimeout(draw, 0);
				draw();
            }
        }
    }
}

function mouseMove(e) {
	// if (isSelect && topElement) 
	// {
	// console.log("bubbles : "+e.bubbles);
	// console.log("type : "+e.type);
	// console.log("detail : "+e.detail);
	// console.log("button : "+e.button);
    move(e.pageX, e.pageY);
	// }
}

function touchMove(e) {
    // drawline(e.touches[0].pageX, e.touches[0].pageY);
    move(e.touches[0].pageX, e.touches[0].pageY);
	e.preventDefault();
}

function clear(context) {
    if (context) {
        context.clearRect(0, 0, WIDTH, HEIGHT);
    }
}

function getElement(x, y) {
    for (i = 0; i < elementArray.length; i++) {
        if (isPixelOnTop(elementArray[i], x, y))
            return elementArray[i];
    }
    return false;
}

function isPixelOnTop(element, x, y) {
    for (var i = 0; i < element.posArray.length; i++) {
        if (isPixelOnBox(x, y, element.posArray[i].x, element.posArray[i].y))
            return true;
    }
}

//function vibrate(time) {
//    var vibrate = getPreference("vibrate");
//    if (!enableMouse && vibrate === "true") {
//        Android.vibrate(time);
//    }
//}

function disableEvents() {
    events = false;
    setTimeout(enableEvents, 600);
}

function enableEvents() {
    events = true;
}

//function unsetPurchasing() {
//    purchasing = false;
//}