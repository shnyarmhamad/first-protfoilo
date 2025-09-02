let numsquare = 12;
let colors = getcolors(numsquare);
let rightanswer = pickcolor();

const h1 = document.querySelector("h1");
const rgb = document.querySelector("#rgb");
const reset = document.querySelector("button");
/*agar bnusy query salector all awkata aw esha bo hamu button akan akat 
balam amayan tanha esh lagal yakam button akat */
const tray = document.querySelector("#try");
/* try keywordy js aboya anusyn tray */
const easy = document.querySelector("#easy");
const hard = document.querySelector("#hard");
const veryhard = document.querySelector("#veryhard");
const chwargoshakan = document.querySelectorAll(".square");

rgb.textContent = rightanswer;
start();
function start() {
  hard.classList.remove("easyhard");
  veryhard.classList.add("easyhard");
  easy.classList.remove("easyhard");
  numsquare = 12;
  colors = getcolors(numsquare);
  rightanswer = pickcolor();
  rgb.textContent = rightanswer;
  for (let i = 0; i < chwargoshakan.length; i++) {
    if (colors[i]) {
      chwargoshakan[i].style.display = "block";
      chwargoshakan[i].style.background = colors[i];
    }
    // leraya else ladayn chunka hich chwar goshayak nasharynawa else { chwargoshakan[i].style.display = "none"; }
  }
  h1.style.background = "orangered";
  reset.textContent = "new color";
  tray.textContent = "";
}

hard.addEventListener("click", () => {
  hard.classList.add("easyhard");
  veryhard.classList.remove("easyhard");
  easy.classList.remove("easyhard");
  numsquare = 6;
  colors = getcolors(numsquare);
  rightanswer = pickcolor();
  rgb.textContent = rightanswer;
  for (let i = 0; i < chwargoshakan.length; i++) {
    if (colors[i]) {
      chwargoshakan[i].style.display = "block";
      chwargoshakan[i].style.background = colors[i];
    } else {
      chwargoshakan[i].style.display = "none";
    }
  }
  h1.style.background = "orangered";
  reset.textContent = "new color";
  tray.textContent = "";
});

veryhard.addEventListener("click", start);

easy.addEventListener("click", () => {
  hard.classList.remove("easyhard");
  veryhard.classList.remove("easyhard");
  easy.classList.add("easyhard");
  numsquare = 3;
  colors = getcolors(numsquare);
  rightanswer = pickcolor();
  rgb.textContent = rightanswer;
  for (let i = 0; i < chwargoshakan.length; i++) {
    if (colors[i]) {
      chwargoshakan[i].style.display = "block";
      chwargoshakan[i].style.background = colors[i];
    } else {
      chwargoshakan[i].style.display = "none";
    }
  }
  h1.style.background = "orangered";
  reset.textContent = "new color";
  tray.textContent = "";
});
reset.addEventListener("click", () => {
  colors = getcolors(numsquare);
  rightanswer = pickcolor();
  rgb.textContent = rightanswer;
  for (let i = 0; i < chwargoshakan.length; i++) {
    chwargoshakan[i].style.background = colors[i];
    chwargoshakan[i].style.display = "block";
  }

  h1.style.background = "orangered";
  reset.textContent = "new color";
  tray.textContent = "";
});
//const colors = getcolors(6);

for (let i = 0; i < chwargoshakan.length; i++) {
  chwargoshakan[i].addEventListener("click", function () {
    const clicked = this.style.background.replace(/\s+/g, "");

    if (clicked === rightanswer) {
      tray.textContent = "correct";
      reset.textContent = "try again";
      h1.style.background = rightanswer;

      for (let j = 0; j < chwargoshakan.length; j++) {
        //chwargoshakan[j].style.display = "block"; //erabu chakt krd array.length bu lanry chwargoshakan .length
        if (colors[j]) {
          chwargoshakan[j].style.background = rightanswer;
        }
      }
    } else {
      tray.textContent = "wrong!!";
      this.style.background = "#232323";
    }
  });
} //this leraya amazhaya ba chwargoshayay ka klick y leakayn

function pickcolor() {
  const pickedcolor = Math.floor(Math.random() * colors.length);
  return colors[pickedcolor];
  //leraya walamy rast hallabzhery
}
console.log(pickcolor()); //era

function getcolors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(getrandomcolors());
  }
  //rangakan lam functionaya ko akrenawa lanaw arrayakda
  //pemanalle
  return arr;
}
//rangakan leraya drust akret
function getrandomcolors() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
//const getcolors=()=>{}
/*am functiona taka keshay awaya natwany lasaruy xoyawa bangy bkaytawa */
