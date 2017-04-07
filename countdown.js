WINDOW_WIDTH = 1024;
WINDOW_HEIGHT = 608;
r = 8;
MARGIN_TOP = 60;
MARGIN_LEFT = 30;

// 可以改改看

var submitBtn = document.getElementById('submit');
// console.log(year);
var endTime = new Date(2017, 03, 11, 00, 00, 00);
var showTimeSeconds = 0;
var balls = [];
const colors = ["#3b5", "#09c", "#a6c", "#93c", "#9c0", "#690", "#fb3", "#f80", "#f44", "#c0c"];
var dateArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

submitBtn.onclick = function() {
    var year = parseInt(document.getElementById('timeY').value);
    var month = dateArr[parseInt(document.getElementById('timeM').value) - 1];
    var day = parseInt(document.getElementById('timeD').value);
    var hour = document.getElementById('timeHou').value;
    var min = document.getElementById('timeMin').value;
    var sec = document.getElementById('timeSec').value;
    endTime = new Date(month + " " + day + "," + year + " " + hour + ":" + min + ":" + sec);
    console.log(endTime);
}

window.onload = function() {

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = WINDOW_WIDTH / 2;
    // document.body.clientHeight;
    console.log(WINDOW_HEIGHT);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    r = Math.round(WINDOW_WIDTH * 4 / 5 / 106) - 1;

    var canvas = document.getElementById('canvas');
    var cxt = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    showTimeSeconds = getshowTimeSeconds();
    console.log(showTimeSeconds);
    setInterval(function() {
        render(cxt);
        updata();
        // if (showTimeSeconds=0) {alert("fjsdafh");}
    }, 50)

}


function getshowTimeSeconds() {
    var currentTime = new Date();
    var ret = endTime.getTime() - currentTime.getTime();
    ret = Math.round(ret / 1000);
    return ret < 0 ? 0 : ret;
}


function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(showTimeSeconds / 3600)
    var min = parseInt((showTimeSeconds - hours * 3600) / 60);
    var seconds = showTimeSeconds % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (r + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (r + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 38 * (r + 1), MARGIN_TOP, parseInt(min / 10), cxt);
    renderDigit(MARGIN_LEFT + 53 * (r + 1), MARGIN_TOP, parseInt(min % 10), cxt);
    renderDigit(MARGIN_LEFT + 68 * (r + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 76 * (r + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 91 * (r + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, r, 0, 2 * Math.PI);
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "#036";
    // colors[Math.floor(Math.random()*colors.length)];
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (r + 1) + (r + 1), y + i * 2 * (r + 1) + (r + 1), r, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();

            }
        }
    }
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (r + 1) + (r + 1),
                    y: y + i * 2 * (r + 1) + (r + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 6,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function updataBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - r) {
            balls[i].y = WINDOW_HEIGHT - r;
            balls[i].vy = -balls[i].vy * 0.56;
        }
        if (balls[i].x >= WINDOW_WIDTH - r) {
            balls[i].x = WINDOW_WIDTH - r;
            balls[i].vx = -balls[i].vx;
        }
    }
    var content = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + r > 0) {
            balls[content++] = balls[i];
        }
    }
    while (balls.length > content) {
        balls.pop();
    }
}

function updata() {
    var nextshowTimeSeconds = getshowTimeSeconds();
    var nextHours = parseInt(nextshowTimeSeconds / 3600);
    var nextMin = parseInt((nextshowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextshowTimeSeconds % 60;

    var curHours = parseInt(showTimeSeconds / 3600);
    var curMin = parseInt((showTimeSeconds - curHours * 3600) / 60);
    var curSeconds = showTimeSeconds % 60;
    if (curSeconds != nextSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (r + 1), MARGIN_TOP, parseInt(nextHours % 10));
        }
        if (parseInt(curMin / 10) != parseInt(nextMin / 10)) {
            addBalls(MARGIN_LEFT + 38 * (r + 1), MARGIN_TOP, parseInt(nextMin / 10));
        }
        if (parseInt(curMin % 10) != parseInt(nextMin % 10)) {
            addBalls(MARGIN_LEFT + 53 * (r + 1), MARGIN_TOP, parseInt(nextMin % 10));
        }
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 76 * (r + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 91 * (r + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }
        showTimeSeconds = nextshowTimeSeconds;
    }

    updataBalls();
}