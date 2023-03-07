let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let info = `${this.title} by ${this.author}, ${this.pages} pages, `;
    if (this.read) info += 'read';
    else info += 'unread';
    return (info);
  };
  this.toggleReadStatus = function () {
    this.read = !this.read;
  };
}

const bookList = document.querySelector('.book-list');

function updateTable() {
  bookList.textContent = '';

  for (let i = 0; i < myLibrary.length; i += 1) {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = myLibrary[i].title;
    row.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = myLibrary[i].author;
    row.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = myLibrary[i].pages;
    row.appendChild(pagesCell);

    const readCell = document.createElement('td');
    const readButton = document.createElement('button');
    if (myLibrary[i].read) readButton.textContent = 'Read';
    else readButton.textContent = 'Unread';
    readButton.addEventListener('click', () => toggleReadStatus(i));
    readCell.appendChild(readButton);
    row.appendChild(readCell);

    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('remove-book');
    removeButton.addEventListener('click', () => removeBook(i));
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    bookList.appendChild(row);
  }
}

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  updateTable();
}

function removeBook(i) {
  myLibrary.splice(i, 1);
  updateTable();
}

function toggleReadStatus(i) {
  myLibrary[i].toggleReadStatus();
  updateTable();
}

const newBookForm = document.querySelector('form');
const newBookButton = document.querySelector('.new');

newBookButton.addEventListener('click', () => {
  newBookForm.style.display = 'block';
});

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(newBookForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = formData.get('read');

  addBook(title, author, pages, read);
});

myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
  new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, false)];
updateTable();
