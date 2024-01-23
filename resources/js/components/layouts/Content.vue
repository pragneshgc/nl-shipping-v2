<template>
    <div class="contentWrapper" :class="{ 'fullWidth': !sidebarVisible }">
        <router-view></router-view>
    </div>
</template>
<script setup>
defineProps(['sidebarVisible']);
</script>
