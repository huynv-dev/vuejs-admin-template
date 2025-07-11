<template>
  <label
    :for="for"
    :class="labelClasses"
  >
    <slot />
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface LabelProps {
  for?: string
  size?: 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<LabelProps>(), {
  size: 'md',
  weight: 'medium',
  required: false,
  disabled: false
})

const labelClasses = computed(() => {
  const baseClasses = ['block']

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }

  // Weight classes
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  // Color classes
  const colorClasses = props.disabled ? 'text-gray-400' : 'text-gray-700'

  return [
    ...baseClasses,
    sizeClasses[props.size],
    weightClasses[props.weight],
    colorClasses
  ].join(' ')
})
</script> 