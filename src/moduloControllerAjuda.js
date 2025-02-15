import ajudaDados from "./moduloAjudaDados.js";

class ControllerMenuAjuda {
    constructor(ajudaDados) {
        this.ajudaDados = ajudaDados;
    }
    // MÉTODO PARA MONTAR O MONTAGEM DO SUBMENU
    get construirSubMenuAjuda() {
        const subMenuBody = document.querySelector("#subMenuAjuda");
        subMenuBody.innerHTML = `<ul>`;
        ajudaDados.forEach((element, index) => {
            subMenuBody.innerHTML += `
            <li 
                class="btn list-group-item list-group-item-action"
                value="10${index + 1}${index + 1}" data-bs-dismiss="offcanvas">
                    ${element.idTitle}
            </li>`;
        });
        subMenuBody.innerHTML += `</ul>`;
        // faz com que cada item do submenu seja um botão e abra seu respective modal.
        subMenuBody.addEventListener("click", (event) => {
            this.montarModalEspecifico(event.target.value);
        });
    }
    // cria um modal base para ser usado em todos os modais.
    modalBase() {
        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        return myModal;
    }
    // monta o modal específico para cada item do submenu.
    montarModalEspecifico(value) {
        // INFORMAÇÕES ESPECIFICAS DOS ERROS
        const dadosErro = ajudaDados.find(
            (element) => element.id.toString() === value.toString()
        );

        // CHECAGEM E CHAMADA NUMERO DE VOTOS
        const status = this.getLocalStorage("listaUtil");
        console.log(status);
        const gpErro = status?.find((status) => status.id == value);
        console.log("gp ->", gpErro) || null;
        // CRIAÇÃO DO MODAL
        const modalTitle = document.getElementById("titleModal");
        modalTitle.innerHTML = `${dadosErro.idTitle}`;
        const modalBody = document.getElementById("bodyModal");
        modalBody.innerHTML = `<p>${dadosErro.desc}</p>
        <p>${dadosErro.msg}</p>
        <form class="d-flex justify-content-evenly align-items-center form-control">
            <span>A informação foi util? </span>
            <div class="form-check d-flex align-items-center">
                <label for="radioSim">Sim </label>
                <input class="ms-2" type="radio" id='radioSim' name="radioResposta" value="sim" checked>
                <span class="ms-2">${gpErro?.sim || "0"} votos</span>
            </div>
            <div class="form-check d-flex align-items-center">
                <label for="radioNao">Não</label>
                <input class="ms-2" type="radio" id='radioNao' name="radioResposta" value="nao">
                <span class="ms-2">${gpErro?.nao || "0"} votos</span>
            </div>
        </form>
        `;
        document.getElementById("modalButtonArea").innerHTML = `
        <button
            id='btnVoltar' 
            type="button" 
            class="btn btn-secondary">Voltar</button>
        <button 
            id="btnModalClose" 
            type="button" 
            class="btn btn-secondary" 
            data-bs-dismiss="modal">Fechar</button>
        <button 
            id="btnModalSave" 
            type="button" 
            class="btn btn-primary" 
            data-bs-dismiss="modal"
            value="${value}">Salvar e Fechar</button>
        `;
        // Modal Geral de erros
        const btnVoltar = document.getElementById("btnVoltar");
        btnVoltar.addEventListener("click", (event) => {
            modalTitle.innerHTML = "Lista de Erros";
            modalBody.innerHTML = `
                <input 
                    id="buscaErro"
                    class="form-control text-center" 
                    type="text"
                    autoComplete="off" 
                    placeholder="Busque pelo erro desejado...">
            <ul id="listaDeErros" class="list-group-item list-group-item-action"></ul>`;
            // CHAMADA FILTRO DE LISTA DE ERROS
            this.buscarErro();
            // BOTÃO FECHAR MODAL
            document.getElementById("modalButtonArea").innerHTML = `
            <button 
                id="btnModalClose" 
                type="button" 
                class="btn btn-secondary" 
                data-bs-dismiss="modal">Fechar</button>
            `;
        });
        this.modalBase().show();
        // BOTÃO SALVAR INFO
        document
            .getElementById("btnModalSave")
            .addEventListener("click", (event) => {
                const issue = {
                    id: event.target.value,
                    sim: 0,
                    nao: 0,
                };
                this.getLocalStorage("listaUtil") ||
                    this.setLocalStorage("listaUtil", []);
                const listaUtil = this.getLocalStorage("listaUtil");

                const radio = document.querySelector(
                    'input[name="radioResposta"]:checked'
                ).value;

                const listaFiltrada = listaUtil?.filter((item) => {
                    return item.id === event.target.value;
                });

                if (listaFiltrada.length > 0) {
                    listaUtil.map((element) => {
                        console.log("if SOBRESCREVER");
                        if (element.id === event.target.value) {
                            if (radio === "sim") {
                                element.sim++;
                            } else {
                                element.nao++;
                            }
                        }
                    });
                } else {
                    console.log("if CRIAR");
                    if (radio === "sim") {
                        issue.sim++;
                    } else {
                        issue.nao++;
                    }
                    listaUtil?.push(issue);
                }
                this.setLocalStorage("listaUtil", listaUtil);
            });
    }

