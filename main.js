

var displayTitle = document.querySelector('.type');
var displayCounter = document.querySelector('.countDown');
var displayBox = document.querySelector('.wrapper');



var sehriSet = [
    "5:29", "5:29", "5:04", "5:03", "5:02",
    "5:01", "5:00", "4:59", "4:58", "4:57",
    "4:56", "4:55", "4:54", "4:53", "4:52",
    "4:51", "4:50", "4:49", "4:48", "4:47", 
    "4:46", "4:45", "4:44", "4:43", "4:42", 
    "4:41", "4:40", "4:39", "4:38", "4:36", "4:35","4:34"
];

var iftarSet = [
    "18:18", "18:18", "18:02", "18:03", "18:03",
    "18:04", "18:04", "18:05", "18:05", "18:06",
    "18:06", "18:06", "18:07", "18:07",
    "18:08", "18:08", "18:08", "18:09", "18:09",
    "18:10", "18:10", "18:10", "18:11", "18:11",
    "18:11", "18:12", "18:12", "18:13", "18:13",
    "18:14", "18:14", "18:15"
];


setInterval(function () {
    var today = new Date();
    var curDate = today.getDate();
    var curTime = today.getHours() * 60 * 60 + today.getMinutes() * 60 + today.getSeconds();

    var checkIftar = iftarSet[curDate].split(":");
    var checkSehri = sehriSet[curDate].split(":");

    var timeIftar = checkIftar[0] * 60 * 60 + checkIftar[1] * 60;
    var timeSehri = checkSehri[0] * 60 * 60 + checkSehri[1] * 60;

    //  after 12 am
    if (timeSehri < timeIftar && timeSehri > curTime && timeSehri >= 0) {
        checkSehriTime(curDate, curTime);
    }
    // after ifter to 12 am 
    else if (timeSehri < timeIftar && timeIftar < curTime) {
        checkSehriTime(curDate, curTime);
    }
    // after seheri time to iftar time 
    else {
        checkIftarTime(curDate, curTime);
    }
}, 1e3);


function checkIftarTime(todayDate, curTime) {
    var time = iftarSet[todayDate].split(":");
    var setTime = time[0] * 60 * 60 + time[1] * 60;
    var diffTime = setTime - curTime;
    if (diffTime < setTime && diffTime >= 0) {
        displayTitle.src = './iftar.png';
        // displayTitle.style.left = "8.2rem";
        displayCounter.innerHTML = printTimer(diffTime);
    }
}

function checkSehriTime(todayDate, curTime) {
    var time = sehriSet[todayDate].split(":");
    var setTime = time[0] * 60 * 60 + time[1] * 60;
    var diffTime = setTime - curTime;

    if (diffTime < setTime && diffTime >= 0) {
        displayTitle.src = './sehri.png';
        // displayTitle.style.left = "8.6rem";
        displayCounter.innerHTML = printTimer(diffTime);
    }
    else {
        var lastTime = setTime + 24 * 60 * 60;
        var sehriEnd = lastTime - curTime;
        displayTitle.src = './sehri.png';
        // displayTitle.style.left = "8.6rem";
        displayCounter.innerHTML = printTimer(sehriEnd);
    }
}

function printTimer(sec) {
    hr = Math.floor(sec / 3600) % 24;
    mm = Math.floor(sec / 60) % 60;
    ss = sec % 60;

    var x = hr < 10 ? "0" + hr : hr;
    var y = mm < 10 ? "0" + mm : mm;
    var z = ss < 10 ? "0" + ss : ss;
    return `<span class="hour absolute">${translteNum(x)}</span> <span class="minute absolute">${translteNum(y)}</span> <span class="second absolute">${translteNum(z)}</span>`;
}

function translteNum(num_str) {
    var bengali = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    var changed_nun = '';
    num_str.toString().split('').forEach(l => {
        if (isNaN(l)) { changed_nun += l; } else { changed_nun += bengali[l]; }
    });
    return changed_nun;
}

function ctaFunction() {
    window.open(clickTag);
}
