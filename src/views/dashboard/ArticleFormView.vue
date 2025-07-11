<template>
  <div class="article-form-view">
    <div class="page-header">
      <h1>{{ isEditing ? 'Edit Article' : 'New Article' }}</h1>
      <div class="header-actions">
        <button
          class="save-draft-button"
          :disabled="loading || !isValid"
          @click="saveAsDraft"
        >
          {{ loading ? 'Saving...' : 'Save as Draft' }}
        </button>
        <button
          class="publish-button"
          :disabled="loading || !isValid"
          @click="publish"
        >
          {{ loading ? 'Publishing...' : 'Publish' }}
        </button>
      </div>
    </div>

    <div class="form-grid">
      <div class="main-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            placeholder="Enter article title"
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
            placeholder="article-url-slug"
            :disabled="loading"
          >
        </div>

        <div class="form-group">
          <label for="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            rows="3"
            required
            placeholder="Brief description of the article"
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            id="content"
            v-model="form.content"
            rows="20"
            required
            placeholder="Write your article content here..."
            :disabled="loading"
          />
        </div>
      </div>

      <div class="side-form">
        <div class="form-card">
          <h3>Article Details</h3>
          
          <div class="form-group">
            <label for="category">Category</label>
            <select
              id="category"
              v-model="form.categoryId"
              required
              :disabled="loading"
            >
              <option value="" disabled>Select a category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="tags">Tags</label>
            <div class="tags-input">
              <input
                id="tags"
                v-model="tagInput"
                type="text"
                placeholder="Add tags..."
                :disabled="loading"
                @keydown.enter.prevent="addTag"
              >
              <div class="tags-list">
                <span
                  v-for="(tag, index) in form.tags"
                  :key="index"
                  class="tag"
                >
                  {{ tag }}
                  <button
                    type="button"
                    class="remove-tag"
                    @click="removeTag(index)"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="featuredImage">Featured Image</label>
            <div class="image-upload">
              <div
                v-if="form.featuredImage"
                class="image-preview"
              >
                <img :src="form.featuredImage" :alt="form.title">
                <button
                  type="button"
                  class="remove-image"
                  @click="removeFeaturedImage"
                >
                  Remove Image
                </button>
              </div>
              <input
                id="featuredImage"
                type="text"
                v-model="form.featuredImage"
                placeholder="Enter image URL"
                :disabled="loading"
              >
            </div>
          </div>
        </div>

        <div v-if="isEditing" class="form-card danger-zone">
          <h3>Danger Zone</h3>
          <button
            type="button"
            class="delete-button"
            @click="confirmDelete"
          >
            Delete Article
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Delete Article</h3>
        <p>
          Are you sure you want to delete this article?
          This action cannot be undone.
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
import { useRoute, useRouter } from 'vue-router';
import { useArticlesStore } from '@/store/articles';
import { useCategoriesStore } from '@/store/categories';
import type { Article } from '@/types/models';

export default defineComponent({
  name: 'ArticleFormView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const articlesStore = useArticlesStore();
    const categoriesStore = useCategoriesStore();

    const isEditing = computed(() => route.params.id !== 'new');
    const loading = ref(false);
    const showDeleteModal = ref(false);
    const tagInput = ref('');

    const form = ref<Partial<Article>>({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      categoryId: undefined,
      tags: [],
      featuredImage: '',
      status: 'draft'
    });

    const categories = computed(() => categoriesStore.categories);

    const isValid = computed(() => {
      return (
        form.value.title &&
        form.value.slug &&
        form.value.content &&
        form.value.excerpt &&
        form.value.categoryId
      );
    });

    function generateSlug() {
      if (form.value.title) {
        form.value.slug = form.value.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    }

    function addTag(event: Event) {
      event.preventDefault();
      if (tagInput.value.trim()) {
        form.value.tags = [...(form.value.tags || []), tagInput.value.trim()];
        tagInput.value = '';
      }
    }

    function removeTag(index: number) {
      if (form.value.tags) {
        form.value.tags = form.value.tags.filter((_, i) => i !== index);
      }
    }

    function removeFeaturedImage() {
      form.value.featuredImage = '';
    }

    async function saveAsDraft() {
      await saveArticle('draft');
    }

    async function publish() {
      await saveArticle('published');
    }

    async function saveArticle(status: 'draft' | 'published') {
      if (!isValid.value) return;

      try {
        loading.value = true;
        const articleData = {
          ...form.value,
          status
        };

        if (isEditing.value) {
          await articlesStore.updateArticle(
            Number(route.params.id),
            articleData
          );
        } else {
          await articlesStore.createArticle(articleData);
        }

        router.push('/dashboard/articles');
      } catch (error) {
        console.error('Failed to save article:', error);
      } finally {
        loading.value = false;
      }
    }

    function confirmDelete() {
      showDeleteModal.value = true;
    }

    async function handleDelete() {
      try {
        loading.value = true;
        await articlesStore.deleteArticle(Number(route.params.id));
        router.push('/dashboard/articles');
      } catch (error) {
        console.error('Failed to delete article:', error);
      } finally {
        loading.value = false;
        showDeleteModal.value = false;
      }
    }

    onMounted(async () => {
      await categoriesStore.fetchCategories();

      if (isEditing.value) {
        try {
          loading.value = true;
          await articlesStore.fetchArticle(Number(route.params.id));
          form.value = { ...articlesStore.currentArticle };
        } catch (error) {
          console.error('Failed to fetch article:', error);
          router.push('/dashboard/articles');
        } finally {
          loading.value = false;
        }
      }
    });

    return {
      isEditing,
      loading,
      form,
      categories,
      isValid,
      tagInput,
      showDeleteModal,
      generateSlug,
      addTag,
      removeTag,
      removeFeaturedImage,
      saveAsDraft,
      publish,
      confirmDelete,
      handleDelete
    };
  }
});
</script>

<style scoped>
.article-form-view {
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

.header-actions {
  display: flex;
  gap: 1rem;
}

.save-draft-button,
.publish-button {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.save-draft-button {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.save-draft-button:hover:not(:disabled) {
  background: var(--hover);
}

.publish-button {
  background: var(--primary);
  border: none;
  color: white;
}

.publish-button:hover:not(:disabled) {
  background: var(--primary-hover);
}

.save-draft-button:disabled,
.publish-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.main-form,
.side-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-card {
  background: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-card h3 {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-group:last-child {
  margin-bottom: 0;
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

.tags-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 4px;
  font-size: 0.875rem;
}

.remove-tag {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.image-upload {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-preview {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}

.danger-zone {
  border: 1px solid var(--danger);
}

.delete-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--danger);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover:not(:disabled) {
  background: var(--danger-hover);
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
  max-width: 400px;
}

.modal h3 {
  margin: 0 0 1rem;
  color: var(--text-primary);
}

.modal p {
  margin: 0 0 1.5rem;
  color: var(--text-secondary);
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

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style> 