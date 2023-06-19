// const xCoordinate = localStorage.getItem('x');
// const yCoordinate = localStorage.getItem('y');
const xCoordinate = 21;
const yCoordinate = 30;
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

//создаем таблицу агро
const damageMap = [];
for (let i = 0; i < xCoordinate; i++) {
	damageMap[i] = [];
	for (let j = 0; j < yCoordinate; j++) {
		damageMap[i][j] = 0;
	}
}
//создаем пустой массив юнитов
for (let i = 0; i < xCoordinate; i++) {
	unitMap[i] = [];
	for (let j = 0; j < yCoordinate; j++) {
		unitMap[i][j] = 0;
	}
}

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
						let cellX = x + corX;
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
landscape(30, 5, 4, 1, " forest");
// болото
landscape(20, 2, 3, 2, " boloto");

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
gunsEnemy();

const elem = document.querySelector('.info-logo');
const buttonEnd = document.createElement('button');
buttonEnd.setAttribute('id', 'btn-end');
buttonEnd.type = 'button';
buttonEnd.innerHTML = 'Конец хода';
buttonEnd.className = 'button-end';
elem.append(buttonEnd);

//создание левой панели
const createLeftPanelUserInfo = function (unit) {

	const element = document.querySelector('.info-button');
	const buttonMove = document.createElement('button');
	buttonMove.setAttribute('id', 'btn-move');
	buttonMove.type = 'button';
	buttonMove.innerHTML = 'Движение';
	buttonMove.className = 'button-move';
	element.append(buttonMove);
	const buttonFire = document.createElement('button');
	buttonFire.setAttribute('id', 'btn-fire');
	buttonFire.type = 'button';
	buttonFire.innerHTML = 'Огонь';
	buttonFire.className = 'button-fire';
	element.append(buttonFire);
	const buttonReload = document.createElement('button');
	buttonReload.setAttribute('id', 'btn-reload');
	buttonReload.type = 'button';
	buttonReload.innerHTML = 'Перезарядка';
	buttonReload.className = 'button-reload';
	element.append(buttonReload);
	const buttonCancel = document.createElement('button');
	buttonCancel.setAttribute('id', 'btn-cancel');
	buttonCancel.type = 'button';
	buttonCancel.innerHTML = 'Отмена';
	buttonCancel.className = 'button-cancel';
	element.append(buttonCancel);

	document.querySelector('.logo-picture').classList.add(unit);

	const elemString = '' + unit;
	const found = modules.find(element => element.id === elemString);

	document.querySelector('.info-unit-name').textContent = '' + found.list.info;
	document.querySelector('.info-unit-descript').textContent = '' + found.list.description;
	document.querySelector('.info-action-move').textContent = 'Осталось ходов - ' + found.action.move;
	document.querySelector('.info-action-reload').textContent = 'Перезарядка - ' + found.action.reload;
	document.querySelector('.info-action-fire').textContent = 'Осталось стрельнуть - ' + found.action.fire;
}
const cleanSelectUserInfo = function () {
	document.querySelector('.logo-picture').classList = 'logo-picture';
	document.querySelector('.info-unit-name').textContent = 'Играй с умом';
	document.querySelector('.info-unit-descript').textContent = 'выбери юнит и действуй';
	document.querySelector('.info-action-move').textContent = '';
	document.querySelector('.info-action-reload').textContent = '';
	document.querySelector('.info-action-fire').textContent = '';
	const element = document.querySelector('.info-button');
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}
const changeSelectUserUnit = function (unit) {
	const elem = document.getElementById('logo-picture-mouse-move');
	elem.classList = '';
	elem.classList.add(unit);
	const found = modules.find(element => element.id === unit);
	document.querySelector('.descript-mousemove').textContent = '' + found.list.description;
	document.querySelector('.info-mousemove').textContent = '' + found.list.info;
}
const cleanSelectUserUnit = function () {
	document.getElementById('logo-picture-mouse-move').classList = '';
	document.querySelector('.descript-mousemove').textContent = '';
	document.querySelector('.info-mousemove').textContent = '';
}
const cleanSelectBlock = function () {
	// удаляем предыдущий select
	document.getElementById(lastIdUnit).classList.remove("select");
	//выставляем флаг что больше ничего не выбрано
	isUserUnitEnable = false;
}
const cleanMoveBlock = function () {
	const element = document.querySelectorAll(".move");
	for (let el of element) {
		el.classList.remove('move');
	}
}
// рисуем на карте агро от выстрела
const agroLandSSelect = function (i, j) {
	for (let x = -1; x < 2; x++) {
		let cellX = x + i;
		for (let y = -1; y < 2; y++) {
			let cellY = y + j;
			if (cellX >= 0 && cellY >= 0 && cellX < xCoordinate && cellY < yCoordinate) {
				const elem = document.getElementById('x' + cellX + 'y' + cellY);
				elem.classList.add("agro");
				damageMap[cellX][cellY] = agro + 10;
			}
		}
	}
}
let lastIdUnit = '';
let lastClassUnit = '';
let moveCoordinate = '';
let fireCoordinate = '';
let isUserUnitEnable = false;
let isGradSelect = false;
let selectBlock = '';
let agroSelectUnit = '';
let agro = 50;

