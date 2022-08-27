const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElement = document.getElementById('website-name');
const websiteUrlElement = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    // puts cursor in the website name field
    websiteNameElement.focus();
}

// Validate Form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue || nameValue.trim() === '') {
        alert('Please submit values for both fields.');
        return false;
    }

    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address');
        return false;
    }

    // Valid
    return true;
}

// Build Bookmarks DOM
function buildBookmarks() {
    // Build Items
    bookmarks.forEach((bookmarkItem) => {
        const {name, url} = bookmarkItem;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Trash icon
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-light', 'fa-trash-can');
        trashIcon.setAttribute('title', 'Delete');
        trashIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon & Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Website Link
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', `${url}`);
        link.textContent = name;

        // Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(trashIcon, linkInfo);
        bookmarkContainer.appendChild(item);
    });
}

// Fetch Bookmarks
function fetchBookmark() {
    // Get bookmarks from localStorage if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else {
        // Create boolmark array in localStorage
        bookmarks = [
            {
                name: 'my github profile',
                url: 'https://github.com/Prasenjit-3433/'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    buildBookmarks();
}

// Handle data from form:
function storeBookmark(event) {
    event.preventDefault();
    const nameValue = websiteNameElement.value;
    let urlValue = websiteUrlElement.value;
    if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
        urlValue = `https://${urlValue}`;
    }

    if (!validate(nameValue, urlValue)) {
        return;
    }

    const bookmark = {
        name: nameValue,
        url: urlValue
    };

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmark();
    bookmarkForm.reset();
    websiteNameElement.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (event) => (event.target === modal ? modal.classList.remove('show-modal') : false));

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmark();