<template>
  <label :class="labelClasses">
    <input
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled"
      :class="checkboxClasses"
      @change="handleChange"
    />
    <span v-if="$slots.default" :class="textClasses">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface CheckboxProps {
  modelValue?: boolean | string | number
  trueValue?: boolean | string | number
  falseValue?: boolean | string | number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary'
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  trueValue: true,
  falseValue: false,
  disabled: false,
  size: 'md',
  variant: 'primary'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  change: [event: Event]
}>()

const isChecked = computed(() => {
  return props.modelValue === props.trueValue
})

const labelClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'cursor-pointer'
  ]

  if (props.disabled) {
    baseClasses.push('cursor-not-allowed', 'opacity-50')
  }

  return baseClasses.join(' ')
})

const checkboxClasses = computed(() => {
  const baseClasses = [
    'rounded',
    'border',
    'border-gray-300',
    'text-primary-600',
    'shadow-sm',
    'focus:border-primary-500',
    'focus:ring-primary-500',
    'focus:ring-2',
    'focus:ring-offset-2'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('checked:bg-primary-600', 'checked:border-primary-600')
  }

  if (props.disabled) {
    baseClasses.push('disabled:bg-gray-50', 'disabled:border-gray-200', 'disabled:cursor-not-allowed')
  }

  return [
    ...baseClasses,
    sizeClasses[props.size]
  ].join(' ')
})

const textClasses = computed(() => {
  const baseClasses = ['select-none']

  // Size classes
  const sizeClasses = {
    sm: 'ml-2 text-sm',
    md: 'ml-2 text-sm',
    lg: 'ml-3 text-base'
  }

  return [
    ...baseClasses,
    sizeClasses[props.size]
  ].join(' ')
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = target.checked ? props.trueValue : props.falseValue
  emit('update:modelValue', newValue)
  emit('change', event)
}
</script> 