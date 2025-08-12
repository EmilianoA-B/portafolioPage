//Import mobile functions
import * as Mobile from './mobileScript.js'

//Global variable that'll hold JSON
let JsonData = null;

document.addEventListener("DOMContentLoaded", async function() {

    //Initialization
	await fetchProjectData();
    initSocialLinks();
    initAllSongs();
    initFirstDesc();
	displaySongListOnResize();
	setPlayerBarAnimation();

	//Mobile init
	Mobile.initShowSongList();
});
 
/* Gets project data and displays it */ 
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
			let index = 1;
			//For each project, create a song
			JsonData.projects.forEach((project) => {
				const newSong = document.createElement("div");
				newSong.classList.add("song");
				newSong.classList.add("hoverSecBg");
				newSong.innerHTML = `
					<div class="songPlayButton" data-num="${index}">${index}</div>
					<div class="albumCover oppositeBh">${project.iconOrUrl}</div>
					<div class="songDesc">
						<div class="songScroll">
							<strong class="songTitle">${project.title}</strong>
							<br>${project.technologies}
						</div>
					</div> 
				`;
				index += 1;
				songsArea.appendChild(newSong);
			})
		})
		.catch((error) => {
			console.log("JSON failed to load!: ", error)
		});
}

/* Initializes the first song on load */ 
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

    allSongs.forEach((song) => {
        const placeForNumberOrPlaybutton = song.querySelector(".songPlayButton");
        const songTitle = song.querySelector(".songTitle").textContent;
		const songNumber = placeForNumberOrPlaybutton.getAttribute('data-num');


		song.addEventListener("click", () => {
			if(songTitle == "Who am I?"){
				document.querySelector(".descText").innerHTML = JsonData.introduction.description;
				document.querySelector(".descTitle").innerHTML = JsonData.introduction.title;
				document.querySelector(".songPlayer").querySelector(".albumCover").innerHTML = JsonData.introduction.iconOrUrl;
				document.querySelector(".songPlayer").querySelector(".songDesc").querySelector(".songTitle").innerHTML = JsonData.introduction.title;
				document.querySelector(".songPlayer").querySelector(".songDesc").querySelector(".songAlbum").innerHTML = ';)';
			} else {
				const projectObj = JsonData.projects.find(project => project.title === songTitle)
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

/* Displays or hides away songs based on resize */
function displaySongListOnResize() {
	const songList = document.querySelector('.songArea');

	window.visualViewport.addEventListener('resize', () => {
		if(window.matchMedia("(min-width: 1023px)").matches){
			songList.classList.remove('hidden');
		} else {
			songList.classList.add('hidden');
		}
	})
}

/* Initialzies the player bar animation */
function setPlayerBarAnimation() {
    const textContainer = document.querySelector(".descText");

    function updateProgress() {
		const playedBar = getPlayedBar();
    	const notPlayedBar = getNotPlayedBar();
        const scrolled = textContainer.scrollTop;
        const visibleHeight = textContainer.clientHeight; 
        const totalHeight = textContainer.scrollHeight - visibleHeight;	 

		if (textContainer.scrollHeight <= visibleHeight) {
			console.log("condition doing da thing");
            playedBar.style.width = "100%";
            return;
        }

        let progress = (scrolled / totalHeight) * 100;
        progress = Math.max(0, Math.min(progress, 100));

		notPlayedBar.style.width = `${100-progress}%`;
        playedBar.style.width = `${progress}%`;
        console.log(progress);
    }

    textContainer.addEventListener("scroll", updateProgress);
    updateProgress();
}

/* Gets player bar depending on mobile or desktop */
function getPlayedBar(){
	if (window.innerWidth <= 1023) {
        return document.querySelector(".mobilePlayedBar");
    } else {
        return document.querySelector(".playedBar");
    }
}

/* Gets not player bar depending on mobile or desktop */
function getNotPlayedBar(){
	if (window.innerWidth <= 1023) {
        return document.querySelector(".mobileNotPlayedBar");
    } else {
        return document.querySelector(".notPlayedBar");
    }
}