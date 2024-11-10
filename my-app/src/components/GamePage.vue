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
body {
  background-color: #201b2c;
  color: #f0ffffde;
  font-family: "Anta", sans-serif;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.game-container {
  text-align: center;
  width: 90%;
  max-width: 600px; 
  margin: auto;
  padding: 40px; 
  background: #2f2841;
  border-radius: 15px;
  box-shadow: 0px 10px 40px #00000056;
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
}

input[type="text"] {
  width: 75%;
  padding: 15px; 
  border: none;
  border-radius: 8px;
  background: #6c6288;
  color: #f0ffffde;
  box-shadow: 0px 10px 40px #00000056;
  outline: none;
}

button {
  padding: 14px 20px; 
  border: none;
  border-radius: 8px;
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
}

.score {
  font-size: 1.1em;
  color: #f0ffff94;
}

.ranking-container {
  margin-top: 30px;
}

.ranking-container ul {
  list-style: none;
  padding: 0;
}

.ranking-container li {
  background: #6c6288;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  color: #f0ffffde;
}
</style>
