import axios from "axios";
import { defineStore } from "pinia";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    data: [],
    detailedPokemonDataByIndex: [],
    myCaughtPokemons: [],
    pokemonColor: null,
  }),
  getters: {
    pokemonBGColor(state) {
      if (!state.pokemonColor) {
        return "bg-red-200 p-2 my-2 rounded-xl";
      }
      return `bg-${state.pokemonColor}-200 p-2 my-2 rounded-xl`;
    },
  },
  actions: {
    async fetchDetailedPokemonDataByIndex(index) {
      try {
        await axios({
          method: "get",
          url: `https://pokeapi.co/api/v2/pokemon-species/${index + 1}/`,
        }).then((x) => {
          this.detailedPokemonDataByIndex = x;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
