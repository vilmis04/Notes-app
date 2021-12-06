//definitions

const textField = document.querySelector("#note-text");
const cancelBtn = document.querySelector(".cancel-btn");
const titleBox = document.querySelector("#title");


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

function createNewNote() {
    if (getNoteText()) {
        createNote();
        document.querySelector("form").reset();
        document.querySelectorAll(".fa-trash-alt")
                .forEach(element => element.addEventListener("click", (event) => {
                    event.target.parentElement.parentElement.remove();
        }));
        titleBox.classList.add("hidden");
        cancelBtn.classList.add("hidden");
    } else {
        alert("Error 404: note not found!");
    }
}

// Event listeners

document.querySelector(".note-btn").addEventListener("click", createNewNote);
textField.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        createNewNote();
    }
});
textField.addEventListener("click", () => {
    titleBox.classList.remove("hidden");
    cancelBtn.classList.remove("hidden");
});



cancelBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
    titleBox.classList.add("hidden");
    cancelBtn.classList.add("hidden");
});


document.querySelector("main").addEventListener("click", () => {
    titleBox.classList.add("hidden");
    cancelBtn.classList.add("hidden");
});

document.querySelector("body").addEventListener("click", (event) => {
    if (!document.querySelector(".input-wrapper").contains(event.target)) {
        titleBox.classList.add("hidden");
        cancelBtn.classList.add("hidden");
    }
});