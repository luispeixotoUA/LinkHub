<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2 w-full sm:w-auto">

        
        <!-- Refresh Button -->
        <button
          @click="fetchLinks"
          class="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 
                 hover:border-gray-300 transition-all focus:ring-2 focus:ring-gray-200"
          title="Atualizar links"
        >
          <svg class="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
 
      <!-- Add Button -->
      <button
        @click="showAddModal = true"
        class="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white 
               font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-600 
               transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <div class="flex items-center justify-center gap-2">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
          </svg>
          <span>Adicionar Link</span>
        </div>
      </button>
    </div>
 
    <!-- Loading State -->
    <div v-if="loading" 
         class="flex justify-center items-center py-8 text-gray-500">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      <span>Carregando links...</span>
    </div>
    
    <!-- Error State -->
    <div v-if="error" 
         class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
      </svg>
      {{ error }}
    </div>
 
    <!-- Links List -->
    <div class="bg-white rounded-lg shadow">
      <LinkList
        v-if="!loading && !error && links.length > 0"
        v-model:links="links"
        @dragStart="drag = true"
        @dragEnd="handleDragEnd"
        @edit="editLink"
        @delete="deleteLink"
        :sortable="true"
      />
 
      <!-- Empty State -->
      <div v-if="!loading && !error && links.length === 0" 
           class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum link encontrado</h3>
        <p class="mt-1 text-sm text-gray-500">Comece adicionando seu primeiro link!</p>
      </div>
    </div>
 
    <!-- Modal -->
    <LinkModal
      v-if="showAddModal"
      :link="editingLink"
      @close="closeModal"
      @save="saveLink"
    />
  </div>
 </template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import LinkList from '~/components/links/LinkList.vue';
import { linkService } from '~/services/linkService';

const route = useRoute();
const searchQuery = ref('');
const showAddModal = ref(false);
const editingLink = ref(null);
const drag = ref(false);
const links = ref([]);
const loading = ref(true);
const error = ref(null);

// Buscar links
const fetchLinks = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const { token } = useAuth();
    // Espera até o token estar disponível
    await new Promise(r => setTimeout(r, 100));
    
    if (!token.value) {
      throw new Error('Token não disponível');
    }

    const data = await linkService.getAll();
    links.value = Array.isArray(data) ? data : [];
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Filtrar links
const filteredLinks = computed(() => {
  console.log('Filtrando links:', links.value);
  if (!searchQuery.value) return links.value;
  const query = searchQuery.value.toLowerCase();
  return links.value.filter(link => 
    link.title.toLowerCase().includes(query) || 
    link.url.toLowerCase().includes(query)
  );
});

// Ações CRUD
const saveLink = async (linkData) => {
  try {
    if (editingLink.value) {
      await linkService.update(editingLink.value.id, linkData);
    } else {
      await linkService.create(linkData);
    }
    await fetchLinks();
    closeModal();
  } catch (err) {
    alert('Erro ao salvar: ' + err.message);
  }
};

const deleteLink = async (id) => {
  if (!confirm('Confirmar exclusão?')) return;
  try {
    await linkService.delete(id);
    await fetchLinks();
  } catch (err) {
    alert('Erro ao excluir: ' + err.message);
  }
};

// Helpers
const editLink = (link) => {
  editingLink.value = { ...link };
  showAddModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
  editingLink.value = null;
};

const handleDragEnd = async () => {
  drag.value = false;
  try {
    const linkOrders = links.value.map((link, index) => ({
      id: link.id,
      order: index + 1
    }));
    
    await linkService.updateOrder(linkOrders);
    await fetchLinks();
  } catch (error) {
    console.error('Erro ao atualizar ordem:', error);
  }
};

onMounted(() => {
  nextTick(fetchLinks);
});

// Recarregar em mudanças
watch(() => route.fullPath, fetchLinks);

if (process.client) {
  window.addEventListener('focus', fetchLinks);
  onUnmounted(() => window.removeEventListener('focus', fetchLinks));
}
</script>

<style>
/* Animações do drag and drop */
.sortable-ghost {
  opacity: 0.5;
  background: #f3f4f6;
  transform: scale(0.98);
  transition: all 0.3s ease;
}

.sortable-drag {
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
  transition: all 0.3s ease;
}

/* Animações do modal */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Animações gerais */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

/* Estilo do handle de arrasto */
.drag-handle {
  cursor: move;
  user-select: none;
  padding: 2px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.drag-handle:hover {
  background: #f3f4f6;
  transform: scale(1.1);
}

/* Hover states mais suaves */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
  transition: all 0.3s ease;
}

/* Animação para os itens se moverem na lista */
.list-group-item {
  transition: all 0.5s ease;
}

/* Efeito de elevação ao arrastar */
.elevation-1 {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.elevation-2 {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

/* Animação para os itens se moverem */
.flip-list-move {
  transition: transform 0.5s ease;
}

/* Animação para o item sendo arrastado */
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

/* Animação para o espaço onde o item será solto */
.sortable-chosen {
  background: #e5f3ff;
  transition: background-color 0.3s ease;
}
</style> 