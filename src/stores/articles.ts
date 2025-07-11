import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Article } from '@/types/models';
import { articlesApi } from '@/services/api';

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentArticle = ref<Article | null>(null);

  const publishedArticles = computed(() => 
    articles.value.filter(article => article.status === 'published')
  );

  const draftArticles = computed(() => 
    articles.value.filter(article => article.status === 'draft')
  );

  async function fetchArticles() {
    try {
      loading.value = true;
      error.value = null;
      articles.value = await articlesApi.getAll();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch articles';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchArticle(id: number) {
    try {
      loading.value = true;
      error.value = null;
      currentArticle.value = await articlesApi.getById(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch article';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createArticle(data: Partial<Article>) {
    try {
      loading.value = true;
      error.value = null;
      const newArticle = await articlesApi.create(data);
      articles.value.push(newArticle);
      return newArticle;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create article';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateArticle(id: number, data: Partial<Article>) {
    try {
      loading.value = true;
      error.value = null;
      const updatedArticle = await articlesApi.update(id, data);
      const index = articles.value.findIndex(a => a.id === id);
      if (index !== -1) {
        articles.value[index] = updatedArticle;
      }
      if (currentArticle.value?.id === id) {
        currentArticle.value = updatedArticle;
      }
      return updatedArticle;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update article';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteArticle(id: number) {
    try {
      loading.value = true;
      error.value = null;
      await articlesApi.delete(id);
      articles.value = articles.value.filter(a => a.id !== id);
      if (currentArticle.value?.id === id) {
        currentArticle.value = null;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete article';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    articles,
    loading,
    error,
    currentArticle,
    publishedArticles,
    draftArticles,
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle
  };
}); 