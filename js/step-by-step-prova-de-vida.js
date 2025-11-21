let steps = document.querySelector("#steps");
let wizards = [
    {
        complete: false,
        number: 1,
        title: "Primeiro passo:",
        text:
            "Tenha em mãos seu documento válido (CNH ou RG);"
    },
    {
        complete: false,
        number: 2,
        title: "Segundo passo:",
        text:
            "Realize o download do aplicativo ACREPREV na loja de aplicativos referente ao seu dispositivo;"
    },
    {
        complete: false,
        number: 3,
        title: "Terceiro passo:",
        text:
            "Efetue o cadastro no aplicativo, caso não possua conta cadastrada em nosso site;"
    },
    {
        complete: false,
        number: 4,
        title: "Quarto passo:",
        text:
            "Faça login com sua conta e realize o passo a passo, demonstrado no vídeo tutorial;"
    },
    {
        complete: false,
        number: 5,
        title: "Quinto passo:",
        text:
            "Aguarde a validação da sua Prova de Vida pelos servidores do Acreprevidência. Fique atento, você receberá um SMS no seu celular;"
    },
    {
        complete: false,
        number: 6,
        title: "Sexto passo:",
        text:
            "Caso sua prova de vida seja recusada, realizar novamente pelo aplicativo."
    },
];

let tickIcon = `<svg viewBox="0 0 512 512" width="100" title="check">
        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />`;

steps.innerHTML = wizards
    .map(function (wizard) {
        return (
            `<div class='step'>` +
            `<div class='number ${wizard.complete && 'completed'}'>` +
            (wizard.complete ? tickIcon : wizard.number) +
            `</div>` +
            `<div class='info'>` +
            `<p class='title'>${wizard.title}</p>` +
            `<p class='text'>${wizard.text}</p>` +
            "</div>" +
            "</div>"
        );
    })
    .join("");
