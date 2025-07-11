<template>
  <div :class="fieldClasses">
    <BaseLabel
      v-if="label"
      :for="inputId"
      :size="size"
      :required="required"
      :disabled="disabled"
      class="mb-1"
    >
      {{ label }}
    </BaseLabel>
    
    <BaseInput
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      :variant="inputVariant"
      :full-width="fullWidth"
      v-bind="$attrs"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    
    <p
      v-if="errorMessage || helperText"
      :class="messageClasses"
    >
      {{ errorMessage || helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseLabel from '../atoms/label/BaseLabel.vue'
import BaseInput from '../atoms/input/BaseInput.vue'
import type { InputProps } from '../atoms/input/BaseInput.vue'

export interface FormFieldProps extends Omit<InputProps, 'variant'> {
  label?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<FormFieldProps>(), {
  size: 'md',
  fullWidth: true,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

defineOptions({
  inheritAttrs: false
})

const isFocused = ref(false)

const inputId = computed(() => props.id || `field-${Math.random().toString(36).substr(2, 9)}`)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value || '')
})

const inputVariant = computed(() => {
  if (props.errorMessage) return 'error'
  return 'default'
})

const fieldClasses = computed(() => {
  const baseClasses = ['space-y-1']
  
  if (props.fullWidth) {
    baseClasses.push('w-full')
  }
  
  return baseClasses.join(' ')
})

const messageClasses = computed(() => {
  const baseClasses = ['text-sm', 'mt-1']
  
  if (props.errorMessage) {
    baseClasses.push('text-red-600')
  } else {
    baseClasses.push('text-gray-500')
  }
  
  return baseClasses.join(' ')
})

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}
</script> 