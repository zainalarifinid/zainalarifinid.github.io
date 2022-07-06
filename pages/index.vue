<template>
  <div
    class="font-sans antialiased leading-normal tracking-wider bg-cover py-40 lg:py-0"
    :class="
      isDarkTheme
        ? 'dark-bg-image text-gray-100'
        : 'light-bg-image text-gray-900'
    "
  >
    <div
      class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto lg:my-0"
    >
      <ContainerProfile :isDarkTheme="isDarkTheme" >
        <Description />
        <MailMe />
        <SocialMediaVue />
      </ContainerProfile>
      <SquareImageProfile />
      
      <DarkModeSwitcher :isDarkTheme="isDarkTheme" @changeTheme="changeTheme" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SocialMediaVue from '~/components/SocialMedia.vue';
import MailMe from '~/components/MailMe.vue';
import Description from '~/components/Description.vue';
import SquareImageProfile from '~/components/SquareImageProfile.vue';
import ContainerProfile from '~/components/ContainerProfile.vue';
import DarkModeSwitcher from '~/components/DarkModeSwitcher.vue';

export default Vue.extend({
  data: () => ({
    isDarkTheme: false,
  }),
  methods: {
    changeTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
  components: { SocialMediaVue, MailMe, Description, SquareImageProfile, ContainerProfile, DarkModeSwitcher }
});
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.dark-bg-image {
  background-image: url('/bg/rosie-fraser-1L71sPT5XKc-unsplash.jpg');
}

.light-bg-image {
  background-image: url('/bg/jochen-buckers-tIsz0EbqZHc-unsplash.jpg');
}

.mobile-profile-image {
  background-image: url('/main/profile_mobile.jpeg');
  background-position: top left;
  background-size: cover;
}
</style>
