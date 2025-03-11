function initShowSongList() {
	const hamburgerButton = document.querySelector('.hideSongArea');
	const descBox = document.querySelector('.descBox');
	const songList = document.querySelector('.songArea');

	if(window.matchMedia("(max-width: 1023px)").matches){
		songList.classList.add('hidden');
	}

	hamburgerButton.addEventListener('click', () => {
		if(songList.classList.contains('hidden')){
			descBox.classList.add('hidden');
			songList.classList.remove('hidden');
		} else {
			descBox.classList.remove('hidden');
			songList.classList.add('hidden');
		}
			
	}); 

}

function swipeLeftOnDesc() {
}

export { initShowSongList } ;