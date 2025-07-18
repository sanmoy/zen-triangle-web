var glasses = "";
var lastGlass = "";
var easterEgg = 0;
var proFalse = 0;
var enableTut = 0;

function backHandler() {
    if(!events)
    {
        return;
    } else if (glasses === "") {
        //intermediate state.. do nothing
//        return;
    } else if (glasses === "settingmenu") {
        hideSettings();
        showMainMenu();
    } else if (glasses === "EMH") {
        disableEvents();
        hideEMHMenu();
        showMainMenu();
        easterEgg++;
        if (easterEgg == 5) {
            // var lastPlayedGame = getPreference("lastPlayedGame");
            lastPlayedGame = parseInt(lastPlayedGame);
            if(lastPlayedGame<easyStage)
            {
				setLastPlayedGame(easyStage-1);
                // storePreference("lastPlayedGame", easyStage-1);
            }
            else if(lastPlayedGame>medStage)
            {
				setLastPlayedGame(hardStage-1);
                // storePreference("lastPlayedGame", hardStage-1);
            }
            else
            {
				setLastPlayedGame(medStage-1);
                // storePreference("lastPlayedGame", medStage-1);
            }
        }
        return;
    } else if (glasses === "gamestage") {
        // removeStages();
		hideStages();
        showEMH();
    } else if (glasses === "ingameplay") {
		fromTutorial = false;
		hideHintButton();
        struggle = false;
        struggleCount = 0;
        glasses = "gamestage";
        playLoop();
        setBackgroundImage1();
        //hideNextPanel();
        hideReadyDiv();
        hideMessageBoard();
        showCanvases();
        hideBannerBox();
        gameNumber = parseInt(gameNumber);
        if (gameNumber <= easyStage) {
			setTimeout(showEasyStages, 200);
        }
        if (gameNumber > easyStage && gameNumber <= medStage) {
			setTimeout(showMediumStages, 200);
        }
        if (gameNumber > medStage) {
			setTimeout(showHardStages, 200);
        }
    } else if (glasses === "helpmenu") {
        hideHelpMenu();
        showMainMenu();
    } else if (glasses === "congo") {
        hideCongoDialog();
    } else if (glasses === "solutionpanel") {
        //special code for testing
        // var input = document.getElementById("input");
        // var value = parseInt(input.value);
        // value++;
        // input.value = value;
        // initSolution(value);
        //return;
        //end of special test code
//        storePreference("refreshRequired", "false");
        setBackgroundImage1();
        hideSolutions();
        //hideCanvases();
        showCanvases();
        showHelp();
    } else if (glasses === "intutorial") {
        fromTutorial = false;
//        storePreference("silentZone", "false");
        setBackgroundImage1();
        clearInterval(ref);
        struggle = false;
        struggleCount = 0;
        // clearStepCheck();
        stopAnimation();
        //hideNextPanel();
        hideReadyDiv();
        hideMessageBoard();
        //hideCanvases();
        showCanvases();
		showMainMenu();
        //showHelp();
        playLoop();
    } else if (glasses === "promptTutorial") {
        hidePromptTutorial();
        showMainMenu();
    }
    easterEgg = 0;
    proFalse = 0;
    enableTut = 0;
}

// function clearStepCheck()
// {
    // if(ref2)
    // {
        // clearInterval(ref2);
    // }
// }

