document.getElementById('imageInput').addEventListener('change', function(event) {
    var fileName = event.target.files[0].name;
    var nextSibling = event.target.nextElementSibling;
    nextSibling.innerText = fileName;
});

async function processImage() {
    var fileInput = document.getElementById('imageInput');
    var imageContainer = document.getElementById('imageContainer');
    var caption = document.getElementById('caption');

    caption.textContent = "";

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = async function(e) {
        // Exibe a imagem carregada
        imageContainer.innerHTML = '<img id="uploadedImage" src="' + e.target.result + '" alt="Uploaded Image" style="max-width: 300px">';

        // Espera até que a imagem seja exibida no DOM
        var img = document.getElementById('uploadedImage');
        img.onload = async function() {
            // Carrega o modelo MobileNet
            const model = await mobilenet.load();

            // Classifica a imagem carregada
            const predictions = await model.classify(img);
            
            // Gera a legenda a partir das previsões
            caption.textContent = predictions.map(prediction => `${prediction.className} (${(prediction.probability * 100).toFixed(2)}%)`).join(', ');
        };
    };

    reader.readAsDataURL(file);
}