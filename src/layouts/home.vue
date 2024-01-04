<script lang="ts" setup>
import Header from './Header.vue'
import Nav from './Nav.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-var(--global-bg-color) text-var(--font-color)">
    <Header />
    <div class="flex justify-start h-[calc(100vh-106px)]">
      <Nav />
      <main class="text-gray-700 dark:text-gray-200 flex-1 max-w-1200px min-w-700px mx-auto">
        <RouterView />
      </main>
    </div>
    <Footer />
  </div>
</template>
