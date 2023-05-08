import data from "./data.json" assert { type: "json" };

const list = document.querySelector(".content");
let appliedFilters = [];

const filterButtons = document.querySelectorAll(".skill");

const contentBoxEl = document.querySelector("content-box");
const clear = document.querySelector(".clear");
const appliedFiltersDiv = document.querySelector(".search-bar");
const clickedItemsDiv = document.querySelector(".clicked-items");

const createDomElement = (tag, className, src, text, event, evenFc) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (src) {
    element.src = src;
  }

  if (text) {
    element.textContent = text;
  }

  if (event) {
    element[event] = () => {
      evenFc();
    };
  }
  return element;
};

displayBoxes(data);

function displayBoxes(data) {
  list.innerHTML = "";

  for (let index = 0; index < data.length; index++) {
    const {
      id,
      company,
      logo,
      newPop,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = data[index];

    const contentBox = createDomElement("li", "content-box");

    const part1 = createDomElement("div", "part-1");
    const dividerLine = createDomElement("div", "line-divider");
    const part2 = createDomElement("div", "part-2");
    const imageBox = createDomElement("div", "image-box");
    const image = createDomElement("img", "img-round", logo);
    const infoBox = createDomElement("div", "info-box");
    const line1 = createDomElement("div", "line-1");
    const line3 = createDomElement("div", "line-3");

    const companyName = createDomElement("h3", "comp-name", null, company);
    line1.append(companyName);

    if (newPop === true) {
      const newButton = createDomElement("button", "new-btn");
      newButton.textContent = "NEW!";
      line1.append(newButton);
    }

    if (featured === true) {
      const featuredButton = createDomElement("button", "featured-btn");
      featuredButton.textContent = "FEATURED";
      line1.append(featuredButton);
    }

    const positionEl = createDomElement("h2", "position-el", null, position);
    const postDateEL = createDomElement("p", "date", null, postedAt);
    const dot1 = createDomElement("div", "dot");
    const workDurationEl = createDomElement("p", "work-time", null, contract);
    const dot2 = createDomElement("div", "dot");
    const workLocationEl = createDomElement(
      "p",
      "work-location",
      null,
      location
    );

    const roleEl = createDomElement("button", "skill", null, role);
    roleEl.addEventListener("click", foldButtons, filterThrough);

    const levelEl = createDomElement("button", "skill", null, level);
    levelEl.addEventListener("click", foldButtons);

    contentBox.append(part1, dividerLine, part2);
    list.append(contentBox);
    part1.append(imageBox, infoBox);
    infoBox.append(line1, positionEl, line3);
    imageBox.append(image);

    line3.append(postDateEL, dot1, workDurationEl, dot2, workLocationEl);
    part2.append(roleEl, levelEl);

    for (let i = 0; i < languages.length; i++) {
      const languageEl = createDomElement("button", "skill");
      part2.append(languageEl);
      languageEl.textContent = `${languages[i]}`;
      languageEl.addEventListener("click", foldButtons);
    }

    for (let i = 0; i < tools.length; i++) {
      const toolsEl = createDomElement("button", "skill");
      part2.append(toolsEl);
      toolsEl.textContent = `${tools[i]}`;
      toolsEl.addEventListener("click", foldButtons);
    }
  }

  console.log("monkey");
}

function foldButtons() {
  const ButtonText = event.target.textContent;
  appliedFiltersDiv.classList.remove("hidden");
  if (appliedFilters.indexOf(ButtonText) == -1) {
    appliedFilters.push(ButtonText);
    const cloneButton = event.target.cloneNode(true);
    cloneButton.classList.add("popped");
    clickedItemsDiv.appendChild(cloneButton);
    const removeIconBox = document.createElement("div");
    removeIconBox.classList.add("remove-icon-box");
    cloneButton.append(removeIconBox);
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.src = "images/icon-remove.svg";
    removeIconBox.append(removeIcon);
    removeIconBox.addEventListener("click", () => {
      const index = appliedFilters.indexOf(ButtonText);
      if (appliedFilters.indexOf(cloneButton.textContent) !== -1) {
        appliedFilters.splice(index, 1);
      }
      if (appliedFilters.length == 0) {
        appliedFiltersDiv.classList.add("hidden");
      }
      cloneButton.remove();
      filterThrough();
    });
    console.log(25);
  }
  filterThrough();
}

function filterThrough() {
  let left = data.filter((i) =>
    appliedFilters.every(
      (element) =>
        i.role === element ||
        i.level === element ||
        i.languages.includes(element) ||
        i.tools.includes(element)
    )
  );
  displayBoxes(left);
}

clear.addEventListener("click", () => {
  appliedFilters.length = 0;
  console.log(500);
  const buttons = appliedFiltersDiv.getElementsByTagName("button");
  for (let i = buttons.length - 1; i >= 0; i--) {
    buttons[i].remove();
  }
  appliedFiltersDiv.classList.add("hidden");
  filterThrough();
});
