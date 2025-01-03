<template>
    <div class="modal">
        <div class="modal-content">
            <form @submit.prevent="submitForm">
                <div class="mt-2">
                    <label for="title" class="block mb-2 text-sm font-medium text-black-900">Título:</label>
                    <input type="text" id="title" v-model="localFormData.title" class="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 text-sm" required>
                </div>
                <div class="mt-2">
                    <label for="title" class="block mb-2 text-sm font-medium text-black-900">Inicio:</label>
                    <input type="datetime-local" id="title" v-model="localFormData.start" class="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 text-sm" required>
                </div>
                <div class="mt-2">
                    <label for="title" class="block mb-2 text-sm font-medium text-black-900">Fim:</label>
                    <input type="datetime-local" id="title" v-model="localFormData.end" class="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 text-sm" required>
                </div>
                <div class="flex gap-2 mt-4">
                    <button type="submit" class="py-2 px-3 rounded text-white font-medium bg-blue-600">{{ isEditing ? "Salvar" : "Criar" }}</button>
                    <button type="button" class="py-2 px-3 rounded text-white font-medium bg-red-600" v-if="isEditing" @click="deleteEvent">Excluir</button>
                    <button type="button" class="py-2 px-3 rounded text-white font-medium bg-yellow-500" @click="cancelForm">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>



</script>

<style scoped>

.event-hovered{
    cursor: pointer;
    background-color: #ffcc00;
    border-color: #ffa500;
    color: #000;
}

header {
      background: #0078d7;
      color: #fff;
      padding: 1em 0;
      text-align: center;
}

.modal {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 800px;
}
</style>