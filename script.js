
var uruchomienie = false
var fulls = []
var number = 4;
const size = 320;
var state = 1;
var z = 0;
var k = 0;
var tab = []
var tabUser = []
var gameStarted = false;
let czasStartowy
let winnerTime
var sorting
var zegar
let czas
let reset
let won = false
let whileSorting = false


let nick
tryb = 0;
let nickCookie
let timeToSortCookie
let timeCookie
let trybCookie
let arrayCookie = []

let tab3x3 = []
let tab4x4 = []
let tab5x5 = []
let tab6x6 = []

var string = ""

var sliderPos = 0

var milisekunda1
var milisekunda2
var milisekunda3

let image = '1.jpg';

var puzzle = document.getElementById('puzzle');
var tabelaWynikow = document.getElementById("tabelaWynikow")

let partSize = size / number;
solve();



document.getElementById('btn3').addEventListener('click', function () {
	number = 3;
	tryb = 0
	reseting();
	settingUpGame();

});
document.getElementById('btn4').addEventListener('click', function () {
	number = 4;
	tryb = 1
	reseting();
	settingUpGame();

});
document.getElementById('btn5').addEventListener('click', function () {
	number = 5;
	tryb = 2
	reseting();
	settingUpGame();

});
document.getElementById('btn6').addEventListener('click', function () {
	number = 6;
	tryb = 3
	reseting();
	settingUpGame();

});



function reseting() {
	won = false
	if (gameStarted) {
		reset = true;
		gameStarted = false;
		clearInterval(zegar);
		clearInterval(sorting)
		z = 0;
		k = 0;
		tab = []
		tabUser = []
		czasStartowy = null
		winnerTime = null
		sorting = null
		zegar = null
		partSize = size / number;
		arrayCookie = []

		tab3x3 = []
		tab4x4 = []
		tab5x5 = []
		tab6x6 = []



		var tempTab = document.getElementById("3x3")
		tempTab.innerHTML = ""
		var tempTab = document.getElementById("4x4")
		tempTab.innerHTML = ""
		var tempTab = document.getElementById("5x5")
		tempTab.innerHTML = ""
		var tempTab = document.getElementById("6x6")
		tempTab.innerHTML = ""

		arrayCookie = []

		timers[0].style.backgroundImage = "url('cyferki/c0.gif')";
		timers[1].style.backgroundImage = "url('cyferki/c0.gif')";

		timers[2].style.backgroundImage = "url('cyferki/c0.gif')";
		timers[3].style.backgroundImage = "url('cyferki/c0.gif')";

		timers[4].style.backgroundImage = "url('cyferki/c0.gif')";
		timers[5].style.backgroundImage = "url('cyferki/c0.gif')";

		timers[6].style.backgroundImage = "url('cyferki/c0.gif')";
		timers[7].style.backgroundImage = "url('cyferki/c0.gif')";
		timers[8].style.backgroundImage = "url('cyferki/c0.gif')";

		tabelaWynikow.style.visibility = "hidden"
	}
}




function settingUpGame() {
	whileSorting = true
	puzzle.innerHTML = "";
	solve();
	puzzle.style.visibility = "visible";
	var timerDiv = document.getElementsByClassName("timer");
	timerDiv[0].style.visibility = "visible";
	var sorting = setInterval(function () {

		if (z < 75) {
			isSpaceIsAvaliable();
			random2();
			removeMovable();
			z++;
		}
		else {
			gameStarted = true;
			whileSorting = false
			gameTimer();
			clearInterval(sorting);
		}
	}, 10);
}

function gameTimer() {

	czasStartowy = new Date().getTime();
	var zegar = setInterval(function () {
		timer();

		if (ifArraysAreEqual(tab, tabUser) && gameStarted == true) {
			console.log("koniec");


			clearInterval(zegar);


			//timers[6].style.backgroundImage = "url('cyferki/c" + milisekunda1 + ".gif')";
			//timers[7].style.backgroundImage = "url('cyferki/c" + milisekunda2 + ".gif')";
			//timers[8].style.backgroundImage = "url('cyferki/c" + milisekunda3 + ".gif')";
			setTimeout(winning, 100)



		}
	}, 1);

}



