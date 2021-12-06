//definitions

const textField = document.querySelector("#note-text");
const cancelBtn = document.querySelector(".cancel-btn");
const titleBox = document.querySelector("#title");
const addBtn = document.querySelector(".note-btn");

// functions

function getNoteText() {
    return textField.value;
}

function getNoteTitle() {
    let text = document.querySelector("#title").value;
    return text ? text : "Untitled";
}

function createElementWithClass (elementNameStr, classNameArr) {
    const elem = document.createElement(elementNameStr);
    classNameArr.map(className => elem.classList.add(className));
    return elem;
}

function createTitleRow() {
    const newTitleRow = createElementWithClass("div", ["card-title-row"]);
    const cardTitle = createElementWithClass("div", ["card-title"]);
    const icon = createElementWithClass("i", ["fas", "fa-trash-alt"]);
    cardTitle.textContent = getNoteTitle();
    newTitleRow.appendChild(cardTitle);
    newTitleRow.appendChild(icon);
    
    return newTitleRow;
}

function createCardBody() {
    const text = createElementWithClass("div", ["card-body"]);
    text.textContent = getNoteText();

    return text;
}

function createNote() {
    const newCard = createElementWithClass("div", ["card"]);
    const newTitleRow = createTitleRow();
    const text = createCardBody();
    newCard.appendChild(newTitleRow);
    newCard.appendChild(text);
    document.querySelector(".card-container")
            .insertAdjacentElement("afterbegin", newCard);
}

function addDeleteFeature() {
    const deleteIcon = document.querySelector(".fa-trash-alt");
    deleteIcon.addEventListener("click", event => {
            event.target.parentElement.parentElement.remove();
    });
}

function addCompleteFeature() {
    const cardBody = document.querySelector(".card-body");
    cardBody.addEventListener("click", (event) => {
                event.target.classList.toggle("complete");
    });
}

function collapseInputBox() {
        titleBox.classList.add("hidden");
        cancelBtn.classList.add("hidden");
}

function createNewNote() {
    if (getNoteText()) {
        createNote();
        document.querySelector("form").reset();
        addDeleteFeature();
        addCompleteFeature();
        collapseInputBox();
    } else {
        alert("Note is empty!");
    }
}

// Event listeners

addBtn.addEventListener("click", () => {
    createNewNote();
});

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
});

textField.addEventListener("click", () => {
    titleBox.classList.remove("hidden");
    cancelBtn.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
    collapseInputBox();
});


document.querySelector("main").addEventListener("click", () => {
    collapseInputBox();
});

document.querySelector("body").addEventListener("click", (event) => {
    if (!document.querySelector(".input-wrapper").contains(event.target)) {
        getNoteText() ? createNewNote() : collapseInputBox();
        collapseInputBox();
    }
});

