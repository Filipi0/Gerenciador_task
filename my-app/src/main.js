// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importa o router

createApp(App)
  .use(router) // Usa o router no app
  .mount("#app");
