<template>
    <div class="side">

    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '~/store/index'


const store = useAdminStore()
const { sideWidth } = storeToRefs(store)
</script>

<style scoped>
.side {
    width: v-bind('sideWidth');
    @apply h-screen bg-blue-300
}
</style>