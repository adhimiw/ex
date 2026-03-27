const keyInput = document.getElementById("keyInput");
const keyDownLog = document.getElementById("keyDownLog");
const keyUpLog = document.getElementById("keyUpLog");
const outer = document.getElementById("outer");
const inner = document.getElementById("inner");
const mouseLog = document.getElementById("mouseLog");
const singleBtn = document.getElementById("singleBtn");
const doubleBtn = document.getElementById("doubleBtn");
const clickLog = document.getElementById("clickLog");

keyInput.onkeydown = (e) => {
  keyDownLog.textContent = `keydown fired first: key=${e.key}`;
};

keyInput.onkeyup = (e) => {
  keyUpLog.textContent = `keyup fired after release: key=${e.key}`;
};

outer.onmouseover = (e) => {
  mouseLog.textContent = `mouseover: entered ${e.target.id || "outer"} (fires for child transitions too)`;
};

outer.onmouseenter = () => {
  mouseLog.textContent = "mouseenter: fires only when pointer enters outer once";
};

inner.onmouseover = () => {
  mouseLog.textContent = "mouseover on inner child fired";
};

singleBtn.onclick = () => {
  clickLog.textContent = "onclick: single click detected";
};

doubleBtn.ondblclick = () => {
  clickLog.textContent = "ondblclick: double click detected";
};
