<template>
  <div
    class="fixed inset-0 -top-10 bg-black bg-opacity-50 flex items-center justify-center w-[100vw] h-[105vh]"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">
        {{ link ? "Editar Link" : "Adicionar Link" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Título</label
            >
            <input
              v-model="formData.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">URL</label>
            <input
              v-model="formData.url"
              type="url"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  link: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

const formData = ref({
  title: "",
  url: "",
});

onMounted(() => {
  if (props.link) {
    formData.value = { ...props.link };
  }
});

const handleSubmit = () => {
  emit("save", formData.value);
};
</script>
