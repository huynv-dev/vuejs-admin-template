import { 
  Article, 
  Category, 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from '@/types/models';
import { mockArticles, mockCategories, mockUsers } from './mockData';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(500);
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user || credentials.password !== 'password') {
      throw new Error('Invalid credentials');
    }
    return {
      user,
      token: 'mock-jwt-token'
    };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    await delay(500);
    if (mockUsers.some(u => u.email === data.email)) {
      throw new Error('Email already exists');
    }
    const newUser: User = {
      id: mockUsers.length + 1,
      username: data.username,
      email: data.email,
      role: 'editor',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username)}&background=random`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockUsers.push(newUser);
    return {
      user: newUser,
      token: 'mock-jwt-token'
    };
  }
};

// Articles API
export const articlesApi = {
  async getAll(): Promise<Article[]> {
    await delay(300);
    return mockArticles;
  },

  async getById(id: number): Promise<Article> {
    await delay(300);
    const article = mockArticles.find(a => a.id === id);
    if (!article) throw new Error('Article not found');
    return article;
  },

  async create(data: Partial<Article>): Promise<Article> {
    await delay(500);
    const newArticle: Article = {
      id: mockArticles.length + 1,
      title: data.title || '',
      slug: data.slug || data.title?.toLowerCase().replace(/\s+/g, '-') || '',
      content: data.content || '',
      excerpt: data.excerpt || '',
      featuredImage: data.featuredImage,
      status: data.status || 'draft',
      categoryId: data.categoryId || 1,
      authorId: data.authorId || 1,
      tags: data.tags || [],
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: data.status === 'published' ? new Date() : undefined
    };
    mockArticles.push(newArticle);
    return newArticle;
  },

  async update(id: number, data: Partial<Article>): Promise<Article> {
    await delay(500);
    const index = mockArticles.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Article not found');
    
    const updatedArticle = {
      ...mockArticles[index],
      ...data,
      updatedAt: new Date(),
      publishedAt: data.status === 'published' ? new Date() : mockArticles[index].publishedAt
    };
    mockArticles[index] = updatedArticle;
    return updatedArticle;
  },

  async delete(id: number): Promise<void> {
    await delay(500);
    const index = mockArticles.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Article not found');
    mockArticles.splice(index, 1);
  }
};

// Categories API
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    await delay(300);
    return mockCategories;
  },

  async getById(id: number): Promise<Category> {
    await delay(300);
    const category = mockCategories.find(c => c.id === id);
    if (!category) throw new Error('Category not found');
    return category;
  },

  async create(data: Partial<Category>): Promise<Category> {
    await delay(500);
    const newCategory: Category = {
      id: mockCategories.length + 1,
      name: data.name || '',
      slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-') || '',
      description: data.description,
      parentId: data.parentId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockCategories.push(newCategory);
    return newCategory;
  },

  async update(id: number, data: Partial<Category>): Promise<Category> {
    await delay(500);
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    
    const updatedCategory = {
      ...mockCategories[index],
      ...data,
      updatedAt: new Date()
    };
    mockCategories[index] = updatedCategory;
    return updatedCategory;
  },

  async delete(id: number): Promise<void> {
    await delay(500);
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    mockCategories.splice(index, 1);
  }
}; 