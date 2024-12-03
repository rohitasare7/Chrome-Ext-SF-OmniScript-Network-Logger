<script setup>
/*global chrome*/
// import DisplayRecords from '@/components/partial/DisplayRecords';
// import { ref, onMounted, shallowRef } from "vue";
import PrimaryButton from "../elements/PrimaryButton.vue";
console.log('This is just a text message');
</script>

<template>
 

  <PrimaryButton :isBlue="true" class="mr-2">
    Test Button
  </PrimaryButton>

</template>

<script>
export default {
  name: "indexComp",
};
</script>
