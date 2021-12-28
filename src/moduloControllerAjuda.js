import ajudaDados from "./moduloAjudaDados.js";

class ControllerMenuAjuda {
    constructor(ajudaDados) {
        this.ajudaDados = ajudaDados;
    }
    // Constrói o submenu de ajuda.
    get construirSubMenuAjuda() {
        const subMenuBody = document.querySelector("#subMenuAjuda");
        subMenuBody.innerHTML = `<ul>`;
        ajudaDados.forEach((element, index) => {
            subMenuBody.innerHTML += `
            <li 
                class="btn list-group-item list-group-item-action"
                value="10${index + 1}" data-bs-dismiss="offcanvas">
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
        const dadosErro = ajudaDados.find(
            (element) => element.id.toString() === value.toString()
        );

        const modalTitle = document.getElementById("titleModal");
        modalTitle.innerHTML = `${dadosErro.idTitle}`;
        const modalBody = document.getElementById("bodyModal");
        modalBody.innerHTML = `<p>${dadosErro.desc}</p><p>${dadosErro.msg}</p>`;

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
        <button id="btnModalSave" type="button" class="btn btn-primary" data-bs-dismiss="modal">Salvar e Fechar</button>
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
                    placeholder="Busque pelo erro desejado...">
            <ul id="listaDeErros">`;
            // filtro de lista de erros
            this.buscarErro();
            // lista de erros
            /* ajudaDados.forEach((element, index) => {
                modalBody.innerHTML += `
                <li
                class="btn list-group-item list-group-item-action"
                value="10${index + 1}">
                ${element.idTitle}
                </li>`;
            });
            modalBody.innerHTML += `</ul>`; */

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
    }

    //todo: criar um método para chamar o modal geral.
    montarModalGeral() {
        console.log("montarModalGeral");
    }

    buscarErro() {
        const inputBusca = document.getElementById("buscaErro");
        const modalBody = document.getElementById("bodyModal");
        ajudaDados.forEach((element, index) => {
            modalBody.innerHTML += `
                <li
                class="btn list-group-item list-group-item-action"
                value="10${index + 1}">
                ${element.idTitle}
                </li>`;
        });
        modalBody.innerHTML += `</ul>`;
        const ul = document.getElementById("listaDeErros");
        document
            .querySelector("#buscaErro")
            .addEventListener("keydown", (e) => {
                console.log(inputBusca.value);
                if (inputBusca.value !== "" || inputBusca.value.length + 1 >= 2) {
                    const novaLista = ajudaDados.filter((item) => {
                        return item
                            .toLocaleLowerCase()
                            .includes(inputBusca.value.toLocaleLowerCase());
                    });
                    ul.innerHTML = ``;
                    novaLista.forEach((item) => {
                        ul.innerHTML += `<li>${item}</li>`;
                    });
                    // modalBody.innerHTML += `</ul>`;
                } else {
                    ul.innerHTML = ``;
                    ajudaDados.forEach((item) => {
                        ul.innerHTML += `<li>${item}</li>`;
                    });
                    // modalBody.innerHTML += `</ul>`;
                }
            });
    }
}

const controllerMenuAjuda = new ControllerMenuAjuda(ajudaDados);
export default controllerMenuAjuda;
