document.addEventListener("DOMContentLoaded", function() {
    //Selects all links under the social class
    const socialLinks = document.querySelectorAll(".socials li");
    const allSongs = document.querySelectorAll(".song");

    //For each social, set a link to follow when clicking
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

    //On song hover, change the number to a play icon
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

    
});