// for (let i = 0; i < xCoordinate; i++) {
//     for (let j = 0; j < yCoordinate - 15; j++) {
//         let a = unitMap[i][j];
//         if (a == 5 || a === 6 || a == 7) {
//             for (let k = -2; k < 3; k++) {
//                 for (let l = -2; l < 3; l++) {
//                      if ((i + k) < xCoordinate && (j + l) < yCoordinate && (i + k + 1) > 0 && (j + l + 1) > 0) {
//                         // unitMap[i + k][j + l] = 1
//                         unitMap[i][j] = a
//                      }
//                 }
//             }
//         };
//     };
// };


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