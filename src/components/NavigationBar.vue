<template>
  <div
    class="grid grid-cols-3 justify-items-stretch items-center justify-center"
  >
    <div
      @click="handleBackToHomePage"
      v-if="this.$route.path !== '/'"
      class="col-span2 bg-slate-200 rounded-md"
    >
      {{ "< Back to Home" }}
    </div>
    <div v-if="this.$route.path === '/'"></div>
    <img
      @click="handleGoToMyPokemonsPage"
      class="items-center justify-self-center"
      width="50"
      height="50"
      src="@/assets/pokeball.png"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleBackToHomePage() {
      this.$router.push("/");
    },
    handleGoToMyPokemonsPage() {
      this.$router.push("/myPokemons");
    },
  },
};
</script>
