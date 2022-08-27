const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElement = document.getElementById('website-name');
const websiteUrlElement = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');

// Show Modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameElement.focus();
}

// Handle data from form:
function storeBookmark(event) {
    event.preventDefault();
    const nameValue = websiteNameElement.value;
    let urlValue = websiteUrlElement.value;
    console.log('website: ', nameValue);
    if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
        urlValue = `https://${urlValue}`;
    }
    console.log('url: ', urlValue);
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (event) => (event.target === modal ? modal.classList.remove('show-modal') : false));

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);