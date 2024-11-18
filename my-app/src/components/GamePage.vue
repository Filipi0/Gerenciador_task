<template>
  <div class="game-container">
    <h1>ADIVINHE O NÚMERO</h1>
    <p>Digite um número entre 1 e 100</p>

    <div class="input-container">
      <input type="text" v-model="guess" placeholder="Seu chute" />
      <button @click="makeGuess">Chutar</button>
    </div>

    <div v-if="feedback" class="feedback">{{ feedback }}</div>
    <div v-if="score !== null" class="score">Pontuação atual: {{ score }}</div>

    <div class="ranking-container">
      <h2>Ranking de Pontuações</h2>
      <ul>
        <li v-for="(player, index) in ranking" :key="index">
          {{ index + 1 }}º - {{ player.nome }}: {{ player.pontuacao }} pontos
        </li>
      </ul>
    </div>

    <button @click="startNewGame">Novo Jogo</button>

    <!-- Modal de Parabéns -->
    <div v-if="showCongrats" class="modal">
      <div class="modal-content">
        <h2>🎉 Parabéns, {{ playerName || "Jogador" }}! 🎉</h2>
        <p>Você acertou o número secreto!</p>
        <div v-if="ranking.length < 3 || ranking[2].pontuacao < score">
          <input 
            type="text" 
            v-model="playerName" 
            placeholder="Seu nome" 
          />
          <button @click="saveScore">Salvar Pontuação</button>
        </div>
        <div v-else>
          <p>O ranking já está cheio! Tente superar a pontuação mínima.</p>
        </div>
        <button @click="closeCongrats">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti";

export default {
  name: "GamePage",
  data() {
    return {
      numeroSecreto: null,
      guess: "",
      playerName: "",
      feedback: "",
      score: 100,
      winner: false,
      ranking: [],
      showCongrats: false, // Controla a exibição do modal
    };
  },
  created() {
    this.startNewGame();
    this.loadRanking();
  },
  methods: {
    startNewGame() {
      this.numeroSecreto = Math.floor(Math.random() * 100) + 1;
      this.guess = "";
      this.playerName = "";
      this.feedback = "";
      this.score = 100;
      this.winner = false;
      this.showCongrats = false;
    },
    makeGuess() {
      const guessNumber = parseInt(this.guess);
      if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
        this.feedback = "Por favor, insira um número entre 1 e 100.";
        return;
      }
      if (guessNumber === this.numeroSecreto) {
        this.feedback = `Parabéns! Você acertou em ${10 - this.score / 10} tentativas.`;
        this.winner = true;
        this.showCongrats = true; // Mostra o modal de parabéns
        this.launchConfetti(); // Chama os fogos
      } else {
        this.feedback = guessNumber > this.numeroSecreto ? "Seu chute foi maior!" : "Seu chute foi menor!";
        this.score -= 10;
      }
      this.guess = "";
    },
    saveScore() {
      if (!this.playerName) {
        alert("Por favor, insira seu nome para salvar a pontuação.");
        return;
      }
      const playerScore = { nome: this.playerName, pontuacao: this.score };

      // Atualiza o ranking com limite de 3 jogadores
      this.ranking.push(playerScore);
      this.ranking.sort((a, b) => b.pontuacao - a.pontuacao); // Ordena pelo maior score

      localStorage.setItem("ranking", JSON.stringify(this.ranking));
      this.loadRanking();
      this.startNewGame();
    },
    loadRanking() {
      const savedRanking = localStorage.getItem("ranking");
      this.ranking = savedRanking ? JSON.parse(savedRanking).slice(0, 3) : [];
    },
    closeCongrats() {
      this.showCongrats = false; // Fecha o modal
    },
    launchConfetti() {
      // Fogos de artifício
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
  },
};
</script>

<style scoped>
/* Reseta margens e paddings padrões */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  background: #2f2841;
  overflow: hidden;
}

/* Faz o container ocupar toda a tela */
.game-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2f2841;
}

h1, h2 {
  color: #77ffc0;
  margin-bottom: 20px;
}

p {
  color: #f0ffff94;
}

.input-container, .feedback, .score, .ranking-container {
  margin-top: 15px;
  text-align: center;
}

input[type="text"] {
  width: 75%;
  padding: 15px;
  border: none;
  border-radius: 16px;
  background: #6c6288;
  color: #ffffff;
  box-shadow: 0px 10px 40px #00000056;
  outline: none;
}

button {
  padding: 14px 20px;
  border: none;
  border-radius: 16px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 7px;
  color: #2b1346;
  background: #00ff88;
  cursor: pointer;
  box-shadow: 0px 10px 40px -12px #00ff8052;
  margin-top: 20px;
}

button:hover {
  background: #77ffc0;
}

.feedback {
  font-size: 1.2em;
  color: #00ff88;
  font-weight: bold;
  text-align: center;
}

.score {
  font-size: 1.1em;
  color: #f0ffff94;
  text-align: center;
}

.ranking-container {
  margin-top: 30px;
  text-align: center;
}

.ranking-container ul {
  list-style: none;
  padding: 0;
}

.ranking-container li {
  background: #6c6288;
  padding: 10px;
  margin: 8px 0;
  border-radius: 16px;
  color: #f0ffffde;
}

/* Modal de parabéns */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #f0ffffde;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-content input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.modal-content h2 {
  font-size: 2em;
  color: #2f2841;
  margin-bottom: 15px;
}

.modal-content p {
  font-size: 1.2em;
  color: #2f2841;
}

.modal-content button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #00ff88;
  color: #2f2841;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #77ffc0;
}
</style>
