const func1 = () => {
    const x = document.getElementById("x").value;
    const y = document.getElementById("y").value;
    console.log(`X: ${x}\n Y: ${y}`)
    localStorage.setItem('x', x); // передать значение переменной x
    localStorage.setItem('y', y); // передать значение переменной y
  }


