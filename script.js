// --- DATA FILM ---
const movies = [
    {
        id: 1,
        title: "The Conjuring",
        year: "2013",
        genre: "Horror",
        rating: "7.5",
        description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
        posterSrc: "assets/Poster/The Conjuring.jpg", 
        videoSrc: "assets/Film/The Conjuring 2013.mp4.mp4" 
    },
    {
        id: 2,
        title: "Annabelle Comes Home",
        year: "2019",
        genre: "Horror",
        rating: "5.9",
        description: "While babysitting the daughter of Ed and Lorraine Warren, a teenager and her friend unknowingly awaken an evil spirit trapped in a doll.",
        posterSrc: "assets/Poster/Annabelle Comes Home.jpg",
        videoSrc: "assets/Film/Annabelle Comes Home.mp4"
    },
    {
        id: 3,
        title: "The Nun 2",
        year: "2023",
        genre: "Horror",
        rating: "5.6",
        description: "In 1956 France, a priest is murdered, and an evil is spreading. Sister Irene once again comes face to face with the demon nun Valak.",
        posterSrc: "assets/Poster/The Nun 2.jpg", 
        videoSrc: "assets/Film/The Nun 2 2023.mp4.mp4"
    },
    {
        id: 4,
        title: "The Nun",
        year: "2018",
        genre: "Horror",
        rating: "5.4",
        description: "The Nun (2018) is a gothic supernatural horror film that serves as a spiritual spin-off to The Conjuring 2 and is the fifth installment in The Conjuring shared universe. The film follows a Roman Catholic priest and a nun in her novitiate as they uncover an unholy secret in 1952 Romania. The plot centers around the investigation of a young nun's death at the Carta Monastery, where the priest and novice are sent by the Vatican to confront a malevolent force in the form of a demonic nun. The film explores the origin of the demonic entity Valak, first seen in The Conjuring 2, and delves into the ancient evil residing in the monastery. The Nun has a sequel, The Nun II, released in 2023.",
        posterSrc: "assets/Poster/The Nun (2018).jpg", 
        videoSrc: "assets/Film/The Nun 2018.mp4.mp4"
    },
    {
        id: 5,
        title: "Annabelle Creation",
        year: "2017",
        genre: "Horror",
        rating: "6.5",
        description: "Annabelle: Creation is a 2017 American supernatural horror film directed by David F. Sandberg. It serves as a prequel to the 2014 film Annabelle and is part of The Conjuring Universe. The story follows dollmaker Samuel Mullins and his wife Esther, who, after their daughter Annabelle dies in a car accident, unknowingly invite a dark presence into their home. Twelve years later, they welcome a group of orphan girls into their home, where they become targets of the doll's evil spirit. The film stars Stephanie Sigman, Talitha Bateman, and Lulu Wilson, and it received generally positive reviews from critics.",
        posterSrc: "assets/Poster/Annabelle Creation (2017).jpg", 
        videoSrc: "assets/Film/Annabelle Creation 2017.mp4.mp4"
    },
    {
        id: 6,
        title: "Annabelle",
        year: "2014",
        genre: "Horror",
        rating: "5.5",
        description: "Annabelle (2014) adalah film horor supernatural yang merupakan spin-off dan prequel dari film horor The Conjuring. Film ini, yang disutradarai oleh John R. Leonetti dan ditulis oleh Gary Dauberman, mengisahkan tentang seorang dokter mahir dan istri yang menerima seorang keramik vintage sebagai hadiah untuk keluarganya. Namun, kebahagiaan mereka berubah drastis setelah mereka menghadapi serangan oleh anggota suku satan yang membunuh anggota keluarga mereka.",
        posterSrc: "assets/Poster/Annabelle (2014).jpg", 
        videoSrc: "assets/Film/Annabelle 2014.mp4.mp4"
    },
];


function getMyList() {
    const list = localStorage.getItem('cineva_mylist');
    return list ? JSON.parse(list) : [];
}

function addToList(event, movieId) {
    if (event) event.stopPropagation(); 
    
    let myList = getMyList();
    if (!myList.includes(movieId)) {
        myList.push(movieId);
        localStorage.setItem('cineva_mylist', JSON.stringify(myList));
        showToast("Film berhasil ditambahkan ke My List!");
        refreshUI();
    }
}

function removeFromList(event, movieId) {
    if (event) event.stopPropagation();
    
    let myList = getMyList();
    myList = myList.filter(id => id !== movieId);
    localStorage.setItem('cineva_mylist', JSON.stringify(myList));
    showToast("Film dihapus dari My List.");
    refreshUI();
}

