<script setup>
import { ref } from 'vue';
import { useConflictStore } from '../stores/conflict';

const conflictStore = useConflictStore();

const formData = ref({
  name: '',
  description: '',
  startConflict: '',
  status: 'ACTIVE',
  countryId: []
});

const showForm = ref(false);

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.startConflict) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }

  await conflictStore.createConflict(formData.value);
  
  formData.value = {
    name: '',
    description: '',
    startConflict: '',
    status: 'ACTIVE',
    countryId: []
  };
  showForm.value = false;
};

const toggleForm = () => {
  showForm.value = !showForm.value;
};

</script>

<template>
  <div class="form-container">
    <button class="btn-create" @click="toggleForm">
      {{ showForm ? 'Cancelar' : 'Nuevo Conflicto' }}
    </button>

    <form v-if="showForm" @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name">Nombre del Conflicto *</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="ej: Guerra de Ucraïna"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Descripción del conflicto..."
          class="form-textarea"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="startDate">Fecha de Inicio *</label>
        <input
          id="startDate"
          v-model="formData.startConflict"
          type="date"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="status">Estado</label>
        <select v-model="formData.status" id="status" class="form-input">
          <option value="ACTIVE">Activo</option>
          <option value="FINISHED">Finalizado</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Crear Conflicto</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  margin-bottom: 30px;
}

.btn-create {
  padding: 10px 20px;
  background-color: #059669;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-create:hover {
  background-color: #047857;
}

.form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #4338ca;
}
</style>