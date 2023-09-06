let clics = 0;

document.getElementById("miBoton").addEventListener("click", function() {
    clics++;
    document.getElementById("clics").textContent = clics;

    const colors = ["#ff6600", "#007acc", "#00cc00", "#9900cc", "#ff3333"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    this.style.backgroundColor = randomColor;
});
