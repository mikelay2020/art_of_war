// const xCoordinate = localStorage.getItem('x');
// const yCoordinate = localStorage.getItem('y');
const xCoordinate = 21
const yCoordinate = 30
// передаем в CSS переменные для Grid-ов
document.documentElement.style.setProperty('--array-greedX', yCoordinate);
document.documentElement.style.setProperty('--array-greedY', xCoordinate);
//всавляем в класс arr-block
const elem = document.getElementById('g15')
const elem1 = document.getElementById('fr36')


// создаем DIV с ID fon
for (let x = 0; x < xCoordinate; x++) {
	for (let y = 0; y < yCoordinate; y++) {
		const divEl = document.createElement('div');
		divEl.classList.add('block');
		divEl.setAttribute('id', 'x' + x + 'y' + y);
		elem.append(divEl);
	}
}

// создаем DIV с ID unit 
for (let x = 0; x < xCoordinate; x++) {
	for (let y = 0; y < yCoordinate; y++) {
		const divEl = document.createElement('div');
		divEl.classList.add('block1');
		divEl.setAttribute('id', 'i' + x + 'j' + y);
		elem1.append(divEl);
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
console.log(unitMap)

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
			document.getElementById('i' + x + 'j' + y).className += gun;
			k = k + 1;
		}
	} while (k < amount);
}

gunsEnemy(5, 4, " d30");
gunsEnemy(6, 3, " minomet");
gunsEnemy(7, 2, " grad");

// Функция создания орудий игрока unit - номер в массиве, amount - количество юнитов, gun - класс в CSS
const gunsUser = function (unit, amount, gun) {
	let k = 0;
	do {
		let x = Math.floor(Math.random() * xCoordinate);
		let y = Math.floor(Math.random() * yCoordinate - 18);
		if (unitMap[x][y] === 0) {
			unitMap[x][y] = unit;
			document.getElementById('i' + x + 'j' + y).className += gun;
			k = k + 1;
			for (let i = 0; i < xCoordinate; i++) {
				for (let j = 0; j < yCoordinate - 15; j++) {
					let a = unitMap[i][j];
					if (a == 5 || a === 6 || a == 7) {
						for (let k = -2; k < 3; k++) {
							for (let l = -2; l < 3; l++) {
								if ((i + k) < xCoordinate && (j + l) < yCoordinate && (i + k + 1) > 0 && (j + l + 1) > 0) {
									unitMap[i + k][j + l] = 1
									unitMap[i][j] = a
								}
							}
						}
					};
				};
			};
		}
	} while (k < amount);
}

gunsUser(5, 4, " d30");
gunsUser(6, 3, " minomet");
gunsUser(7, 2, " grad");

// тень войны
for (let i = 0; i < xCoordinate; i++) {
	for (let j = 0; j < yCoordinate - 15; j++) {
		if (unitMap[i][j] === 0) {
			let cell = 'x' + i + 'y' + j;
			document.getElementById(cell).classList.toggle("shadow");
		}
	}
}
for (let i = 0; i < xCoordinate; i++) {
	for (let j = 15; j < yCoordinate; j++) {
		let cell = 'x' + i + 'y' + j;
		document.getElementById(cell).classList.toggle("shadow");
	}
}

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
//  console.log(enemyUnitCoordinates)

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
// console.log(userUnitCoordinates)
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

	document.querySelector('.info-logo').className += unit;

}

const changeSelectUserUnit = function () {
	const element = document.getElementById("lp14");



}

let lastIdUnit = ''
let lastClassUnit = ''
const hash = ''
let isUserUnitEnable = false
const game = document.querySelector('.pole');
let gradFIre = false;
game.addEventListener("click", function (e) {
	if (e.target.closest('.array-unit')) {
		if (!e.target.closest('.block1')) return;
		const selectBlock = e.target.id;
		if (!isUserUnitEnable) {
			if (hash == '' && e.target.closest('.d30')) {
				console.log('Выбрана Гаубица')
				document.getElementById(selectBlock).classList.toggle("select");
				lastClassUnit = ' d30'
				lastIdUnit = selectBlock
				isUserUnitEnable = true
				leftPanelUserInfo(lastClassUnit)
			} else if (hash == '' && e.target.closest('.minomet')) {
				console.log('Выбран Миномет')
				document.getElementById(selectBlock).classList.toggle("select");
				lastClassUnit = ' minomet'
				lastIdUnit = selectBlock
				isUserUnitEnable = true
				leftPanelUserInfo(lastClassUnit)
			} else if (hash == '' && e.target.closest('.grad')) {
				console.log('Выбран РСЗО Град')
				document.getElementById(selectBlock).classList.toggle("select");
				lastClassUnit = ' grad'
				lastIdUnit = selectBlock
				isUserUnitEnable = true
				leftPanelUserInfo(lastClassUnit)
				gradFire = true;
			}
		}
	} else if (e.target.closest('.button-move')) {
		console.log('move')
		//
		//тут будет код для движения
		//
		//
		//
	} else if (e.target.closest('.button-fire')) {
		document.querySelector('.array-unit').addEventListener('click', e => {
			// нажата не блок
			if (!e.target.closest('.block1')) return;
			//находим Id нажатого элемента
			const enemyUnit = e.target.id;
			//убираем xy
			let ii = enemyUnit.match(/(?<=i)\d+/) | 0
			let jj = enemyUnit.match(/(?<=j)\d+/) | 0
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
							if (userUnitCoordinates.length === 0) return alert('game over')
						}
					})
				});
			}

		}, { "once": true })
	} else if (e.target.closest('.button-cancel')) {
		// удаляем предыдущий select
		document.getElementById(lastIdUnit).classList.remove("select")
		//выставляем флаг что больше ничего не выбрано
		isUserUnitEnable = false
		//удаляем левое меню
		changeSelectUserUnit()
	}
})


