<template>
    <div class="w-full h-full">
        <EventForm 
            v-if="showForm"
            :eventData="formData"
            :isEditing="isEditing"
            @save="submitForm" 
            @delete="deleteEvent" 
            @cancel="cancelForm"
        />
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
        calendarOptions.value.events = []
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

const submitForm = async (data) => {
    const token = localStorage.getItem('token')
    if (isEditing.value) {
        await api.put(`/events/${selectedEvent.value.id}`, data,{headers:{Authorization:token}});
    } else {   
        
        await api.post("/events", data, {headers:{Authorization:token}});
    }
    await fetchEvents();
    cancelForm();
};

// const deleteEvent = async () => {
//   const token = localStorage.getItem('token')
//   if (selectedEvent.value?.id) {
//     await api.delete(`/events/${selectedEvent.value.id}`, {headers:{Authorization:token}});
//     await fetchEvents();
//     cancelForm();
//   }
// };
const deleteEvent = async () => {
    console.log(selectedEvent.value.id)
    console.log(localStorage.getItem('token'))
    const token = localStorage.getItem('token')
    try{
        await api.delete(`events/${selectedEvent.value.id}`, {headers:{Authorization:token}})
        await fetchEvents()
        cancelForm()
    }catch(e){
        console.log('erro ao deletar evento', e)
    }
//   if (selectedEvent.value?.id) {
//     await api.delete(`/events/${selectedEvent.value.id}`, {headers:{Authorization:token}});
//     await fetchEvents();
//     cancelForm();
//   }
};

onMounted(()=>{
    fetchEvents()
})

</script>

<style scoped>


</style>

