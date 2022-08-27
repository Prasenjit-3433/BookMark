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

    console.log(bookmarks);
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