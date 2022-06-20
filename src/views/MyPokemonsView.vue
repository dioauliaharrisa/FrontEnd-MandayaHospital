<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <div class="flex flex-col">
    <NavigationBar />
    <div
      class="grid grid-cols-1 justify-items-center sm:grid-cols-2 justify-items-center md:grid-cols-3 gap-4 justify-items-center lg:grid-cols-3 gap-1 justify-items-center xl:grid-cols-4 gap-x-8 justify-items-center"
    >
      <div v-for="(item, index) in myPokemonsData" :key="index">
        <Card
          :index="index"
          :details="item"
          :pictureID="item.id"
          @handleRelease="handleRelease"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useDataStore } from "@/stores/data";
import Card from "@/components/Card.vue";
export default {
  components: { Card },
  methods: {
    handleRelease(index) {
      try {
        const store = useDataStore();
        const filteredMyCaughtPokemons = store.myCaughtPokemons.splice(
          index,
          1
        );
        this.$toast.show(`A pokemon has been released`);
      } catch (error) {
        this.$toast.show(error);
      }
    },
  },
  created() {
    const store = useDataStore();
    console.log(store.myCaughtPokemons);
  },
  computed: {
    myPokemonsData() {
      const store = useDataStore();
      console.log(store.myCaughtPokemons);
      return store.myCaughtPokemons;
    },
  },
};
</script>
