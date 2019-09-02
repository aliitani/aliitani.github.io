

// function for getting links sent to the buttons.
function openLinks(url) {
    let links = ['https://github.com/aliitani', 'https://www.linkedin.com/in/aliitani0/', 
    'https://angel.co/aliitani', '', 'https://medium.com/@aliitani0', 
    'https://www.instagram.com/aliitani/', 'https://twitter.com/atomsoftworks', 'https://pme-math.org/', './assets/itani.pdf'];
    window.open(links[url], '_blank').focus();
}

function openProjects(url){
    let links = [
        'https://overwatch-hero-database.com/Heroes', 
        'https://github.com/aliitani/Traffic-Jam', 
        'https://aliitani.github.io/cubes/',
        'https://aliitani.github.io/parallax-scrolling/',
        'https://aliitani.github.io/auto-type-writer-js/',
        'https://ng-doc.web.app/',
    ];
    window.open(links[url], '_blank').focus();
}
