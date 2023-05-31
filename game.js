// const xCoordinate = localStorage.getItem('x');
// const yCoordinate = localStorage.getItem('y');
const xCoordinate = 21
const yCoordinate = 30
// передаем в CSS переменные для Grid-ов
document.documentElement.style.setProperty('--array-greedX', yCoordinate);
document.documentElement.style.setProperty('--array-greedY', xCoordinate);

// создаем DIV с ID fon
for (let x = 0; x < xCoordinate; x++) {
	for (let y = 0; y < yCoordinate; y++) {
		const divElement = document.createElement('div');
		divElement.classList.add('block');
		divElement.setAttribute('id', 'x' + x + 'y' + y);
		document.getElementById('landscape').append(divElement);
	}
}

//создаем пустой массив ландшафта
const map = [];
for (let i = 0; i < xCoordinate; i++) {
	map[i] = [];
	for (let j = 0; j < yCoordinate; j++) {
		map[i][j] = 0;
	}
}
//создаем пустой массив юнитов
const unitMap = [];
for (let i = 0; i < xCoordinate; i++) {
	unitMap[i] = [];
	for (let j = 0; j < yCoordinate; j++) {
		unitMap[i][j] = 0;
	}
}
// console.log(unitMap)

// функция ландшафта amount - количество элементов,  lenghtArr - количество повтрорений,
// rnd - разброс от начальной точки, classLandscape - выбор ландшафта land - выбор типа ландшафта
const landscape = function (amount, lenghtArr, rnd, land, classLandscape) {
	let count = 0;
	do {
		let x = Math.floor(Math.random() * xCoordinate);
		let y = Math.floor(Math.random() * yCoordinate);
		if (map[x][y] === 0) {
			for (let i = 0; i < lenghtArr; i++) {
				corX = Math.floor(Math.random() * rnd);
				corY = Math.floor(Math.random() * rnd);
				if ((x + corX) < xCoordinate && (y + corY) < yCoordinate) {
					if (map[x + corX][y + corY] === 0) {
						map[x + corX][y + corY] = land;
						let cellX = x + corX
						let cellY = y + corY;
						document.getElementById('x' + cellX + 'y' + cellY).className += classLandscape;
					}
				}
			}
			count = count + 1;
		}
	} while (count < amount);
}
// лес
landscape(30, 5, 4, 1, " forest")
// болото
landscape(20, 2, 3, 2, " boloto")

// заполняем остальные поля травой
for (let i = 0; i < xCoordinate; i++) {
	for (let j = 0; j < yCoordinate; j++) {
		if (map[i][j] === 0) {
			let cell = 'x' + i + 'y' + j;
			document.getElementById(cell).className += " trava";
		}
	}
}
// выод юнитов на карту и в массив
gunsUser();
gunsEnemy()


const leftPanelUserInfo = function (unit) {
	const elem4 = document.querySelector('.info-button');
	const button = document.createElement('button');
	button.type = 'button';
	button.innerHTML = 'Движение';
	button.className = 'button-move';
	elem4.append(button);
	const button2 = document.createElement('button');
	button2.type = 'button';
	button2.innerHTML = 'Огонь';
	button2.className = 'button-fire';
	elem4.append(button2);
	const button3 = document.createElement('button');
	button3.type = 'button';
	button3.innerHTML = 'Отмена';
	button3.className = 'button-cancel';
	elem4.append(button3);
	document.querySelector('.logo-picture').classList.add(unit);
	const elemString = ''+unit
	const found = modulesUserUnit.find(element => element.id === elemString);
	document.querySelector('.info-unit-name').textContent = ''+found.list.info;
	document.querySelector('.info-unit-descript').textContent = ''+found.list.description;
}
const cleanSelectUserInfo = function () {
	document.querySelector('.logo-picture').classList='logo-picture';
	document.querySelector('.info-unit-name').textContent = 'Играй с умом';
	document.querySelector('.info-unit-descript').textContent = 'выбери юнит и действуй';
	const element = document.querySelector(".info-button");
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	  }

}
const changeSelectUserUnit = function (unit) {
	const elem =document.getElementById('p2');
	elem.classList='';
	elem.classList.add(unit);
	const found = modules.find(element => element.id === unit);
	document.querySelector('.descript-mousemove').textContent = ''+found.list.description;
	document.querySelector('.info-mousemove').textContent = ''+found.list.info;
}
const cleanSelectUserUnit = function () {
	document.getElementById('p2').classList='';
	document.querySelector('.descript-mousemove').textContent = '';
	document.querySelector('.info-mousemove').textContent = '';
}
const cleanSelectBlock = function(){
			// удаляем предыдущий select
			document.getElementById(lastIdUnit).classList.remove("select")
			//выставляем флаг что больше ничего не выбрано
			isUserUnitEnable = false
		}