function winning() {
	if (won == false) {
		console.log(czas)
		alert("BIG WINNER       " + winnerTime)
		nick = prompt("podaj nick!");
		czasExp = czas.setTime(czas.getTime() + 1000 * 60 * 60 * 5);
		document.cookie = nick + "=" + czasToCookie + "|" + winnerTime + "|" + tryb + ";expires=" + czasExp;

		tabelaWynikow.style.visibility = "visible";

		decodingCookie();


		won = true
	}

}


function removeMovable() {

	for (var y = 0; y < (number * number) - 1; y++) {
		fulls[y].classList.remove("movable")
	}
}


function solve() {

	const size = 320;

	partSize = size / number;

	tab = []
	tabUser = []
	k = 0

	for (let i = 0; i < number; i++) {
		for (let j = 0; j < number; j++) {
			var cell = document.createElement('div')
			cell.style.left = (j * partSize + 1 * j + 1) + 'px';
			cell.style.top = (i * partSize + 1 * i + 1) + 'px';
			cell.style.height = partSize + "px";
			cell.style.width = partSize + "px";
			cell.style.position = "absolute"
			cell.style.overflow = "hidden"
			cell.classList.add("full")

			cell.dataset.x = j;
			cell.dataset.y = i;
			cell.dataset.kol = k;

			if (!(i === number - 1 && j === number - 1)) {

				var img = document.createElement('img');
				img.style.marginLeft = -partSize * j + 'px';
				img.style.marginTop = -partSize * i + 'px';
				img.style.width = size + 'px';
				img.style.height = size + 'px';
				img.src = image;

				cell.appendChild(img);

			}
			else {
				cell.id = 'empty';
				cell.classList.remove('full');
			}
			puzzle.appendChild(cell);
			tab.push(k);
			tabUser.push(k);
			k++;


		}
	}
	if (uruchomienie) {
		var fulls = document.getElementsByClassName("full")
		//console.log(fulls)

		isSpaceIsAvaliable();
		for (var i = 0; i < (number * number) - 1; i++) {

			fulls[i].addEventListener('click', moving);
			fulls[i].addEventListener('click', isSpaceIsAvaliable);

		}
	}

}

var elemFull
var fullX
var fullY
var fulls = document.getElementsByClassName("full")
isSpaceIsAvaliable();
for (var i = 0; i < (number * number) - 1; i++) {

	fulls[i].addEventListener('click', moving);
	fulls[i].addEventListener('click', isSpaceIsAvaliable);

}
uruchomienie = true

function isSpaceIsAvaliable() {



	var empty = document.getElementById("empty")
	let emptyX = parseInt(empty.dataset.x)
	let emptyY = parseInt(empty.dataset.y)


	for (var i = 0; i < (number * number) - 1; i++) {

		var elemFull = fulls[i];
		//console.log(elemFull)
		let fullX = parseInt(elemFull.dataset.x);
		let fullY = parseInt(elemFull.dataset.y);



		//console.log("empty:X " + emptyX + " Y: " + emptyY)
		//console.log("full:X " + fullX + " Y: " + fullY)

		//czy lewo X: 1 == 0 + 1  && y: 1 == 1
		if ((emptyX == fullX + 1) && (emptyY == fullY)) {
			elemFull.classList.add("movable")
			//console.log("lewo")
		}
		//czy prawo x: 1 == 2 - 1  && y: 1 == 1
		if ((emptyX == fullX - 1) && (emptyY == fullY)) {
			elemFull.classList.add("movable")
			//console.log("prawo")
		}
		//czy gora	x: 1 == 1 && y: 1 == 0 + 1
		if ((emptyX == fullX) && (emptyY == fullY + 1)) {
			elemFull.classList.add("movable")
			//console.log("gora")
		}
		//czy dol	x: 1 == 1 && y: 1 == 2 - 1
		if ((emptyX == fullX) && (emptyY == fullY - 1)) {
			elemFull.classList.add("movable")
			//console.log("dol")
		}
	}


}







