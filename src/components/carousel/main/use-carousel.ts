import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  unref,
  watch,
} from 'vue'
import type { SetupContext } from 'vue'
import { throttle } from 'lodash-unified'
import { useResizeObserver } from '@vueuse/core'
import type { CarouselContext, CarouselEmits, ItemContext } from './type'
import { useOrderedChildren } from '~/hooks/use-ordered-children'

export const carouselContextKey: InjectionKey<CarouselContext> = Symbol('carouselContextKey')

export const useCarousel = (props: any, emit: SetupContext<CarouselEmits>['emit']) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
  } = useOrderedChildren<ItemContext>(
    getCurrentInstance()!,
    'CarouselItem',
  )
  // refs
  const activeIndex = ref(-1)
  const timer = ref<ReturnType<typeof setInterval> | null>(null)
  const hover = ref(false)
  const root = ref<HTMLDivElement>()
  const containerHeight = ref<number>(0)

  const handleIndicatorClick = (index: number) => {
    activeIndex.value = index
  }

  function itemInStage(item: ItemContext, index: number) {
    const _items = unref(items)
    const itemCount = _items.length
    if (itemCount === 0 || !item.states.inStage)
      return false
    const nextItemIndex = index + 1
    const prevItemIndex = index - 1
    const lastItemIndex = itemCount - 1
    const isLastItemActive = _items[lastItemIndex].states.active
    const isFirstItemActive = _items[0].states.active
    const isNextItemActive = _items[nextItemIndex]?.states?.active
    const isPrevItemActive = _items[prevItemIndex]?.states?.active

    if ((index === lastItemIndex && isFirstItemActive) || isNextItemActive)
      return 'left'
    else if ((index === 0 && isLastItemActive) || isPrevItemActive)
      return 'right'

    return false
  }

  const handleButtonEnter = (arrow: 'left' | 'right') => {
    items.value.forEach((item, index) => {
      if (arrow === itemInStage(item, index))
        item.states.hover = true
    })
  }

  const handleButtonLeave = () => {
    items.value.forEach((item) => {
      item.states.hover = false
    })
  }

  const playSlides = () => {
    if (activeIndex.value < items.value.length - 1)
      activeIndex.value = activeIndex.value + 1
    else
      activeIndex.value = 0
  }

  const pauseTimer = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const startTimer = () => {
    timer.value = setInterval(() => playSlides(), 4000)
  }

  const resetTimer = () => {
    pauseTimer()
  }

  const handleMouseEnter = () => {
    hover.value = true
    pauseTimer()
  }

  const handleMouseLeave = () => {
    hover.value = false
    startTimer()
  }

  const containerStyle = computed(() => {
    if (props.height !== 'auto') {
      return {
        height: props.height,
      }
    }
    return {
      height: `${containerHeight.value}px`,
      overflow: 'hidden',
    }
  })

  const resetItemPosition = (oldIndex?: number) => {
    items.value.forEach((item, index) => {
      item.translateItem(index, activeIndex.value, oldIndex)
    })
  }

  const setActiveItem = (index: number | string) => {
    if (typeof index === 'string') {
      const filteredItems = items.value.filter(
        item => item.props.name === index,
      )
      if (filteredItems.length > 0)
        index = items.value.indexOf(filteredItems[0])
    }
    index = Number(index)
    if (Number.isNaN(index) || index !== Math.floor(index))
      return

    const itemCount = items.value.length
    const oldIndex = activeIndex.value
    if (index < 0)
      activeIndex.value = itemCount - 1
    else if (index >= itemCount)
      activeIndex.value = 0
    else
      activeIndex.value = index

    if (oldIndex === activeIndex.value)
      resetItemPosition(oldIndex)

    resetTimer()
  }

  const prev = () => {
    setActiveItem(activeIndex.value - 1)
  }

  const next = () => {
    setActiveItem(activeIndex.value + 1)
  }

  const throttledArrowClick = throttle(
    (index: number) => {
      setActiveItem(index)
    },
    300,
    { trailing: true },
  )

  const handleIndicatorHover = (index: number) => {
    if (props.trigger === 'hover' && index !== activeIndex.value)
      activeIndex.value = index
  }

  const throttledIndicatorHover = throttle((index: number) => {
    handleIndicatorHover(index)
  }, 300)

  watch(
    () => activeIndex.value,
    (current, prev) => {
      resetItemPosition(prev)
      if (prev > -1)
        emit('change', current, prev)
    },
  )

  const resizeObserver = shallowRef<ReturnType<typeof useResizeObserver>>()
  onMounted(() => {
    watch(
      () => items.value,
      () => {
        if (items.value.length > 0)
          setActiveItem(0)
      },
      {
        immediate: true,
      },
    )

    resizeObserver.value = useResizeObserver(root.value, () => {
      resetItemPosition()
    })
    startTimer()
  })

  onBeforeUnmount(() => {
    pauseTimer()
    if (root.value && resizeObserver.value)
      resizeObserver.value.stop()
  })

  // provide
  provide(carouselContextKey, {
    root,
    items,
    loop: props.loop,
    addItem,
    removeItem,
    setActiveItem,
  })

  return {
    root,
    activeIndex,
    hover,
    items,
    containerStyle,
    handleButtonEnter,
    handleButtonLeave,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    handleIndicatorClick,
    throttledArrowClick,
    throttledIndicatorHover,
  }
}
