import type { ExtractPropTypes } from 'vue'

export const slideItemProps = {
  name: { type: String, default: '' },
  label: {
    type: [String, Number],
    default: '',
  },
}

export type SlideItemProps = ExtractPropTypes<typeof slideItemProps>
