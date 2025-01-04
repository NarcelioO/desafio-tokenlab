<template>
    <div class="fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ">
        <div class="bg-white p-4 rounded-xl w-[800px]">
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
                    <input type="datetime-local" id="title" v-model="localFormData.end" class="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 text-sm" >
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
import { defineEmits, reactive } from 'vue';


const {eventData, isEditing} = defineProps(['eventData', 'isEditing'])
const localFormData = reactive({...eventData})



const emit = defineEmits(['save', 'delete', 'cancel'])

const submitForm = () =>{
    emit('save', localFormData)
}
const cancelForm = () =>{
    emit('cancel')
}
const deleteEvent = () =>{
    emit('delete', localFormData)
}

</script>

<style scoped>


</style>