/* function createWeeklyChallengeDialog()
{
    var glass_div = document.createElement("div");
    glass_div.setAttribute("class", "glass fasttrans");
    glass_div.setAttribute("id", "weeklychallenge");
    glass_div.style.width = window.innerWidth + "px";
    glass_div.style.height = window.innerHeight + "px";
    glass_div.style.visibility = "hidden";
    glass_div.style.opacity = "0";

    var yes_div = document.createElement("div");
    yes_div.setAttribute("id", "yesplay");
    yes_div.style.width = calib * 3 + "px";
    yes_div.style.fontSize = calib + "px";
    yes_div.style.margin = Math.round(calib / 5) + "px";
    yes_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("Yes");
    yes_div.appendChild(node_text);
    yes_div.style.textAlign = "center";
    yes_div.setAttribute("class", "button blue anim1");


    var no_div = document.createElement("div");
    no_div.setAttribute("id", "noplay");
    no_div.style.width = calib * 3 + "px";
    no_div.style.fontSize = calib + "px";
    no_div.style.margin = Math.round(calib / 5) + "px";
    no_div.style.padding = Math.round(calib / 8) + "px";
    var node_text = document.createTextNode("No");
    no_div.appendChild(node_text);
    no_div.style.textAlign = "center";
    no_div.setAttribute("class", "button blue anim2");
    
    var header = document.createElement("div");
    header.setAttribute("id", "challengeHeader");
    header.style.width = Math.round(7 * calib) + "px";
    header.style.height = Math.round(2.2 * calib) + "px";
    header.style.fontSize = calib + "px";
    header.style.color = "#c92200";
    header.innerHTML = "Play challenge ?";
    header.style.fontFamily = "myFont";
    header.style.fontWeight = "bold";
    header.style.textAlign = "center";

    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    //container_div.setAttribute("id", "exitdialog");
    container_div.style.width = Math.round(calib * 7.5) + "px";
    container_div.style.height = Math.round(calib * 4) + "px";
    container_div.style.padding = Math.round(calib / 4) + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.right = "0";
    container_div.appendChild(header);
    container_div.appendChild(yes_div);
    container_div.appendChild(no_div);
    glass_div.appendChild(container_div);
    document.body.insertBefore(glass_div, document.body.firstChild);
    addEvent("yesplay", acceptChallenge);
    addEvent("noplay", rejectChallenge);
}

function acceptChallenge() {
    hideWeeklyChallengeDialog();
    hidemainMenu();
    hideEMHMenu();
    removeStages();
    hideSettings();
    hideHelpMenu();
    hidePromptTutorial();
    hidePromptRateDialog();
    hideMessageBoard();
    hideNextPanel();
    hideBannerBox();
    hideSolutions();
    clearStepCheck();
    playRandomStage();
    stopAnimation();
}

function rejectChallenge() {
    hideWeeklyChallengeDialog();
    showMainMenu();
//    setTimeout(showMainMenu, 200);
}

function hideWeeklyChallengeDialog() {
    var weeklychallengeDialog = document.getElementById("weeklychallenge");
    if (weeklychallengeDialog) {
        weeklychallengeDialog.style.visibility = "hidden";
        weeklychallengeDialog.style.opacity = "0";
    }
}

function showWeeklyChallengeDialog() {
    //defensive code, in case congo dialog is open
    hideCongoDialog();
    var weeklychallengeDialog = document.getElementById("weeklychallenge");
    if (weeklychallengeDialog) {
        increaseHint();
        weeklychallengeDialog.style.visibility = "visible";
        weeklychallengeDialog.style.opacity = "1";
    }
}

function createStagePurchaseDialog() {
    var glass_div = document.createElement("div");
    glass_div.setAttribute("class", "glass slowtrans");
    glass_div.setAttribute("id", "stagepurchaseDialog");
    glass_div.style.width = window.innerWidth + "px";
    glass_div.style.height = window.innerHeight + "px";
    glass_div.style.zIndex = "7";
    glass_div.style.visibility = "hidden";
    glass_div.style.opacity="0";
    
    var margin = Math.round(calib / 8);
    var yes_div = document.createElement("div");
    yes_div.setAttribute("id", "purchaseStage");
    yes_div.style.width = Math.round(calib * 7) + "px";
    yes_div.style.fontSize = Math.round(calib / 1.4) + "px";
    yes_div.style.margin = margin + "px";
    yes_div.style.padding =  margin + "px";
    yes_div.style.textAlign = "center";
    var price = getPreference("unlock_all_stage");
    var innerHTML = "Purchase";
    if(price)
    {
        innerHTML+"("+price+")";
    }
    yes_div.innerHTML = innerHTML;
    yes_div.setAttribute("class", "button blue anim1");
    
    
    var no_div = document.createElement("div");
    no_div.setAttribute("id", "restorePurchase");
    no_div.style.width = Math.round(calib * 7) + "px";
    no_div.style.fontSize = Math.round(calib / 1.4) + "px";
    no_div.style.margin = margin + "px";
    no_div.style.padding = margin + "px";
    no_div.style.textAlign = "center";
    var node_text = document.createTextNode("Restore Purchase");
    no_div.appendChild(node_text);
    no_div.setAttribute("class", "button blue anim2");
    
    var cancel_div = document.createElement("div");
    cancel_div.setAttribute("id", "cancelPurchase");
    cancel_div.style.width = Math.round(calib * 7) + "px";
    cancel_div.style.height = Math.round(calib / 1.3) + "px";
    cancel_div.style.fontSize = Math.round(calib / 1.3) + "px";
    cancel_div.style.margin = margin + "px";
    cancel_div.style.padding = Math.round(calib / 10) + "px";
    cancel_div.style.textAlign = "center";
    var node_text = document.createTextNode("Cancel");
    cancel_div.appendChild(node_text);
    cancel_div.setAttribute("class", "button blue anim2");
    
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.style.width = Math.round(calib * 7.5) + "px";
    container_div.style.height = (3.1 * calib/ 1.3 + 12 * margin + 6) + "px";
    container_div.style.padding = Math.round(calib / 6) + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.right = "0";
    container_div.appendChild(yes_div);
    container_div.appendChild(no_div);
    container_div.appendChild(cancel_div);
    glass_div.appendChild(container_div);
    document.body.insertBefore(glass_div, document.body.firstChild);
    
    addEvent("purchaseStage", startStagePurchaseFlow);
    addEvent("restorePurchase", startStageRestoreFlow);
    addEvent("cancelPurchase", hideStagePurchaseDialog);
}
*/
function createPromptRateDialog() {
    var glass_div = document.createElement("div");
    glass_div.setAttribute("class", "glass slowtrans");
    glass_div.setAttribute("id", "promptratedialog");
    glass_div.style.width = window.innerWidth + "px";
    glass_div.style.height = window.innerHeight + "px";
    glass_div.style.zIndex = "7";
    glass_div.style.visibility = "hidden";
    glass_div.style.opacity="0";
    
    var margin = Math.round(calib / 8);
    var yes_div = document.createElement("div");
    yes_div.setAttribute("id", "ratezen");
    yes_div.style.width = Math.round(calib * 7) + "px";
    yes_div.style.fontSize = Math.round(calib / 1.4) + "px";
    yes_div.style.margin = margin + "px";
    yes_div.style.padding =  margin + "px";
    yes_div.style.textAlign = "center";
    yes_div.innerHTML = "Rate ZenTriangle";
    yes_div.setAttribute("class", "button blue anim1");
    
    var starDiv = document.createElement("div");
    starDiv.setAttribute("class", "img");
    starDiv.setAttribute("id", "hintButton");
    starDiv.style.width = Math.round(1.2 * calib) + "px";
    starDiv.style.height = Math.round(1.2 * calib) + "px";
    starDiv.style.bottom = "0";
    starDiv.style.backgroundImage = "url('./img/star.png')";
    //hintContainer.appendChild(hintButton);
    
    
    var no_div = document.createElement("div");
    no_div.setAttribute("id", "remindme");
    no_div.style.width = Math.round(calib * 7) + "px";
    no_div.style.fontSize = Math.round(calib / 1.4) + "px";
    no_div.style.margin = margin + "px";
    no_div.style.padding = margin + "px";
    no_div.style.textAlign = "center";
    var node_text = document.createTextNode("Remind me later");
    no_div.appendChild(node_text);
    no_div.setAttribute("class", "button blue anim2");
    
    var cancel_div = document.createElement("div");
    cancel_div.setAttribute("id", "nothanks");
    cancel_div.style.width = Math.round(calib * 7) + "px";
    cancel_div.style.height = Math.round(calib / 1.3) + "px";
    cancel_div.style.fontSize = Math.round(calib / 1.3) + "px";
    cancel_div.style.margin = margin + "px";
    cancel_div.style.padding = Math.round(calib / 10) + "px";
    cancel_div.style.textAlign = "center";
    var node_text = document.createTextNode("No.. Thanks.");
    cancel_div.appendChild(node_text);
    cancel_div.setAttribute("class", "button blue anim2");
    
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.style.width = Math.round(calib * 7.5) + "px";
    container_div.style.height = (3.1 * calib/ 1.3 + 12 * margin + 6) + "px";
    container_div.style.padding = Math.round(calib / 6) + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.right = "0";
    container_div.appendChild(yes_div);
    container_div.appendChild(no_div);
    container_div.appendChild(cancel_div);
    glass_div.appendChild(container_div);
    document.body.insertBefore(glass_div, document.body.firstChild);
    
    addEvent("ratezen", rateZenTriangle);
    addEvent("remindme", remindMeLater);
    addEvent("nothanks", noThanks);
}

