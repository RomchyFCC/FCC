const header = document.querySelector("nav");
const list = document.querySelectorAll(".list li a");
const about = document.querySelector(".at");
const portfolio = document.querySelector(".pf");
const contact = document.querySelector(".ct");
const input = document.querySelectorAll("form");
const pName = document.querySelector(".name");
const pMail = document.querySelector(".mail");
const pMsg = document.querySelector(".msg");
const button = document.querySelector("#button");
const nameIn = document.querySelector("[name=name]");
const mailIn = document.querySelector("[name=email]");
const msgIn = document.querySelector("[name=comment]");


function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function fade(e) {
  if (window.scrollY > 0 ) {
    list.forEach(item => item.classList.remove("active"));
    about.classList.add("active");
  }

	if (window.scrollY >= 80) {
		header.classList.add("fade");
	} else {
		header.classList.remove("fade");
	}

  if (window.scrollY > 550 ) {
    list.forEach(item => item.classList.remove("active"));
    portfolio.classList.add("active");
  }

  if (window.scrollY > 1100 ) {
    list.forEach(item => item.classList.remove("active"));
    contact.classList.add("active");
  }
}

function show() {
  header.classList.remove("fade");
}

function swoosh(e) {
  if (e.target.name === "name") {
    pName.classList.add("swoosh");
  }
  if (e.target.name === "email") {
    pMail.classList.add("swoosh");
  }
  if (e.target.name === "comment") {
    pMsg.classList.add("swoosh");
  }
}

function swooshRemove(e) {
  if (e.target.value === "") {
    if (e.target.name === "name") {
      pName.classList.remove("swoosh");
    }
    if (e.target.name === "email") {
      pMail.classList.remove("swoosh");
    }
    if (e.target.name === "comment") {
      pMsg.classList.remove("swoosh");
    }
  }
}

function submit(e) {
  e.preventDefault();
  console.log(nameIn.value, mailIn.value, msgIn.value);
  name = nameIn.value;
  mail = mailIn.value;
  message = msgIn.value;
  alert("This is a front end only project so you will shortly be redirected to e-mail me!");
  window.location.replace(`mailto:d-nice_100@hotmail.com?subject=Portfolio%20contact%20-%20${name}&body=Name:%20${name}%0D%0AE-mail:%20${mail}%0D%0AGreetings,%0D%0A${message}`);
}


window.addEventListener("scroll", debounce(fade));
header.addEventListener("mouseover", show);
header.addEventListener("mouseleave", fade);
button.addEventListener("click", submit);
input.forEach(item => item.addEventListener("keyup", swoosh));
input.forEach(item => item.addEventListener("keyup", swooshRemove));