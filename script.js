import { cards } from "./data.js";
import { states } from "./data.js";

//function for creating new elements
function createElement(element, parent, className, content) {
  const createdElement = document.createElement(element);
  parent.appendChild(createdElement);
  if (className && className.length) {
    createdElement.classList.add(className);
  }
  if (content) {
    createdElement.innerText = content;
  }
  return createdElement;
}

//create cards
const cardContainer = document.getElementsByClassName("card-container")[0];

cards.forEach((cardObject, index) => {
  const card = createElement("div", cardContainer, "card");
  const cardImg = createElement("div", card, "card-image");
  const cardText = createElement("div", card, "card-text");

  if (index % 2 === 1) {
    card.classList.add("accent");
    cardImg.classList.add("float-right");
  } else {
    card.style.backgroundColor = "white";
  }
  createElement("h3", cardText, "card-text-title", cardObject.title);

  cardImg.style.backgroundImage = `url(${cardObject.imgSrc})`;
  createElement("p", cardText, "card-text-justify", cardObject.description);
  const buttonContainer = createElement(
    "div",
    cardText,
    "card-text-button-container"
  );
  const button = createElement("button", buttonContainer, "");
  const link = createElement("a", button, "", "Find out more");
  link.href = "/services";
  createElement("button", buttonContainer, "", "Find out more");
});

//create options in form dropdown
const select = document.querySelector("select");
states.forEach((state) => {
  const option = createElement("option", select, "", state);
  option.value = state;
});

//hide navbar upon scrolling
const nav = document.querySelector("nav");

setInterval(() => {
  if (document.documentElement.scrollTop > 200) {
    nav.style.display = "none";
  }
  window.onscroll = () => {
    if (window.innerWidth >= 710) {
      nav.style.display = "flex";
    }
  };
}, 2000);

const mobileNav = document.getElementsByClassName("navigation-menu")[0];

setInterval(() => {
  if (
    document.documentElement.scrollTop > 200 &&
    !document.getElementById("menu-toggle").checked
  ) {
    mobileNav.style.display = "none";
  }
  window.onscroll = () => {
    if (window.innerWidth < 710) {
      mobileNav.style.display = "block";
    }
  };
}, 3000);

//automatically untoggle menu if user keeps scrolling
let scrolled = {};

document.getElementById("menu-toggle").addEventListener("click", () => {
  const interval = setInterval(() => {
    if (scrolled.y === undefined) {
      scrolled.y = window.scrollY;
    }

    console.log(scrolled.y);
    if (
      window.scrollY > scrolled.y + 800 ||
      window.scrollY < scrolled.y - 800
    ) {
      document.getElementById("menu-toggle").checked = false;
      scrolled.y = undefined;
      clearInterval(interval);
    }
  }, 500);
});

//scroll to top of page
const logos = document.getElementsByClassName("icon_container");

Array.from(logos).forEach((logo) =>
  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  })
);

//do not submit form
const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("I didnt have time to style the alert!");
});
