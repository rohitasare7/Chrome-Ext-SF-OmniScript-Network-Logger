<script setup>
defineProps({
    value: String,
});
</script>

<template>
    <label class="block font-semibold text-gray-700 dark:text-gray-300 text-sm">
        {{ value }}
        <span v-if="value"></span>
        <span v-else>
            <slot />
        </span>
    </label>
</template>