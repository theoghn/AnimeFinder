const fileInput = document.getElementById('file-input');
const imageRegex = /\.(jpe?g|png|gif|bmp)$/i;

fileInput.addEventListener('change', event => {
  
  const file = event.target.files[0];
  
  
  const formData = new FormData();
  formData.append('image', file);

  const apiUrl = 'https://api.trace.moe/search?anilistInfo';

  // Send a POST request to the API endpoint with the image file data
  if (imageRegex.test(fileInput.value)) {
    fetch(apiUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.result[0].video) {
          
  
          const gifUrl = data.result[0].video;
  
          const imagePreview = document.getElementById('image-preview');
  
          imagePreview.innerHTML = `<video autoplay 
          src="${gifUrl}" alt="Image Preview">
          </video>`;

          const nameAnime = document.getElementsByClassName('nume');
          const name = data.result[0].anilist.title.romaji;
          console.log(name);
          //show anime name in html
          nameAnime[0].innerHTML = name;
          //make grid class visible
          const grid = document.getElementsByClassName('grid');
          grid[0].style.visibility = "visible";
        } else {
          console.error('No results found');
        }
    })
    .catch(error => console.error(error));
  }
  //show error message if file is not an image
  else {
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = `<p>File is not an image</p>`;
  }


  
});

function makeImage(img) {
    var image = document.createElement("img");
    image.src = img;
    image.style.width = "20%";
    image.style.height = "auto";
    return image;
}

