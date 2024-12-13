<script setup>
/* eslint-disable */
import './assets/index.css';
import TextDesc from './components/elements/TextDesc.vue';

// const webStoreURL = 'https://chromewebstore.google.com/detail/salesforce-login-manager/beemdmmeeddbifmjlaiboldgnffddibd';

// const triggerEmail = () => {
//   const shareMessage = "Hey! checkout the Salesforce Login Manager! This Chrome extension will help you to log into your Salesforce org with ease! Check it out at Official Chrome Web Store : " + webStoreURL;
//   window.open('mailto:?subject=[Chrome Extension] Salesforce Login Manager&body=' + shareMessage);
// }

</script>
<style>
body {
  font-family: "Figtree", sans-serif;
}
</style>
<template>
  <div class="p-5 bg-gray-100 antialiased" style="max-width: 700px; min-width: 600px;">
    <div class="bg-white rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Salesforce OmniStudio Network Logger</h2>
      <!-- <div class="flex items-center justify-start py-2 mt-2 border-t dark:border-gray-500">
      <a class="text-blue-700 font-semibold mr-1" :href="webStoreURL" target="_blank">
        <button class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-3xl mr-2">Web Store
          Link</button>
      </a>

      <button class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-3xl mr-2" @click="triggerEmail">Share
        Extension</button>
    </div> -->
      <TextDesc class="my-2 text-gray-700">If you'd like to show your support, please consider
        checking out to Author's YouTube Channel :
        <a class="text-blue-600 dark:text-blue-300 font-semibold" href="https://www.youtube.com/@ThatSalesforceGuy"
          target="_blank">That Salesforce Guy</a> or you can also support via <a
          class="text-blue-600 dark:text-blue-300 font-semibold"
          href="https://patreon.com/thatsalesforceguy?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
          target="_blank">Patreon</a>
      </TextDesc>
    </div>
  </div>
</template>
