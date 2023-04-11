<template>
    <div>
        <h2>index</h2>
        <p>{{ token }}</p>
        <button class="btn" @click="quitAuth">退出</button>
    </div>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies';
import router from '~/router'
import { storeToRefs } from 'pinia'
import { useAdmin } from '~/store'

const store = useAdmin()

const cookie = useCookies()
// const token = ref(cookie.get('admin-token'))

const { token, admin } = storeToRefs(store)
const quitAuth = () => {
    cookie.remove('admin-token')
    token.value = ''
    router.push('/login')
}
</script>

<style  scoped>
.btn {
    @apply bg-red-500 text-white px-10 py-2 rounded-full hover: (bg-red-700) focus:(ring-8 ring-red-400) transition-all duration-500
}
</style>