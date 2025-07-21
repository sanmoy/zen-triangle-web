/**
mathematical model for all objects
**/
var width = 40;
var ratio = 2;
//var calib = width*ratio;
var calib = window.innerWidth / 16;

var sqrtof2 = Math.sqrt(2);
var invsqrtof2 = 1 / sqrtof2;
var holes = new Array();

var bckGrndImage1 = new Image();
bckGrndImage1.src = './img/background1.jpg';

var bckGrndImage2 = new Image();
bckGrndImage2.src = './img/background2.jpg';

var redBall = new Image();
redBall.src = './img/red.png';

var darkGreenBall = new Image();
darkGreenBall.src = './img/dark_green.png';

var yellowBall = new Image();
yellowBall.src = './img/yellow.png';

var pinkBall = new Image();
pinkBall.src = './img/pink.png';

var greyBall = new Image();
greyBall.src = 'img/grey.png';

var coralBall = new Image();
coralBall.src = './img/coral.png';

var violetBall = new Image();
violetBall.src = './img/violet.png';

var lightGreenBall = new Image();
lightGreenBall.src = './img/light_green.png';

var orangeBall = new Image();
orangeBall.src = './img/orange.png';

var lightBlueBall = new Image();
lightBlueBall.src = './img/light_blue.png';

var oliveBall = new Image();
oliveBall.src = './img/olive.png';

var deepBlueBall = new Image();
deepBlueBall.src = './img/blue.png';

/**
Object represents hole in the triangle
**/
function Hole(xc, yc) {
    this.xcor = xc;
    this.ycor = yc;
    this.isOcc = false;
}

RedElement = {
    name: "RedElement",
    posinArray: 0,
    x: 50,
    y: 50,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad),
            y: y - calib * Math.sin(deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + calib * Math.cos(deg2rad + Math.PI),
            y: y - calib * Math.sin(deg2rad + Math.PI)
        };
        this.posArray[4] = {
            x: x + calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        //this.angle=this.angle+angle;
        //this.setPos(this.x,this.y);
    },

    flipElement: function flipElement() {
        //this.flip=-this.flip;
        //this.setPos(this.x,this.y);
    },

}

DarkGreenElement = {
    name: "DarkGreenElement",
    posinArray: 1,
    x: 110,
    y: 150,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad + Math.PI / 2),
            y: y - calib * Math.sin(deg2rad + Math.PI / 2)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + 2 * calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - 2 * calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        //this.flip=-this.flip;
        //this.setPos(this.x,this.y);
    },

}

YellowElement = {
    name: "YellowElement",
    posinArray: 2,
    x: 150,
    y: 50,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad),
            y: y - calib * Math.sin(deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + calib * sqrtof2 * Math.cos(deg2rad + 0.25 * Math.PI),
            y: y - calib * sqrtof2 * Math.sin(deg2rad + 0.25 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle=this.angle+angle;
        this.setPos(this.x,this.y);
    },

    flipElement: function flipElement() {
        //this.flip=-this.flip;
        //this.setPos(this.x,this.y);
    },

}

DeepBlueElement = {
    name: "DeepBlueElement",
    posinArray: 3,
    x: 10,
    y: 170,
    angle: 45,
    posArray: new Array(),
    flip: 1,
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad),
            y: y - calib * Math.sin(deg2rad)
        };
        this.posArray[2] = {
            x: x + 2 * calib * Math.cos(deg2rad),
            y: y - 2 * calib * Math.sin(deg2rad)
        };
        this.posArray[3] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[4] = {
            x: x + 2 * calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - 2 * calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.angle = this.angle + 180;
        this.setPos(this.x, this.y);
        //this.flip=-this.flip;
        //this.setPos(this.x,this.y);
    },

}

PinkElement = {
    name: "PinkElement",
    posinArray: 4,
    x: 150,
    y: 140,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad),
            y: y - calib * Math.sin(deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.angle = this.angle + 180;
        this.setPos(this.x, this.y);
        //this.flip=-this.flip;
        //this.setPos(this.x,this.y);
    },

}

GreyElement = {
    name: "GreyElement",
    posinArray: 5,
    x: 220,
    y: 90,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + this.flip * calib * Math.cos(this.flip * deg2rad),
            y: y - calib * Math.sin(this.flip * deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + 2 * calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - 2 * calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.flip = -this.flip;
        this.setPos(this.x, this.y);
    },

}

