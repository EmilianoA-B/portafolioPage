document.addEventListener("DOMContentLoaded", function() {

    //Initialization
    initSocialLinks();
    initAllSongs();
    
});

/* Initialized the hover  */
function initAllSongs() {
    const allSongs = document.querySelectorAll(".song");

    allSongs.forEach((song) => {
        const placeForNumberOrPlaybutton = song.querySelector(".songPlayButton");
        const numBeforeChange = placeForNumberOrPlaybutton.getAttribute("data-num");

        song.addEventListener("mouseenter", () => {
            placeForNumberOrPlaybutton.innerHTML = `<i class="fa-solid fa-play"></i>`;
        });
        song.addEventListener("mouseleave",() => {
            placeForNumberOrPlaybutton.innerHTML = numBeforeChange;
        });
    });
}

/* Initializes the social links at the top of the page */ 
function initSocialLinks() {
    const socialLinks = document.querySelectorAll(".socials li");
    socialLinks.forEach((socialLink) => {
        socialLink.addEventListener("click", () => {
            const socialContent = socialLink.getAttribute("data-link");

            if(socialContent != null && socialContent.includes("http")){
                window.open(socialContent, '_blank').focus();
            } else {
                navigator.clipboard.writeText(socialContent);
            }
        })
    });
}

function setPlayerBarAnimation(){
    
}