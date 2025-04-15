import isWebp from "./modules/webp.js";

isWebp();

const textEl = document.querySelector(".text");

if (textEl) {
	textEl.innerHTML = "<span>Hello</span> javascript!";
}
