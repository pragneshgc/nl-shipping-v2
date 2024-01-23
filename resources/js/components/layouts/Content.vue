<template>
    <div class="contentWrapper" :class="{ 'fullWidth': !sidebarVisible }">
        <h2>Content</h2>
        <router-view></router-view>
    </div>
</template>
<script setup>
defineProps(['sidebarVisible']);
</script>
