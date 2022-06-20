import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";
import MyPokemonsView from "../views/MyPokemonsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/detail/:id",
      name: "DetailView",
      component: DetailView,
    },
    {
      path: "/myPokemons",
      name: "MyPokemonsView",
      component: MyPokemonsView,
    },
  ],
});

export default router;
