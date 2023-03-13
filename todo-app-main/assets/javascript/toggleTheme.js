const toggleBtn = document.querySelector(".app__theme-toggle");
const background = document.querySelector(".background");
const keyframes = [{ opacity: 0.5 }, { opacity: 1 }];
const options = { duration: 700 };
const source = document.querySelector("source");
let toogleSwitch = { value: false };
const toggle = toggleBtn.addEventListener("click", (e) => {
  background.animate(keyframes, options);
  e.target.animate(keyframes, options);
  if (toogleSwitch.value == false) {
    e.target.setAttribute("src", "assets/images/icon-sun.svg");
    document.body.classList.add("active");
    background.setAttribute("src", "assets/images/bg-mobile-dark.jpg");
    source.setAttribute("srcset", "assets/images/bg-desktop-dark.jpg ");
    toogleSwitch.value = true;
  } else {
    e.target.setAttribute("src", "assets/images/icon-moon.svg");
    document.body.classList.remove("active");
    background.setAttribute("src", "assets/images/bg-mobile-light.jpg");
    source.setAttribute("srcset", "assets/images/bg-desktop-light.jpg ");
    toogleSwitch.value = false;
  }
});
