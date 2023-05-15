const fileInput = document.getElementById('file-input');


fileInput.addEventListener('change', event => {
  
  const file = event.target.files[0];
  
  
  const formData = new FormData();
  formData.append('image', file);

  const apiUrl = 'https://api.trace.moe/search';

  // Send a POST request to the API endpoint with the image file data
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
      } else {
        console.error('No results found');
      }
  })
  .catch(error => console.error(error));
});

function makeImage(img) {
    var image = document.createElement("img");
    image.src = img;
    image.style.width = "20%";
    image.style.height = "auto";
    return image;
}

