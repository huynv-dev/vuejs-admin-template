# Vue Admin Dashboard

<div align="center">
  <img src="public/logo.svg" alt="Vue Admin Dashboard" width="120" height="120">
  
  [![Vue 3](https://img.shields.io/badge/Vue-3.5.17-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Pinia](https://img.shields.io/badge/Pinia-3.0.3-yellow?style=for-the-badge&logo=vue.js&logoColor=white)](https://pinia.vuejs.org/)

  <p align="center">
    A modern, responsive, and feature-rich admin dashboard built with Vue 3, TypeScript, and Tailwind CSS.
  </p>
</div>

---

## ✨ Features

- **🎨 Modern UI/UX** - Clean and professional interface with Tailwind CSS
- **🔧 TypeScript** - Full type safety and enhanced developer experience
- **📱 Responsive Design** - Mobile-first approach with responsive layouts
- **🎯 Component Architecture** - Atomic design pattern with reusable components
- **🗂️ State Management** - Centralized state management with Pinia
- **🔐 Authentication** - Login/Register system with JWT support
- **📊 Dashboard Analytics** - Interactive charts and data visualization
- **📝 Content Management** - Articles and categories management
- **🔔 Notifications** - Real-time notification system
- **🌙 Theme Support** - Light/Dark mode switching
- **🧪 Testing** - Unit tests with Vitest and Vue Test Utils
- **⚡ Fast Development** - Hot module replacement with Vite

## 🛠️ Tech Stack

### Core Technologies
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Tailwind Forms](https://github.com/tailwindlabs/tailwindcss-forms)** - Form styling plugin

### State & Routing
- **[Pinia](https://pinia.vuejs.org/)** - State management
- **[Vue Router](https://router.vuejs.org/)** - Official router for Vue.js

### Development & Testing
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Vue Test Utils](https://test-utils.vuejs.org/)** - Testing utilities
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### Utilities
- **[VueUse](https://vueuse.org/)** - Collection of Vue composition utilities
- **[Class Variance Authority](https://cva.style/)** - Class name builder
- **[clsx](https://github.com/lukeed/clsx)** - Conditional class names

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or **yarn**/**pnpm**)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vue-admin-dashboard.git
   cd vue-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
vue-admin/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── assets/            # Stylesheets and static resources
│   │   ├── base.css       # Base styles and CSS variables
│   │   └── main.css       # Main stylesheet with Tailwind imports
│   ├── components/        # Reusable components (Atomic Design)
│   │   ├── atoms/         # Basic building blocks
│   │   │   ├── button/    # Button components
│   │   │   ├── input/     # Input components
│   │   │   └── ...
│   │   ├── molecules/     # Combinations of atoms
│   │   ├── organisms/     # Complex components
│   │   └── index.ts       # Component exports
│   ├── composables/       # Vue composition functions
│   │   ├── useLoading.ts  # Loading state management
│   │   └── useStorage.ts  # Local storage utilities
│   ├── layouts/          # Layout components
│   │   ├── AuthLayout.vue
│   │   ├── DashboardLayout.vue
│   │   └── DefaultLayout.vue
│   ├── router/           # Vue Router configuration
│   │   └── index.ts
│   ├── services/         # API and external services
│   │   ├── api.ts        # API client
│   │   └── mockData.ts   # Mock data for development
│   ├── stores/           # Pinia stores
│   │   ├── auth.ts       # Authentication store
│   │   ├── articles.ts   # Articles management
│   │   ├── categories.ts # Categories management
│   │   ├── notifications.ts # Notifications store
│   │   └── theme.ts      # Theme management
│   ├── types/            # TypeScript type definitions
│   │   ├── global.d.ts   # Global type declarations
│   │   └── models.ts     # Data models
│   ├── utils/            # Utility functions
│   │   ├── cn.ts         # Class name utilities
│   │   └── date.ts       # Date formatting utilities
│   ├── views/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard pages
│   │   └── ...
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── tests/                # Test files
├── .env.example          # Environment variables template
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
├── vitest.config.ts      # Vitest configuration
└── package.json          # Dependencies and scripts
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |

## 🏗️ Development Guidelines

### Component Development

- Follow **Atomic Design** principles
- Use **Vue 3 Composition API** with `<script setup>`
- Implement proper **TypeScript** typing
- Write **unit tests** for complex components

### Styling Guidelines

- Use **Tailwind CSS** utility classes
- Follow **mobile-first** responsive design
- Maintain **design system** consistency
- Use **CSS custom properties** for theming

### Code Quality

- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **TypeScript** for type safety
- **Vitest** for comprehensive testing

### Git Workflow

```bash
# Feature development
git checkout -b feature/your-feature-name
git commit -m "feat: add new feature"
git push origin feature/your-feature-name

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve issue with..."
git push origin fix/bug-description
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_APP_TITLE=Vue Admin Dashboard
VITE_API_BASE_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

### Tailwind Configuration

The project includes a custom Tailwind configuration with:
- Custom color palette
- Extended spacing and typography
- Form plugin integration
- Dark mode support

### Vite Configuration

Optimized Vite setup with:
- Path aliases (`@/` for `src/`)
- PostCSS processing
- TypeScript support
- Development plugins

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue.js Team](https://vuejs.org/) - For the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Vite](https://vitejs.dev/) - For the fast build tool
- [Pinia](https://pinia.vuejs.org/) - For the intuitive state management

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/your-username">Your Name</a></p>
  <p>
    <a href="#vue-admin-dashboard">Back to top</a>
  </p>
</div>
