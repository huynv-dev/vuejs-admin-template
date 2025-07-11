<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="inputClasses"
    v-bind="$attrs"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'error' | 'success'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  size: 'md',
  variant: 'default',
  fullWidth: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

defineOptions({
  inheritAttrs: false
})

const inputClasses = computed(() => {
  const baseClasses = [
    'block',
    'border',
    'rounded-md',
    'shadow-sm',
    'placeholder-gray-400',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'transition-colors',
    'disabled:bg-gray-50',
    'disabled:text-gray-500',
    'disabled:cursor-not-allowed'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  // Variant classes
  const variantClasses = {
    default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    error: 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 text-green-900 placeholder-green-300 focus:border-green-500 focus:ring-green-500'
  }

  // Full width
  const widthClasses = props.fullWidth ? 'w-full' : ''

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    widthClasses
  ].filter(Boolean).join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script> 