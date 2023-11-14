import { ref } from 'vue'
import { useOrderedChildren } from '~/hooks/use-ordered-children'

export const useSlide = (props) => {
  const {
    children: items,
  } = useOrderedChildren<CarouselItemContext>(
    getCurrentInstance()!,
    'slide',
  )

  // refs
  const activeIndex = ref(-1)
  const timer = ref<ReturnType<typeof setInterval> | null>(null)
  const hover = ref(false)
  const root = ref<HTMLDivElement>()
  // const containerHeight = ref<number>(0)

  function itemInStage(item: CarouselItemContext, index: number) {
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
    else if (props.loop)
      activeIndex.value = 0
  }

  const pauseTimer = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const startTimer = () => {
    if (props.interval <= 0 || !props.autoplay || timer.value)
      return
    timer.value = setInterval(() => playSlides(), props.interval)
  }

  const handleMouseEnter = () => {
    hover.value = true
    if (props.pauseOnHover)
      pauseTimer()
  }

  const handleMouseLeave = () => {
    hover.value = false
    startTimer()
  }

  return {
    root,
    activeIndex,
    arrowDisplay,
    hasLabel,
    hover,
    isCardType,
    items,
    isVertical,
    containerStyle,
    isItemsTwoLength,
    handleButtonEnter,
    handleButtonLeave,
    handleIndicatorClick,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    PlaceholderItem,
    isTwoLengthShow,
    throttledArrowClick,
    throttledIndicatorHover,
  }
}