CoralElement = {
    name: "CoralElement",
    posinArray: 6,
    x: 220,
    y: 230,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + this.flip * calib * Math.cos(this.flip * deg2rad),
            y: y - calib * Math.sin(this.flip * deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + 2 * calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - 2 * calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[4] = {
            x: x + 3 * calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - 3 * calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.flip = -this.flip;
        this.setPos(this.x, this.y);
    },

}

VioletElement = {
    name: "VioletElement",
    posinArray: 7,
    x: 110,
    y: 70,
    angle: 45,
    posArray: new Array(),
    flip: 1,
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + this.flip * calib * Math.cos(this.flip * deg2rad),
            y: y - calib * Math.sin(this.flip * deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + 2 * calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - 2 * calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[4] = {
            x: x + this.flip * sqrtof2 * calib * Math.cos(this.flip * deg2rad + 1.75 * Math.PI),
            y: y - sqrtof2 * calib * Math.sin(this.flip * deg2rad + 1.75 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.flip = -this.flip;
        this.setPos(this.x, this.y);
    },

}


LightGreenElement = {
    name: "LightGreenElement",
    posinArray: 8,
    x: 280,
    y: 160,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad + Math.PI / 2),
            y: y - calib * Math.sin(deg2rad + Math.PI / 2)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + 2 * calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - 2 * calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
        this.posArray[4] = {
            x: x + this.flip * calib * Math.cos(this.flip * deg2rad + Math.PI),
            y: y - calib * Math.sin(this.flip * deg2rad + Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.flip = -this.flip;
        this.setPos(this.x, this.y);
    },

}

OrangeElement = {
    name: "OrangeElement",
    posinArray: 9,
    x: 390,
    y: 40,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad),
            y: y - calib * Math.sin(deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + calib * sqrtof2 * Math.cos(deg2rad + 0.25 * Math.PI),
            y: y - calib * sqrtof2 * Math.sin(deg2rad + 0.25 * Math.PI)
        };
        this.posArray[4] = {
            x: x + calib * sqrtof2 * Math.cos(deg2rad + 1.25 * Math.PI),
            y: y - calib * sqrtof2 * Math.sin(deg2rad + 1.25 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.angle = this.angle + 180;
        this.setPos(this.x, this.y);
        //this.flip=-this.flip;
        //this.setPos(this.x,this.y);
    },

}

LightBlueElement = {
    name: "LightBlueElement",
    posinArray: 10,
    x: 320,
    y: 200,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + this.flip * calib * Math.cos(this.flip * deg2rad),
            y: y - calib * Math.sin(this.flip * deg2rad)
        };
        this.posArray[2] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[3] = {
            x: x + this.flip * calib * sqrtof2 * Math.cos(this.flip * deg2rad + 0.25 * Math.PI),
            y: y - calib * sqrtof2 * Math.sin(this.flip * deg2rad + 0.25 * Math.PI)
        };
        this.posArray[4] = {
            x: x + calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.flip = -this.flip;
        this.setPos(this.x, this.y);
    },

}

OliveElement = {
    name: "OliveElement",
    posinArray: 11,
    x: 280,
    y: 40,
    angle: 45,
    flip: 1,
    posArray: new Array(),
    disable: false,
    ipos: 0,
    jpos: 0,

    setPos: function (x, y) {
        if (this.disable)
            return;
        var deg2rad = this.angle * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.posArray[0] = {
            x: x,
            y: y
        };
        this.posArray[1] = {
            x: x + calib * Math.cos(deg2rad + 0.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 0.5 * Math.PI)
        };
        this.posArray[2] = {
            x: x + calib * sqrtof2 * Math.cos(deg2rad + 0.25 * Math.PI),
            y: y - calib * sqrtof2 * Math.sin(deg2rad + 0.25 * Math.PI)
        };
        this.posArray[3] = {
            x: x + calib * Math.cos(deg2rad + 1.5 * Math.PI),
            y: y - calib * Math.sin(deg2rad + 1.5 * Math.PI)
        };
        this.posArray[4] = {
            x: x + calib * sqrtof2 * Math.cos(deg2rad + 1.75 * Math.PI),
            y: y - calib * sqrtof2 * Math.sin(deg2rad + 1.75 * Math.PI)
        };
    },

    rotate: function rotate(angle) {
        this.angle = this.angle + angle;
        this.setPos(this.x, this.y);
    },

    flipElement: function flipElement() {
        this.angle = this.angle + 180;
        this.setPos(this.x, this.y);
        //this.flip=-this.flip;
        //this.setPos(this.x,this.y);
    },

}

function isPixelOnBox(x, y, xbox, ybox) {
    if ((x >= xbox) && (x <= xbox + calib) && (y >= ybox) && (y <= ybox + calib))
        return true;
    else
        return false;
}

function isOverlappingpoint(x, y, xres, yres) {
    if ((x >= xres-calib/2) && (x <= xres + calib /2) && (y >= yres-calib/2) && (y <= yres + calib / 2.5))
        return true;
    else
        return false;
}

// draws triangle :-) obvious
function drawTriangle() {
    // this is called from native android code when lock and unlock. So we need to control here
//    if (glasses === "solutionpanel" || glasses === "ingameplay") {
    var armlength = 10 * calib;
    tctx.lineWidth = ratio;
    tctx.beginPath();
    tctx.moveTo(WIDTH / 2 + calib / 2, (HEIGHT - armlength / sqrtof2) / 2); //move to the top
    tctx.lineTo(WIDTH / 2 + armlength / sqrtof2 - calib / 2, (HEIGHT + armlength / sqrtof2) / 2 - calib);
    tctx.bezierCurveTo(WIDTH / 2 + 7.7 * calib, (HEIGHT + armlength / sqrtof2) / 2, WIDTH / 2 + 6.6 * calib, (HEIGHT + armlength / sqrtof2) / 2 + calib / 2, WIDTH / 2 + armlength / sqrtof2 - calib / 2, (HEIGHT + armlength / sqrtof2) / 2 + calib / 2);
    tctx.lineTo(WIDTH / 2 - armlength / sqrtof2 + calib / 2, (HEIGHT + armlength / sqrtof2) / 2 + calib / 2);
    tctx.bezierCurveTo(WIDTH / 2 - 6.6 * calib, (HEIGHT + armlength / sqrtof2) / 2 + calib / 2, WIDTH / 2 - 7.7 * calib, (HEIGHT + armlength / sqrtof2) / 2, WIDTH / 2 - armlength / sqrtof2 + calib / 2, (HEIGHT + armlength / sqrtof2) / 2 - calib);
    tctx.lineTo(WIDTH / 2 - calib / 2, (HEIGHT - armlength / sqrtof2) / 2); //move to the top
    tctx.bezierCurveTo(WIDTH / 2, HEIGHT / 2 - 4 * calib, WIDTH / 2, HEIGHT / 2 - 4 * calib, WIDTH / 2 + calib / 2, (HEIGHT - armlength / sqrtof2) / 2);
    tctx.stroke();
    tctx.moveTo(WIDTH / 2 - calib / 2, (HEIGHT - armlength / sqrtof2) / 2)

    //start circle draw
    tctx.lineWidth = ratio;
    var x = WIDTH / 2 - armlength / sqrtof2 + calib / 1.4;
    var y = (HEIGHT + armlength / sqrtof2) / 2 - calib / 5;
    for (i = 0; i < 10; i++) {
        // var space = " ";
        // for(z=0, z<i;z++)
        // {
        // space = space+"   ";
        // }
        for (j = 0; j < 10 - i; j++) {
            var x1 = x + j * calib * Math.cos(Math.PI / 4);
            var y1 = y - j * calib * Math.sin(Math.PI / 4);
            // var x1int = Math.round( x1 );
            // var y1int = Math.round( y1 );
            // space = space+" "+x1int+','+y1int;
            if (!holes[9 - j]) {
                holes[9 - j] = new Array();
            }
            if (!holes[9 - j][i]) {
                holes[9 - j][i] = new Hole(x1, y1);
            }
            tctx.moveTo(x1, y1);
            tctx.beginPath();
            tctx.arc(x1, y1, calib / 2.5, 0, 2 * Math.PI);
            tctx.stroke();
        }
        //console.log(space);
        x = x + sqrtof2 * calib;
    }
//    }
}

function onTop(ex, ey) {
    var armlength = 10 * calib;
    var x = WIDTH / 2 - armlength / sqrtof2 + calib / 1.4;
    var y = (HEIGHT + armlength / sqrtof2) / 2 - calib / 5;
    for (i = 0; i < 10; i++) {
        for (j = 0; j <= i; j++) {
            if (holes[i]) {
                /*if(holes[i][j].isOcc === true)
				{
					continue;
				}*/
                var x1 = holes[i][j].xcor;
                var y1 = holes[i][j].ycor;
                if (isOverlappingpoint(ex, ey, x1, y1)) {
                    return {
                        x: x1,
                        y: y1,
                        ipos: i,
                        jpos: j
                    };
                }
            }
        }
    }
}

function checkOccupancy(elementArray) {
    for (i = 0; i < 10; i++) {
        for (j = 0; j <= i; j++) {
            holes[i][j].isOcc = false;
        }
    }

    for (e = 0; e < elementArray.length; e++) {
        var element = elementArray[e];
        //var poss = element.getPos();
        for (p = 0; p < element.posArray.length; p++) {
            ex = element.posArray[p].x + calib / 2;
            ey = element.posArray[p].y + calib / 2;
            for (i = 0; i < 10; i++) {
                for (j = 0; j <= i; j++) {
                    var x1 = holes[i][j].xcor;
                    var y1 = holes[i][j].ycor;
                    if (isOverlappingpoint(ex, ey, x1, y1)) {
                        holes[i][j].isOcc = true;
                    }
                }
            }
        }
    }

    var isAllOcc = true;
    for (i = 0; i < 10; i++) {
        for (j = 0; j <= i; j++) {
            if (!holes[i][j].isOcc) {
                isAllOcc = false;
                break;
            }
        }
    }

    if (isAllOcc) {
        //showCongoDialog();
        //var pro = getPreference("pro");
        //var gameNumber = getPreference("gameNumber");
        gameNumber = parseInt(gameNumber);
        if (stageStartTime) {
            const timeSpentMs = Date.now() - stageStartTime;
            const timeSpentSeconds = Math.round(timeSpentMs / 1000); // Convert to seconds

            console.log(`Stage ${gameNumber} completed in ${timeSpentSeconds} seconds!`);
            gtag('event', 'stage_completed', {
                'stage_number': gameNumber,
                'game_name': 'Zen Triangle',
                'time_to_complete_seconds': timeSpentSeconds, // Custom parameter for time
            });
        }
        //last played game is basically the last playable game which is unlocked
        //var lastPlayedGame = getPreference("lastPlayedGame");
        lastPlayedGame = parseInt(lastPlayedGame);
        console.log("gameNumber : " + gameNumber);
        if (gameNumber == lastPlayedGame)
        {
            // storePreference("lastPlayedGame", gameNumber + 1);
			setLastPlayedGame(gameNumber + 1);
        }
        //game number cannot be greater than lastplayed game
        // else if(gameNumber>lastPlayedGame)
        // {
            // gameNumber = lastPlayedGame-1;
            // storePreference("gameNumber", gameNumber);
//            var promptRate = getPreference("promptRate");
//            if (promptRate === "true")
//            {
//                showPromptRateDialog();
//                return;
//            }
//            showAppiraterDialog();
        // }
//        if(gameNumber == 80)
//        {
//            var promptRate = getPreference("promptRate");
//            if (promptRate === "true")
//            {
//                showPromptRateDialog();
//                return;
//            }
//        }
//        else if(gameNumber == 120)
//        {
//            //if remind me later
//            var promptRate = getPreference("promptRate");
//            if (promptRate === "true")
//            {
//                showPromptRateDialog();
//                return;
//            }
//        }
//        else if(gameNumber == 160)
//        {
//            //if remind me later
//            var promptRate = getPreference("promptRate");
//            if (promptRate === "true")
//            {
//                showPromptRateDialog();
//                return;
//            }
//        }
//        else if(gameNumber == 40 || gameNumber == 50 || gameNumber == 60 || gameNumber == 70)
//        {
//            var hintCount = getPreference("hintCount");
//            hintCount = parseInt(hintCount);
//            //if user has purchased hint
//            if(hintCount>2)
//            {
//                var promptRate = getPreference("promptRate");
//                if (promptRate === "true")
//                {
//                    showPromptRateDialog();
//                    return;
//                }
//            }
//        }
        showCongoDialog();
        return;
    }

//    for (i = 0; i < 10; i++) {
//        var space = "";
//        for (s = 0; s < 10 - i; s++) {
//            space = space + " ";
//        }
//        for (j = 0; j <= i; j++) {
//            if (holes[i][j].isOcc) {
//                space = space + "0 ";
//            } else {
//                space = space + ". ";
//            }
//        }
//        //console.log(space);
//    }

    //if everything is not occupied, release the holes which are partially occupied by topelement
    /*for( p = 0; p<elementArray[0].posArray.length; p++)
	{
		ex = element.posArray[p].x+calib/2;
		ey = element.posArray[p].y+calib/2;
		for(i=0;i<10;i++)
		{
			for(j=0;j<=i;j++)
			{
				var x1 = holes[i][j].xcor;
				var y1 = holes[i][j].ycor;
				if(isCircleOnBox(ex,ey,x1-calib/2.5,y1-calib/2.5))
				{
					holes[i][j].isOcc = false;
				}
			}
		}
	}*/
}