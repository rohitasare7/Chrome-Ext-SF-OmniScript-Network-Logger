<script setup>
import { defineProps, ref } from 'vue';
import copy_icon from './icons/copy_icon.vue';
import SVGIconButton from './SVGIconButton.vue';

const props = defineProps(['copyValue']);
const showCopiedMessage = ref(false);

const copyToClipboardMain = () => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = props.copyValue;
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length); // For mobile support

    try {
        // Execute the copy command
        document.execCommand('copy');
        //console.log('copied to clipboard!');
        showCopiedMessage.value = true;

        // Hide the message after 3-5 seconds
        setTimeout(() => {
            showCopiedMessage.value = false;
        }, 3000); // 3 seconds delay
    } catch (err) {
        console.error('Failed to copy text:', err);
    }

    // Remove the temporary textarea element
    document.body.removeChild(textarea);
};
</script>

<template>
    <div class="relative inline-block">
        <div v-if="showCopiedMessage"
            class="absolute top-0 right-4 w-44 ml-2 px-2 py-1 text-green-800 text-sm transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0">
            Content Copied!
        </div>
        <copy_icon
            class="cursor-pointer w-5 h-5 stroke-2 transition duration-300 fill-gray-400 hover:fill-gray-500 dark:fill-gray-300 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            @click="copyToClipboardMain" title="Copy to Clipboard">
            <slot />
        </copy_icon>

    </div>
</template>
