let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let info = `${this.title} by ${this.author}, ${this.pages} pages, `;
    if (this.read) info += 'read';
    else info += 'not read yet';
    return (info);
  };
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

const bookList = document.querySelector('.bookList');

function displayLibrary() {
  myLibrary.forEach((book) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);

    const readCell = document.createElement('td');
    readCell.textContent = book.read;
    row.appendChild(readCell);

    bookList.appendChild(row);
  });
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

displayLibrary();