function moving() {
	if (this.classList.contains("movable")) {
		var ClickedX = this.dataset.x
		var ClickedY = this.dataset.y
		var ClickedLeft = this.style.left
		var ClickedTop = this.style.top

		//console.log("x: " + ClickedX + "y: " + ClickedY)

		var empty = document.getElementById("empty")
		var emptyX = empty.dataset.x
		var emptyY = empty.dataset.y
		var emptyLeft = empty.style.left
		var emptyTop = empty.style.top

		//this cordinates
		this.dataset.x = emptyX
		this.dataset.y = emptyY
		this.style.left = emptyLeft
		this.style.top = emptyTop

		//empty cordinates
		empty.dataset.x = ClickedX
		empty.dataset.y = ClickedY
		empty.style.left = ClickedLeft
		empty.style.top = ClickedTop

		var emptyKol = parseInt(empty.dataset.kol)
		var ClickedKol = parseInt(this.dataset.kol)

		var orderEmpty = calOrder(emptyKol)
		var orderClicked = calOrder(ClickedKol)

		tabUser[orderEmpty] = ClickedKol
		tabUser[orderClicked] = emptyKol

		//console.log(tabUser)

		for (var y = 0; y < (number * number) - 1; y++) {
			fulls[y].classList.remove("movable")
		}

		console.log(ifArraysAreEqual(tab, tabUser))


	}
	else {
		//console.log("zly div")
	}


}


var max;
var min;

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function calOrder(n) {
	for (var i = 0; i < (number * number); i++) {
		if (tabUser[i] == n) {
			return i;
		}
	}
}

function ifArraysAreEqual(arr1, arr2) {

	l = 0;

	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] == arr2[i]) {
			l++;
		}

	}
	if (l == arr1.length) {
		return true;
	}
	else {
		return false;
	}

};

function random2() {
	var empty = document.getElementById("empty")

	var emptyX = empty.dataset.x
	var emptyY = empty.dataset.y
	var emptyKol = parseInt(empty.dataset.kol)

	var emptyLeft = empty.style.left
	var emptyTop = empty.style.top


	var sorFull = document.getElementsByClassName("movable")



	var randomNum = getRandomNumber(0, sorFull.length - 1)

	//console.log(randomNum)

	var ClickedX = sorFull[randomNum].dataset.x
	var ClickedY = sorFull[randomNum].dataset.y
	var ClickedKol = parseInt(sorFull[randomNum].dataset.kol)

	var ClickedLeft = sorFull[randomNum].style.left
	var ClickedTop = sorFull[randomNum].style.top

	sorFull[randomNum].dataset.x = emptyX
	sorFull[randomNum].dataset.y = emptyY
	sorFull[randomNum].style.left = emptyLeft
	sorFull[randomNum].style.top = emptyTop

	empty.dataset.x = ClickedX
	empty.dataset.y = ClickedY
	empty.style.left = ClickedLeft
	empty.style.top = ClickedTop

	//console.log(tabUser)

	var orderEmpty = calOrder(emptyKol)
	var orderClicked = calOrder(ClickedKol)

	tabUser[orderEmpty] = ClickedKol
	tabUser[orderClicked] = emptyKol


}


czasStartowy = new Date().getTime();


var timers = document.getElementsByClassName("cyfra");

function timer() {
	if (whileSorting == false) {
		var czasAkt = new Date().getTime();
		czas = new Date(czasAkt - czasStartowy);
		czasToCookie = czasAkt - czasStartowy;
		var milisekunda = czas.getMilliseconds();
		var sekunda = czas.getSeconds();
		var minuta = czas.getMinutes()
		var godzina = czas.getHours() - 1

		var milisekunda1 = Math.floor(milisekunda / 100)
		var milisekunda2 = Math.floor((milisekunda / 10) - (milisekunda1 * 10))
		var milisekunda3 = Math.floor(milisekunda - (milisekunda1 * 100) - (milisekunda2 * 10))



		//console.log(winnerTime)



		var sekunda1 = Math.floor(sekunda / 10)
		var sekunda2 = Math.floor(sekunda - (sekunda1 * 10))

		var minuta1 = Math.floor(minuta / 10)
		var minuta2 = Math.floor(minuta - (minuta1 * 10))

		var godzina1 = Math.floor(godzina / 10)
		var godzina2 = Math.floor(godzina - (godzina1 * 10))

		winnerTime = " " + godzina1 + godzina2 + ":" + minuta1 + minuta2 + ":" + sekunda1 + sekunda2 + "." + milisekunda1 + milisekunda2 + milisekunda3

		timers[0].style.backgroundImage = "url('cyferki/c" + godzina1 + ".gif')";
		timers[1].style.backgroundImage = "url('cyferki/c" + godzina2 + ".gif')";

		timers[2].style.backgroundImage = "url('cyferki/c" + minuta1 + ".gif')";
		timers[3].style.backgroundImage = "url('cyferki/c" + minuta2 + ".gif')";

		timers[4].style.backgroundImage = "url('cyferki/c" + sekunda1 + ".gif')";
		timers[5].style.backgroundImage = "url('cyferki/c" + sekunda2 + ".gif')";

		timers[6].style.backgroundImage = "url('cyferki/c" + milisekunda1 + ".gif')";
		timers[7].style.backgroundImage = "url('cyferki/c" + milisekunda2 + ".gif')";
		timers[8].style.backgroundImage = "url('cyferki/c" + milisekunda3 + ".gif')";
	}


}

