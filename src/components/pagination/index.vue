<script lang="ts" setup>
</script>

<template>
  <ul class="flex text-[14px] items-center h-[32px] font-bold text-var(--pagination-color)">
    <IconLeft class="w-[32px] cursor-pointer" />
    <li class="px-1 w-[32px] cursor-pointer">
      1
    </li>
    <IconDoubleLeft class="w-[32px] cursor-pointer" />
    <li class="w-[32px] cursor-pointer">
      ···
    </li>
    <li v-for="item in 6" :key="item" class="px-1 w-[32px] cursor-pointer">
      {{ item }}
    </li>
    <li class="w-[32px] cursor-pointer">
      ···
    </li>
    <IconDoubleRight class="w-[32px] cursor-pointer" />
    <li class="px-1 w-[32px] cursor-pointer">
      8
    </li>
    <IconRight class="w-[32px] cursor-pointer" />
  </ul>
</template>
