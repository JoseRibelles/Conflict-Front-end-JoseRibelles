<script setup>
import { computed } from 'vue';

const props = defineProps({
  conflict: {
    type: Object,
    required: true
  }
});

const statusColor = computed(() => {
  if (props.conflict.status === 'ACTIVE') return '#059669';
  return '#9ca3af';
});

const statusText = computed(() => {
  return props.conflict.status === 'ACTIVE' ? 'Activo' : 'Finalizado';
});

const formattedDate = computed(() => {
  const date = new Date(props.conflict.startConflict);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

</script>

<template>
  <div class="card" v-if="conflict">
    <div class="card-header">
      <h3 class="conflict-name">{{ conflict.name }}</h3>
      <span class="status-badge" :style="{ backgroundColor: statusColor }">
        {{ statusText }}
      </span>
    </div>
    
    <div class="card-body">
      <p class="description">{{ conflict.description }}</p>
      
      <div class="info-group">
        <label class="label">Inicio del conflicto</label>
        <p class="value">{{ formattedDate }}</p>
      </div>
    </div>

    <div class="card-footer">
      <router-link :to="{ name: 'conflict-detail', params: { id: conflict.id } }">
        <button class="btn-details">Ver detalles</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.conflict-name {
  margin: 0;
  font-size: 1.2rem;
  color: #1f2937;
}

.status-badge {
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.card-body {
  margin-bottom: 15px;
}

.description {
  color: #6b7280;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.info-group {
  margin-bottom: 10px;
}

.label {
  font-size: 0.9rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.value {
  margin: 4px 0 0 0;
  color: #374151;
}

.card-footer {
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
}

.btn-details {
  width: 100%;
  padding: 10px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-details:hover {
  background-color: #4338ca;
}
</style>