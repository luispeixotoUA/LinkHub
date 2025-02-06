<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-semibold mb-6">Configurações</h2>
    
    <div class="max-w-2xl space-y-8">
      <!-- Preferências -->
      <section>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Preferências</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium">Notificações por Email</h4>
              <p class="text-sm text-gray-500">Receba atualizações sobre seus links</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium">Tema Escuro</h4>
              <p class="text-sm text-gray-500">Alterar aparência do painel</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.darkMode" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </section>

      <!-- Segurança -->
      <section>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Segurança</h3>
        <div class="space-y-4">
          <button 
            @click="changePassword"
            class="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50"
          >
            Alterar Senha
            <span class="float-right">→</span>
          </button>
          
          <button 
            @click="enable2FA"
            class="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50"
          >
            Ativar Autenticação em Dois Fatores
            <span class="float-right">→</span>
          </button>
        </div>
      </section>

      <!-- Conta -->
      <section>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Conta</h3>
        <button 
          @click="deleteAccount"
          class="text-red-600 hover:text-red-700"
        >
          Excluir minha conta
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
const settings = ref({
  emailNotifications: true,
  darkMode: false
});

const changePassword = () => {
  alert('Funcionalidade em desenvolvimento');
};

const enable2FA = () => {
  alert('Funcionalidade em desenvolvimento');
};

const deleteAccount = () => {
  if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
    alert('Funcionalidade em desenvolvimento');
  }
};
</script> 