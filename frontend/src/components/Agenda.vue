<template>
    <div class="w-full h-full">
        <div v-if="showForm" class="modal">
            <div class="modal-content">
                <form @submit.prevent="submitForm">

                <div class="mt-2">
                    <label for="title" class="block mb-2 text-sm font-medium text-black-900">Título:</label>
                    <input type="text" id="title" v-model="formData.title" class="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 text-sm" required>
                </div>
                <div class="mt-2">
                    <label for="title" class="block mb-2 text-sm font-medium text-black-900">Inicio:</label>
                    <input type="datetime-local" id="title" v-model="formData.start" class="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 text-sm" required>
                </div>
                <div class="mt-2">
                    <label for="title" class="block mb-2 text-sm font-medium text-black-900">Fim:</label>
                    <input type="datetime-local" id="title" v-model="formData.end" class="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-50 text-sm">
                </div>
                <div class="flex gap-2 mt-4">
                    <button type="submit" class="py-2 px-3 rounded text-white font-medium bg-blue-600">{{isEditing ? 'Salvar': 'Criar'}}</button>
                    <button type="button" class="py-2 px-3 rounded text-white font-medium bg-red-600" v-if="isEditing" @click="deleteEvent">Excluir</button>
                    <button type="button" class="py-2 px-3 rounded text-white font-medium bg-yellow-500" @click="showForm = false">Cancelar</button>
                </div>
                </form>
            </div>
        </div>
        <!-- <EventForm 
            v-if="showForm"
            :eventData="formData"
            :isEditing="isEditing"
            @save="submitForm" 
            @delete="deleteEvent" 
            @cancel="cancelForm"
        /> -->
        <button @click="openCreateForm()" class="py-2 px-3 rounded text-white font-medium bg-blue-600">Criar Evento</button>
        <FullCalendarComponent class=""
            :options="calendarOptions"
        />
        
    </div>
</template>

<script setup>
import FullCalendarComponent from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import api from '../services/api';
import { ref, onMounted, reactive } from 'vue';
import EventForm from './EventForm.vue';



const date = ref(new Date())
const events = ref([])
const formData = reactive({title:"", start:"", end:""})
const selectedEvent = ref(null)
const showForm = ref(false)
const isEditing = ref(false)
  
const calendarOptions = ref({
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events:[],
    eventClick: (info) => handleEventClick(info),
    eventMouseEnter: (info) => {
      info.el.style.backgroundColor = '#376ad8';
      info.el.style.cursor = 'pointer';
      info.el.style.color = '#000';
    },
    eventMouseLeave: (info) => {
      info.el.style.backgroundColor = '';
      info.el.style.color = '';
    },
    locale: 'pt-br',
})


const formatDateForInput = (isoDate) => {
  const date = new Date(isoDate);

  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset)

  return date.toISOString().slice(0, 16);
};


const openEditForm = (event) => {
    isEditing.value = true
    selectedEvent.value = event
    formData.title = selectedEvent.value.title
    formData.start = formatDateForInput(selectedEvent.value.start)
    formData.end = formatDateForInput(new Date(selectedEvent.value.end).toISOString())
    showForm.value = true;
}
const handleEventClick = (info) => {
    const clickedEvent = events.value.find(
        (event) => event.id === info.event.id
    );
    if (clickedEvent) {
        openEditForm(clickedEvent);
    }
};

const resetFormData = () => {
  formData.title = "";
  formData.start = "";
  formData.end = "";
};

const fetchEvents = async () =>{
    try
    {
        const token = localStorage.getItem('token')
        const response = await api.get('/events', {headers:{Authorization:token}})
        events.value = response.data.events.map((event)=>({
            ...event,
            id:event._id
        }))
        calendarOptions.value.events = events.value
        
        
    }catch(err)
    {
        console.error('Erro ao buscar eventos:', err);
    }
}
const openCreateForm = () => {

  isEditing.value = false;
  resetFormData();
  showForm.value = true;
}

const cancelForm = () => {
  showForm.value = false;
  selectedEvent.value = null;
  resetFormData();
};

const submitForm = async () => {
    const token = localStorage.getItem('token')
    if (isEditing.value) {
        await api.put(`/events/${selectedEvent.value.id}`, formData,{headers:{Authorization:token}});
    } else {   
        
        await api.post("/events", formData, {headers:{Authorization:token}});
    }
    await fetchEvents();
    cancelForm();
};

const deleteEvent = async () => {
  const token = localStorage.getItem('token')
  if (selectedEvent.value?.id) {
    await api.delete(`/events/${selectedEvent.value.id}`, {headers:{Authorization:token}});
    await fetchEvents();
    cancelForm();
  }
};

onMounted(()=>{
    fetchEvents()
})

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
  height: 100%;
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

