<script lang="ts" setup>
import Header from './Header.vue'
import Nav from './Nav.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-var(--global-bg-color) text-var(--font-color)">
    <Header />
    <div class="flex justify-start flex-grow">
      <Nav />
      <main class="px-4 pt-48px py-10 text-center text-gray-700 dark:text-gray-200 flex-1">
        <RouterView />
      </main>
    </div>
    <Footer />
  </div>
</template>