const cleanMoveBlock = function(){
	const element = document.querySelectorAll(".move");
	for (let el of element){
		el.classList.remove('move');

	}
}



let lastIdUnit = ''
let lastClassUnit = ''
let moveCoordinate =''

let isUserUnitEnable = false
const landSelection = document.querySelector('.main');
let gradFIre = false;
landSelection.addEventListener("click", function (e) {
	if (e.target.closest('.array-land')) {
		if (!e.target.closest('.block')) return;
		const selectBlock = e.target.id;
		const found = modules.find(element => element.id === e.target.classList[2]);

		if (!isUserUnitEnable && !moveCoordinate) {
				console.log('Выбран ',found.list.info)
				document.getElementById(selectBlock).classList.add("select");
				lastClassUnit = e.target.classList[2]
				lastIdUnit = selectBlock
				isUserUnitEnable = true
				leftPanelUserInfo(lastClassUnit)
	
		}
		moveCoordinate=''
	} else if (e.target.closest('.button-move')) {
					//убираем xy
			 const i = lastIdUnit.match(/(?<=x)\d+/) | 0
			 const j = lastIdUnit.match(/(?<=y)\d+/) | 0
			 document.getElementById(lastIdUnit).classList.add("move");
		
		for (let x = -1; x < 2; x++) {
			let cellX = x + i
			for (let y = -1; y < 2; y++) {
				let cellY = y + j;
				if (cellX >= 0  && cellY >= 0 && cellX < xCoordinate &&cellY <yCoordinate) {
					const elem = document.getElementById('x' + cellX + 'y' + cellY)
					if (elem.classList[2] === undefined){
						elem.classList.add("move");
					}
				}
			}
		}
		document.querySelector('.array-land').addEventListener('click', e => {
			if (!e.target.closest('.move')) return;
			moveCoordinate = e.target.id;
			const i = lastIdUnit.match(/(?<=x)\d+/) | 0
			const j = lastIdUnit.match(/(?<=y)\d+/) | 0
			iDel=moveCoordinate.match(/(?<=x)\d+/) | 0
			jDel =moveCoordinate.match(/(?<=y)\d+/) | 0
			document.getElementById(lastIdUnit).classList.remove(lastClassUnit)
			document.getElementById(moveCoordinate).classList.add(lastClassUnit);
			const found = modulesUserUnit.find(element => element.id === lastClassUnit);
			console.log(found)

			unitMap[i][j]=0;
			unitMap[iDel][jDel]=found.list.arrayId
			cleanSelectBlock();
			cleanSelectUserInfo();
			cleanMoveBlock();


console.log(unitMap)

		}, { "once": false }
		);

	} else if (e.target.closest('.button-fire')) {
		//создаем массив с координатами врага
		const enemyUnitCoordinates = [];
		for (let i = 0; i < xCoordinate; i++) {
			for (let j = 18; j < yCoordinate; j++) {
				let a = unitMap[i][j];
				if (a == 5 || a === 6 || a == 7) {
					enemyUnitCoordinates.push([i, j]);
				};
			};
		};
		//создаем массив с координатами игрока
		const userUnitCoordinates = [];
		for (let i = 0; i < xCoordinate; i++) {
			for (let j = 0; j < yCoordinate - 18; j++) {
				let a = unitMap[i][j];
				if (a == 5 || a === 6 || a == 7) {
					userUnitCoordinates.push([i, j]);
				};
			};
		};
		document.querySelector('.array-land').addEventListener('click', e => {
			// нажата не блок
			if (!e.target.closest('.block')) return;
			//находим Id нажатого элемента
			const enemyUnit = e.target.id;
			//убираем xy
			let ii = enemyUnit.match(/(?<=x)\d+/) | 0
			let jj = enemyUnit.match(/(?<=y)\d+/) | 0
			//создаем массив нажатого блока
			const strToNumber = [];
			strToNumber.push([ii, jj]);
			if (unitMap[ii][jj] <= 1) document.getElementById(enemyUnit).classList.toggle("mimo");
			//огонь по юнитам противника
			for (i = 0; i < enemyUnitCoordinates.length; i++) {
				enemyUnitCoordinates.forEach(x => {
					// проверяем совпадение по занечению в 2х массивах
					strToNumber.forEach(w => {
						if (x[i] == w[0] && x[i + 1] == w[1]) {
							console.log('Boom!');
							//меняем фон
							document.getElementById(enemyUnit).classList.toggle("popal");
							//удаляем найденый элемент
							enemyUnitCoordinates.splice(enemyUnitCoordinates.indexOf(x), 1);
							const delUnitClass = document.getElementById(enemyUnit).classList
							if (delUnitClass.contains('grad'))document.getElementById(enemyUnit).classList.remove('grad')
							else if(delUnitClass.contains('d30'))document.getElementById(enemyUnit).classList.remove('d30')
							else if(delUnitClass.contains('minomet'))document.getElementById(enemyUnit).classList.remove('minomet')
							if (enemyUnitCoordinates.length === 0) return alert('game over')
						}
					})
				});

			}
			//огонь по своим
			for (i = 0; i < userUnitCoordinates.length; i++) {
				userUnitCoordinates.forEach(x => {
					// проверяем совпадение по занечению в 2х массивах
					strToNumber.forEach(w => {
						if (x[i] == w[0] && x[i + 1] == w[1]) {
							console.log('Попал по своим! Падла!');
							//меняем фон
							document.getElementById(enemyUnit).classList.toggle("popal");
							//удаляем найденый элемент
							userUnitCoordinates.splice(userUnitCoordinates.indexOf(x), 1);
							const delUnitClass = document.getElementById(enemyUnit).classList
							if (delUnitClass.contains('grad'))document.getElementById(enemyUnit).classList.remove('grad')
							else if(delUnitClass.contains('d30'))document.getElementById(enemyUnit).classList.remove('d30')
							else if(delUnitClass.contains('minomet'))document.getElementById(enemyUnit).classList.remove('minomet')
							if (userUnitCoordinates.length === 0) return alert('game over')
						}
					})
				});
			}
			cleanSelectBlock();
			cleanSelectUserInfo();
		
		}, { "once": true })
	} else if (e.target.closest('.button-cancel')) {
		cleanSelectBlock();
		cleanSelectUserInfo();
		cleanMoveBlock();
	}
	})



landSelection.addEventListener("mouseover", function (e) {
	let target = e.target.closest('.block');
	if(!target) return
	let sliceSelect = e.target.classList
	if(sliceSelect.item(sliceSelect.length-1) === 'move'){
		if(sliceSelect.item(sliceSelect.length-1) === 'move' && sliceSelect.item(sliceSelect.length-2) === 'select'){
			changeSelectUserUnit(''+ sliceSelect.item(sliceSelect.length-3))
		}else changeSelectUserUnit(''+ sliceSelect.item(sliceSelect.length-2))
	} else if(sliceSelect.item(sliceSelect.length-1) === 'select'){
		changeSelectUserUnit(''+ sliceSelect.item(sliceSelect.length-2))
	} else changeSelectUserUnit(''+ sliceSelect.item(sliceSelect.length-1))
	})
landSelection.addEventListener("mouseout", function (e) {
	let target = e.target.closest('.block');
	if(!target) return
	 cleanSelectUserUnit()
})