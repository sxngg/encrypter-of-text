
/**
 * Code for make textarea resizable considering content
 * * First line checks whether DOM is complety loaded, and if so, the second parameter executes.
 * * Second, a reference is obtained for the element with the id 'myTextArea' in the HTML.
 * * Then, an event listener is added to run the function when the user inputs something into the textarea.
 * * Fourth and fifth, the height of the textarea is set. 'scrollHeight' is a property that returns the height of the content, even content that isn't enabled or visible.
 * * scrollHeight ensures that the textarea box is tall enough to fit its content
*/
document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("myTextArea");
  textarea.addEventListener("input", function () {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });
  check();

  textarea.addEventListener('input', function () {
    const text = this.value;
    const newText = removeAccents(text);
    if (newText !== text) {
      this.value = newText;
    }
  });

  function removeAccents(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

});

function check() {
  const pContent = document.querySelector("#encrypterText");

  if (pContent.innerHTML == "") {
    document.getElementById("finalText").style.display = 'none';

  }
  else {
    document.getElementById("finalText").style.display = 'block';

  }
}


/**
 * Function encryptAlgorithm()
 * * This function receives a normal text and returns a encrypter text
 * TODO Encryptation rules  
 * "e" is "enter"
 * "i" is "imes"
 * "a" is "ai"
 * "o" is "ober"
 * "u" is "ufat"
 * 
 * @param textToEncrypter
 */
function encryptAlgorithm(textToEncrypter) {
  const letterMap = new Map([
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat']
  ]);
  let finalText = '';
  for (letter of textToEncrypter) {
    if (letterMap.has(letter)) {
      finalText += letterMap.get(letter);
    } else {
      finalText += letter;
    }
  }
  return finalText;
}


/**
 * Function decryptAlgorithm()
 * * This function receives a encrypt text and returns a decrypt text
 * @param textToDecrypter
 */
function decryptAlgorithm(textToDecrypter) {
  for (letter of textToDecrypter) {
    if (textToDecrypter.includes("ai")) {
      textToDecrypter = textToDecrypter.replace("ai", "a");
    }
    if (textToDecrypter.includes("enter")) {
      textToDecrypter = textToDecrypter.replace("enter", "e");
    }
    if (textToDecrypter.includes("imes")) {
      textToDecrypter = textToDecrypter.replace("imes", "i");
    }
    if (textToDecrypter.includes("ober")) {
      textToDecrypter = textToDecrypter.replace("ober", "o");
    }
    if (textToDecrypter.includes("ufat")) {
      textToDecrypter = textToDecrypter.replace("ufat", "u");
    }
  }

  return textToDecrypter;
}


/**
 * Function encryptBtn()
 * * This function catch the text that user write in the left textarea and encrypt it.
 * * Thereafter shows encrypted text in right textarea and cleans left textarea 
 * 
 */
function encryptBtn() {
  let leftContainer = document.querySelector("#myTextArea");
  let rightContainer = document.querySelector("#encrypterText");

  if (leftContainer.value == '') {
    Swal.fire({
      title: 'Escribe qué deseas encriptar',
      text: 'No se ha encontrado texto por encriptar',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  }
  else {
    rightContainer.innerText = encryptAlgorithm(leftContainer.value);
    leftContainer.value = '';
    leftContainer.addEventListener('input', () => {
    });
    document.getElementById("encryptText").style.display = "block";
    changeBackground();
    document.getElementById("warning-letter-container").style.display = 'none';
    check();
  }
}


/** 
 * changeBackground
 * * Change background image when user clicks on encrypt button.
*/

function changeBackground() {
  document.getElementById("body").style.background = 'black';
  var elementos = document.querySelectorAll("#logo, #preEncrypterContainer,#encryptOrDecryptContainer");
  document.getElementById('progressBar').style.display = "flex";
  document.getElementById("bar").style.display = "block";
  document.getElementById("anonymousFace").style.display = "block";
  document.getElementById("anonymousBody").style.display = "none";

  elementos.forEach(element => {
    element.style.display = 'none';
  });

  setTimeout(() => {
    document.getElementById("body").style.background = 'rgb(228, 228, 228)';
    document.getElementById("progressBar").style.display = "none";
    document.getElementById("bar").style.display = "none";
    document.getElementById("anonymousFace").style.display = "none";
    document.getElementById("anonymousBody").style.display = "block";
    document.getElementById("encryptText").style.display = "none";
    document.getElementById("decryptText").style.display = "none";


    elementos.forEach(element => {
      element.style.display = '';
    });
  }, 2000);

}





/**
 * Function decryptBtn()
 * * This function catch the text that user write in the left textarea and decrypt it.
 * * Thereafter shows decrypted text in right textarea and cleans left textarea
 */
function decryptBtn() {
  let leftContainer = document.querySelector("#myTextArea");
  let rightContainer = document.querySelector("#encrypterText");

  if (leftContainer.value == '') {
    Swal.fire({
      title: 'Escribe qué deseas desencriptar',
      text: 'No se ha encontrado texto por desencriptar',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  }
  else {
    rightContainer.innerText = decryptAlgorithm(leftContainer.value);
    leftContainer.value = '';
    document.getElementById("warning-letter-container").style.display = 'none';
    document.getElementById("decryptText").style.display = "block";
    changeBackground();
    check();
  }

}

/**
 * Function copyClipboard
 * * This function takes a string encrypted or decrypted wrote in the right textarea and writer it to the clipboard.
 * 
 */
function copyClipboard() {
  let rightContainer = document.querySelector("#encrypterText");
  navigator.clipboard.writeText(rightContainer.innerHTML);

  Swal.fire({
    title: 'Copiado',
    text: 'El texto se ha copiado con éxito',
    icon: 'success', // Puedes cambiar el ícono por 'warning', 'error', 'info', etc.
    confirmButtonColor: '#3085d6', // Cambia el color del botón de confirmación
    confirmButtonText: 'Aceptar' // Cambia el texto del botón de confirmación
  });

}


