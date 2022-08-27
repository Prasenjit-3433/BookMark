# BookMark
A BookMark app feat. [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Tech Stack: HTML, CSS, Vanilla JS (no framework!).

IMPLEMENTATION:
* we added an `SVG` as a hero image because an svg can scale upto any size according as the size of the viewport.
* Then we start building `Bookmark UI` which'll be served & inserted by javascript later on the submission of `modal-form`.
* Next we start building our `modal` which pops up on the click on `ADD BOOKMARK` button.
* Now a `modal` consists of two different parts - an `overlay` that darken everything behind it and the `modal` itself.
* Also, the `modal` needs to be closed or shown according as the click on `close-icon` / `overlay` or on the `ADD BOOKMARK` button.
* Our next task is to add some form validation. Here we have used `regex` to make sure that the user specified url
matches the desired url format. [read more](https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url).
* Once an user entered a valid website name & url, then our next job is to save that data into `localStorage` and `fetch` that data from it on the load of the website.
* As a result, even if the user leaves the website & later visits the page again, all the bookmark information doesn't get lost!.


