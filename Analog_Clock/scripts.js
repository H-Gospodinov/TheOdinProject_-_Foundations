
const hours = () => new Date().getHours();
const minutes = () =>new Date().getMinutes();
const seconds = () => new Date().getSeconds();

const H_arrow = document.querySelector('#hour');
const M_arrow = document.querySelector('#minute');
const S_arrow = document.querySelector('#second');

// any arrow using css transition should increment its position forever
// to do that you have to count the full rotation cycles:
let S_cycleCount = 0; let M_cycleCount = 0;

function clockRotation() { // 1h is 30 degrees, 1m & 1s are 6 degrees

    if (seconds() < 1) { S_cycleCount++ } // increment at the start of every full rotation
    if (seconds() < 1 && minutes() < 1) { M_cycleCount++ } // same here

    const H_position = hours() * 30 + minutes() / 2; // works for both 12h & 24h time formats
    const M_position = minutes() * 6 + M_cycleCount * 360/* + seconds() / 10*/;
    const S_position = seconds() * 6 + S_cycleCount * 360;

    function setPosition(element, position) {

        element.style.setProperty('transform', `rotate(${position}deg)`);
    }
    setPosition(H_arrow, H_position);
    setPosition(M_arrow, M_position);
    setPosition(S_arrow, S_position);
}
clockRotation(); // initial
setInterval(clockRotation, 1000);