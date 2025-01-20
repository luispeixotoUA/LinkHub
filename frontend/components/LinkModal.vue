<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h3 class="text-xl font-bold mb-4">
        {{ link?.id ? "Editar Link" : "Adicionar Link" }}
      </h3>
      <form @submit.prevent="save">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Título</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Título do link"
            class="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">URL</label>
          <input
            v-model="form.url"
            type="url"
            placeholder="https://exemplo.com"
            class="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  link: Object,
});

const emit = defineEmits(["close", "save"]);

const form = ref({
  title: "",
  url: "",
});

// Inicializa o formulário ao abrir o modal
watch(
  () => props.link,
  (newLink) => {
    form.value = newLink ? { ...newLink } : { title: "", url: "" };
  },
  { immediate: true }
);

const save = () => {
  emit("save", { ...form.value });
};
</script>