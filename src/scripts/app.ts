import isWebp from "./modules/webp.js";

isWebp();

const textEl: HTMLDivElement | null = document.querySelector(".text");

if (textEl) {
	textEl.innerHTML = "<span>Hello</span> typescript!";
}