function rateZenTriangle() {
    // storePreference("promptRate", "false");
	setPromptRateFalse();
    // window.location  = 'ios:rate';
	window.open('https://chrome.google.com/webstore/detail/zen-triangle/mdcomemenjfgfkejfgghafldplfldeld/reviews');
    hidePromptRateDialog();
    //showCongoDialog();
}

function remindMeLater() {
    hidePromptRateDialog();
    //showCongoDialog();
}

function noThanks() {
    // storePreference("promptRate", "false");
	setPromptRateFalse();
    hidePromptRateDialog();
    //showCongoDialog();
}

/* function showAppiraterDialog() {
    window.location  = 'ios:appi';
} */

function showPromptRateDialog() {
	if(promptRate == "false")
	{
		return;
	}
    //glasses = "promptrate";
    var promptRateDialog = document.getElementById("promptratedialog");
    if (promptRateDialog) {        
        promptRateDialog.style.visibility = "visible";
        promptRateDialog.style.opacity = "1";
    }
}

function hidePromptRateDialog() {
    //glasses = "congo";
    var confirm = document.getElementById("promptratedialog");
    if (confirm) {
        confirm.style.visibility = "hidden";
        confirm.style.opacity = "0";
    }
}
/*
function showStagePurchaseDialog() {
    glasses = "stagepurchase";
    var purchaseDialog = document.getElementById("stagepurchaseDialog");
    if (purchaseDialog) {
        var purchaseStage = document.getElementById("purchaseStage");
        var innerHTML = "Purchase";
        var price = getPreference("unlock_all_stage");
        if(price)
        {
            innerHTML = innerHTML+" ("+price+")";
        }
        purchaseStage.innerHTML = innerHTML;
        
        purchaseDialog.style.visibility = "visible";
        purchaseDialog.style.opacity = "1";
    }
}

function hideStagePurchaseDialog() {
    glasses = "gamestage";
    var confirm = document.getElementById("stagepurchaseDialog");
    if (confirm) {
        confirm.style.visibility = "hidden";
        confirm.style.opacity = "0";
    }
}

function createHintPurchaseDialog() {
    var glass_div = document.createElement("div");
    glass_div.setAttribute("class", "glass slowtrans");
    glass_div.setAttribute("id", "hintpurchaseDialog");
    glass_div.style.width = window.innerWidth + "px";
    glass_div.style.height = window.innerHeight + "px";
    glass_div.style.zIndex = "7";
    glass_div.style.visibility = "hidden";
    glass_div.style.opacity="0";
    
    var yes_div = document.createElement("div");
    yes_div.setAttribute("id", "yes");
    yes_div.style.width = Math.round(calib * 2.8) + "px";
    yes_div.style.height = calib + "px";
    yes_div.style.fontSize = calib + "px";
    yes_div.style.margin = "auto";
    yes_div.style.padding = Math.round(calib / 8) + "px";
    yes_div.style.position = "absolute";
    yes_div.style.top = "55%";
    yes_div.style.left = "4%";
    yes_div.style.textAlign = "center";
    var node_text = document.createTextNode("YES");
    yes_div.appendChild(node_text);
    yes_div.setAttribute("class", "button blue anim1");
    
    
    var no_div = document.createElement("div");
    no_div.setAttribute("id", "no");
    no_div.style.width = Math.round(calib * 2.8) + "px";
    no_div.style.height = calib + "px";
    no_div.style.fontSize = calib + "px";
    no_div.style.margin = "auto";
    no_div.style.padding = Math.round(calib / 8) + "px";
    no_div.style.position = "absolute";
    no_div.style.top = "55%";
    no_div.style.right = "4%";
    no_div.style.textAlign = "center";
    var node_text = document.createTextNode("NO");
    no_div.appendChild(node_text);
    no_div.setAttribute("class", "button blue anim2");
    
    
    var header = document.createElement("div");
    header.setAttribute("id", "hintheader");
    //header.style.marginTop = calib+"px";
    header.style.width = Math.round(6.8 * calib) + "px";
    //header.style.height = calib+"px";
    header.style.fontSize = Math.round(calib / 1.6) + "px";
    header.style.color = "#c92200";
    var innerHTML = "Purchase 20 hints?";
    var price = getPreference("purchase_hint");
    if(price)
    {
        innerHTML=innerHTML+"\n for "+price;
    }
    header.innerHTML = innerHTML;
    header.style.fontFamily = "myFont";
    header.style.fontWeight = "bold";
    header.style.textAlign = "center";
    header.style.textShadow = "1px 1px 0px #ded17c";
    
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.style.width = Math.round(calib * 7) + "px";
    container_div.style.height = Math.round(calib * 3) + "px";
    container_div.style.padding = Math.round(calib / 4) + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.bottom = "0";
    container_div.style.left = "0";
    container_div.style.top = "0";
    container_div.style.right = "0";
    container_div.appendChild(header);
    container_div.appendChild(yes_div);
    container_div.appendChild(no_div);
    glass_div.appendChild(container_div);
    document.body.insertBefore(glass_div, document.body.firstChild);
    
    addEvent("yes", purchaseHint);
    addEvent("no", hideHintPurchaseDialog);
}

function showHintPurchaseDialog() {
    glasses = "hintpurchase";
    var purchaseDialog = document.getElementById("hintpurchaseDialog");
    if (purchaseDialog) {
        var header = document.getElementById("hintheader");
        var innerHTML = "Purchase 20 hints?";
        var price = getPreference("purchase_hint");
        if(price)
        {
            innerHTML=innerHTML+"\n for "+price;
        }
        header.innerHTML = innerHTML;
        purchaseDialog.style.visibility = "visible";
        purchaseDialog.style.opacity = "1";
    }
}


function purchaseHint()
{
    hideHintPurchaseDialog();
//    setTimeout(hintPurchased, 2000);
//    setTimeout(hideWaitDialog, 2000);
    showWaitDialog();
    window.location  = 'ios:hint';
//    setTimeout(hintPurchased, 5000);
}

function hideHintPurchaseDialog() {
    glasses = "ingameplay";
    var confirm = document.getElementById("hintpurchaseDialog");
    if (confirm) {
        confirm.style.visibility = "hidden";
        confirm.style.opacity = "0";
    }
}
 */
