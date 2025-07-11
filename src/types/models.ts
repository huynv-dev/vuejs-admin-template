export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parentId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  categoryId: number;
  authorId: number;
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  username: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 