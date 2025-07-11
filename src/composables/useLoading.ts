import { ref } from 'vue'

export function useLoading(initialState = false) {
  const isLoading = ref(initialState)

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    isLoading.value = true
    try {
      return await fn()
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    withLoading
  }
} 