const modules =[
	{name: "boloto", 
					list:{
						info: "Болото",
						description: "В болоте вязнет техника и комар в жопу кусает ",
						range: -2
					}
	},
	{name: 'forest',
					list:{
						info: "Лес",
						description: "В лесу темно и волки сношаются",
						range: 1
					}
	},
	{name: 'trava',
					list:{
						info: "Травка",
						description: "Мягонькая травка, щекочет иички",
						range: 0
					}
	},
	{name: 'shadow',
					list:{
						info: "Туман войны",
						description: "В тумане нихера не видно",
						range: null
					}
	},
	{name: 'd30',
					list:{
						info: "Гаубица Д-30",
						description: "Это крутая пушка. Бьёт до конца карты",
						move: 1,
						reload: 1,
						fire:1
					}
	},
	{name: 'minomet',
					list:{
						info: "120 миномет",
						description: "отлично накрывает и очень мобильное орудие",
						move: 2,
						reload: 1,
						fire:1

					}
	},
	{name: 'grad',
					list:{
						info: "РСЗО Град",
						description: "Стреляет по трём клеткам, ссутся даже медведи",
						move: 3,
						reload: 2,
						fire:1
					}
	},
	{name: 'mimo',
					list:{
						info: "Воронка от взрыва",
						description: "Сюда уже прилетало",
						range: null
					}
	},
	{name: 'popal',
					list:{
						info: "Взорвано",
						description: "что-то уже горит",
						range: null
					}
	}
]

modules[4].list.fire=100
console.log(modules)