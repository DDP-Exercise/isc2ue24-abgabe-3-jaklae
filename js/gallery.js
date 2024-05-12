"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    let thumbnails = document.getElementsByClassName("card-link");

    // Select a random entry out of these 6.
    let randomIndex = Math.floor(Math.random() * 6);

    // Get the selected thumbnail
    let selectedThumbnail = thumbnails[randomIndex];
    let img = selectedThumbnail.querySelector("img");

    let imageURL = selectedThumbnail.getAttribute('href');
    let description = img.getAttribute('alt');

    // Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail
    switchFullImage(imageURL, description);

    // Set a background color (classes .bg-dark and .text-white) to the card-body of your random image
    let cardBody = selectedThumbnail.parentElement;
    cardBody.classList.add("bg-dark", "text-white");
}

    /**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
        // TODO: Select all the 6 links (<a>) in the thumbnail section.
        let Links = document.querySelectorAll("#thumbnails .card-link");
        // TODO: Set an event listener for the click event on every <a> element.
        //  (or advanced: think of a way to do it with one single handler)
        // console.log(Links)
        Links.forEach((element) => {
            element.addEventListener("click", function (event) {
                if (event.target.classList.contains("img-thumbnail")) {
                    // Remove the .bg-dark and .text-white classes from all cards
                    document.querySelectorAll(".card").forEach(function (card) {
                        card.classList.remove("bg-dark", "text-white");
                    });
                    // Add both classes again to the card where the click happened
                    event.target.closest(".card").classList.add("bg-dark", "text-white");
                    // Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail

                    console.log(event.target);

                    let imageURL = event.target.parentElement.href;
                    let altText = event.target.alt;
                    switchFullImage(imageURL, altText);

                    // Implement and then call loadNotes() with the key for the current image
                    loadNotes(imageURL);

                    // Prevent the default action for the link (we don't want to follow it)
                    event.preventDefault();
                }
            });
        });
    }

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    // TODO: Select the notes field and add a blur listener.
    const notesField = document.getElementById("notes");
    notesField.addEventListener("blur", function() {
    // TODO: When the notes field loses focus, store the notes for the current image in the local storage.
        const imageURL = document.querySelector("#fullImage img").getAttribute("src");
        const notes = notesField.innerHTML;
    // TODO: If the notes field is empty, remove the local storage entry.
        if (notes === "") {
            localStorage.removeItem(imageURL);
        } else {
        }
    // TODO: Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
        localStorage.setItem(imageURL, notes);
});
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // TODO: Get the <img> element for the full image. Select it by its class or tag name.
    const FullImage = document.getElementsByClassName('figure-img img-fluid rounded')[0]
    // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    FullImage.setAttribute("src",imageUrl)
    FullImage.setAttribute("alt",imageDescription)

    // TODO: Select the <figcaption> element.
    const FigCap = document.getElementsByClassName("figure-caption text-center")[0]
    FigCap.innerHTML = imageDescription
    // TODO: Set the description (the one you used for the alt attribute) as its text content.
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // TODO: Select the notes field.
    const notesField = document.getElementById("notes");

    // TODO: Check the local storage at the provided key.
    const storedNotes = localStorage.getItem(key);
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
    if (storedNotes) {
        notesField.innerHTML = storedNotes;
    } else {
    //  - If there's no entry, set the default text "Enter your notes here!".
        notesField.textContent = "Enter your notes here!";
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
