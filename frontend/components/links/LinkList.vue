<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <draggable 
      :model-value="links"
      @update:model-value="$emit('update:links', $event)"
      item-key="id"
      handle=".drag-handle"
      @start="$emit('dragStart')"
      @end="$emit('dragEnd')"
      :animation="300"
      class="divide-y divide-gray-200"
    >
      <template #header>
        <div class="bg-gray-50 px-6 py-3 grid grid-cols-5 gap-4">
          <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">Ordem</div>
          <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">Título</div>
          <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">URL</div>
          <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">Cliques</div>
          <div class="text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Ações</div>
        </div>
      </template>
 
      <template #item="{ element: link, index }">
        <div class="px-6 py-4 grid grid-cols-5 gap-4 items-center hover:bg-gray-50 transition-colors">
          <div class="flex items-center space-x-3">
            <button class="drag-handle text-gray-400 hover:text-gray-600 cursor-move">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <span class="font-medium text-gray-900">{{ index + 1 }}</span>
          </div>
 
          <div class="font-medium text-gray-900 truncate">{{ link.title }}</div>
 
          <div class="truncate">
            <a :href="link.url" 
               target="_blank" 
               class="text-blue-600 hover:text-blue-800 truncate inline-flex items-center gap-1 group">
              {{ link.url }}
              <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                   viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
            </a>
          </div>
 
          <div class="text-gray-500 font-medium">{{ link.clicks || 0 }}</div>
 
          <div class="flex justify-end space-x-2">
            <button @click="$emit('edit', link)" 
                    class="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            
            <button @click="$emit('delete', link.id)" 
                    class="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-all">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
 </template>
 
 <script setup>
 import draggable from 'vuedraggable';
 
 defineProps({
  links: {
    type: Array,
    required: true
  }
 });
 
 defineEmits(['update:links', 'dragStart', 'dragEnd', 'edit', 'delete']);
 </script>