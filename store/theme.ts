import { defineStore } from 'pinia'
// import { Theme } from '~/interfaces/interfaces';

export const useThemeStore = defineStore('themeStore', () => {
  let isDark = ref(false)

  function setTheme(value: boolean) {
    console.log('hello world');
    
    isDark.value = value
  }
  return { setTheme, isDark }
})