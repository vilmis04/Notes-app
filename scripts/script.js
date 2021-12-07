//definitions

const textField = document.querySelector("#note-text");
const cancelBtn = document.querySelector(".cancel-btn");
const titleBox = document.querySelector("#title");
const addBtn = document.querySelector(".note-btn");
const myStorage = window.localStorage;

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

function createTitleRow(noteName) {
    const newTitleRow = createElementWithClass("div", ["card-title-row"]);
    const cardTitle = createElementWithClass("div", ["card-title"]);
    const icon = createElementWithClass("i", ["fas", "fa-trash-alt"]);
    cardTitle.textContent = noteName;
    newTitleRow.appendChild(cardTitle);
    newTitleRow.appendChild(icon);
    
    return newTitleRow;
}

function createCardBody(noteText) {
    const text = createElementWithClass("div", ["card-body"]);
    text.textContent = noteText;

    return text;
}

function createNote(noteName = getNoteTitle(), noteText = textField.value) {
    const newCard = createElementWithClass("div", ["card"]);
    const newTitleRow = createTitleRow(noteName);
    const text = createCardBody(noteText);
    newCard.appendChild(newTitleRow);
    newCard.appendChild(text);
    document.querySelector(".card-container")
            .insertAdjacentElement("afterbegin", newCard);
}

function addDeleteFeature() {
    const deleteIcon = document.querySelector(".fa-trash-alt");
    deleteIcon.addEventListener("click", event => {
            event.target.parentElement.parentElement.remove();
            generateStringForLocalStorage();
    });
}

function addCompleteFeature() {
    const cardBody = document.querySelector(".card-body");
    cardBody.addEventListener("click", (event) => {
                event.target.classList.toggle("complete");
                generateStringForLocalStorage();
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
        generateStringForLocalStorage();
    } else {
        alert("Note is empty!");
    }
}

function generateStringForLocalStorage() {
    let objectArr = [];
    myStorage.clear();
    document.querySelectorAll(".card").forEach(item => {
        let arr = {};
        const title = item.firstChild.firstChild.firstChild.nodeValue;
        const body = item.lastChild.firstChild.nodeValue;
        arr.name = title;
        arr.text = body;
        arr.complete = item.lastChild.classList.contains("complete");
        objectArr.unshift(arr);
    });
    myStorage.setItem("notes", JSON.stringify(objectArr));
}

function restoreMyNotes() {
    const notesArr = JSON.parse(myStorage.getItem("notes"));
    notesArr.forEach(item => {
        createNote(item.name, item.text);
        if (item.complete) {
            document.querySelector(".card").lastChild.classList.add("complete");
        }
        addDeleteFeature();
        addCompleteFeature();
    });
}

// Event listeners

window.addEventListener('load', restoreMyNotes);

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

