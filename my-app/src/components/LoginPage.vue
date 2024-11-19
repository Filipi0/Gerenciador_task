<template>
  <div class="main-screen">
    <div class="content-container">
      <h1 class="game-title">Adivinhe o Número</h1>
      <p class="game-description">
        Bem-vindo! Aqui estão as regras do jogo:
      </p>
      <ul class="game-rules">
        <li>1. Você deve adivinhar um número entre <strong>1 e 100</strong>.</li>
        <li>2. A cada tentativa errada, você perde <strong>10 pontos</strong>.</li>
        <li>3. O objetivo é adivinhar o número com a maior pontuação possível!</li>
      </ul>
      <button class="btn-enter" @click="goToGame">Entrar no Jogo</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
  methods: {
    goToGame() {
      // Redireciona para a página do jogo
      this.$router.push("/GamePage");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html, body {
  height: 100%;
  width: 100%;
  background: #2f2841;
  font-family: Arial, sans-serif;
  overflow: hidden; /* Remove rolagem */
}

.main-screen {
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

.content-container {
  text-align: center;
  color: #ffffff;
  padding: 50px;
}

.game-title {
  font-size: 5rem;
  font-weight: bold;
  color: #00ff88;
  margin-bottom: 50px;
  margin-top: -50px;
}

.game-description {
  font-size: 1.2rem;
  font-weight: bold;
  color: #77ffc0;
  margin-bottom: 30px;
}

.game-rules {
  text-align: left;
  margin: 0 auto 30px auto;
  padding: 0;
  list-style-type: none;
  color: #f0ffffde;
  transform: translate(120px);
}

.game-rules li {
  margin: 10px 0;
  font-size: 1rem;
}

.game-rules strong {
  color: #00ff88;
}

.btn-enter {
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2b1346;
  background: #00ff88;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 10px 40px rgba(0, 255, 136, 0.6);
  transition: all 0.5s ease-in-out;
  margin-top: 50px;
}

.btn-enter:hover {
  background: #77ffc0;
  box-shadow: 0px 10px 50px rgba(119, 255, 192, 0.8);
  transform: scale(1.05);
}
</style>