function refreshUI() {
    // Refresh Grid Utama jika ada
    if (document.getElementById('movie-grid')) {
        // Harus menggunakan data filter pencarian jika sedang aktif, tapi simpelnya renderMovies awal:
        renderMovies(movies, 'movie-grid'); 
    }
    // Refresh Grid My List jika ada
    if (document.getElementById('mylist-grid')) {
        renderMyList();
    }
    
    updateHeroButton();
}

function updateHeroButton() {
    const heroBtn = document.getElementById('hero-add-btn');
    if (heroBtn) {
        const myList = getMyList();
        const heroMovieId = 4;
        if (myList.includes(heroMovieId)) {
            heroBtn.innerHTML = '<i class="fas fa-check" style="color: #4caf50;"></i> Ditambahkan';
            heroBtn.setAttribute('onclick', `removeFromList(null, ${heroMovieId})`);
        } else {
            heroBtn.innerHTML = '<i class="fas fa-plus"></i> Add to List';
            heroBtn.setAttribute('onclick', `addToList(null, ${heroMovieId})`);
        }
    }
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- FUNGSI RENDER UMUM ---
function renderMovies(movieList = movies, containerId = 'movie-grid') {
    const grid = document.getElementById(containerId);
    if (!grid) return; 

    grid.innerHTML = ''; 
    
    if (movieList.length === 0) {
        grid.innerHTML = '<p style="color: #a3a3a3; grid-column: 1 / -1; text-align: center;">Daftar film kosong.</p>';
        return;
    }

    const currentList = getMyList();

    movieList.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        const escapedDesc = movie.description.replace(/'/g, "\\'");
        
        // Cek apakah film sudah di My List
        const isInList = currentList.includes(movie.id);
        const listBtnAction = isInList ? `removeFromList(event, ${movie.id})` : `addToList(event, ${movie.id})`;
        const listBtnIcon = isInList ? `fa-check` : `fa-plus`;
        const listBtnColor = isInList ? `color: #4caf50;` : `color: white;`;

        movieCard.innerHTML = `
            <div class="movie-poster" onclick="openModal('${movie.title}', '${movie.year}', '${movie.posterSrc}', '${escapedDesc}', '${movie.videoSrc}')">
                <img src="${movie.posterSrc}" alt="${movie.title}">
                
                <button class="add-to-list-card-btn" onclick="${listBtnAction}" style="${listBtnColor}" title="Add/Remove dari My List">
                    <i class="fas ${listBtnIcon}"></i>
                </button>

                <div class="poster-overlay">
                    <i class="fas fa-play play-icon"></i>
                </div>
                <div class="rating"><i class="fas fa-star"></i> ${movie.rating}</div>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.year} &bull; ${movie.genre}</p>
            </div>
        `;
        grid.appendChild(movieCard);
    });
}

function renderMyList() {
    const grid = document.getElementById('mylist-grid');
    if (!grid) return;

    const currentListIds = getMyList();
    const myMovies = movies.filter(movie => currentListIds.includes(movie.id));
    
    renderMovies(myMovies, 'mylist-grid');
}

// --- FUNGSI SEARCH ---
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filteredMovies = movies.filter(movie => 
                movie.title.toLowerCase().includes(keyword) || 
                movie.genre.toLowerCase().includes(keyword)
            );
            
            // Render ke container mana yg aktif
            if (document.getElementById('movie-grid')) {
                renderMovies(filteredMovies, 'movie-grid');
            } else if (document.getElementById('mylist-grid')) {
                // Di halaman my list, hanya search dari yg ada di list
                const currentListIds = getMyList();
                const myMoviesFiltered = filteredMovies.filter(movie => currentListIds.includes(movie.id));
                renderMovies(myMoviesFiltered, 'mylist-grid');
            }
        });
    }
}

// --- FUNGSI VIDEO MODAL ---
const modal = document.getElementById('video-modal');
const modalPlayer = document.getElementById('movie-player');
const modalTitle = document.getElementById('modal-title');
const modalYear = document.getElementById('modal-year');
const modalDesc = document.getElementById('modal-desc');

function openModal(title, year, posterSrc, description, videoSrc) {
    if(!modal) return;
    
    modalTitle.textContent = title;
    modalYear.textContent = year;
    modalDesc.textContent = description;
    modalPlayer.src = videoSrc;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
    modalPlayer.play();
}

function closeModal() {
    if(!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    modalPlayer.pause();
    modalPlayer.currentTime = 0;
}

function playHeroVideo(videoSrc) {
    openModal("Featured Movie", "Latest", "", "Enjoy the featured movie.", videoSrc);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// --- FUNGSI NAVBAR SCROLL ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- INISIALISASI ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('movie-grid')) {
        renderMovies(movies, 'movie-grid');
    }
    
    if (document.getElementById('mylist-grid')) {
        renderMyList();
    }
    
    updateHeroButton();
    setupSearch();
});
