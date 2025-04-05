<script setup>
/* eslint-disable */
import './assets/index.css';
import TextDesc from './components/elements/TextDesc.vue';

const webStoreURL = 'https://bit.ly/41BI2KG';

const triggerEmail = () => {
  const shareMessage = "Hey! checkout the Salesforce Login Manager! This Chrome extension will help you to log into your Salesforce org with ease! Check it out at Official Chrome Web Store : " + webStoreURL;
  window.open('mailto:?subject=[Chrome Extension] Salesforce Login Manager&body=' + shareMessage);
}

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
      <div class="py-2 mt-2 border-t">
        <TextDesc class="my-2 text-gray-700">To use this extension, before your network requests are initialized, please
          open the network logger by "Right Click" then "Inspect" and then "OS
          Network Logger" tab (Check below screenshot)
        </TextDesc>
        <img src="./assets/img/how_to_network_ss.png" class="rounded-lg border border-gray-300 p-4" />
      </div>
      <TextDesc class="my-2 text-gray-700">If you'd like to support my work, you can check out my YouTube channel, 
        <a class="text-blue-600 font-semibold" href="https://www.youtube.com/@ThatSalesforceGuy" target="_blank">That
          Salesforce Guy</a> or contribute via <a class="text-blue-600 font-semibold"
          href="https://patreon.com/thatsalesforceguy?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
          target="_blank">Patreon</a>. Thanks so much! 🙏
      </TextDesc>

      <TextDesc class="my-2 text-gray-700 border-t pt-4">Please leave a review—it means a lot! 🙏 And feel free to share with friends or coworkers. Thanks! 🤗</TextDesc>

      <div class="flex items-center justify-start py-2 mt-2 dark:border-gray-500">
        <a class="text-blue-700 font-semibold mr-1" :href="webStoreURL" target="_blank">
          <button class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-3xl mr-2">Web Store Link</button>
        </a>

        <button class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-3xl mr-2" @click="triggerEmail">Share
          Extension</button>
      </div>

    </div>
  </div>
</template>
