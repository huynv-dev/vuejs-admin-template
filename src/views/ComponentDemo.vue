<template>
  <div class="max-w-7xl mx-auto p-8 space-y-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Design System Components</h1>
      <p class="text-lg text-gray-600">
        Professional button system following design system best practices
      </p>
    </div>
    
    <!-- Button Variants Section -->
    <section class="space-y-8">
      <div>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Button Variants</h2>
        <p class="text-gray-600 mb-8">
          Complete button system with 5 variants × 6 color schemes × 5 sizes = 150+ combinations
        </p>
      </div>
      
      <!-- Solid Buttons -->
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <h3 class="text-xl font-semibold mb-6">Solid Buttons</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <BaseButton variant="solid" color-scheme="primary">Primary</BaseButton>
          <BaseButton variant="solid" color-scheme="secondary">Secondary</BaseButton>
          <BaseButton variant="solid" color-scheme="success">Success</BaseButton>
          <BaseButton variant="solid" color-scheme="danger">Danger</BaseButton>
          <BaseButton variant="solid" color-scheme="warning">Warning</BaseButton>
          <BaseButton variant="solid" color-scheme="gray">Gray</BaseButton>
        </div>
      </div>

      <!-- Outline Buttons -->
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <h3 class="text-xl font-semibold mb-6">Outline Buttons</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <BaseButton variant="outline" color-scheme="primary">Primary</BaseButton>
          <BaseButton variant="outline" color-scheme="secondary">Secondary</BaseButton>
          <BaseButton variant="outline" color-scheme="success">Success</BaseButton>
          <BaseButton variant="outline" color-scheme="danger">Danger</BaseButton>
          <BaseButton variant="outline" color-scheme="warning">Warning</BaseButton>
          <BaseButton variant="outline" color-scheme="gray">Gray</BaseButton>
        </div>
      </div>

      <!-- Ghost Buttons -->
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <h3 class="text-xl font-semibold mb-6">Ghost Buttons</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <BaseButton variant="ghost" color-scheme="primary">Primary</BaseButton>
          <BaseButton variant="ghost" color-scheme="secondary">Secondary</BaseButton>
          <BaseButton variant="ghost" color-scheme="success">Success</BaseButton>
          <BaseButton variant="ghost" color-scheme="danger">Danger</BaseButton>
          <BaseButton variant="ghost" color-scheme="warning">Warning</BaseButton>
          <BaseButton variant="ghost" color-scheme="gray">Gray</BaseButton>
        </div>
      </div>

      <!-- Link Buttons -->
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <h3 class="text-xl font-semibold mb-6">Link Buttons</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <BaseButton variant="link" color-scheme="primary">Primary Link</BaseButton>
          <BaseButton variant="link" color-scheme="secondary">Secondary Link</BaseButton>
          <BaseButton variant="link" color-scheme="success">Success Link</BaseButton>
          <BaseButton variant="link" color-scheme="danger">Danger Link</BaseButton>
          <BaseButton variant="link" color-scheme="warning">Warning Link</BaseButton>
          <BaseButton variant="link" color-scheme="gray">Gray Link</BaseButton>
        </div>
      </div>

      <!-- Subtle Buttons -->
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <h3 class="text-xl font-semibold mb-6">Subtle Buttons</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <BaseButton variant="subtle" color-scheme="primary">Primary</BaseButton>
          <BaseButton variant="subtle" color-scheme="secondary">Secondary</BaseButton>
          <BaseButton variant="subtle" color-scheme="success">Success</BaseButton>
          <BaseButton variant="subtle" color-scheme="danger">Danger</BaseButton>
          <BaseButton variant="subtle" color-scheme="warning">Warning</BaseButton>
          <BaseButton variant="subtle" color-scheme="gray">Gray</BaseButton>
        </div>
      </div>
    </section>

    <!-- Button Sizes -->
    <section class="space-y-8">
      <div>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Button Sizes</h2>
        <p class="text-gray-600 mb-8">Five different sizes to fit any use case</p>
      </div>
      
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <div class="flex flex-wrap items-center gap-4">
          <BaseButton size="xs">Extra Small</BaseButton>
          <BaseButton size="sm">Small</BaseButton>
          <BaseButton size="md">Medium</BaseButton>
          <BaseButton size="lg">Large</BaseButton>
          <BaseButton size="xl">Extra Large</BaseButton>
        </div>
      </div>
    </section>

    <!-- Button States -->
    <section class="space-y-8">
      <div>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Button States</h2>
        <p class="text-gray-600 mb-8">All interactive states for accessibility and UX</p>
      </div>
      
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="space-y-3">
            <h4 class="font-medium text-gray-700">Normal</h4>
            <BaseButton>Normal Button</BaseButton>
          </div>
          <div class="space-y-3">
            <h4 class="font-medium text-gray-700">Loading</h4>
            <BaseButton :loading="true">Loading...</BaseButton>
          </div>
          <div class="space-y-3">
            <h4 class="font-medium text-gray-700">Disabled</h4>
            <BaseButton :disabled="true">Disabled</BaseButton>
          </div>
          <div class="space-y-3">
            <h4 class="font-medium text-gray-700">Full Width</h4>
            <BaseButton :full-width="true">Full Width</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Button with Icons -->
    <section class="space-y-8">
      <div>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Buttons with Icons</h2>
        <p class="text-gray-600 mb-8">Icon slots for enhanced visual communication</p>
      </div>
      
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Left Icon</h4>
            <BaseButton>
              <template #leftIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </template>
              Add Item
            </BaseButton>
          </div>
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Right Icon</h4>
            <BaseButton>
              Continue
              <template #rightIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </template>
            </BaseButton>
          </div>
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Both Icons</h4>
            <BaseButton>
              <template #leftIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </template>
              Chat
              <template #rightIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </template>
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Polymorphic Usage -->
    <section class="space-y-8">
      <div>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Polymorphic Usage</h2>
        <p class="text-gray-600 mb-8">Same styling, different HTML elements</p>
      </div>
      
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">As Button</h4>
            <BaseButton as="button">Button Element</BaseButton>
          </div>
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">As Link</h4>
            <BaseButton as="a" href="#" target="_blank">Link Element</BaseButton>
          </div>
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">As Div</h4>
            <BaseButton as="div">Div Element</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Field Demo -->
    <section class="space-y-8">
      <div>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Form Components</h2>
        <p class="text-gray-600 mb-8">Complete form field components with validation</p>
      </div>
      
      <div class="bg-white p-8 rounded-xl border border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            v-model="formData.name"
            label="Full Name"
            placeholder="Enter your full name"
            :required="true"
            helper-text="This field is required"
          />
          <FormField
            v-model="formData.email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            :error-message="emailError"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/atoms/button/BaseButton.vue'
import FormField from '@/components/molecules/FormField.vue'

const formData = ref({
  name: '',
  email: ''
})

const emailError = computed(() => {
  if (formData.value.email && !formData.value.email.includes('@')) {
    return 'Please enter a valid email address'
  }
  return ''
})
</script> 