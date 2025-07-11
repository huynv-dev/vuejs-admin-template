<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Tailwind CSS Debug Test</h1>
      
      <!-- Basic Colors & Typography -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-semibold text-blue-600 mb-4">Colors & Typography Test</h2>
        <p class="text-gray-700 mb-2">This should be gray text</p>
        <p class="text-red-500 mb-2">This should be red text</p>
        <p class="text-green-500 mb-2">This should be green text</p>
        <p class="text-blue-500 mb-2">This should be blue text</p>
      </div>

      <!-- Layout & Spacing -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-semibold text-purple-600 mb-4">Layout & Spacing Test</h2>
        <div class="flex space-x-4 mb-4">
          <div class="bg-red-200 p-4 rounded">Flex item 1</div>
          <div class="bg-green-200 p-4 rounded">Flex item 2</div>
          <div class="bg-blue-200 p-4 rounded">Flex item 3</div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-yellow-200 p-4 rounded text-center">Grid 1</div>
          <div class="bg-pink-200 p-4 rounded text-center">Grid 2</div>
          <div class="bg-indigo-200 p-4 rounded text-center">Grid 3</div>
        </div>
      </div>

      <!-- Buttons & Interactive -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-semibold text-green-600 mb-4">Interactive Elements Test</h2>
        <div class="space-x-4 mb-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Primary Button
          </button>
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Secondary Button
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Danger Button
          </button>
        </div>
      </div>

      <!-- Responsive Test -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-semibold text-orange-600 mb-4">Responsive Test</h2>
        <div class="block sm:hidden bg-red-100 p-4 rounded mb-2">
          Mobile only (should show on small screens)
        </div>
        <div class="hidden sm:block md:hidden bg-green-100 p-4 rounded mb-2">
          Tablet only (should show on medium screens)
        </div>
        <div class="hidden md:block bg-blue-100 p-4 rounded mb-2">
          Desktop and up (should show on large screens)
        </div>
      </div>

      <!-- Debug Info -->
      <div class="bg-gray-800 text-white p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Debug Information</h2>
        <p class="font-mono text-sm">If you see styled boxes above, Tailwind is working!</p>
        <p class="font-mono text-sm">If everything looks plain, Tailwind is NOT working.</p>
        
        <!-- CSS Check -->
        <div class="mt-4 p-4 border border-gray-600 rounded">
          <p class="text-yellow-300 mb-2">CSS Loading Check:</p>
          <div class="tailwind-test-marker bg-yellow-500 w-4 h-4 rounded"></div>
          <p class="text-sm mt-2">Yellow square above = Tailwind loaded</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('=== TAILWIND DEBUG ===')
  console.log('TestView loaded')
  
  // Check if Tailwind classes are applied
  const testElement = document.querySelector('.tailwind-test-marker')
  if (testElement) {
    const styles = window.getComputedStyle(testElement)
    console.log('Tailwind test marker styles:', {
      backgroundColor: styles.backgroundColor,
      width: styles.width,
      height: styles.height,
      borderRadius: styles.borderRadius
    })
    
    if (styles.backgroundColor === 'rgb(234, 179, 8)') {
      console.log('✅ Tailwind CSS is working!')
    } else {
      console.log('❌ Tailwind CSS is NOT working!')
      console.log('Expected backgroundColor: rgb(234, 179, 8)')
      console.log('Actual backgroundColor:', styles.backgroundColor)
    }
  }
  
  // Check if CSS file is loaded
  const stylesheets = Array.from(document.styleSheets)
  console.log('Loaded stylesheets:', stylesheets.length)
  
  stylesheets.forEach((sheet, index) => {
    try {
      console.log(`Stylesheet ${index}:`, sheet.href || 'inline', sheet.cssRules?.length || 0, 'rules')
    } catch (e) {
      console.log(`Stylesheet ${index}: Cannot access (CORS)`)
    }
  })
})
</script>

<style scoped>
/* Fallback styles if Tailwind fails */
.tailwind-test-marker {
  /* This should be overridden by Tailwind's bg-yellow-500 */
  background-color: red !important;
}
</style> 