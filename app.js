let currentPlaylist = {}; // Variable to store the current playlist


const Songs = [
    {
        id: 1,
        name: `Shape of You`,
        artist: 'Ed Sheren',
        image: `https://i1.sndcdn.com/artworks-000201927280-2vsnux-t500x500.jpg`,
        genre: 'Pop',
        source: `Shape of You.mp3`,
    },
    {
        id: 2,
        name: `Husn`,
        artist: 'Anuv Jain',
        image: `https://geo-media.beatsource.com/image_size/500x500/7/c/c/7ccc7be6-0e8b-4ac5-88f3-6f05aa7a6f04.jpg`,
        genre: 'Pop',
        source: `Husn.mp3`,
    },
    {
        id: 3,
        name: `Aaftaab`,
        artist: 'The Local Train',
        image: `https://i.scdn.co/image/ab67616d00001e0273c6514b296e0b53dc7b75b3`,
        genre: 'Pop',
        source: `Aaftaab.mp3`,
    },
    {
        id: 4,
        name: `Haawa Haawa`,
        artist: 'Mohit Chauhan',
        image: `https://c.saavncdn.com/408/Rockstar-Hindi-2011-20221212023139-500x500.jpg`,
        genre: 'Rock',
        source: `HAWAA HAWAA .mp3`,
    },
    {
        id: 5,
        name: `Tere Pyaar Mein`,
        artist: 'Pritam',
        image: `https://c.saavncdn.com/367/Tere-Pyaar-Mein-From-Tu-Jhoothi-Main-Makkaar-Hindi-2023-20230203140532-500x500.jpg`,
        genre: 'Hip-Hop',
        source: `128-Tere Pyaar Mein  (1).mp3`,
    }

];
let currentobj = Songs[0];

const theme = document.querySelector('.theme');
const Switch = document.querySelector('.switch-theme');
const body = document.querySelector('body');
const gridContainers = document.querySelectorAll('.grid-item');
const songCard = document.querySelector('.song-card');

let themeVar = true;

function toggleTheme() {
    if (themeVar) {
        body.style.backgroundColor = '#241d1d';
        body.style.color = 'white';
        Switch.style.marginLeft = '50%';
        songCard.style.backgroundColor = 'rgb(62 69 69)'
        gridContainers.forEach(function(gridItem) {
            gridItem.style.backgroundColor = 'rgb(59, 56, 56)';
        });
        themeVar = false;
    } else {
        body.style.backgroundColor = '#d2eef4';
        body.style.color = 'black';
        Switch.style.marginLeft = '0%';
        songCard.style.backgroundColor = 'rgb(178 218 218)'
        gridContainers.forEach(function(gridItem) {
            gridItem.style.backgroundColor = '#38bcc0';
        });
        themeVar = true;
    }
}

theme.addEventListener('click', toggleTheme);

const SongList = document.querySelector('.song-list');
const SongListHeading = document.querySelector('.genre-heading');



function showSongs(gen) {
    SongList.innerHTML = '';

    const filteredSongs = Songs.filter(obj => obj.genre === gen || gen === 'All');

    filteredSongs.forEach(obj => {
        SongListHeading.textContent = `${gen} Songs`;
        const listBtn = document.createElement('button');
        listBtn.className = 'song-btn';
        listBtn.textContent = `${obj.name} - ${obj.artist}`;
        listBtn.addEventListener('click', function() {
            renderCurrentSong(obj);
            currentobj = obj;
        });
        SongList.appendChild(listBtn);
    });
}

const opt = document.getElementById('genre');
opt.addEventListener('change', function() {
    showSongs(opt.value);
});

showSongs('All');

// 2nd column of grid===============================================================
function renderCurrentSong(obj) {
    const songImg = document.querySelector('.photo');
    const songName = document.querySelector('.song-name');
    const artist = document.querySelector('.Artist');
    const music = document.querySelector('.song-audio');

    songImg.src = obj.image;
    songName.textContent = obj.name;
    artist.textContent = obj.artist;
    // Assuming obj.audio is the URL of the audio file
    music.src = obj.source;
}

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let limit = Songs.length;

