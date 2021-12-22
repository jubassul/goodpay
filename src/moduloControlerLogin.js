import userLogin from "./moduloDados.js";
import comunicacaoModal from "./moduloComunicacaoDados.js";

class ControlerUserLogin {
    constructor(status) {
        this.status = status;
    }
    checkLogin() {
        this.status = true;
    }
    checkOutLogin(){
        this.status = false;
    }
    loginInfo(user, senha) {
        var infoCheck = userLogin.find((userLogin) => userLogin.username === user);

        if (user === null || senha === null || user === "" || senha === "") {
            this.checkOutLogin();
            localStorage.status=this.status;
            return (comunicacaoModal.find((comunicacaoModal) => comunicacaoModal.idModal === "camposVazios1"));
        } else {
            if (!infoCheck) {
                this.checkOutLogin();
                localStorage.status=this.status;
                return (comunicacaoModal.find((comunicacaoModal) => comunicacaoModal.idModal === "usuarioNaoExiste1"));
            } else {
                if (infoCheck.senha === senha) {
                    this.checkLogin();
                    localStorage.status=this.status;
                    return (comunicacaoModal.find((comunicacaoModal) => comunicacaoModal.idModal === "loginExecutado1"));
                } else {
                    this.checkOutLogin();
                    localStorage.status=this.status;
                    return(comunicacaoModal.find((comunicacaoModal) => comunicacaoModal.idModal === "falhaLogin1"));
                }
            }
        }
    }
}
const controlerUserLogin = new ControlerUserLogin();
export default controlerUserLogin