<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
    icon: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: '',
    },
    isSquare: {
        type: Boolean,
        default: false
    },
});

</script>

<template>
    <button :type="type"
        class="inline-flex items-center p-1 border shadow-md rounded-full font-semibold text-xs focus:outline-none disabled:opacity-25 transition ease-in-out duration-300"
        :class="{
            'bg-rose-700 hover:bg-rose-600 border-rose-800/60 dark:bg-rose-100 dark:hover:bg-rose-200 dark:border-rose-300/50': color == 'red',
            'bg-green-700 hover:bg-green-600 border-green-800/60 dark:bg-green-100 dark:hover:bg-green-200 dark:border-green-300/50': color == 'green',
            'bg-blue-700 hover:bg-blue-600 border-blue-800/50 dark:bg-blue-100 dark:hover:bg-blue-200 dark:border-blue-300/50': color == 'blue',
            'bg-gray-400 hover:bg-gray-500 border-gray-300 dark:bg-zinc-200 dark:hover:bg-zinc-300 dark:border-gray-300/50': color == 'gray',
            '!rounded-md': isSquare,
        }">
        <component class="w-5 h-5 stroke-2 transition duration-75" :is="icon" :class="{
            'fill-red-100 hover:fill-red-200 dark:fill-red-800 text-red-100 dark:text-red-700': color == 'red',
            'fill-green-700 hover:fill-green-800 dark:fill-green-100 text-green-100 dark:text-green-700': color == 'green',
            'fill-blue-700 hover:fill-blue-800 dark:fill-blue-100 text-blue-100 dark:text-blue-700': color == 'blue',
            'fill-gray-100 hover:fill-gray-200 dark:fill-gray-800 text-gray-100 dark:text-gray-700': color == 'gray',
        }"></component>
        <slot />
    </button>
</template>