function mainMenu() {
    //clear all ref
    if (ref) {
        clearInterval(ref);
    }
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
    initButton();
}

function settingAction() {
    if (events) {
		stopAnimation();
        disableEvents();
//        showBackButton();
        glasses = "";
        var set_div = document.getElementById("settings");
        hidemainMenu();
//        setting();
//        setTimeout(hidemainMenu, 400);
        setTimeout(showSetting, 300);
        setTimeout(showBackButton, 400);
    }
}

function hideSettings() {
    var settingmenu = document.getElementById("settingmenu");
    if (settingmenu) {
        settingmenu.style.visibility = "hidden";
        settingmenu.style.opacity = "0";
    }
}

function createSettings()
{
    var container_div = document.createElement("div");
    container_div.setAttribute("class", "buttonContainer");
    container_div.setAttribute("id", "settingmenu");
    container_div.style.height = 5 * calib + "px";
    container_div.style.width = 8 * calib + "px";
    container_div.style.padding = Math.round(calib / 4) + "px";
    container_div.style.borderRadius = Math.round(calib / 2) + "px";
    container_div.style.right = "0";
    container_div.style.left = "0";
    container_div.style.bottom = "0";
    container_div.style.top = "0";
    // container_div.style.visibility = "hidden";
    // container_div.style.opacity = "0";
    container_div.style.position = "absoulte";
    
    // var sound = getPreference("sound");
    // var haptics = getPreference("haptics");
    // var vibrate = getPreference("vibrate");
    
    var gSoundChk = getCheckBox("sound", sound);
    var gSoundHeader = getHeader("sound");
    var hapticChk = getCheckBox("haptics", haptics);
    var hapticHeader = getHeader("haptics");
//    var vibrateChk = getCheckBox("themes", vibrate);
//    var vibrateHeader = getHeader("themes");
//    vibrateHeader.addEventListener("touchend", enableTutorial);
    
    container_div.appendChild(gSoundHeader);
    container_div.appendChild(gSoundChk);
    container_div.appendChild(hapticHeader);
    container_div.appendChild(hapticChk);
    
    var facebookButton = document.createElement("div");
    facebookButton.setAttribute("class", "img");
    facebookButton.setAttribute("id", "facebookButton");
    facebookButton.style.width = Math.round(1.5 * calib) + "px";
    facebookButton.style.height = Math.round(1.5 * calib) + "px";
//    facebookButton.style.margin = "8px";
    facebookButton.style.left = "15%";
    facebookButton.style.right = "75%";
    facebookButton.style.top = "68%";
    facebookButton.style.bottom = "5%";
	facebookButton.style.cursor='pointer';
    facebookButton.style.position = "absoulte";
    facebookButton.style.backgroundImage = "url('./img/facebook.png')";
    container_div.appendChild(facebookButton);
    
    var tweeterButton = document.createElement("div");
    tweeterButton.setAttribute("class", "img");
    tweeterButton.setAttribute("id", "tweeterButton");
    tweeterButton.style.width = Math.round(1.5 * calib) + "px";
    tweeterButton.style.height = Math.round(1.5 * calib) + "px";
//    tweeterButton.style.margin = "initial";
    tweeterButton.style.left = "40%";
    tweeterButton.style.right = "50%";
    tweeterButton.style.top = "68%";
    tweeterButton.style.bottom = "5%";
	tweeterButton.style.cursor='pointer';
    tweeterButton.style.position = "absoulte";
    tweeterButton.style.backgroundImage = "url('./img/tweeter.png')";
    container_div.appendChild(tweeterButton);
    
    var wwwButton = document.createElement("div");
    wwwButton.setAttribute("class", "img");
    wwwButton.setAttribute("id", "wwwButton");
    wwwButton.style.width = Math.round(1.5 * calib) + "px";
    wwwButton.style.height = Math.round(1.5 * calib) + "px";
//    wwwButton.style.margin = "initial";
    wwwButton.style.left = "65%";
    wwwButton.style.right = "25%";
    wwwButton.style.top = "68%";
    wwwButton.style.bottom = "5%";
    wwwButton.style.position = "absoulte";
	wwwButton.style.cursor='pointer';
    wwwButton.style.backgroundImage = "url('./img/www.png')";
    container_div.appendChild(wwwButton);
    
    
//    container_div.appendChild(vibrateHeader);
//    container_div.appendChild(vibrateChk);
    document.body.appendChild(container_div);
    
    addSpecialEvent(gSoundChk, gameSoundHandler);
    addSpecialEvent(hapticChk, hapticHandler);
    addEvent("facebookButton", openFacebook);
    addEvent("tweeterButton", openTweeter);
    addEvent("wwwButton", openWebpage);
//    addSpecialEvent(vibrateChk, vibrationHandler);
}

