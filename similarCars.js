import { carsArray } from "./carsStock.js";

const fileInput = document.getElementById("formFile");
const submitButton = document.getElementById("submitButton");
const outputElement = document.getElementById("outputText");

submitButton.addEventListener("click", function () {
  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    fetch(
      "https://mmissiontwo-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/5320f6a0-3325-46c7-aa92-3d0ff9cd1bc9/classify/iterations/Iteration8/image",
      {
        method: "POST",
        body: formData,
        headers: {
          "Prediction-key": "28cab18865cd42f2b976c1fd2383c442",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedTag = data.predictions[0].tagName;

        const similarCars = carsArray.filter(
          (car) => car.model.toLowerCase() === fetchedTag.toLowerCase()
        );

        let outputText = `The submitted car image is of : ${fetchedTag}.<br /><br/>`;

        if (similarCars.length > 0) {
          outputText += "Similar cars in our stock:";
          similarCars.forEach((car) => {
            outputText += `<img src="${car.path}" style="width: 200px;">`;
          });
        }

        outputElement.innerHTML = outputText;
      })
      .catch((error) => {
        //console.error("Error making API request:", error);
        outputElement.textContent = "Error making API request";
      });
  } else {
    alert("please choose a file before submitting.");
  }
});
