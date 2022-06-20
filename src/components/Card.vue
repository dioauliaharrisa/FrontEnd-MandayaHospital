<template>
  <div class="p-2 m-2 rounded-xl shadow-xl">
    <div
      @click.self="handleToDetailPage(index + 1)"
      :style="{
        'background-image': `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          pictureID + 1
        }.svg')`,
        width: '200px',
        height: '200px',
      }"
      class="relative bg-slate-100 bg-cover"
    >
      <div class="absolute bottom-0 left-0">
        <div class="max-w-lg bg-white p-2 rounded-tr-xl text-center">
          {{ `#${index + 1} ${details.name}` }}
        </div>
      </div>
      <!-- net image -->
      <div
        v-if="this.$route.name == 'HomeView'"
        class="absolute bottom-0 right-0 bg-white rounded-tl-xl"
      >
        <img
          @click="handleCatch(index)"
          src="@/assets/net.png"
          width="50"
          height="50"
          alt=""
        />
      </div>
      <div v-else class="absolute bottom-0 right-0 bg-white rounded-tl-xl">
        <img
          @click="handleRelease(index)"
          src="@/assets/release.png"
          width="50"
          height="50"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["details", "index", "item", "pictureID"],
  emits: ["handleToDetailPage", "handleCatch", "handleRelease"],
  methods: {
    handleToDetailPage(param) {
      this.$emit("handleToDetailPage", param);
    },
    handleCatch(index) {
      this.$emit("handleCatch", index);
    },
    handleRelease(index) {
      this.$emit("handleRelease", index);
    },
  },
  created() {
    console.log(this.$route.name);
  },
};
</script>
