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
      <div class="w-full h-full overflow-y-scroll">
        <main class="text-gray-700 dark:text-gray-200 flex-1 max-w-6xl min-w-2xl mx-auto">
          <RouterView />
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>
