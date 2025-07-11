import { ref, watch } from 'vue';
import { config } from '@/config';

export function useStorage<T>(key: string, defaultValue: T) {
  const storageKey = `${config.app.storagePrefix}${key}`;
  
  // Get initial value from localStorage or use default
  const storedValue = localStorage.getItem(storageKey);
  const value = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue);
  
  // Watch for changes and update localStorage
  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(newValue));
    }
  }, { deep: true });
  
  return value;
}

export function clearStorage(prefix = config.app.storagePrefix) {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
} 