<template>
  <div
    id="profile"
    class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
    :class="isDarkTheme ? 'bg-gray-900' : 'bg-white'"
  >
    <div class="p-4 md:p-12 text-center lg:text-left">
      <!-- Image for mobile view-->
      <div
        class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center mobile-profile-image"
      ></div>

      <slot></slot>

      <!-- Use https://simpleicons.org/ to find the svg for your preferred product -->
    </div>
  </div>
</template>
<script lang="ts" >
import Vue from "vue";

export default Vue.extend({
  props: {
    isDarkTheme: Boolean,
  }
});

</script>