function openFacebook()
{
    // window.location  = 'ios:facebook';
	window.open('https://www.facebook.com/nascentsoftware');
}

function openTweeter()
{
    // window.location  = 'ios:tweeter';
	window.open('https://twitter.com/nascentsoftware');
}

function openWebpage()
{
    // window.location  = 'ios:www';
	window.open('http://www.nascentsoftware.com/');
}

function showSetting() {
    glasses = "settingmenu";
    var settingmenu = document.getElementById("settingmenu");
    if (settingmenu) {
        settingmenu.style.visibility = "visible";
        settingmenu.style.opacity = "1";
    }
	else
	{
		createSettings();
	}
}

function addSpecialEvent(element, func) {
//    if (enableMouse) {
//        element.onmousedown = func;
//    } else {
        element.onmousedown = func;
        // element.onmousedown = disable;
        // element.onclick = disable;
//    }
}

function gameSoundHandler() {
    slideEffect("sound");
}

function slideEffect(elemid) {
    var cover_div = document.getElementById(elemid);
    var storage;//	= getPreference(elemid);
	if (elemid === "sound") {
		storage = sound;
	}
	else
	{
		storage = haptics;
	}
    if (storage === "true") {
        cover_div.style.left = "0";
        cover_div.style.right = Math.round(1.28 * calib) + "px";
        // storePreference(elemid, "false");
        if (elemid === "sound") {
			setSoundFalse();
            pauseLoop();
        }
		else
		{
			setHapticsFalse();
		}
    } else {
        cover_div.style.right = "0";
        cover_div.style.left = Math.round(1.28 * calib) + "px";
        // storePreference(elemid, "true");
        if (elemid === "sound") {
			setSoundTrue();
            playLoop();
        }
//        if (elemid === "vibrate") {
//            vibrate(50);
//        }
        if (elemid === "haptics") {
			setHapticsTrue();
            playSound("click");
        }
    }
}

