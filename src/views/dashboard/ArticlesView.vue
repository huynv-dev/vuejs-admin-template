<template>
  <div class="articles-view">
    <div class="header flex items-center justify-between mb-lg">
      <h1>Articles</h1>
      <router-link to="/dashboard/articles/create" class="btn-primary">
        <span class="material-icons">add</span>
        New Article
      </router-link>
    </div>

    <!-- Filters -->
    <div class="filters card mb-lg">
      <div class="flex gap-md">
        <div class="form-group w-full">
          <input
            type="text"
            v-model="filters.search"
            placeholder="Search articles..."
            class="w-full"
          >
        </div>
        <div class="form-group">
          <select v-model="filters.status" class="w-full">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div class="form-group">
          <select v-model="filters.categoryId" class="w-full">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Articles Table -->
    <div class="card">
      <div class="relative">
        <!-- Loading Overlay -->
        <LoadingSpinner v-if="isLoading" text="Loading articles..." :isOverlay="true" />

        <table v-else-if="articles.length">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td>{{ article.title }}</td>
              <td>{{ getCategoryName(article.categoryId.toString()) }}</td>
              <td>
                <span class="status-badge" :class="article.status">
                  {{ article.status }}
                </span>
              </td>
              <td>{{ article.authorId }}</td>
              <td>{{ formatDate(article.createdAt.toString()) }}</td>
              <td>
                <div class="actions flex gap-sm">
                  <button class="btn-icon" @click="viewArticle(article)">
                    <span class="material-icons">visibility</span>
                  </button>
                  <button class="btn-icon" @click="editArticle(article)">
                    <span class="material-icons">edit</span>
                  </button>
                  <button class="btn-icon danger" @click="confirmDelete(article)">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="empty-state">
          <span class="material-icons">article</span>
          <p>No articles found</p>
          <router-link to="/dashboard/articles/create" class="btn-primary">
            Create your first article
          </router-link>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal-content" @click.stop>
        <h3>Delete Article</h3>
        <p>Are you sure you want to delete? This action cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showDeleteModal = false">Cancel</button>
          <button class="btn-danger" @click="deleteArticle" :disabled="isDeletingArticle">
            <LoadingSpinner v-if="isDeletingArticle" />
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from '@/composables/useLoading'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useArticlesStore } from '@/stores/articles'
import { useCategoriesStore } from '@/stores/categories'
import { useNotificationStore } from '@/stores/notifications'

const router = useRouter()
const articlesStore = useArticlesStore()
const categoriesStore = useCategoriesStore()
const notificationStore = useNotificationStore()

const { isLoading, withLoading } = useLoading()
const isDeletingArticle = ref(false)
const showDeleteModal = ref(false)
const selectedArticle = ref(null)

const filters = ref({
  search: '',
  status: '',
  categoryId: ''
})

// Computed
const articles = computed(() => {
  let filtered = [...articlesStore.articles]

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(search) ||
      article.excerpt.toLowerCase().includes(search)
    )
  }

  if (filters.value.status) {
    filtered = filtered.filter(article => article.status === filters.value.status)
  }

  if (filters.value.categoryId) {
    filtered = filtered.filter(article => article.categoryId === Number(filters.value.categoryId))
  }

  return filtered
})

const categories = computed(() => categoriesStore.categories)

// Methods
const loadData = async () => {
  await withLoading(async () => {
    try {
      await Promise.all([
        articlesStore.fetchArticles(),
        categoriesStore.fetchCategories()
      ])
    } catch (error) {
      notificationStore.addNotification({
        title: 'Failed to load articles',
        message: 'An error occurred while loading articles',
        type: 'error'
      })
    }
  })
}

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(c => c.id === Number(categoryId))
  return category?.name || 'Uncategorized'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const viewArticle = (article: any) => {
  // Implement article preview
  notificationStore.addNotification({
    title: 'Article preview coming soon',
    message: 'This feature is not yet implemented',
    type: 'info'
  })
}

const editArticle = (article: any) => {
  router.push(`/dashboard/articles/${article.id}/edit`)
}

const confirmDelete = (article: any) => {
  selectedArticle.value = article
  showDeleteModal.value = true
}

const deleteArticle = async () => {
  if (!selectedArticle.value) return

  isDeletingArticle.value = true
  try {
    await articlesStore.deleteArticle(1)
      notificationStore.addNotification({
      title: 'Article deleted successfully',
      message: 'The article has been deleted successfully',
      type: 'success'
    })
    showDeleteModal.value = false
  } catch (error) {
    notificationStore.addNotification({
      title: 'Failed to delete article',
      message: 'An error occurred while deleting the article',
      type: 'error'
    })
  } finally {
    isDeletingArticle.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.articles-view {
  min-height: 100%;
}

.filters {
  padding: var(--space-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.draft {
  background-color: var(--bg-hover);
  color: var(--text-secondary);
}

.status-badge.published {
  background-color: var(--success);
  color: white;
}

.actions {
  display: flex;
  gap: var(--space-sm);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  border: none;
  background: none;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.btn-icon:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.btn-icon.danger:hover {
  background-color: var(--danger);
  color: white;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  text-align: center;
  color: var(--text-secondary);
}

.empty-state .material-icons {
  font-size: 48px;
  margin-bottom: var(--space-md);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  width: 100%;
  max-width: 400px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: background-color var(--transition-fast);
}

.btn-primary:hover {
  background-color: var(--primary-light);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--bg-hover);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: background-color var(--transition-fast);
}

.btn-secondary:hover {
  background-color: var(--border-light);
}

.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--danger);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: background-color var(--transition-fast);
}

.btn-danger:hover {
  background-color: var(--danger);
  opacity: 0.9;
}

.btn-danger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 