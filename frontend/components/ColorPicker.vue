<template>
  <div class="relative">
    <button 
      @click="showPicker = true"
      class="w-full h-12 rounded-lg border flex items-center gap-2 px-3"
    >
      <div 
        class="w-6 h-6 rounded"
        :style="{ backgroundColor: modelValue || '#f3f4f6' }"
      ></div>
      <span class="text-sm">{{ modelValue || 'Selecionar cor' }}</span>
    </button>

    <Modal v-if="showPicker" @close="showPicker = false">
      <div class="p-6 w-[600px]">
        <h3 class="text-lg font-medium mb-6">Selecionar Cor</h3>
        
        <div class="space-y-6">
          <!-- Color Family Selector -->
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button 
              v-for="(shades, color) in tailwindColors" 
              :key="color"
              @click="selectedFamily = color"
              class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
              :class="[
                selectedFamily === color 
                  ? `bg-${color}-100 text-${color}-700`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ color }}
            </button>
          </div>

          <!-- Shades Grid -->
          <div class="grid grid-cols-5 gap-3">
            <button 
              v-for="(hex, shade) in tailwindColors[selectedFamily]"
              :key="shade"
              @click="selectColor(hex)"
              class="group relative aspect-square rounded-lg border hover:ring-2 hover:ring-offset-2 transition-all"
              :style="{ backgroundColor: hex }"
            >
              <span class="absolute inset-0 flex items-center justify-center text-sm font-medium text-white 
                         opacity-0 group-hover:opacity-100 transition-opacity">
                {{ shade }}
              </span>
            </button>
          </div>

          <!-- Selected Color Preview -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div 
              class="w-12 h-12 rounded-lg shadow-sm" 
              :style="{ backgroundColor: selectedValue }"
            ></div>
            <div>
              <div class="text-sm font-medium">{{ selectedValue }}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { tailwindColors } from '~/utils/tailwindColors'
import Modal from '~/components/Modal.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const showPicker = ref(false)
const selectedFamily = ref('blue')
const selectedValue = ref(props.modelValue || '#f3f4f6')

function selectColor(hex) {
  selectedValue.value = hex
  emit('update:modelValue', hex)
  showPicker.value = false
}

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})
</script>