<script setup>
import { RouterView } from 'vue-router'

import { onMounted } from 'vue'
import router from '@/router/index.js'
import { useUserStore } from '@/stores/userStore.js'
import { useFinancialStore } from '@/stores/userFinancialStore.js'
import { useContactStore } from '@/stores/contactStore.js'
import {useCardStore} from '@/stores/cardStore.js'
import {useActivityStore} from '@/stores/userActivityStore.js'

const userStore = useUserStore()
// eslint-disable-next-line no-unused-vars
const userFinacialStore = useFinancialStore()
// eslint-disable-next-line no-unused-vars
const userContactStore = useContactStore()
// eslint-disable-next-line no-unused-vars
const cardStore = useCardStore()
// eslint-disable-next-line no-unused-vars
const activityStore = useActivityStore()
onMounted(() => {
  userStore.resetUser()
  router.push({ name: 'landing' });
})
</script>

<template>
  <RouterView />
</template>

<style>


</style>