//function vibrationHandler() {
//    slideEffect("vibrate");
//}

function hapticHandler() {
    slideEffect("haptics");
}

function getOnDiv() {
    var on_div = document.createElement("div");
    on_div.setAttribute("class", "onoff");
    on_div.innerHTML = "ON";
    on_div.style.fontSize = Math.round(calib / 2) + "px";
    on_div.style.float = "left";
    return on_div;
}

function getCheckBox(text, initial) {
    var chkBox_div = document.createElement("div");
    chkBox_div.setAttribute("class", "checkbox");
    //chkBox_div.innerHTML = "ON OFF";
    chkBox_div.style.float = "right";
    chkBox_div.style.height = Math.round(calib / 2) + "px";
    chkBox_div.style.width = Math.round(2.2 * calib) + "px";
    chkBox_div.style.padding = Math.round(calib / 10) + "px";
    chkBox_div.style.marginTop = Math.round(calib / 2) + "px";
    chkBox_div.style.marginRight = Math.round(calib / 4) + "px";

//    if(text != "themes")
//    {
    var on_div = getOnDiv();
    var off_div = getOffDiv();
    chkBox_div.appendChild(on_div);
    chkBox_div.appendChild(off_div);
    var cover = getCover(text, initial);
    chkBox_div.appendChild(cover);
//    }
//    else
//    {
//        chkBox_div.innerHTML = "coming soon...";
//        chkBox_div.style.fontSize = Math.round(calib / 3) + "px";
//        chkBox_div.style.color= "#fff";
//        chkBox_div.style.textShadow ="#093B5C 0px -1px 1px";
//        chkBox_div.addEventListener("touchend", setProFalse);
//    }
    return chkBox_div;
}

