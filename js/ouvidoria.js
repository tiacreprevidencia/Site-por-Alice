document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll('.rating i');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            document.getElementById('selectedRating').value = rating;
            // Atualiza a cor das estrelas selecionadas
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.classList.add('text-warning');
                } else {
                    s.classList.remove('text-warning');
                }
            });
        });
    });
});

$(document).ready(function() {

    // Função para gerar números aleatórios para o CAPTCHA
    function generateCaptcha() {
        var num1 = Math.floor(Math.random() * 10);
        var num2 = Math.floor(Math.random() * 10);
        $('#captchaQuestion').text(`Quanto é ${num1} + ${num2}?`);
        return num1 + num2;
    }

    // Armazene a resposta correta
    var correctAnswer = generateCaptcha();


    $('#ouvidoriaForm').on('submit', function(e) {
        e.preventDefault(); // Impede o envio tradicional do formulário

        // Verificar o CAPTCHA
        var userAnswer = parseInt($('#captchaInput').val().trim());
        if (userAnswer !== correctAnswer) {
            $('#resultado').html('<div class="alert alert-danger" role="alert">Resposta do CAPTCHA incorreta. Tente novamente.</div>');
            // Gerar um novo CAPTCHA após a falha
            correctAnswer = generateCaptcha();
            return;
        }

        var nome = $('#nome').val().trim();
        var emailEmissor = $('#emailEmissor').val().trim();
        var mensagem = $('#mensagem').val().trim();
        var tipoMensagem = $('#tipoMensagem').val().trim();

        $.ajax({
            url: 'https://www.acreprevidencia.ac.gov.br/microServices/api/ouvidoria',  // URL DA API
            type: 'GET', // Tipo de Requisição 
            data: {
                nome: nome,
                emailEmissor: emailEmissor,
                mensagem: mensagem,
                tipoMensagem: tipoMensagem
            },
            success: function(response) {
                $('#resultado').html('<div class="alert alert-success" role="alert">' + response + '</div>');
                // Limpar os campos do formulário após o envio bem-sucedido
                $('#ouvidoriaForm')[0].reset();
            },
            error: function(xhr, status, error) {
                var erroMsg;
                if (xhr.status === 403) {
                    erroMsg = "Acesso negado! Formulário disponível apenas pelo site do Acreprevidencia!";
                } else if (xhr.status === 400) {
                    erroMsg = xhr.responseJSON || "Dados inválidos fornecidos. Por favor, verifique e tente novamente.";
                } else {
                    erroMsg = "Ocorreu um erro desconhecido! Status: " + xhr.status;
                }
                $('#resultado').html('<div class="alert alert-danger" role="alert">' + erroMsg + '</div>');
            }
        });
    });
});
