import controlerUserLogin from "./moduloInterface.js";
//Trazendo elementos do Bootstrap para uso da main Javascript.
var myModal = new bootstrap.Modal(document.getElementById('myModal'))
//Trazendo os botões da DOM em HTML.
const entrarUsuario = document.getElementById("btnEntrar");
entrarUsuario.addEventListener("click", (event)=>{
    let user = document.getElementById("usuario").value,
    senha = document.getElementById("senha").value;
    let alertModal = controlerUserLogin.loginInfo(user, senha);
    
    document.getElementById("titleModal").innerHTML=alertModal.title;
    document.getElementById("bodyModal").innerHTML=alertModal.bodyModal;
    document.getElementById("btnModalClose").innerHTML=alertModal.b1;
    document.getElementById("btnModalSave").innerHTML=alertModal.b2;

    myModal.show();
});