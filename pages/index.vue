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
      :class="{ 'hide': currentPage == 'TOOLS_PAGE'}" 
    >
      <ContainerProfile :isDarkTheme="isDarkTheme" >
        <Description />
        <MailMe />
        <SocialMediaVue />
      </ContainerProfile>
      <SquareImageProfile />
    </div>
    <div class="absolute bottom-0 left-0 right-0 mx-auto container flex justify-center" >
      <button
        class="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded-tl-full rounded-tr-full w-60 focus:outline-none"
        :class="{ 'showing-tools-page': currentPage == 'TOOLS_PAGE'}" 
        @click="changePage( currentPage == 'HOME_PAGE' ? 'TOOLS_PAGE' : 'HOME_PAGE' )" 
        >
        {{label}}
      </button>
    </div>
    <DarkModeSwitcher :isDarkTheme="isDarkTheme" @changeTheme="changeTheme" />
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
    currentPage: 'HOME_PAGE',
    posBtmToolBtn: 0,
    label: 'Tools Build by Me',
  }),
  methods: {
    changeTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
    changePage(page: string){
      this.currentPage = page;
      this.label = this.currentPage == 'HOME_PAGE' ? 'Tools Build by Me' : 'Home';
    }
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

.w-60 {
  width: 15rem;
}

.mobile-profile-image {
  background-image: url('/main/profile_mobile.jpeg');
  background-position: top left;
  background-size: cover;
}

.hide {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s, opacity 0.5s ease;
}

.showing-tools-page {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes showing-tools-page {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>
