const fileInput = document.getElementById('file-input');
const imageRegex = /\.(jpe?g|png|gif|bmp)$/i;
const imagePreview = document.getElementById('image-preview');
const myVideo = document.getElementById('my-video');
const nameAnime = document.getElementsByClassName('nume');
const episodeAnime = document.getElementById('episode');
const grid = document.querySelector('.grid');

fileInput.addEventListener('change', event => {
  console.log(localStorage);
  const file = event.target.files[0];
  
  
  const formData = new FormData();
  formData.append('image', file);

  const apiUrl = 'https://api.trace.moe/search?anilistInfo';
  
  
  // Send a POST request to the API endpoint with the image file data
  if (imageRegex.test(fileInput.value)) {
    const time = document.getElementById('time');
    //set interval every 0.5 seconds
  
    fetch(apiUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.result[0].video) {
          
          
          const gifUrl = data.result[0].video;

          localStorage.setItem('video', gifUrl);

          myVideo.src = gifUrl;


          const name = data.result[0].anilist.title.romaji;
          console.log(name);
          //show anime name in html
          nameAnime[0].innerHTML ="Anime:"+ name;
          //make grid class visible
          localStorage.setItem('name', name);

          
          const number = data.result[0].episode;
          //show episode number in html
          if (number == null) {
            localStorage.setItem('number', "This is the movie version of the anime");
            episodeAnime.innerHTML = "This is the movie version of the anime";
          } 
          else{
            episodeAnime.innerHTML ="Episode number: "+ number;
            localStorage.setItem('number', number);
          }

          const grid = document.getElementsByClassName('grid');
          grid[0].style.visibility = "visible";
        } else {
          console.error('No results found');
        }
        console.log(localStorage);
        
        setTimeout(() => {
          grid.classList.remove('fade-in');
          imagePreview.classList.remove('fade-in-active');
    void grid.offsetWidth;
    void imagePreview.offsetHeight;
    imagePreview.classList.add('fade-in-active');
    grid.classList.add('fade-in');
    
  }, 1);
    })
    .catch(error => console.error(error));
  }
  //show error message if file is not an image
  else {
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = `<p>File is not an image</p>`;
    
  }
  
  
});

const savedImage = localStorage.getItem('video');
const savedName= localStorage.getItem('name');
const savedNumber = localStorage.getItem('number');
console.log(myVideo.src);

//on load do something

  

window.addEventListener('load', function() {
  if (savedImage&& episodeAnime.innerHTML === "") {
  
    myVideo.src = savedImage;
    
    nameAnime[0].innerHTML ="Anime: "+ savedName;
    episodeAnime.innerHTML ="Episode number: "+ savedNumber;
  
    
    setTimeout(() => {
      imagePreview.classList.add('fade-in-active');
      grid.classList.add('fade-in');
      
    }, 1000);
    setInterval(replayVideo, 5000)
  
  }
});



const button = document.querySelector('.dropbtn');
const purpleLink = document.getElementById('purple');
const pinkLink = document.getElementById('pink');

purpleLink.addEventListener('click', function() {
  // button.backgroundColor= "#a4bbeb";
  button.textContent = "Purple";
  document.body.style.backgroundColor ="#cb2ff133";
});

pinkLink.addEventListener('click', function() {
  // button.backgroundColor= "#cfa7c3";
  button.textContent = "Pink";
  document.body.style.backgroundColor ="pink";
});

function makeImage(img) {
    var image = document.createElement("img");
    image.src = img;
    image.style.width = "20%";
    image.style.height = "auto";
    return image;
}


function replayVideo() {
  myVideo.currentTime = 0; // Reset playback position to the beginning
  myVideo.play(); // Start playing the video
}

