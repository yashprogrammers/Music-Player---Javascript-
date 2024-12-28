function creaFolders(songs, sLength) {
  let folder = document.createElement('div')
  folder.className = 'folder'
  folder.setAttribute('id', `${songs}`)
  let html = `
        <i class="fa fa-folder" aria-hidden="true" style="margin-right: 10px;"></i>
        <div id="folderInfo">
          <div class="fName">${songs}</div>
          <div class="fItems">${sLength} Songs</div>
        </div>`
  folder.innerHTML = html
  document.querySelector('.folders').append(folder)
}

function displaySongs(sTitle, sSrc) {
  let divSong = document.createElement('div')

  divSong.className = 'song'
  let html = `<div class="img"><i class="fa fa-play" aria-hidden="true"></i></div><hr><div id="sName">${sTitle}</div>`
  divSong.innerHTML = html
  document.getElementById('sFiles').append(divSong)

  divSong.addEventListener('click', () => {
    let audio = document.getElementById('audio')
    audio.src = sSrc
    audio.play();
    playPauseBtn.innerHTML = `<i class="fa fa-pause" aria-hidden="true"  id="play-pause-btn">`;
    document.getElementById('csName').innerHTML = sTitle
  })
}

async function fetchSongs(songs) {
  let response = await fetch(`http://127.0.0.1:5500/${songs}/`);
  let data = await response.text();
  let div = document.createElement("div");
  div.innerHTML = data;
  let song = div.getElementsByTagName("a");

  // get Songs
  for (const e of song) {
    if (e.title.endsWith('.m4a')) {
      let sTitle = e.title.slice(0, -4)
      let sSrc = e.href
      displaySongs(sTitle, sSrc)
    }
  }

  // create Folders
  let sLength = song.length - 3
  creaFolders(songs, sLength)


}

// main Function
async function main() {
  await fetchSongs('Songs')
  await fetchSongs('Hindi Songs')
  await fetchSongs('Only Music')

  let sFiles = document.getElementById('sFiles')
  document.getElementById('totalSong').innerHTML = sFiles.children.length + " Songs"
  // sortFolderSongs(sFiles)
}

main()