const enemyUnitCoordinates = [];
for (let i = 0; i < xCoordinate; i++) {
	for (let j = 18; j < yCoordinate; j++) {
		let a = unitMap[i][j];
		if (a == 5 || a === 6 || a == 7) {
			enemyUnitCoordinates.push([i, j]);
		};
	};
};


//делаем функцию ходов по череди

const iiTurn = 1;
const userTurn = 1;



// select выбор юнита
const landSelection = document.querySelector('.main');
landSelection.addEventListener("click", function (e) {
	if (e.target.closest('.array-land')) {
		if (!e.target.closest('.block')) return;
		selectBlock = e.target.id;

		if (!isUserUnitEnable) {
			if (!moveCoordinate && !fireCoordinate) {
				modulesUserUnit.find(element => {
					if (e.target.classList[2] === element.id) {
						if (element.id === 'User_grad_2' || element.id === 'User_grad_1') {
							isGradSelect = true;
						}
						document.getElementById(selectBlock).classList.add("select");
						lastClassUnit = e.target.classList[2];
						lastIdUnit = selectBlock;
						agroSelectUnit = lastIdUnit;
						isUserUnitEnable = true;
						createLeftPanelUserInfo(lastClassUnit);
					}
				});
			}
		}

		moveCoordinate = ''
		fireCoordinate = ''
	} else if (e.target.closest('.button-move')) {
		const found = modulesUserUnit.find(element => element.id === lastClassUnit);
		if (found.action.move !== 0) {
			//убираем xy
			const i = lastIdUnit.match(/(?<=x)\d+/) | 0;
			const j = lastIdUnit.match(/(?<=y)\d+/) | 0;
			document.getElementById(lastIdUnit).classList.add("move");

			for (let x = -1; x < 2; x++) {
				let cellX = x + i;
				for (let y = -1; y < 2; y++) {
					let cellY = y + j;
					if (cellX >= 0 && cellY >= 0 && cellX < xCoordinate && cellY < yCoordinate) {
						const elem = document.getElementById('x' + cellX + 'y' + cellY);
						if (elem.classList[2] === undefined || elem.classList[2] === 'agro') {
							elem.classList.add("move");
						}
					}
				}
			}
		}
		document.querySelector('.array-land').addEventListener('click', e => {
			if (!e.target.closest('.move')) return;
			moveCoordinate = e.target.id;
			const i = lastIdUnit.match(/(?<=x)\d+/) | 0;
			const j = lastIdUnit.match(/(?<=y)\d+/) | 0;
			iDel = moveCoordinate.match(/(?<=x)\d+/) | 0;
			jDel = moveCoordinate.match(/(?<=y)\d+/) | 0;
			document.getElementById(lastIdUnit).classList.remove(lastClassUnit);
			document.getElementById(moveCoordinate).classList.add(lastClassUnit);
			const found = modulesUserUnit.find(element => element.id === lastClassUnit);
			unitMap[i][j] = 0;
			unitMap[iDel][jDel] = found.list.arrayId;
			found.action.move = found.action.move - 1;
			found.action.fire = 0;
			found.action.reload = 0;

			cleanSelectBlock();
			cleanSelectUserInfo();
			cleanMoveBlock();

		}, { "once": false }
		);

	} else if (e.target.closest('.button-fire')) {
		const found = modulesUserUnit.find(element => element.id === lastClassUnit);
		if (found.action.fire !== 0) {
			document.querySelector('.array-land').addEventListener('click', e => {
				// нажата не блок
				if (!e.target.closest('.block')) return;
				//находим Id нажатого элемента
				const enemyUnit = e.target.id;
				let ii = enemyUnit.match(/(?<=x)\d+/) | 0;
				let jj = enemyUnit.match(/(?<=y)\d+/) | 0;

				const i = agroSelectUnit.match(/(?<=x)\d+/) | 0;
				const j = agroSelectUnit.match(/(?<=y)\d+/) | 0;

				if (isGradSelect) {
					let max = 3;
					let min = -3
					let count = 0;
					do {
						let x1 = Math.floor(Math.random() * (max - min)) + min;
						let y1 = Math.floor(Math.random() * (max - min)) + min;
						const xCoord = ii + x1
						const yCoord = jj + y1
						if (unitMap[xCoord][yCoord] === 0) {
							count = count + 1;
							document.getElementById('x' + xCoord + 'y' + yCoord).classList.add("mimo");
						} else if (unitMap[xCoord][yCoord] > 0) {
							document.getElementById('x' + xCoord + 'y' + yCoord).classList.add("popal");
							unitMap[xCoord][yCoord] = 0
							count = count + 1;
						}
					} while (count < 4);

					isGradSelect = false

				} else {
					if (unitMap[ii][jj] === 0) {
						document.getElementById('x' + ii + 'y' + jj).classList.add("mimo");
					} else if (unitMap[ii][jj] > 0) {
						document.getElementById('x' + ii + 'y' + jj).classList.add("popal");
						document.getElementById('x' + ii + 'y' + jj).classList.remove(document.getElementById('x' + ii + 'y' + jj).classList[2])
					}

				}
				unitMap[ii][jj] = 0;
				agroLandSSelect(i, j);
				fireCoordinate = '';
				found.action.move = 0;
				found.action.fire = 0;
				found.action.reload = 0;
				cleanSelectBlock();
				cleanSelectUserInfo();

				console.log(damageMap)


			}, { "once": true });
		} else console.log('некому ходить , конец хода')

	} else if (e.target.closest('.button-reload')) {
		const found = modulesUserUnit.find(element => element.id === lastClassUnit);
		found.action.move = 0;
		found.action.fire = 0;
		found.action.reload = 0;
		cleanSelectBlock();
		cleanSelectUserInfo();
	} else if (e.target.closest('.button-cancel')) {
		cleanSelectBlock();
		cleanSelectUserInfo();
		cleanMoveBlock();
	}
})

