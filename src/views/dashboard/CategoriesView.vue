<template>
  <div class="categories-view">
    <div class="page-header">
      <h1>Categories</h1>
      <button class="create-button" @click="openCreateModal">
        <i class="fas fa-plus" />
        New Category
      </button>
    </div>

    <div class="content-wrapper">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="categories.length === 0" class="empty-state">
        <i class="fas fa-folder" />
        <h3>No Categories Found</h3>
        <p>Start by creating your first category</p>
        <button class="create-button" @click="openCreateModal">
          Create Category
        </button>
      </div>
      <div v-else class="categories-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-card"
        >
          <div class="category-content">
            <h3>{{ category.name }}</h3>
            <p class="description">
              {{ category.description || 'No description' }}
            </p>
            <p class="meta">
              <span class="article-count">
                {{ getArticleCount(category.id) }} articles
              </span>
              <span class="slug">
                /{{ category.slug }}
              </span>
            </p>
          </div>
          <div class="category-actions">
            <button
              class="action-button"
              title="Edit"
              @click="openEditModal(category)"
            >
              <i class="fas fa-edit" />
            </button>
            <button
              class="action-button delete"
              title="Delete"
              @click="confirmDelete(category)"
            >
              <i class="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Form Modal -->
    <div v-if="showFormModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ isEditing ? 'Edit Category' : 'New Category' }}</h3>
        <form @submit.prevent="handleSubmit" class="category-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="Enter category name"
              :disabled="loading"
              @input="generateSlug"
            >
          </div>

          <div class="form-group">
            <label for="slug">Slug</label>
            <input
              id="slug"
              v-model="form.slug"
              type="text"
              required
              placeholder="category-slug"
              :disabled="loading"
            >
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              placeholder="Enter category description"
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="parentId">Parent Category (Optional)</label>
            <select
              id="parentId"
              v-model="form.parentId"
              :disabled="loading"
            >
              <option :value="undefined">None</option>
              <option
                v-for="category in availableParentCategories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="modal-actions">
            <button
              type="button"
              class="cancel-button"
              @click="closeFormModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="submit-button"
              :disabled="loading || !isValid"
            >
              {{ loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Delete Category</h3>
        <p>
          Are you sure you want to delete "{{ categoryToDelete?.name }}"?
          This will also affect all articles in this category.
        </p>
        <div class="modal-actions">
          <button
            class="cancel-button"
            @click="showDeleteModal = false"
          >
            Cancel
          </button>
          <button
            class="delete-button"
            :disabled="loading"
            @click="handleDelete"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/categories';
import { useArticlesStore } from '@/stores/articles';
import type { Category } from '@/types/models';

export default defineComponent({
  name: 'CategoriesView',
  setup() {
    const categoriesStore = useCategoriesStore();
    const articlesStore = useArticlesStore();

    const loading = ref(false);
    const showFormModal = ref(false);
    const showDeleteModal = ref(false);
    const isEditing = ref(false);
    const categoryToDelete = ref<Category | null>(null);

    const form = ref<Partial<Category>>({
      name: '',
      slug: '',
      description: '',
      parentId: undefined
    });

    const categories = computed(() => categoriesStore.categories);

    const availableParentCategories = computed(() => {
      if (!isEditing.value) return categories.value;
      // When editing, exclude the current category and its children
      return categories.value.filter(c => c.id !== form.value.id);
    });

    const isValid = computed(() => {
      return form.value.name && form.value.slug;
    });

    function getArticleCount(categoryId: number) {
      return articlesStore.articles.filter(a => a.categoryId === categoryId).length;
    }

    function generateSlug() {
      if (form.value.name) {
        form.value.slug = form.value.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    }

    function openCreateModal() {
      isEditing.value = false;
      form.value = {
        name: '',
        slug: '',
        description: '',
        parentId: undefined
      };
      showFormModal.value = true;
    }

    function openEditModal(category: Category) {
      isEditing.value = true;
      form.value = { ...category };
      showFormModal.value = true;
    }

    function closeFormModal() {
      showFormModal.value = false;
      form.value = {
        name: '',
        slug: '',
        description: '',
        parentId: undefined
      };
    }

    function confirmDelete(category: Category) {
      categoryToDelete.value = category;
      showDeleteModal.value = true;
    }

    async function handleSubmit() {
      if (!isValid.value) return;

      try {
        loading.value = true;
        if (isEditing.value) {
          await categoriesStore.updateCategory(
            form.value.id as number,
            form.value
          );
        } else {
          await categoriesStore.createCategory(form.value);
        }
        closeFormModal();
      } catch (error) {
        console.error('Failed to save category:', error);
      } finally {
        loading.value = false;
      }
    }

    async function handleDelete() {
      if (!categoryToDelete.value) return;

      try {
        loading.value = true;
        await categoriesStore.deleteCategory(categoryToDelete.value.id);
        showDeleteModal.value = false;
        categoryToDelete.value = null;
      } catch (error) {
        console.error('Failed to delete category:', error);
      } finally {
        loading.value = false;
      }
    }

    onMounted(async () => {
      try {
        loading.value = true;
        await Promise.all([
          categoriesStore.fetchCategories(),
          articlesStore.fetchArticles()
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        loading.value = false;
      }
    });

    return {
      loading,
      categories,
      showFormModal,
      showDeleteModal,
      isEditing,
      form,
      categoryToDelete,
      availableParentCategories,
      isValid,
      getArticleCount,
      generateSlug,
      openCreateModal,
      openEditModal,
      closeFormModal,
      confirmDelete,
      handleSubmit,
      handleDelete
    };
  }
});
</script>

<style scoped>
.categories-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.create-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
}

.create-button:hover {
  background: var(--primary-hover);
}

.loading {
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin: 0 0 0.5rem;
  color: var(--text-primary);
}

.empty-state p {
  margin: 0 0 1.5rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.category-content {
  flex: 1;
}

.category-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.description {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-button:hover {
  background: var(--hover);
  color: var(--text-primary);
}

.action-button.delete:hover {
  background: var(--danger-light);
  color: var(--danger);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
}

.modal h3 {
  margin: 0 0 1.5rem;
  color: var(--text-primary);
}

.category-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: var(--text-primary);
}

input,
select,
textarea {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--background);
  color: var(--text-primary);
  font-size: 1rem;
  width: 100%;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-button {
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  padding: 0.75rem 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.delete-button {
  padding: 0.75rem 1rem;
  background: var(--danger);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 