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
    readCell.classList.add('read-cell');
    const readButton = document.createElement('button');
    if (myLibrary[i].read) {
      readButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-marked</title><path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" /></svg>';
      readButton.classList.add('read-status');
    } else {
      readButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-box</title><path d="M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z" /></svg>';
      readButton.classList.add('unread-status');
    }
    readButton.addEventListener('click', () => toggleReadStatus(i));
    readCell.appendChild(readButton);
    row.appendChild(readCell);

    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'icons/delete-outline.svg';
    deleteIcon.classList.add('hidden');
    removeButton.appendChild(deleteIcon);

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
