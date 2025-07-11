<template>
  <AuthLayout>
    <div class="space-y-8">
      <!-- Logo and branding -->
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p class="text-gray-600">
          Sign in to your account to continue your journey
        </p>
      </div>
      
      <!-- Success message -->
      <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 animate-fadeIn">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-green-800 font-medium">{{ successMessage }}</p>
        </div>
      </div>
      
      <!-- Main form card -->
      <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 transform hover:shadow-2xl transition-all duration-300">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-5">
            <!-- Email -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                Email Address
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <input 
                  v-model="formState.email"
                  type="email" 
                  class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email address"
                  :class="{ 'border-red-300 focus:ring-red-500': errors.email }"
                />
              </div>
              <p v-if="errors.email" class="text-red-500 text-sm mt-2 animate-fadeIn">{{ errors.email }}</p>
            </div>
            
            <!-- Password -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                Password
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input 
                  v-model="formState.password"
                  type="password" 
                  class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                  :class="{ 'border-red-300 focus:ring-red-500': errors.password }"
                />
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm mt-2 animate-fadeIn">{{ errors.password }}</p>
            </div>
          </div>

          <!-- Remember me and forgot password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <input 
                id="remember-me"
                type="checkbox" 
                v-model="rememberMe" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <BaseButton 
              variant="link" 
              colorScheme="primary" 
              size="sm"
              as="a" 
              href="#"
              class="text-sm font-medium hover:underline"
            >
              Forgot password?
            </BaseButton>
          </div>

          <!-- Submit button -->
          <BaseButton
            type="submit"
            variant="solid"
            colorScheme="primary"
            size="lg"
            :loading="loading"
            :disabled="loading"
            fullWidth
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <template #leftIcon v-if="!loading">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
            </template>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </BaseButton>
        </form>
      </div>

      <!-- Create account link -->
      <div class="text-center">
        <p class="text-gray-600 mb-4">Don't have an account?</p>
        <BaseButton
          as="a"
          href="/auth/register"
          variant="ghost"
          colorScheme="gray"
          size="md"
          class="hover:bg-white/50 backdrop-blur-sm rounded-xl"
        >
          <template #leftIcon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </template>
          Create new account
        </BaseButton>
      </div>

      <!-- Social Login -->
      <div class="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300/50" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-transparent text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <BaseButton
            variant="outline"
            colorScheme="gray"
            size="md"
            fullWidth
            class="bg-white/70 hover:bg-white/90 backdrop-blur-sm border-gray-200/50 hover:border-gray-300/50 transform hover:scale-[1.02] transition-all duration-300"
          >
            <template #leftIcon>
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </template>
            Google
          </BaseButton>

          <BaseButton
            variant="outline"
            colorScheme="gray"
            size="md"
            fullWidth
            class="bg-white/70 hover:bg-white/90 backdrop-blur-sm border-gray-200/50 hover:border-gray-300/50 transform hover:scale-[1.02] transition-all duration-300"
          >
            <template #leftIcon>
              <svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </template>
            Facebook
          </BaseButton>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseButton from '@/components/atoms/button/BaseButton.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const rememberMe = ref(false)
const successMessage = ref('')

// Get success message from route query
onMounted(() => {
  if (route.query.message) {
    successMessage.value = route.query.message as string
    // Clear the query parameter after showing message
    setTimeout(() => {
      router.replace({ query: {} })
    }, 100)
  }
})

const formState = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const validateForm = (): boolean => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  
  // Validate email
  if (!formState.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Validate password
  if (!formState.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (formState.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  try {
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Login:', formState, 'Remember:', rememberMe.value)
    
    // Success - redirect to dashboard
    router.push({ name: 'dashboard' })
  } catch (err: any) {
    // Handle specific error messages
    if (err.message.includes('email')) {
      errors.email = 'Account not found'
    } else if (err.message.includes('password')) {
      errors.password = 'Incorrect password'
    } else {
      errors.email = 'Login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Enhanced focus states */
.group:focus-within label {
  color: #2563eb;
}

.group:focus-within .absolute svg {
  color: #2563eb;
}
</style>
