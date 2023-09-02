let myLibrary = [];
let main = document.querySelector("#main");
let libraryDisplay = document.querySelector("#displayLibrary");
let btnNewBook = document.querySelector("#btnNewBook");
let bookForm = document.querySelector("#myForm");
let btnAddBook = document.querySelector("#addBook");
let readButtons;

class Book {
  constructor(name, author, pagecount) {
    if (myLibrary.length == 0) this.index = 1;
    else {
      this.index = myLibrary[myLibrary.length - 1].index + 1;
    }
    this.name = name;
    this.author = author;
    this.pagecount = pagecount;
    this.read = false;
  }
}

function newBook() {
  bookForm.style.visibility = "visible";
}

function addBookToLibrary(name, author, pageCount) {
  const myBook = new Book(name, author, pageCount);
  myLibrary.push(myBook);
  printLibrary();
}

function markAsRead(bookNumber) {
  myLibrary.forEach((book) => {
    if (book.index == bookNumber) {
      book.read = !book.read;
    }
  });

  printLibrary();
}

function deleteBook(bookNumber) {
  myLibrary.forEach((book) => {
    if (book.index == bookNumber) {
      let index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
    }
  });
  printLibrary();
}

function printLibrary() {
  libraryDisplay.innerHTML = "";
  let tableHeader = libraryDisplay.insertRow(0);
  let indexHeader = tableHeader.insertCell(0);
  let nameHeader = tableHeader.insertCell(1);
  let authorHeader = tableHeader.insertCell(2);
  let pageCountHeader = tableHeader.insertCell(3);
  let readHeader = tableHeader.insertCell(4);
  let actionsHeader = tableHeader.insertCell(5);
  indexHeader.innerHTML = "Book Number";
  nameHeader.innerHTML = "Book Name";
  authorHeader.innerHTML = "Author Name";
  pageCountHeader.innerHTML = "Book Pages";
  readHeader.innerHTML = "Already Read?";
  actionsHeader.innerHTML = "Actions";

  myLibrary.forEach((element) => {
    let tableRow = libraryDisplay.insertRow();
    let cellIndex = tableRow.insertCell(0);
    let cellName = tableRow.insertCell(1);
    let cellAuthor = tableRow.insertCell(2);
    let cellPageCount = tableRow.insertCell(3);
    let cellRead = tableRow.insertCell(4);
    let cellActions = tableRow.insertCell(5);
    cellIndex.innerHTML = element.index;
    cellName.innerHTML = element.name;
    cellAuthor.innerHTML = element.author;
    cellPageCount.innerHTML = element.pagecount;

    let readButton = document.createElement("Button");
    readButton.classList = "readButton";
    readButton.id = element.index;
    if (element.read) {
      cellRead.innerHTML = "Yes";
      readButton.innerHTML = "Mark as NOT READ";
    } else if (!element.read) {
      cellRead.innerHTML = "No";
      readButton.innerHTML = "Mark as READ";
    }

    let deleteButton = document.createElement("Button");
    deleteButton.classList = "deleteButton";
    deleteButton.id = element.index;
    deleteButton.innerHTML = "Delete Book";
    cellActions.appendChild(readButton);
    cellActions.appendChild(deleteButton);

    console.table(element);
  });
  readButtons = document.querySelectorAll(".readButton");
  readButtons.forEach((button) => {
    button.addEventListener("click", () => markAsRead(button.id));
  });

  deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => deleteBook(button.id));
  });
  console.table(myLibrary);
}

btnNewBook.addEventListener("click", () => newBook());
btnAddBook.addEventListener("click", () =>
  addBookToLibrary(
    bookForm.name.value,
    bookForm.author.value,
    bookForm.pageCount.value
  )
);
