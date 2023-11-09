// 红色皮肤变量
import variables from '../variables'
import whiteTheme from './white'
export default {
  ...whiteTheme,
  ...variables,
  '--global-bg-color': '#FFFFFF',
  // 头部
  '--header-bg-color': '#D33A31',
  '--header-font-color': '#EFB6B2',
  '--header-input-bgcolor': '#DD6861',
  '--header-input-font-color': '#EFB6B2',
  // 搜索
  '--search-bg-color': '#FFFFFF',
  '--search-font-color': '#5C5C5C',
  '--search-button-border-color': '#D9D9D9',
  '--search-button-hover-color': '#F5F5F5',
  '--footer-border-color': '#F5F5F5',
  '--popover-bg-color': '#FFFFFF',
  '--menu-bgcolor': '#EDEDED',
}
