const modulesUserUnit = [
	{
		id: 'User_d30_1',
		list: {
			info: "Гаубица Д-30",
			description: "Это крутая пушка. Бьёт до конца карты",
			arrayId: 2

		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'User_d30_2',
		list: {
			info: "Гаубица Д-30",
			description: "Это крутая пушка. Бьёт до конца карты",
			arrayId: 2
		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'User_minomet_1',
		list: {
			info: "120 миномет",
			description: "отлично накрывает и очень мобильное орудие",
			arrayId: 3
		},
		action: {
			move: 2,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'User_minomet_2',
		list: {
			info: "120 миномет",
			description: "отлично накрывает и очень мобильное орудие",
			arrayId: 3
		},
		action: {
			move: 2,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'User_grad_1',
		list: {
			info: "РСЗО Град",
			description: "Стреляет по трём клеткам, ссутся даже медведи",
			arrayId: 4
		},
		action: {
			move: 3,
			reload: 3,
			fire: 1
		}
	},
	{
		id: 'User_grad_2',
		list: {
			info: "РСЗО Град",
			description: "Стреляет по трём клеткам, ссутся даже медведи",
			arrayId: 4
		},
		action: {
			move: 3,
			reload: 3,
			fire: 1
		}
	}
]

const modulesEnemyUnit = [
	{
		id: 'Enemy_d30_1',
		list: {
			info: "Гаубица Д-30",
			description: "Это крутая пушка. Бьёт до конца карты",
			arrayId: 5

		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'Enemy_d30_2',
		list: {
			info: "Гаубица Д-30",
			description: "Это крутая пушка. Бьёт до конца карты",
			arrayId: 5
		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'Enemy_minomet_1',
		list: {
			info: "120 миномет",
			description: "отлично накрывает и очень мобильное орудие",
			arrayId: 6
		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'Enemy_minomet_2',
		list: {
			info: "120 миномет",
			description: "отлично накрывает и очень мобильное орудие",
			arrayId: 5
		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'Enemy_grad_1',
		list: {
			info: "РСЗО Град",
			description: "Стреляет по трём клеткам, ссутся даже медведи",
			arrayId: 6
		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	},
	{
		id: 'Enemy_grad_2',
		list: {
			info: "РСЗО Град",
			description: "Стреляет по трём клеткам, ссутся даже медведи",
			arrayId: 6
		},
		action: {
			move: 1,
			reload: 1,
			fire: 1
		}
	}
]


const modulesLandscape = [
	{
		id: 'shadow',
		list: {
			info: "Туман войны",
			description: "В тумане нихера не видно",
			range: null
		}
	},
	{
		id: "boloto",
		list: {
			info: "Болото",
			description: "В болоте вязнет техника и комар в жопу кусает ",
			range: -2
		}
	},
	{
		id: 'forest',
		list: {
			info: "Лес",
			description: "В лесу темно и волки сношаются",
			range: -1
		}
	},
	{
		id: 'trava',
		list: {
			info: "Травка",
			description: "Мягонькая травка, щекочет иички",
			range: 0
		}
	}
]
const modulesDamage = [
	{
		id: 'mimo',
		list: {
			info: "Воронка от взрыва",
			description: "Сюда уже прилетало",
			range: null
		}
	},
	{
		id: 'popal',
		list: {
			info: "Взорвано",
			description: "что-то уже горит",
			range: null
		}
	}
]

const modules = [...modulesUserUnit, ...modulesLandscape, ...modulesEnemyUnit, ...modulesDamage]



const gunsUser = function () {
	let k = 0;
	modulesUserUnit.forEach(un => {
		while (k < 1) {
			let x = Math.floor(Math.random() * xCoordinate);
			let y = Math.floor(Math.random() * yCoordinate - 18);
			if (unitMap[x][y] === 0) {
				unitMap[x][y] = un.list.arrayId;
				document.getElementById('x' + x + 'y' + y).classList.add('' + un.id);
				k = 1
			}
		}
		k = 0
	})
}

const gunsEnemy = function () {
	let k = 0;
	modulesEnemyUnit.forEach(un => {
		while (k < 1) {
			let x = Math.floor(Math.random() * xCoordinate);
			let y = Math.floor(Math.random() * yCoordinate + 18);
			if (unitMap[x][y] === 0) {
				unitMap[x][y] = un.list.arrayId;
				document.getElementById('x' + x + 'y' + y).classList.add('' + un.id);
				k = 1
			}
		}
		k = 0
	})
}











			//для тумана войны
			// for (let i = 0; i < xCoordinate; i++) {
			// 	for (let j = 0; j < yCoordinate - 15; j++) {
			// 		let a = unitMap[i][j];
			// 		if (a == 5 || a === 6 || a == 7) {
			// 			for (let k = -2; k < 3; k++) {
			// 				for (let l = -2; l < 3; l++) {
			// 					 if ((i + k) < xCoordinate && (j + l) < yCoordinate && (i + k + 1) > 0 && (j + l + 1) > 0) {
			// 					 unitMap[i + k][j + l] = 1
			// 					unitMap[i][j] = a
			// 					 }
			// 				}
			// 			}
			// 		};
			// 	};
			// };