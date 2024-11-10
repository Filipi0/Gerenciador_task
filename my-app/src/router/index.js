import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/components/LoginPage.vue";
import GamePage from "@/components/GamePage.vue";

const routes = [
  { path: "/", component: GamePage },
  { path: "/login", component: LoginPage }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
