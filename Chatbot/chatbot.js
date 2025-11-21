const chatContainer = document.getElementById("chat-container");
const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const closeBtn = document.getElementById("chat-close");

// Fecha o chat
if (closeBtn) {
  closeBtn.onclick = () => {
    chatContainer.style.display = "none";
    if (window.parent !== window) {
      window.parent.postMessage({ action: "closeChatbotIframe" }, "*");
    }
  };
}

// Expande/recolhe tópicos de FAQ
document.querySelectorAll(".chat-faq-topic").forEach(btn => {
  btn.addEventListener("click", function () {
    const topic = btn.closest(".chat-topic");
    topic.classList.toggle("open");

    const icon = btn.querySelector(".chat-faq-arrow");
    if (topic.classList.contains("open")) {
      icon.classList.remove("fi-rr-caret-down");
      icon.classList.add("fi-rr-caret-up");
    } else {
      icon.classList.remove("fi-rr-caret-up");
      icon.classList.add("fi-rr-caret-down");
    }
  });
});

// Ativa botões de subtemas da FAQ
function bindFaqButtons() {
  document.querySelectorAll(".chat-faq-btn").forEach(btn => {
    btn.onclick = () => {
      chatInput.value = btn.textContent;
      chatForm.dispatchEvent(new Event("submit"));
    };
  });
}
bindFaqButtons();

// Função de normalização de texto
function normalize(txt) {
  return txt.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/gi, "")
            .toLowerCase();
}

