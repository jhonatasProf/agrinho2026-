let producao = 50;
let sustentabilidade = 50;
let rodadaAtual = 0;

const perguntas = [
  {
    texto: "Uma praga surgiu na lavoura de soja. Qual estratégia adotar?",
    opcaoA: { texto: "Usar pesticida químico forte (Rápido, mas afeta o solo)", prod: 20, sust: -20 },
    opcaoB: { texto: "Implementar o Manejo Integrado de Pragas (Biológico)", prod: 10, sust: 15 }
  },
  {
    texto: "O período de seca começou. Como gerenciar a água da propriedade?",
    opcaoA: { texto: "Manter a irrigação tradicional por aspersão nos horários comuns", prod: 10, sust: -15 },
    opcaoB: { texto: "Instalar gotejamento automatizado com sensores de umidade", prod: 15, sust: 15 }
  },
  {
    texto: "Você precisa expandir os lucros da fazenda. Qual o plano?",
    opcaoA: { texto: "Desmatar uma pequena área de reserva legal para plantar mais", prod: 25, sust: -30 },
    opcaoB: { texto: "Adotar a Integração Lavoura-Pecuária-Floresta (ILPF) na área atual", prod: 15, sust: 20 }
  }
];

function atualizarInterface() {
  // Atualiza as barras visualmente e os textos de porcentagem
  document.getElementById('bar-prod').style.width = `${producao}%`;
  document.getElementById('val-prod').innerText = producao;

  document.getElementById('bar-sust').style.width = `${sustentabilidade}%`;
  document.getElementById('val-sust').innerText = sustentabilidade;

  // Verifica se o jogo acabou por zerar alguma barra
  if (producao <= 0) {
    finalizarJogo("Game Over: Sua fazenda faliu por falta de produção econômica!");
    return;
  }
  if (sustentabilidade <= 0) {
    finalizarJogo("Game Over: Um desastre ambiental destruiu os recursos da sua fazenda!");
    return;
  }

  // Verifica se as rodadas acabaram
  if (rodadaAtual >= perguntas.length) {
    if (producao >= 60 && sustentabilidade >= 60) {
      finalizarJogo("Parabéns! Você alcançou o equilíbrio perfeito. Agro forte e futuro sustentável!");
    } else {
      finalizarJogo("Fim de jogo! Você sobreviveu, mas sua fazenda não conseguiu o equilíbrio ideal.");
    }
    return;
  }

  // Atualiza os textos da rodada atual
  const perguntaAtual = perguntas[rodadaAtual];
  document.getElementById('pergunta-texto').innerText = perguntaAtual.texto;
  document.getElementById('btn-a').innerText = perguntaAtual.opcaoA.texto;
  document.getElementById('btn-b').innerText = perguntaAtual.opcaoB.texto;
}

function fazerEscolha(opcao) {
  const pergunta = perguntas[rodadaAtual];
  
  if (opcao === 'A') {
    producao += pergunta.opcaoA.prod;
    sustentabilidade += pergunta.opcaoA.sust;
  } else {
    producao += pergunta.opcaoB.prod;
    sustentabilidade += pergunta.opcaoB.sust;
  }

  // Limita os valores entre 0 e 100
  producao = Math.max(0, Math.min(100, producao));
  sustentabilidade = Math.max(0, Math.min(100, sustentabilidade));

  rodadaAtual++;
  atualizarInterface();
}

function finalizarJogo(mensagem) {
  // Esconde o painel de perguntas e mostra a tela final
  document.getElementById('game-card').classList.add('hidden');
  document.getElementById('screen-end').classList.remove('hidden');
  document.getElementById('end-text').innerText = mensagem;
}

function reiniciarJogo() {
  producao = 50;
  sustentabilidade = 50;
  rodadaAtual = 0;
  document.getElementById('game-card').classList.remove('hidden');
  document.getElementById('screen-end').classList.add('hidden');
  atualizarInterface();
}

// Inicializa o jogo ao carregar a página
window.onload = atualizarInterface;
