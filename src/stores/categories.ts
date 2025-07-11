import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Category } from '@/types/models';
import { categoriesApi } from '@/services/api';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentCategory = ref<Category | null>(null);

  async function fetchCategories() {
    try {
      loading.value = true;
      error.value = null;
      categories.value = await categoriesApi.getAll();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch categories';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchCategory(id: number) {
    try {
      loading.value = true;
      error.value = null;
      currentCategory.value = await categoriesApi.getById(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch category';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createCategory(data: Partial<Category>) {
    try {
      loading.value = true;
      error.value = null;
      const newCategory = await categoriesApi.create(data);
      categories.value.push(newCategory);
      return newCategory;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create category';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateCategory(id: number, data: Partial<Category>) {
    try {
      loading.value = true;
      error.value = null;
      const updatedCategory = await categoriesApi.update(id, data);
      const index = categories.value.findIndex(c => c.id === id);
      if (index !== -1) {
        categories.value[index] = updatedCategory;
      }
      if (currentCategory.value?.id === id) {
        currentCategory.value = updatedCategory;
      }
      return updatedCategory;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update category';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteCategory(id: number) {
    try {
      loading.value = true;
      error.value = null;
      await categoriesApi.delete(id);
      categories.value = categories.value.filter(c => c.id !== id);
      if (currentCategory.value?.id === id) {
        currentCategory.value = null;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete category';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    loading,
    error,
    currentCategory,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory
  };
}); 