// Mostra a mensagem no chat
function appendMessage(sender, text, cls) {
  const msg = document.createElement("div");
  msg.className = "chat-msg " + cls;
  msg.innerHTML = `<strong>${sender}:</strong> ${text}<br><span class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
  chatLog.appendChild(msg);
  chatLog.scrollTo({ top: chatLog.scrollHeight, behavior: "smooth" });
}

// Envia a mensagem
chatForm.onsubmit = function (e) {
  e.preventDefault();
  const pergunta = chatInput.value.trim();
  if (!pergunta) return;

  appendMessage("Você", pergunta, "user");
  appendMessage("Assistente", "<div class='chat-typing-indicator'><span></span><span></span><span></span></div>", "bot");

  setTimeout(() => {
    chatLog.lastChild.remove();
    const resposta = getResposta(pergunta);
    appendMessage("Assistente", resposta, "bot");
  }, 800);

  chatInput.value = "";
};

// Estrutura de respostas
const respostas = [
// PROVA DE VIDA
{
  contexto: "Prova de Vida",
  intent: "o_que_e",
  match: [
    "o que e", 
    "como funciona", 
    "explicação", 
    "definição"
  ],
  match: [
    "o que e prova de vida",
    "prova de vida o que e",
    "como funciona prova de vida",
    "explicacao prova de vida",
    "definicao prova de vida"
  ],
  resposta: "Procedimento obrigatório para aposentados e pensionistas confirmarem que estão vivos, conforme Lei nº 2.438/2011. Deve ser feito anualmente, no mês do aniversário, para garantir a continuidade do benefício."
},
{
  contexto: "Prova de Vida",
  intent: "como_fazer",
  match: [
    "como fazer prova de vida",
    "realizar prova de vida",
    "passo a passo prova de vida",
    "prova de vida presencial",
    "prova de vida app"
  ],
  resposta: `Você pode fazer a Prova de Vida pelo aplicativo AcrePrev ou presencialmente.

  • Pelo app: abra o AcrePrev, faça login, toque em “Prova de Vida”. Siga as instruções para reconhecimento facial com documento.
  • Presencial: vá à sede (Rua Benjamin Constant, 351, Cerâmica, Rio Branco‑AC) com documento oficial com foto e CPF.`
},
{
  contexto: "Prova de Vida",
  intent: "quando_fazer",
  match: [
    "quando devo fazer prova de vida",
    "data prova de vida",
    "prazo prova de vida",
    "quando devo realizar prova de vida",
    "prova de vida quando devo fazer",
    "prova de vida quando devo realizar",
    "prova de vida data",
    "prova de vida prazo"
  ],
  resposta: "No mês do seu aniversário. Se não fizer, ficará inadimplente no mês seguinte e poderá ter o benefício suspenso."
},
{
  contexto: "Prova de Vida",
  intent: "documentos",
  match: [
    "documentos prova de vida",
    "o que levar prova de vida",
    "quais documentos prova de vida",
    "documentos necessarios prova de vida",
    "prova de vida documentos necessarios",
    "prova de vida quais documentos",
    "prova de vida o que levar"
  ],
  resposta: "Documento oficial com foto (RG ou CNH) e CPF. No app, o CPF já vem vinculado; use CNH ou biometria cadastrada para reconhecimento."
},
{
  contexto: "Prova de Vida",
  intent: "fora_do_estado",
  match: [
    "prova de vida fora do acre",
    "prova de vida outro estado"
  ],
  resposta: "Sim, o app permite Prova de Vida de qualquer lugar do Brasil. Basta abrir o AcrePrev, fazer login e seguir os passos."
},
{
  contexto: "Prova de Vida",
  intent: "consequencia_nao_fazer",
  match: [
    "o que acontece se nao fizer prova de vida",
    "nao fizer prova de vida"
  ],
  resposta: "Seu benefício será bloqueado automaticamente a partir do 1º dia do mês seguinte ao vencimento da prova de vida. Para desbloquear, regularize o quanto antes."
},
{
  contexto: "Prova de Vida",
  intent: "isencao",
  match: [
    "quem e isento prova de vida",
    "isencao prova de vida"
  ],
  resposta: "Estão isentos: beneficiários menores de 18 anos, menores de idade pensionistas, maiores de 75 anos e portadores de doenças graves que impeçam locomoção. Consulte a Acreprevidência para confirmar."
},
{
  contexto: "Prova de Vida",
  intent: "custo",
  match: ["taxa prova de vida", "custo prova de vida"],
  resposta: "Gratuita. Não há custo, seja pelo app ou presencial."
},

// APOSENTADORIA
{
  contexto: "Aposentadoria",
  intent: "documentos",
  match: [
    "documentos para aposentadoria",
    "quais documentos",
    "documentos aposentadoria",
    "o que levar para aposentar",
    "documentos necessários aposentadoria",
    "quais documentos aposentadoria",
    "documentos exigidos aposentadoria"
  ],
  resposta: "RG, CPF, comprovante de residência e comprovantes de contribuição previdenciária."
},
{
  contexto: "Aposentadoria",
  intent: "tipos",
  match: ["tipos de aposentadoria", "modalidades aposentadoria"],
  resposta: `- Aposentadoria por Incapacidade
  - Aposentadoria por Idade
  - Aposentadoria por Tempo de Contribuição (Voluntária)
  - Aposentadoria Especial (Professores)`
},
{
  contexto: "Aposentadoria",
  intent: "direito",
  match: ["quem pode aposentar", "requisitos aposentadoria"],
  resposta: `- Por Incapacidade: incapacidade para o trabalho (exame pericial).
  - Compulsória: a partir de 75 anos (Art. 32, LCE 154/2005).
  - Voluntária: tempo mínimo (35 anos homens, 30 anos mulheres, transições).
  - Por Idade: idade mínima (60 mulheres, 65 homens).
  - Professores: 25 anos de magistério (Lei 11.301/2006).`
},
{
  contexto: "Aposentadoria",
  intent: "simular",
  match: ["simular aposentadoria", "calculo aposentadoria"],
  resposta: "Use o Simulador de Aposentadoria no Portal do Servidor ou no app AcrePrev: informe tempo de contribuição e último salário."
},
{
  contexto: "Aposentadoria",
  intent: "historico",
  match: ["beneficios concedidos", "historico aposentadoria"],
  resposta: "Veja o Histórico de Benefícios Concedidos no Portal do Servidor ou no app AcrePrev."
},
{
  contexto: "Aposentadoria",
  intent: "prazo",
  match: ["prazo analise aposentadoria", "tempo analise aposentadoria"],
  resposta: "Em média 30 dias úteis após protocolo completo, sujeito a variação conforme o caso."
},
{
  contexto: "Aposentadoria",
  intent: "custo",
  match: ["taxa aposentadoria", "custo aposentadoria"],
  resposta: "Gratuito. Todos os serviços (simulador, requerimento, análise) não têm custo."
},

// CÉDULA C
{
  contexto: "Cédula C",
  intent: "acesso",
  match: ["acessar cedula c", "onde encontro cedula c"],
  resposta: "Acesse a Cédula C pelo Portal do Servidor ou pelo app AcrePrev com CPF e senha gov.br."
},

// CONTRACHEQUE
{
  contexto: "Contracheque",
  intent: "ver",
  match: ["ver contracheque", "consultar contracheque"],
  resposta: "Disponível no Portal do Servidor ou no app AcrePrev com seu CPF e senha."
},

// SENHA E ERROS
{
  contexto: "Acesso e Senha",
  intent: "recuperar_senha",
  match: ["esqueci minha senha", "recuperar senha", "perdi minha senha"],
  resposta: `No app AcrePrev, toque em “Esqueceu sua senha?”, siga as instruções para redefinir.\nSe não encontrar, ligue (68) 3215-4309 ou envie WhatsApp para o mesmo número, ou mande e-mail para atendimento.acreprev@gmail.com.`
},
{
  contexto: "Erro de Acesso",
  intent: "erro_login",
  match: ["erro login", "nao consigo acessar", "como acessar portal"],
  resposta: `Tente pelo app AcrePrev ou pelo Portal do Servidor.\nSe persistir, entre em contato pelo telefone (68) 3215-4309, WhatsApp ou e-mail atendimento.acreprev@gmail.com.`
},

  // ATUALIZAÇÃO CADASTRAL
{
  contexto: "Cadastro",
  intent: "atualizar_dados",
  match: [
    "como atualizo meus dados",
    "alterar endereço",
    "atualizar telefone",
    "atualização cadastral"
  ],
  resposta: `Pelo app AcrePrev ou Portal do Servidor vá em “Meu Perfil” e edite seus dados (endereço, telefone e e-mail). Se precisar comprovar, envie selfie segurando comprovante de residência.`
},

// EXTRATO DE PAGAMENTO
{
  contexto: "Benefício",
  intent: "consultar_extrato",
  match: [
    "onde vejo extrato",
    "consultar extrato aposentadoria",
    "extrato pagamento",
    "comprovante de débito"
  ],
  resposta: `No app AcrePrev, toque em “Meus Benefícios” > selecione o benefício > “Extrato de Pagamento”. No Portal, acesse “Meus Benefícios” no menu lateral.`
},

// CERTIDÃO DE TEMPO DE CONTRIBUIÇÃO
{
  contexto: "Certidão",
  intent: "emitir_certidao_tempo_contribuicao",
  match: [
    "certidão tempo de contribuição",
    "emitir certidao",
    "tempo de contribuição certidão"
  ],
  resposta: `Acesse o Portal do Servidor > “Serviços” > “Certidão de Tempo de Contribuição”. Preencha os dados solicitados e baixe o PDF imediatamente.`
},

// PENSÃO POR MORTE
{
  contexto: "Pensão",
  intent: "como_solicitar_pensao",
  match: [
    "como solicitar pensão",
    "pensão por morte",
    "requerer pensão",
    "documentos pensão"
  ],
  resposta: `Envie requerimento pelo app ou Portal em “Meus Serviços” > “Pensão por Morte”. Anexe certidão de óbito, RG, CPF do falecido e documentos do dependente.`
},

// EMPRÉSTIMO CONSIGNADO
{
  contexto: "Consignado",
  intent: "emprestimo_consignado",
  match: [
    "consignado",
    "como faço empréstimo",
    "empréstimo para aposentados",
    "taxa consignado"
  ],
  resposta: `Pelo Portal do Servidor, em “Meus Serviços” > “Empréstimo Consignado”, simule e gere a ficha de solicitação. Compare as taxas antes de confirmar.`
},

// CHIP PARA PRÉ-CADASTRO biometria (se houver)
{
  contexto: "Biometria",
  intent: "cadastro_biometrico",
  match: [
    "biometria",
    "cadastro biométrico",
    "como faço biometria",
    "reconhecimento facial erro"
  ],
  resposta: `No app AcrePrev o reconhecimento facial já faz parte da Prova de Vida. Se der erro, verifique ambiente iluminado e ângulo da câmera.`
},

// CERTIDÃO DE NÃO RECEBIMENTO
{
  contexto: "Declaração",
  intent: "certidao_nao_recebimento",
  match: [
    "declaração de não recebimento",
    "não recebi benefício",
    "comprovante não recebi"
  ],
  resposta: `Solicite no Portal do Servidor: “Serviços” > “Declaração de Não Recebimento de Benefício”. Baixe o PDF para apresentar onde precisar.`
},

// SEGUNDA VIA DE COMPROVANTE DE RENDIMENTOS
{
  contexto: "Rendimentos",
  intent: "segunda_via_rendimentos",
  match: [
    "comprovante de rendimentos",
    "segunda via rendimentos",
    "declaração irpf",
    "rendimentos 2024"
  ],
  resposta: `Em “Meus Benefícios” > “Comprovante de Rendimentos” selecione o ano desejado e baixe o arquivo para declarar no IR.`
},

// DAP – DETALHAMENTO
{
  contexto: "DAP",
  intent: "prazo_dap",
  match: [
    "validade dap",
    "prazo dap",
    "quando expira dap",
    "renovar dap"
  ],
  resposta: `A DAP tem validade anual. Para renovar, acesse “Serviços” > “DAP” no Portal e gere nova via informando CNPJ e período de apuração.`
},
{
  contexto: "DAP",
  intent: "emitir_dap",
  match: ["dap", "declaração de arrecadação previdenciária", "onde acessar dap"],
  resposta: "DAP é emitida no site da Acreprevidência com CNPJ e período. Você pode imprimir o boleto."
},

// ATENDIMENTO FÍSICO E REMOTO
{
  contexto: "Atendimento",
  intent: "horario_atendimento",
  match: [
    "horário atendimento",
    "telefone atendimento",
    "whatsapp acreprev",
    "como falar com atendimento"
  ],
  resposta: `Atendimento remoto: Segunda a sexta, 8h–12h e 14h–18h pelo (68) 3215-4309 ou WhatsApp no mesmo número. E-mail: atendimento.acreprev@gmail.com.`
},
];

// Função de similaridade para encontrar resposta
function getResposta(pergunta) {
  const txt = normalize(pergunta);
  let melhor = null;
  let scoreMax = 0;

  respostas.forEach(item => {
    let melhorMatchScore = 0;
    item.match.forEach(frase => {
      const score = stringSimilarity.compareTwoStrings(txt, normalize(frase));
      if (score > melhorMatchScore) melhorMatchScore = score;
    });

    const contextoScore = stringSimilarity.compareTwoStrings(txt, normalize(item.contexto));
    const scoreFinal = melhorMatchScore * 0.8 + contextoScore * 0.2;

    if (scoreFinal > scoreMax) {
      scoreMax = scoreFinal;
      melhor = item;
    }
  });

  if (scoreMax > 0.4) return melhor.resposta;

  return `Desculpe, não encontrei essa informação. Você pode ligar para (68) 3215‑4309 ou falar pelo <a href="https://api.whatsapp.com/send?phone=556832154309" target="_blank">WhatsApp</a>.`;
}