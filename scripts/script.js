function getNoteText() {
    return document.querySelector("#note-text").value;
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
    // icon.onclick = "this.remove()";
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
                .forEach(element => element.addEventListener("click", () => {
                    let trash = this;
                    console.log(trash);
                    
                    // document.querySelector(".card-container")
                    //         .removeChild(document.querySelector(".card"));
        }));
        // document.querySelector(".fa-trash-alt").addEventListener("click", () => {
        //     console.log(this);
        // });
    } else {
        alert("Error 404: note not found!");
    }
}

// Event listeners

document.querySelector(".note-btn").addEventListener("click", createNewNote);
document.querySelector("#note-text").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        createNewNote();
    }
});

document.querySelector(".cancel-btn").addEventListener("click", () => {
    document.querySelector("form").reset();
});
