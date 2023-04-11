<template>
    <div>
        <h2>index</h2>
        <p>{{ token }}</p>
    </div>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies';
import { ref } from 'vue';
const cookie = useCookies()
const token = ref(cookie.get('admin-token'))
</script>

<style lang="scss" scoped></style>