/*function setProFalse()
{
    proFalse++;
    if(proFalse > 5)
    {
        storePreference("pro", "false");
        storePreference("hintCount", "2");
        storePreference("lastPlayedGame", easyStage-1);
    }
}*/

function getOffDiv() {
    var off_div = document.createElement("div");
    off_div.setAttribute("class", "onoff");
    off_div.innerHTML = "OFF";
    off_div.style.fontSize = Math.round(calib / 2) + "px";
    off_div.style.float = "right";
    return off_div;
}

function getHeader(text) {
    var header = document.createElement("div");
    header.style.width = 4 * calib + "px";
    header.style.height = calib + "px";
    header.style.fontSize = calib + "px";
    header.style.color = "#0f4b6d";
    header.innerHTML = text;
    header.style.fontFamily = "myFont";
    header.style.fontWeight = "bold";
    header.style.textAlign = "center";
    header.style.textShadow = "1px 1px 0 rgba(255,255,255,0.4)";
    header.style.float = "left";
    header.style.padding = Math.round(calib / 10) + "px";
    header.style.marginTop = Math.round(calib / 4.5) + "px";
    return header;
}

function getCover(text, initial) {
    var cover = document.createElement("div");
    cover.setAttribute("id", text);
    cover.setAttribute("class", "cover");
    cover.style.height = Math.round(calib / 1.5) + "px";
    cover.style.width = Math.round(1.1 * calib) + "px";
    if (initial === "true") {
        cover.style.right = "0";
        cover.style.left = Math.round(1.28 * calib) + "px";
    } else {
        cover.style.left = "0";
        cover.style.right = Math.round(1.28 * calib) + "px";
    }
    return cover;
}

function keyHandler(e) {
    //console.log(e.keyCode)
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        return;
    } else {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}