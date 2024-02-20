<script setup lang="ts">
import MVCard from '~/components/card/mv-card.vue'
import { getAllMvs } from '~/api/newest-mv'

interface MVList {
  id: number
  name: string
  picUrl: string
  artistName: string
  copywirter: string
  playCount: number
}

const areaTabs = ['全部', '内地', '港台', '欧美', '日本', '韩国']
const typeTabs = ['全部', '官方版', '原声', '现场版', '网易出品']
const sortTabs = ['上升最快', '最热', '最新']

const activeAreaTabIndex = ref(0)
const activeTypeTabIndex = ref(0)
const activeSortTabIndex = ref(0)
const MVLists: Ref<MVList[]> = ref([])
const currentPage: Ref<number> = ref(1)
const listTotal: Ref<number> = ref(0)

const getMvs = () => {
  getAllMvs({
    limit: 40,
    offset: (currentPage.value - 1) * 40,
    area: areaTabs[activeAreaTabIndex.value],
    order: sortTabs[activeSortTabIndex.value],
    type: typeTabs[activeTypeTabIndex.value],
  }).then((res: any) => {
    if (listTotal.value === 0)
      listTotal.value = res.count / 40
    MVLists.value = res.data.map((item: any) => {
      item.picUrl = item.cover
      return item
    })
  })
}

const changeAreaTab = (index: number) => {
  activeAreaTabIndex.value = index
  getMvs()
}
const changeTypeTab = (index: number) => {
  activeTypeTabIndex.value = index
  getMvs()
}
const changeSortTab = (index: number) => {
  activeSortTabIndex.value = index
  getMvs()
}
const pageChange = (page: number) => {
  currentPage.value = page
  getMvs()
}

getMvs()
</script>

<template>
  <div class="p4">
    <div class="mb-4 flex items-center">
      <span class="text-sm">地区：</span>
      <Tabs
        :tabs="areaTabs"
        type="split"
        :active="activeAreaTabIndex"
        @changeTab="changeAreaTab"
      />
    </div>
    <div class="mb-4 flex items-center">
      <span class="text-sm">类型：</span>
      <Tabs
        :tabs="typeTabs"
        type="split"
        :active="activeTypeTabIndex"
        @changeTab="changeTypeTab"
      />
    </div>
    <div class="mb-4 flex items-center">
      <span class="text-sm">排序：</span>
      <Tabs
        :tabs="sortTabs"
        type="split"
        :active="activeSortTabIndex"
        @changeTab="changeSortTab"
      />
    </div>
    <div class="flex flex-wrap -mx-3">
      <MVCard v-for="item in MVLists" :key="item.id" v-bind="item" />
    </div>
    <div class="flex justify-end mb-4">
      <Pagination :total="listTotal" :current-page="currentPage" @change="pageChange" />
    </div>
  </div>
</template>
