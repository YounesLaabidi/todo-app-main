// import { toggle } from "./toggleTheme.js";
// todoapp
const todoApp = {
  lists: {
    all: [],
    checkBtnsIndex: [],
  },
  create: function (_title) {
    return `
      <li class="app_task-item">
        <button class="app__check-btn">
          <img
            class="app__check-img"
            src="assets/images/icon-check.svg"
            alt="icon-check"
          />
        </button>
        <h3 class="app__task-title app__task-title--item">${_title}</h3>
        <button class="app__remove-btn">
          <img src="assets/images/icon-cross.svg" alt="" />
        </button>
      </li>`;
  },
  add: function () {
    let ul = document.querySelector(".app__tasks-list");
    const addBtn = document.querySelector(".app__add-btn");
    const taskTitle = document.querySelector(".app__task-title--create");
    addBtn.addEventListener("click", (e) => {
      if (taskTitle.value.length !== 0) {
        this.lists.all.push(this.create(taskTitle.value));
        ul.innerHTML += this.lists.all[this.lists.all.length - 1];
        this.remove();
        this.check();
        this.clearCheckList();
        this.filter();
        taskTitle.value = "";
        document.querySelector(
          ".app__unchecked-item"
        ).innerHTML = `${this.lists.all.length} items left`;
      }
    });
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (taskTitle.value.length !== 0) {
          this.lists.all.push(this.create(taskTitle.value));
          ul.innerHTML += this.lists.all[this.lists.all.length - 1];
          this.remove();
          this.check();
          this.clearCheckList();
          this.filter();
          taskTitle.value = "";
          document.querySelector(
            ".app__unchecked-item"
          ).innerHTML = `${this.lists.all.length} items left`;
        }
      }
    });
  },
  remove: function () {
    const removeBtnsLists = document.querySelectorAll(".app__remove-btn");
    removeBtnsLists.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        this.lists.all.splice(index, 1);
        element.parentElement.remove();
        document.querySelector(".app__unchecked-item").innerHTML = `${
          this.lists.all.length -
          document.querySelectorAll(".app_task-item--complete").length
        } items left`;
      });
    });
  },
  check: function () {
    const checkBtns = document.querySelectorAll(".app__check-btn");
    checkBtns.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        if (
          !element.parentElement.classList.contains("app_task-item--complete")
        ) {
          element.parentElement.classList.add("app_task-item--complete");
          this.lists.checkBtnsIndex.push(index);
          element.querySelector(".app__check-img").classList.add("active");
        } else {
          element.parentElement.classList.remove("app_task-item--complete");
          element.querySelector(".app__check-img").classList.remove("active");
          if (this.lists.checkBtnsIndex.length > 1) {
            this.lists.checkBtnsIndex.splice(index - 1, 1);
          } else {
            this.lists.checkBtnsIndex.splice(0, 1);
          }
        }
        document.querySelector(".app__unchecked-item").innerHTML = `${
          this.lists.all.length -
          document.querySelectorAll(".app_task-item--complete").length
        } items left`;
      });
    });
  },
  clearCheckList: function () {
    document.querySelector(".app__clear-btn").addEventListener("click", () => {
      document
        .querySelectorAll(".app_task-item--complete")
        .forEach((element) => {
          element.remove();
        });
      for (let index of this.lists.checkBtnsIndex) {
        this.lists.all.splice(index, 1);
      }
      document.querySelector(
        ".app__unchecked-item"
      ).innerHTML = `${this.lists.all.length} items left`;
      this.lists.checkBtnsIndex = [];
    });
  },
  filter: function () {
    const list = document.querySelector(".app__tasks-list");
    const listItem = Array.from(list.children);
    const allTaskBtn = document.querySelector(".app__indicator--all");
    const activeTaskBtn = document.querySelector(".app__indicator--active");
    const completeTaskBtn = document.querySelector(
      ".app__indicator--completed"
    );
    allTaskBtn.addEventListener("click", (e) => {
      for (let task of listItem) {
        task.style.display = "flex";
      }
    });
    activeTaskBtn.addEventListener("click", (e) => {
      for (let task of listItem) {
        if (task.classList.contains("app_task-item--complete")) {
          task.style.display = "none";
        } else {
          task.style.display = "flex";
        }
      }
    });
    completeTaskBtn.addEventListener("click", (e) => {
      for (let task of listItem) {
        if (!task.classList.contains("app_task-item--complete")) {
          task.style.display = "none";
        } else {
          task.style.display = "flex";
        }
      }
      // listItem.filter((element) =>
      //   element.classList.contains("app_task-item--complete")
    });
  },
};
todoApp.add();