landSelection.addEventListener("mouseover", function (e) {
	let target = e.target.closest('.block');
	if (!target) return
	let sliceSelect = e.target.classList;
	if(sliceSelect.contains('agro') || sliceSelect.contains('move') || sliceSelect.contains('select')){

		changeSelectUserUnit('' + sliceSelect[2]);
	}else if (sliceSelect.lenght >2){
		changeSelectUserUnit('' + sliceSelect[1]);
	}else {
		changeSelectUserUnit('' + sliceSelect[1])
	} ;



})

landSelection.addEventListener("mouseout", function (e) {
	let target = e.target.closest('.block');
	if (!target) return
	cleanSelectUserUnit();
})



// if (sliceSelect.item(sliceSelect.length - 1) === 'move') {
		
// 	if (sliceSelect.item(sliceSelect.length - 1) === 'move' && sliceSelect.item(sliceSelect.length - 2) === 'select' || sliceSelect.item(sliceSelect.length - 2) === 'agro') {
// 		
// 	} else if (sliceSelect.item(sliceSelect.length - 1) === 'move' && sliceSelect.item(sliceSelect.length - 2) === 'select' && sliceSelect.item(sliceSelect.length - 3) === 'agro') {
// 		changeSelectUserUnit('' + sliceSelect.item(sliceSelect.length - 4));
// 	} else changeSelectUserUnit('' + sliceSelect.item(sliceSelect.length - 2));
// } else if (sliceSelect.item(sliceSelect.length - 1) === 'select' || sliceSelect.item(sliceSelect.length - 1) === 'agro') {
// 	changeSelectUserUnit('' + sliceSelect.item(sliceSelect.length - 2));
// } else changeSelectUserUnit('' + sliceSelect.item(sliceSelect.length - 1));
// })