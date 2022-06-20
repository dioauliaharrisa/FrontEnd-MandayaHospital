<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <div class="w-full h-full">
    <NavigationBar />
    <div
      class="grid sm:grid-cols-2 justify-items-center md:grid-cols-3 gap-4 justify-items-center lg:grid-cols-4 justify-items-center"
    >
      <Card
        v-for="(item, index) in fetchedData"
        @handleToDetailPage="handleToDetailPage"
        @handleCatch="handleCatch"
        :key="index"
        :index="index"
        :pictureID="index"
        :details="item"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useDataStore } from "@/stores/data";
import Card from "@/components/Card.vue";

export default {
  data() {
    return {
      offset: 0,
      limit: 20,
    };
  },
  components: { Card },
  methods: {
    getNextUser() {
      window.onscroll = async () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.limit += 20;
          const { data } = await axios({
            method: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/?offset=${this.offset}&limit=${this.limit}`,
          });
          const store = useDataStore();
          store.data = data.results;
        }
      };
    },
    handleToDetailPage(id) {
      this.$router.push(`/detail/${id}`);
    },
    async handleCatch(index) {
      try {
        //generate random number
        const myAbilityToCatch = Math.floor(Math.random() * 300) + 1;

        const store = useDataStore();
        await store.fetchDetailedPokemonDataByIndex(index);

        const specificPokemonCaptureRate =
          store.detailedPokemonDataByIndex.data.capture_rate;

        if (myAbilityToCatch >= specificPokemonCaptureRate) {
          let data = store.detailedPokemonDataByIndex.data;
          data.imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index}.svg`;
          data.id = index;
          store.myCaughtPokemons.push(data);
          this.$toast.show(`Ketangkep`);
          console.log(store.myCaughtPokemons);
        }
        if (myAbilityToCatch < specificPokemonCaptureRate) {
          this.$toast.show(`Engga`);
        }
      } catch (error) {
        this.$toast.show(error);
      }
    },
  },
  async created() {
    const { data } = await axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon-species/?offset=${this.offset}&limit=${this.limit}`,
    });
    const store = useDataStore();
    store.data = data.results;
  },
  mounted() {
    console.log(`hoyyy`);
    this.getNextUser();
  },
  computed: {
    fetchedData() {
      const store = useDataStore();
      return store.data;
    },
    dynamicPokemonBackgroundImage(index) {
      console.log(index);
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`;
    },
  },
};
</script>