nextBtn.addEventListener('click', nextFunc);
prevBtn.addEventListener('click', prevFunc)

function nextFunc(){
    let songId = currentobj ? currentobj.id : 0; // Initialize songId, default to 0 if currentobj is not set

    songId++; // Increment songId for the next song
    if (songId <= limit) { // Check if the songId is within the limit
        
        Songs.forEach(song => {
            if (song.id === songId) {
                currentobj = song;
                renderCurrentSong(song);
            
            }
        });
    }
}
function prevFunc(){
    let songId = currentobj ? currentobj.id : 0; // Initialize songId, default to 0 if currentobj is not set

    songId--; // Increment songId for the next song
    if (songId >= 0) { // Check if the songId is within the limit
        
        Songs.forEach(song => {
            if (song.id === songId) {
                currentobj = song;
                renderCurrentSong(song);
            
            }
        });
    }
}






// 3rd column og grid=========================================================
const playlist = [];
const allPlaylist = document.querySelector('.all-playlist');
const cpSongs = document.querySelector('.current-playlist');

const input = document.getElementById('playlist');
const create = document.querySelector('.create-btn');
create.addEventListener('click', function() {
    const Pn = input.value;
    if(Pn === ''){
        alert('Please Give name to your Playlist');
        return;
    }
    input.value = '';

    const btn = document.createElement('button');
    btn.className = 'ap-item';
    btn.textContent = Pn;
    allPlaylist.appendChild(btn);

    const songObj = {
        playListName: Pn,
        audios: []
    };

    playlist.push(songObj);

    // Add event listener to newly created playlist button
    btn.addEventListener('click', function() {
        currentPlaylist = songObj;
        displayPlaylistSongs(songObj);
        // currentPlaylistHeading.textContent = `${Pn} Playlist`; // Update current playlist heading
        currentPlaylistHeading.style.display = 'block'; // Show the heading
    });
})

// Function to display songs of the selected playlist in the current playlist section
function displayPlaylistSongs(selectedPlaylist) {
    cpSongs.innerHTML = ''; // Clear the current playlist section
    selectedPlaylist.audios.forEach(song => {
        const btn = document.createElement('button');
        btn.className = 'cp-item';
        btn.textContent = song.name; // Assuming the song object has a 'name' property
        cpSongs.appendChild(btn);
    });
}

// Add a reference to the current playlist heading
const currentPlaylistHeading = document.querySelector('.current-playlist-heading');

// Event listener to add playlist items to current playlist...
// const addBtn = document.querySelector('.add');
const addBtn = document.querySelector('.add');
addBtn.addEventListener('click', function() {
    console.log("Add button clicked");
    
    if (currentobj && currentPlaylist) {
        let s = true;
        currentPlaylist.audios.forEach(obj => {
            if (currentobj.name === obj.name) {
                alert(`Song ${obj.name} is already present in the Playlist`);
                s = false;
            }
        });
        if (s === true) {
            currentPlaylist.audios.push(currentobj);
            displayPlaylistSongs(currentPlaylist);
        }
    } else {
        alert('Please ensure that you have selected the song and playlist');
    }
});



// additional task 
const searchBtn = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-input');

searchBtn.addEventListener('click', function(){
    let Sname = '';
    Songs.forEach(obj =>{
        if(obj.name === searchBar.value){
            Sname = obj.name;
        }
    })

    if(Sname !== ''){
        showSongsByName(Sname);
    } else {
        alert('Song not found');
    }
})

function showSongsByName(gen) {
    SongList.innerHTML = '';

    const filteredSongs = Songs.filter(obj => obj.name === gen);

    filteredSongs.forEach(obj => {
        
        const listBtn = document.createElement('button');
        listBtn.className = 'song-btn';
        listBtn.textContent = `${obj.name} - ${obj.artist}`;
        listBtn.addEventListener('click', function() {
            renderCurrentSong(obj);
            currentobj = obj;
        });
        SongList.appendChild(listBtn);
    });
}