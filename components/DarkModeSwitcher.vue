<template>
  <!-- Pin to top right corner -->
  <div class="absolute top-0 right-0 h-12 w-18 p-4" @click="changeTheme">
    <button class="js-change-theme focus:outline-none">
      {{ iconTheme }}
    </button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    isDarkTheme: Boolean,
  },
  computed: {
    iconTheme() {
      return this.isDarkTheme ? '☀️' : '🌙';
    },
  },
  methods: {
    changeTheme(){
      this.$emit('changeTheme');
    }
  }
})
</script>