<template>
    <div>
      <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Agenda</h1>
        <button @click="logout">Sair</button>
      </header>
        <div class="max-w-5xl my-10 mx-auto">
            <Agenda/>
        </div>
    </div>
</template>

<script setup>
import Agenda from '../components/Agenda.vue';
import { onMounted } from 'vue';
import axios from 'axios';
import { useAuth } from '../composables/useAuth';


const {logout} = useAuth()


onMounted(async ()=>{
  const response = await axios.get('user')
  console.log(response)
})

</script>

<style  scoped>

body {
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
background-color: #f4f4f9;
}
.calendar {
display: grid;
grid-template-columns: repeat(7, 1fr);
gap: 10px;
padding: 20px;
}
.day {
background: #fff;
border: 1px solid #ccc;
padding: 20px;
text-align: center;
position: relative;
}
.day.event {
background: #ffeb3b;
}
.add-event-btn {
position: fixed;
bottom: 20px;
right: 20px;
background: #0078d7;
color: #fff;
border: none;
padding: 10px 20px;
border-radius: 50px;
cursor: pointer;
font-size: 18px;
}
</style>