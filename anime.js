const fileInput = document.getElementById('file-input');
const imageRegex = /\.(jpe?g|png|gif|bmp)$/i;
const imagePreview = document.getElementById('image-preview');
const myVideo = document.getElementById('my-video');
const nameAnime = document.getElementsByClassName('nume');
const episodeAnime = document.getElementById('episode');
const grid = document.querySelector('.grid');

const linke= document.getElementsByClassName('links');

fileInput.addEventListener('change', event => {
  // console.log(localStorage);
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
      // console.log(data);
      if (data.result[0].video) {
          
          
          const gifUrl = data.result[0].video;

          localStorage.setItem('video', gifUrl);

          myVideo.src = gifUrl;

          linke[0].href = gifUrl;

          const name = data.result[0].anilist.title.romaji;

          //show anime name in html
          nameAnime[0].innerHTML ="Anime:"+ name;
          //make grid class visible
          localStorage.setItem('name', name);
          // array methods
          const arr= data.result.reverse().pop();
          const number = arr.episode;
          //show episode number in html
          if (number == null) {
            localStorage.setItem('number', "This is the movie version of the anime");
            episodeAnime.innerHTML = "This is the movie version of the anime";
          } 
          else{
            episodeAnime.innerHTML ="Episode number: "+ number;
            localStorage.setItem('number', number);
          }

        } else {
          console.error('No results found');
        }
   
        
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


//on load do something

var replays =1;

window.addEventListener('load', function() {
  if (savedImage&& episodeAnime.innerHTML === "") {
  
    myVideo.src = savedImage;
    // console.log();
    // console.log(linke[0].href);
    linke[0].href = savedImage;
    // console.log(linke[0].href);

    
    nameAnime[0].innerHTML ="Anime: "+ savedName.toLowerCase();
    if (savedNumber == "This is the movie version of the anime") 
      episodeAnime.innerHTML = savedNumber;
    else
      episodeAnime.innerHTML ="Episode number: "+ savedNumber;

  
    
    setTimeout(() => {
      imagePreview.classList.add('fade-in-active');
      grid.classList.add('fade-in');
      
    }, 1000);
    const replay = setInterval(replayVideo, 5000);
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Space') {
        if(replays === 1){
          clearInterval(replay);
          replays = 0;
        }
        else{
          replay = setInterval(replayVideo, 5000);
          replays = 1;
        }
      }
    });
    
  }

  
});
var create = 1;
function createe() {
  var div = document.querySelector(".grid");
  
  if (create === 1)
  {
    var newDiv = document.createElement("div");
    newDiv.id = "new";
    newDiv.innerHTML = "Click ME!";
    div.appendChild(newDiv);
    create = 0;
  }
  else{
    var newDiv = document.getElementById("new");
    div.removeChild(newDiv);
    create = 1;
  }
  // console.log(create);
  
}
setInterval(createe, 5000);




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



function replayVideo() {
  myVideo.currentTime = 0; // Reset playback position to the beginning
  myVideo.play(); // Start playing the video
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
linke[0].addEventListener("click", function(event){
  event.preventDefault();
  var url =this.href;
  window.open(url, '_blank');
  event.stopPropagation();
});

function handleClick(event) {
  const text = event.currentTarget;
  text.style.color= getRandomColor();

  const newSize = Math.floor(Math.random() * 10) + 10;
  text.style.fontSize = `${newSize}px`;


  var rect = myVideo.getBoundingClientRect();
  // console.log(rect.width);  // The width of the image in pixels
  // console.log(rect.height);
  var time = new Date().getFullYear();
  alert("Good luck in the remaining of " + time + "\n" +
    "The width of the image is: " + rect.width + "px"
  + " and the height is: " + rect.height + "px "
  + "Your new color is: " + text.style.color + "\n"
  + "Your new font size is: " + text.style.fontSize );
}


function validateForm() {
  const choose = document.getElementsByClassName('choose')[0];
  let x = document.forms["myForm"]["fname"].value;

  if (x != "") {
    document.forms["myForm"]["fname"].value = "";
    choose.innerHTML = "Choose an anime image, "+x;
  }
  

  
}