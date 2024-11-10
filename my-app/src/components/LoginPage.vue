<template>
  <div class="main-login">
    <div class="left-login">
      <h1>Seja Bem-Vindo !<br>Faça seu login agora mesmo!</h1>
      <img src="@/assets/img-login.svg" class="left-login-image" alt="Imagem de Login" />
    </div>
    <div class="right-login">
      <div class="card-login">
        <h1>LOGIN</h1>
        <div class="textfield">
          <label for="usuario">Usuário</label>
          <input type="text" id="usuario" v-model="username" placeholder="Usuário" />
        </div>
        <div class="textfield">
          <label for="senha">Senha</label>
          <input type="password" id="senha" v-model="password" placeholder="Senha" />
        </div>
        <button class="btn-login" @click="login">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async login() {
      try {
        // Carrega o arquivo JSON com as credenciais
        const response = await fetch("/users.json");
        const users = await response.json();

        const user = users.find(user => user.username === this.username && user.password === this.password);

        if (user) {
          this.errorMessage = "";
          this.$router.push("/GamePage"); 
        } else {
          // Exibe uma mensagem de erro se as credenciais forem incorretas
          this.errorMessage = "Usuário ou senha incorretos";
        }
      } catch (error) {
        console.error("Erro ao carregar as credenciais:", error);
        this.errorMessage = "Erro ao fazer login. Tente novamente.";
      }
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Anta", sans-serif;
  font-weight: 400;
}

.main-login {
  width: 100vw;
  height: 100vh;
  background: #201b2c;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-login {
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.left-login>h1 {
  font-size: 3vw;
  color: #77ffc0;
}

.left-login-image {
  width: 35vw;
}

.right-login {
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-login {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 35px;
  background: #2f2841;
  border-radius: 20px;
  box-shadow: 0px 10px 40px #00000056;
}

.card-login>h1 {
  color: #00ff88;
  font-weight: 800;
  margin: 0;
}

.textfield {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0;
}

.textfield>input {
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 15px;
  background: #6c6288;
  color: #f0ffffde;
  font-size: 12pt;
  box-shadow: 0px 10px 40px #00000056;
  outline: none;
  box-sizing: border-box;
}

.textfield>label {
  color: #f0ffffde;
  margin-bottom: 10px;
}

.textfield>input::placeholder {
  color: #f0ffff94;
}

.btn-login {
  width: 100%;
  padding: 16px 0px;
  margin: 25px;
  border: none;
  border-radius: 8px;
  outline: none;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 3px;
  color: #2b1346;
  background: #00ff88;
  cursor: pointer;
  box-shadow: 0px 10px 40px -12px #00ff8052;
}

@media only screen and (max-width: 950px) {
  .card-login {
    width: 85%;
  }
}

@media only screen and (max-width: 600px) {
  .main-login {
    flex-direction: column;
  }

  .left-login>h1 {
    display: none;
  }

  .left-login {
    width: 100%;
    height: auto;
  }

  .right-login {
    width: 100%;
    height: auto;
  }
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
