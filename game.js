// const xCoordinate = localStorage.getItem('x');
// const yCoordinate = localStorage.getItem('y');
const xCoordinate = 21
const yCoordinate = 30
// передаем в CSS переменные для Grid-ов
document.documentElement.style.setProperty('--array-greedX', yCoordinate);
document.documentElement.style.setProperty('--array-greedY', xCoordinate);
//всавляем в класс arr-block
const elem = document.getElementById('landscape')
const elem1 = document.getElementById('unit-area')


// создаем DIV с ID fon
for (let x = 0; x < xCoordinate; x++) {
	for (let y = 0; y < yCoordinate; y++) {
		const divElement = document.createElement('div');
		divElement.classList.add('block');
		divElement.setAttribute('id', 'x' + x + 'y' + y);
		elem.append(divElement);
	}
}

// создаем DIV с ID unit 
// for (let x = 0; x < xCoordinate; x++) {
// 	for (let y = 0; y < yCoordinate; y++) {
// 		const divEl = document.createElement('div');
// 		divEl.classList.add('block1');
// 		divEl.setAttribute('id', 'i' + x + 'j' + y);
// 		elem1.append(divEl);
// 	}
// }

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

// console.log(map)

// Функция создания орудий соперника unit - номер в массиве, amount - количество юнитов, gun - класс в CSS
const gunsEnemy = function (unit, amount, gun) {
	let k = 0;
	do {
		let x = Math.floor(Math.random() * xCoordinate);
		let y = Math.floor(Math.random() * yCoordinate + 18);
		if (unitMap[x][y] === 0) {
			unitMap[x][y] = unit;
			document.getElementById('x' + x + 'y' + y).className += gun;
			k = k + 1;
		}
	} while (k < amount);
}

const d30=5;
const minomet =6;
const grad =7;

gunsEnemy(d30, 4, " d30");
gunsEnemy(minomet, 3, " minomet");
gunsEnemy(grad, 2, " grad");

// Функция создания орудий игрока unit - номер в массиве, amount - количество юнитов, gun - класс в CSS
const gunsUser = function (unit, amount, gun) {
	let k = 0;
	do {
		let x = Math.floor(Math.random() * xCoordinate);
		let y = Math.floor(Math.random() * yCoordinate - 18);
		if (unitMap[x][y] === 0) {
			unitMap[x][y] = unit;
			document.getElementById('x' + x + 'y' + y).className += gun;
			k = k + 1;
			for (let i = 0; i < xCoordinate; i++) {
				for (let j = 0; j < yCoordinate - 15; j++) {
					let a = unitMap[i][j];
					if (a == 5 || a === 6 || a == 7) {
						for (let k = -2; k < 3; k++) {
							for (let l = -2; l < 3; l++) {
								// if ((i + k) < xCoordinate && (j + l) < yCoordinate && (i + k + 1) > 0 && (j + l + 1) > 0) {
									// unitMap[i + k][j + l] = 1
									unitMap[i][j] = a
								// }
							}
						}
					};
				};
			};
		}
	} while (k < amount);
}

gunsUser(d30, 4, " d30");
gunsUser(minomet, 3, " minomet");
gunsUser(grad, 2, " grad");

// // тень войны
// for (let i = 0; i < xCoordinate; i++) {
// 	for (let j = 0; j < yCoordinate - 15; j++) {
// 		if (unitMap[i][j] === 0) {
// 			let cell = 'x' + i + 'y' + j;
// 			document.getElementById(cell).classList.toggle("shadow");
// 		}
// 	}
// }
// for (let i = 0; i < xCoordinate; i++) {
// 	for (let j = 15; j < yCoordinate; j++) {
// 		let cell = 'x' + i + 'y' + j;
// 		document.getElementById(cell).classList.toggle("shadow");
// 	}
// }



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
	const found = modules.find(element => element.name === elemString);
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
	const elemString = ''+unit
	const found = modules.find(element => element.name === elemString);
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
			//удаляем левое меню
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

const hash = ''
let isUserUnitEnable = false
const unitSelection = document.querySelector('.main');
let gradFIre = false;
unitSelection.addEventListener("click", function (e) {
	if (e.target.closest('.array-land')) {
		if (!e.target.closest('.block')) return;
		const selectBlock = e.target.id;
		if (!isUserUnitEnable && !moveCoordinate) {
			if (hash == '' && e.target.closest('.d30')) {
				console.log('Выбрана Гаубица')
				document.getElementById(selectBlock).classList.toggle("select");
				lastClassUnit = 'd30'
				lastIdUnit = selectBlock
				isUserUnitEnable = true
				leftPanelUserInfo(lastClassUnit)
			} else if (hash == '' && e.target.closest('.minomet')) {
				console.log('Выбран Миномет')
				document.getElementById(selectBlock).classList.toggle("select");
				lastClassUnit = 'minomet'
				lastIdUnit = selectBlock
				isUserUnitEnable = true
				leftPanelUserInfo(lastClassUnit)
			} else if (hash == '' && e.target.closest('.grad')) {
				console.log('Выбран РСЗО Град')
				document.getElementById(selectBlock).classList.toggle("select");
				lastClassUnit = 'grad'
				lastIdUnit = selectBlock
				isUserUnitEnable = true
				leftPanelUserInfo(lastClassUnit)
				gradFire = true;
			}

		}
		moveCoordinate=''
	} else if (e.target.closest('.button-move')) {
					//убираем xy
			 const i = lastIdUnit.match(/(?<=x)\d+/) | 0
			 const j = lastIdUnit.match(/(?<=y)\d+/) | 0
			 document.getElementById(lastIdUnit).classList.toggle("move");
		
		for (let x = -1; x < 2; x++) {
			let cellX = x + i
			for (let y = -1; y < 2; y++) {
				let cellY = y + j;
				if (cellX >= 0  && cellY >= 0 && cellX < xCoordinate &&cellY <yCoordinate) {
					const elem = document.getElementById('x' + cellX + 'y' + cellY)
					const chek1=elem.classList.contains('d30')
					const chek2=elem.classList.contains('minomet')
					const chek3=elem.classList.contains('grad')
					const chek4=elem.classList.contains('mimo')
					const chek5=elem.classList.contains('popal')
					if(chek1 !== true && chek2 !== true && chek3 !== true && chek4 !== true && chek5 !== true){
							elem.classList.add("move");
					}
				}
			}
		}
		document.querySelector('.array-land').addEventListener('click', e => {
			if (!e.target.closest('.move')) return;
			moveCoordinate = e.target.id;
			iDel=moveCoordinate.match(/(?<=x)\d+/) | 0
			jDel =moveCoordinate.match(/(?<=y)\d+/) | 0
			document.getElementById(lastIdUnit).classList.remove(lastClassUnit)
			document.getElementById(moveCoordinate).classList.add(lastClassUnit);

			cleanSelectBlock();
			cleanSelectUserInfo();
			cleanMoveBlock();

			unitMap[i][j]=0;
			if (lastClassUnit === 'grad'){
				unitMap[iDel][jDel]=grad;
			} else if ( lastClassUnit === 'minomet'){
				unitMap[iDel][jDel]=minomet;
			} else if (lastClassUnit === 'd30'){
				unitMap[iDel][jDel]=d30;
			} 

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



const landSelection = document.querySelector('.main');
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