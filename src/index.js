import controlerUserLogin from "./moduloInterface.js";
//Trazendo elementos do Bootstrap para uso da main Javascript.
var myModal = new bootstrap.Modal(document.getElementById('myModal'))
//Trazendo os botões da DOM em HTML.
const entrarUsuario = document.getElementById("btnEntrar");
entrarUsuario.addEventListener("click", (event)=>{
    let user = document.getElementById("usuario").value,
    senha = document.getElementById("senha").value;
    //Testando se os campos não estão vazios.
    if(!user || user===null || user==="" || !senha || senha===null || senha===""){
        alert("Campos Vazios, não há como executar o login.");
        document.getElementById("titleModal").innerHTML="Campos Vazios";
        document.getElementById("bodyModal").innerHTML="Os campos não podem estar vazios!";
        document.getElementById("btnModalClose").innerHTML="Fechar";
        document.getElementById("btnModalSave").innerHTML="Salvar";
        myModal.show();
    }else{
        controlerUserLogin.loginInfo(user, senha);
    }
});