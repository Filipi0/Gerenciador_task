<template>
  <div class="game-container">
    <h1>Jogo de Adivinhação</h1>
    <p>Digite um número entre 1 e 100</p>

    <div class="input-container">
      <input type="text" v-model="guess" placeholder="Seu chute" />
      <button @click="makeGuess">Chutar</button>
    </div>

    <div v-if="feedback" class="feedback">{{ feedback }}</div>
    <div v-if="score !== null" class="score">Pontuação atual: {{ score }}</div>

    <div v-if="winner">
      <p>Parabéns, {{ playerName || "Jogador" }}! Você acertou!</p>
      <input type="text" v-model="playerName" placeholder="Seu nome" />
      <button @click="saveScore">Salvar Pontuação</button>
    </div>

    <div class="ranking-container">
      <h2>Ranking de Pontuações</h2>
      <ul>
        <li v-for="(player, index) in ranking" :key="index">
          {{ index + 1 }}º - {{ player.nome }}: {{ player.pontuacao }} pontos
        </li>
      </ul>
    </div>

    <button @click="startNewGame">Novo Jogo</button>
  </div>
</template>

<script>
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
      ranking: []
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
      this.ranking.push(playerScore);
      this.ranking.sort((a, b) => b.pontuacao - a.pontuacao);
      localStorage.setItem("ranking", JSON.stringify(this.ranking));
      this.loadRanking();
      this.startNewGame();
    },
    loadRanking() {
      const savedRanking = localStorage.getItem("ranking");
      this.ranking = savedRanking ? JSON.parse(savedRanking).slice(0, 5) : [];
    }
  }
};
</script>

<style scoped>
.game-container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}

.input-container {
  margin: 20px 0;
}

.feedback, .score, .ranking-container {
  margin-top: 10px;
}

button {
  margin-top: 15px;
  padding: 10px;
}
</style>
