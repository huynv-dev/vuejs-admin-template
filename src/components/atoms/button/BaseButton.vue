<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :href="as === 'a' ? href : undefined"
    :target="as === 'a' ? target : undefined"
    :disabled="as === 'button' ? isDisabled : undefined"
    :aria-disabled="as !== 'button' ? isDisabled : undefined"
    :aria-label="ariaLabel"
    :class="computedClasses"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Left Icon -->
    <span v-if="hasLeftIcon" :class="iconClasses">
      <slot name="leftIcon">
        <component :is="leftIcon" />
      </slot>
    </span>

    <!-- Loading Spinner -->
    <ButtonSpinner v-if="loading" :class="iconClasses" />

    <!-- Button Content -->
    <span :class="contentClasses">
      <slot />
    </span>

    <!-- Right Icon -->
    <span v-if="hasRightIcon" :class="iconClasses">
      <slot name="rightIcon">
        <component :is="rightIcon" />
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots, type Component } from 'vue'
import ButtonSpinner from './ButtonSpinner.vue'

// ---------------------
// ✅ Type Declaration
// ---------------------
interface Props {
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'subtle'
  colorScheme?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'gray'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean

  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean

  as?: 'button' | 'a' | 'div'
  href?: string
  target?: string

  leftIcon?: Component
  rightIcon?: Component
  ariaLabel?: string
  class?: string
}

// ---------------------
// ✅ Default Props
// ---------------------
const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  colorScheme: 'primary',
  size: 'md',
  type: 'button',
  as: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
})

// ---------------------
// ✅ Emits
// ---------------------
const emit = defineEmits<{
  (e: 'click', event: MouseEvent | KeyboardEvent): void
}>()

// ---------------------
// ✅ Logic & Computed
// ---------------------
const isDisabled = computed(() => props.disabled || props.loading)
const hasLeftIcon = computed(() => !!props.leftIcon || !!useSlots().leftIcon)
const hasRightIcon = computed(() => !!props.rightIcon || !!useSlots().rightIcon)

const baseClass = 'inline-flex items-center justify-center font-medium transition duration-200 select-none whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const sizeMap: Record<string, string> = {
  xs: 'h-7 px-2 text-xs gap-1 rounded-md',
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-md',
  lg: 'h-11 px-6 text-base gap-2 rounded-lg',
  xl: 'h-12 px-8 text-lg gap-2.5 rounded-lg',
}

const variantMap: Record<string, Record<string, string>> = {
  solid: {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 active:bg-primary-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500 active:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 active:bg-red-800',
    success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 active:bg-green-800',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-400 active:bg-yellow-700',
    gray: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500 active:bg-gray-300',
  },
  outline: {
    primary: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500 active:bg-primary-100',
    secondary: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500 active:bg-gray-100',
    danger: 'border-2 border-red-600 text-red-600 hover:bg-red-50 focus-visible:ring-red-500 active:bg-red-100',
    success: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500 active:bg-green-100',
    warning: 'border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-400 active:bg-yellow-100',
    gray: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500 active:bg-gray-100',
  },
  ghost: {
    primary: 'bg-transparent text-primary-600 hover:bg-primary-100 focus-visible:ring-primary-500 active:bg-primary-200',
    secondary: 'bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-500 active:bg-gray-200',
    danger: 'bg-transparent text-red-600 hover:bg-red-100 focus-visible:ring-red-500 active:bg-red-200',
    success: 'bg-transparent text-green-600 hover:bg-green-100 focus-visible:ring-green-500 active:bg-green-200',
    warning: 'bg-transparent text-yellow-600 hover:bg-yellow-100 focus-visible:ring-yellow-400 active:bg-yellow-200',
    gray: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 active:bg-gray-200',
  },
  link: {
    primary: 'bg-transparent text-primary-600 hover:underline p-0 h-auto focus-visible:ring-primary-500',
    secondary: 'bg-transparent text-gray-600 hover:underline p-0 h-auto focus-visible:ring-gray-500',
    danger: 'bg-transparent text-red-600 hover:underline p-0 h-auto focus-visible:ring-red-500',
    success: 'bg-transparent text-green-600 hover:underline p-0 h-auto focus-visible:ring-green-500',
    warning: 'bg-transparent text-yellow-600 hover:underline p-0 h-auto focus-visible:ring-yellow-400',
    gray: 'bg-transparent text-gray-700 hover:underline p-0 h-auto focus-visible:ring-gray-500',
  },
  subtle: {
    primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200 focus-visible:ring-primary-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-500',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200 focus-visible:ring-red-500',
    success: 'bg-green-100 text-green-700 hover:bg-green-200 focus-visible:ring-green-500',
    warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus-visible:ring-yellow-400',
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-500',
  },
}

const computedClasses = computed(() => {
  return [
    baseClass,
    sizeMap[props.size],
    variantMap[props.variant]?.[props.colorScheme],
    props.fullWidth && 'w-full',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

const iconClasses = computed(() => {
  const map = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }
  return `flex-shrink-0 ${map[props.size]}`
})

const contentClasses = computed(() => {
  return props.loading ? 'opacity-70 flex items-center' : 'flex items-center'
})

// ---------------------
// ✅ Event Handlers
// ---------------------
const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (isDisabled.value) return
  const key = event.key
  if (props.as !== 'button' && (key === 'Enter' || key === ' ')) {
    event.preventDefault()
    emit('click', event)
  }
}
</script>
