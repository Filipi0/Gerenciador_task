<!-- src/components/Login.vue -->
<template>
  <div class="login">
    <h2>Login</h2>
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
      
      <button @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Lógica de autenticação aqui
      console.log('Usuário:', this.username);
      console.log('Senha:', this.password);
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

label {
  display: block;
  margin: 0.5rem 0 0.25rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