var rightSlider = document.getElementById('sliderButtonR');
var leftSlider = document.getElementById('sliderButtonL');
var slider = document.getElementById('content');

rightSlider.addEventListener('click', function () {
	var amRight = setInterval(function () {
		if (sliderPos == 480) {
			sliderPos = 0
		}
		rSlider();
		if (sliderPos == 160) {
			clearInterval(amRight);
			image = '2.jpg'
		}
		if (sliderPos == 320) {
			clearInterval(amRight);
			image = '3.jpg'
		}
		if (sliderPos == 480) {
			clearInterval(amRight);
			image = '1.jpg'
		}
	}, 5)
})

leftSlider.addEventListener('click', function () {
	var amLeft = setInterval(function () {
		if (sliderPos == 0) {
			sliderPos = 480
		}
		lSlider();
		if (sliderPos == 0) {
			clearInterval(amLeft);
			image = '1.jpg'
		}
		if (sliderPos == 160) {
			clearInterval(amLeft);
			image = '2.jpg'
		}
		if (sliderPos == 320) {
			clearInterval(amLeft);
			image = '3.jpg'
		}
	}, 5)
})



function rSlider() {
	sliderPos = sliderPos + 2;
	slider.scrollTo(sliderPos, 0);
}

function lSlider() {
	sliderPos = sliderPos - 2;
	slider.scrollTo(sliderPos, 0);
}



function decodingCookie() {
	let tabCookie = decodeURIComponent(document.cookie).split('; ')
	for (var i = 0; i < tabCookie.length; i++) {
		nickCookie = tabCookie[i].split("=")[0]
		timeToSortCookie = tabCookie[i].split("=")[1].split("|")[0]
		timeCookie = tabCookie[i].split("=")[1].split("|")[1]
		trybCookie = tabCookie[i].split("=")[1].split("|")[2]

		let object = new Object();
		object.nick = nickCookie;
		object.timetosort = timeToSortCookie;
		object.time = timeCookie;
		object.tryb = trybCookie;

		arrayCookie.push(object);


	}
	console.log(arrayCookie);
	sortingArray()
}



function sortingArray() {
	for (var y = 0; y < arrayCookie.length; y++) {
		if (arrayCookie[y].tryb == "0") {
			tab3x3.push(arrayCookie[y])
		}
		if (arrayCookie[y].tryb == "1") {
			tab4x4.push(arrayCookie[y])
		}
		if (arrayCookie[y].tryb == "2") {
			tab5x5.push(arrayCookie[y])
		}
		if (arrayCookie[y].tryb == "3") {
			tab6x6.push(arrayCookie[y])
		}
	}
	tab3x3.sort(function (a, b) {
		return parseFloat(a.timetosort) - parseFloat(b.timetosort);
	});


	tab4x4.sort(function (a, b) {
		return parseFloat(a.timetosort) - parseFloat(b.timetosort);
	});

	tab5x5.sort(function (a, b) {
		return parseFloat(a.timetosort) - parseFloat(b.timetosort);
	});

	tab6x6.sort(function (a, b) {
		return parseFloat(a.timetosort) - parseFloat(b.timetosort);
	});



	generateTable("3x3", tab3x3);
	generateTable("4x4", tab4x4);
	generateTable("5x5", tab5x5);
	generateTable("6x6", tab6x6);

}



function generateTable(a, b) {
	var tableHtml = document.getElementById(a);

	var dlugosc = b.length

	if (dlugosc > 10) {
		dlugosc = 10;
	}
	for (var i = 0; i < dlugosc; i++) {
		var tr = document.createElement("tr");
		var th = document.createElement("th")
		th.innerHTML = b[i].nick
		tr.appendChild(th)
		var th2 = document.createElement("th")
		th2.innerHTML = b[i].time
		tr.appendChild(th2)
		console.log(tr)

		tableHtml.appendChild(tr)
	}
}

