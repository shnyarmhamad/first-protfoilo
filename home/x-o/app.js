const gameboard = document.querySelector("#gameboard");
const infodisplay = document.querySelector("#info");
const startcelles = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
infodisplay.textContent = "circle goes first";

function createboard() {
  startcelles.forEach((cell, index) => {
    const cellelement = document.createElement("div");
    cellelement.classList.add("square");
    cellelement.id = index;
    cellelement.addEventListener("click", addgo);

    gameboard.append(cellelement);
  });
}
createboard();

function addgo(e) {
  console.log("clicked", e.target);
  const godisplay = document.createElement("div");
  godisplay.classList.add(go);
  e.target.append(godisplay);
  go = go === "circle" ? "cross" : "circle";
  infodisplay.textContent = "it is now " + go + "'s go";
  e.target.removeEventListener("click", addgo);
  checkscore();
}

function checkscore() {
  const allsquares = document.querySelectorAll(".square");
  const winningcombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  winningcombo.forEach((array) => {
    const circlewins = array.every((cell) =>
      allsquares[cell].firstChild?.classList.contains("circle")
    );
    if (circlewins) {
      infodisplay.textContent = "circle wins!";
      allsquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningcombo.forEach((array) => {
    const crosswins = array.every((cell) =>
      allsquares[cell].firstChild?.classList.contains("cross")
    );
    if (crosswins) {
      infodisplay.textContent = "cross wins!";
      allsquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}
/*const circleelement = document.createElement("div");
    cellelement.append(circleelement);
    circleelement.classList.add("cross");*/
