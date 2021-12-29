const ajudaDados = [
    {
        id: "1011",
        idTitle: "gp-error#1011",
        title: "Usuario não encontrado ou inválido",
        desc: "Os nomes de usuários devem ser compostos por letras e números, sem espaços ou caracteres especiais.",
        idBusca: function () {
            return this.idTitle + " " + this.title + " " + this.desc;
        },
        msg: "Caso o usuário não esteja cadastrado, cadastre-se",
    },
    {
        id: "1022",
        idTitle: "gp-error#1022",
        title: "Senha inválida",
        desc: "A senha deve conter no mínimo 6 caracteres, no mínimo uma letra maiúscula e uma minúscula e não deve possuir caracteres especiais.",
        idBusca: function () {
            return this.idTitle + " " + this.title + " " + this.desc;
        },
        msg: "Caso o erro permaneça, redefina sua senha aqui",
    },
    {
        id: "1033",
        idTitle: "gp-error#1033",
        title: "Campo Vazio",
        desc: "Seu usuário ou sua senha estão vazios",
        idBusca: function () {
            return this.idTitle + " " + this.title + " " + this.desc;
        },
        msg: "O campo de usuário e senha precisam estar preenchidos",
    },
];

export default ajudaDados;