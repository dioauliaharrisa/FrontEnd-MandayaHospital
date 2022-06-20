<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <div>
    <NavigationBar />
    <div class="h-1/2">
      <div class="p-2 my-2 text-center text-3xl">
        {{ pokemonData.name }}
      </div>
      <div class="flex">
        <div class="m-auto">
          <img
            @click="handleGoToPreviousPokemon"
            class="m-auto bg-slate-300 rounded-xl max-h-10 grow-0"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${previousPokemonID}.svg`"
            alt=""
          />
          <div class="text-xs">Previous Pokemon</div>
        </div>
        <div>
          <img
            class="m-2 bg-slate-200 rounded-xl max-h-40 grow"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`"
            alt=""
          />
        </div>
        <div class="m-auto">
          <img
            @click="handleGoToNextPokemon"
            class="m-auto bg-slate-300 rounded-xl max-h-10 grow-0"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${nextPokemonID}.svg`"
            alt=""
          />
          <div class="text-xs">Next Pokemon</div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-slate-200 grid grid-cols-4 gap-1 p-2 my-2 rounded-xl break-words"
  >
    <div class="font-bold">Capture rate:</div>
    <div>{{ pokemonData.capture_rate }}</div>
    <div class="font-bold">Base Happiness:</div>
    <div>{{ pokemonData.base_happiness }}</div>
    <div class="font-bold">Generation:</div>
    <div class="break-words">{{ pokemonData?.generation?.name }}</div>
    <div class="font-bold">Growth rate:</div>
    <div>{{ pokemonData?.growth_rate?.name }}</div>
  </div>

  <div class="bg-slate-200 p-2 my-2 rounded-xl">
    {{ pokemonData?.flavor_text_entries?.[1]?.flavor_text }}
  </div>
  <div class="bg-slate-200 p-2 my-2 rounded-xl">
    {{ pokemonData?.flavor_text_entries?.[2]?.flavor_text }}
  </div>
  <div class="bg-slate-200 p-2 my-2 rounded-xl">
    {{ pokemonData?.flavor_text_entries?.[3]?.flavor_text }}
  </div>
  <div class="bg-slate-200 p-2 my-2 rounded-xl">
    {{ pokemonData?.flavor_text_entries?.[4]?.flavor_text }}
  </div>
</template>

<script>
import axios from "axios";
import { useDataStore } from "@/stores/data";
export default {
  data() {
    return {
      pokemonData: [],
      pokemonID: this.$route.params.id,
      previousPokemonID: parseInt(this.$route.params.id) - 1,
      nextPokemonID: parseInt(this.$route.params.id) + 1,
      pokemonEvolutionChain: null,
    };
  },
  methods: {
    handleGoToPreviousPokemon() {
      this.$router.push("/").then(() => {
        this.$router.push({
          name: "DetailView",
          params: { id: parseInt(this.pokemonID) - 1 },
        });
      });
    },
    handleGoToNextPokemon() {
      this.$router.push("/").then(() => {
        this.$router.push({
          name: "DetailView",
          params: { id: parseInt(this.pokemonID) + 1 },
        });
      });
    },
  },
  async created() {
    const { data } = await axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon-species/${this.pokemonID}/`,
    });
    const store = useDataStore();
    store.pokemonColor = data.color.name;
    this.pokemonData = data;
  },
  computed: {
    previousPokemonEvolution() {
      if (this.pokemonEvolutionChain) {
        return this.pokemonEvolutionChain;
      }
    },
    nextPokemonEvolution() {
      if (this.pokemonEvolutionChain) {
        return this.pokemonEvolutionChain;
      }
    },
  },
};
</script>
