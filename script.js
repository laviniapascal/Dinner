import data from "./myObject.js";
import {
  getUniqueCategories,
  getFilteredData,
  capitalizeName,
} from "./utils.js";

const menuLabels = document.querySelector(".menu-labels");
const menuContainer = document.querySelector(".container");
const search = document.querySelector("#search-input");


const categories = ["all"].concat(getUniqueCategories(data));


function filterCategoryData(event) {
  const btnName = event.target.innerHTML.toLowerCase(); 

  let filteredData = [];

  const menuButtons = document.querySelectorAll(".menu-label");

  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].classList.remove("active-menu-btn");
  }

  event.target.classList.add("active-menu-btn");

  if (btnName === "all") {
    filteredData = data;
  } else {
    filteredData = getFilteredData(data, btnName);
  }

  createMenuData(filteredData);
}

function createMenuBtns() {
  for (let i = 0; i < categories.length; i++) {
    const categoryName = categories[i];

    let customClass;

    if (i === 0) {
      customClass = "menu-label active-menu-btn";
    } else {
      customClass = "menu-label";
    }

    const btn = `<button class="${customClass}">${capitalizeName(
      categoryName
    )}</button>`;

    menuLabels.innerHTML += btn;
  }

  const menuButtons = document.querySelectorAll(".menu-label");

  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].addEventListener("click", filterCategoryData);
  }
}

createMenuBtns();

function createMenuData(menuData) {
  menuContainer.innerHTML = "";

  if (menuData.length) {
    for (let i = 0; i < menuData.length; i++) {
      const newItem = `<div class="card">
        <div class="card-left">
          <img src="${menuData[i].img}" alt="" width="100" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong>${capitalizeName(menuData[i].title)}</strong>
            <span>${menuData[i].price}</span>
          </div>
          <p>${menuData[i].desc}</p>
        </div>
      </div>`;

      menuContainer.innerHTML += newItem;
    }
  } else {
    menuContainer.innerHTML = '<p class="no-data">No data found</p>';
  }
}

createMenuData(data);

search.addEventListener("keyup", function (event) {
  const value = event.target.value.trim().toLowerCase();
  let filteredSearchData = [];

  if (value !== "") {
    for (let item of data) {
      if (item.title.includes(value) || item.desc.includes(value)) {
        filteredSearchData.push(item);
      }
    }
    createMenuData(filteredSearchData);
  } else {
    createMenuData(data);
  }
});

console.log('data')