    //todo: criar um método para chamar o modal geral.
    /* montarModalGeral() {
        console.log("montarModalGeral");
    } */
    // BUSCA DE ERROS PELO INPUT (BUSCA ID, IDTITLE E DESC)
    buscarErro() {
        const inputBusca = document.getElementById("buscaErro");
        const ul = document.getElementById("listaDeErros");
        // PRIMEIRA MONTAGEM
        ajudaDados.forEach((element, index) => {
            ul.innerHTML += `
                <li
                class="btn list-group-item list-group-item-action"
                data-bs-dismiss="modal"
                value="10${index + 1}${index + 1}">
                ${element.idTitle} - ${element.title}
                </li>`;
        });
        // EVENTO LISTENER DO INPUT
        inputBusca.addEventListener("keydown", (e) => {
            const novaLista = ajudaDados.filter((item) => {
                return item
                    .idBusca()
                    .toLocaleLowerCase()
                    .includes(inputBusca.value.toLocaleLowerCase());
            });
            // MONTAGEM CONDICIONAL
            if (inputBusca.value === "" || inputBusca.value.length + 1 <= 2) {
                ul.innerHTML = ``;
                ajudaDados.forEach((item, index) => {
                    ul.innerHTML += `<li
                        class="btn list-group-item list-group-item-action"
                        data-bs-dismiss="modal"
                        value="10${index + 1}${index + 1}">
                        ${item.idTitle} - ${item.title}
                        </li>`;
                });
            } else {
                ul.innerHTML = ``;
                novaLista.forEach((item, index) => {
                    ul.innerHTML += `<li
                        class="btn list-group-item list-group-item-action"
                        data-bs-dismiss="modal"
                        value="10${index + 1}${index + 1}"> 
                        ${item.idTitle} - ${item.title}
                        </li>`;
                });
            }
        });
        // CHAMADA DA MONTAGEM ESPECIFICA
        ul.addEventListener("click", (e) => {
            console.log("clicou", e.target.value);
            this.montarModalEspecifico(e.target.value);
        });
    }
    // MÉTODO PARA RECUPERAR DO LOCALSTORAGE
    getLocalStorage(storageName) {
        return JSON.parse(localStorage.getItem(storageName));
    }
    // MÉTODO PARA GRAVAR NO LOCALSTORAGE
    setLocalStorage(storageName, data) {
        localStorage.setItem(storageName, JSON.stringify(data));
    }
}

const controllerMenuAjuda = new ControllerMenuAjuda(ajudaDados);
export default controllerMenuAjuda;