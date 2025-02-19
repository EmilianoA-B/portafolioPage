//Global variable that'll hold JSON
let JsonData = null;

document.addEventListener("DOMContentLoaded", async function() {

    //Initialization
	await fetchProjectData();
    initSocialLinks();
    initAllSongs();
    initFirstDesc();
});
 
async function fetchProjectData() {
	await fetch("../json/projectsData.json")
		.then(async (response) => {
			JsonData = await response.json();
			const songsArea = document.querySelector(".songsDiv");
			const introductionDiv = document.createElement("div");

			//Create introduction song
			introductionDiv.classList.add("song");
			introductionDiv.classList.add("hoverSecBg");
			introductionDiv.innerHTML = `
				<div class="songPlayButton" data-num="?">?</div>
				<div class="albumCover oppositeBh">${JsonData.introduction.iconOrUrl}</div>
				<div class="songDesc">
					<div class="songScroll">
						<strong class="songTitle">${JsonData.introduction.title}</strong>
						<br>;) 
					</div>
				</div> 
			`;
			songsArea.appendChild(introductionDiv);

			//For each project, create a song
			JsonData.projects.forEach((project) => {
				const newSong = document.createElement("div");
				newSong.classList.add("song");
				newSong.classList.add("hoverSecBg");
				newSong.innerHTML = `
					<div class="songPlayButton" data-num="${project.id}">${project.id}</div>
					<div class="albumCover oppositeBh">${project.iconOrUrl}</div>
					<div class="songDesc">
						<div class="songScroll">
							<strong class="songTitle">${project.title}</strong>
							<br>${project.technologies}
						</div>
					</div> 
				`;
				songsArea.appendChild(newSong);
			})
		})
		.catch((error) => {
			console.log("JSON failed to load!: ", error)
		});
}

function initFirstDesc() {
	const firstSong = document.querySelector('div[data-num="?"]').parentElement;
	firstSong.click();
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

/* Initialized any song event */
function initAllSongs() {
    const allSongs = document.querySelectorAll(".song");
	console.log(allSongs)

    allSongs.forEach((song) => {
        const placeForNumberOrPlaybutton = song.querySelector(".songPlayButton");
        const songNumber = placeForNumberOrPlaybutton.getAttribute("data-num");

		song.addEventListener("click", () => {
			if(songNumber == "?"){
				document.querySelector(".descText").innerHTML = JsonData.introduction.description;
				document.querySelector(".descTitle").innerHTML = JsonData.introduction.title;
				document.querySelector(".songPlayer").querySelector(".albumCover").innerHTML = JsonData.introduction.iconOrUrl;
				document.querySelector(".songPlayer").querySelector(".songDesc").querySelector(".songTitle").innerHTML = JsonData.introduction.title;
				document.querySelector(".songPlayer").querySelector(".songDesc").querySelector(".songAlbum").innerHTML = ';)';
			} else {
				const projectObj = JsonData.projects.find(project => Number(project.id) === Number(songNumber))
				document.querySelector(".descText").innerHTML = projectObj.description;
				document.querySelector(".descTitle").innerHTML = projectObj.title;
				document.querySelector(".songPlayer").querySelector(".albumCover").innerHTML = projectObj.iconOrUrl;
				document.querySelector(".songPlayer").querySelector(".songDesc").querySelector(".songTitle").innerHTML = projectObj.title;
				document.querySelector(".songPlayer").querySelector(".songDesc").querySelector(".songAlbum").innerHTML = projectObj.technologies;
			}
		});

        song.addEventListener("mouseenter", () => {
            placeForNumberOrPlaybutton.innerHTML = `<i class="fa-solid fa-play"></i>`;
			const songText = song.querySelector(".songDesc").querySelector(".songScroll");
			const songDesc = song.querySelector(".songDesc");
			
			if (songText.scrollWidth > songDesc.clientWidth){
				songText.style.animation = "scrollText 3s linear infinite alternate";
			}
        });
        song.addEventListener("mouseleave",() => {
			const songText = song.querySelector(".songDesc").querySelector(".songScroll");
			songText.style.animation = "none";
            placeForNumberOrPlaybutton.innerHTML = songNumber;
        });
    });
}

function setPlayerBarAnimation(){
    
}