<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConflictStore } from '../stores/conflict';

const route = useRoute();
const router = useRouter();
const conflictStore = useConflictStore();

const conflict = ref(null);

onMounted(async () => {
  const id = route.params.id;
  conflict.value = await conflictStore.getConflictById(id);
  
  if (!conflict.value) {
    router.push('/conflicts');
  }
});

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

</script>

<template>
  <div class="detail-page">
    <button class="btn-back" @click="$router.back()">← Tornar enrere</button>

    <div v-if="conflictStore.loading" class="loading">
      ⏳ Carregant detalls...
    </div>

    <div v-else-if="!conflict" class="error">
      ⚠️ Conflicte no trobat
    </div>

    <div v-else class="detail-container">
      <div class="detail-header">
        <h1>{{ conflict.name }}</h1>
        <span class="status" :class="conflict.status.toLowerCase()">
          {{ conflict.status === 'ACTIVE' ? '🟢 Actiu' : '⚫ Finalitzat' }}
        </span>
      </div>

      <div class="detail-content">
        <section class="section">
          <h2>Descripció</h2>
          <p>{{ conflict.description }}</p>
        </section>

        <section class="section">
          <h2>Informació</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Data d'Inici</label>
              <p>{{ formattedDate(conflict.startConflict) }}</p>
            </div>
            <div class="info-item">
              <label>Estat</label>
              <p>{{ conflict.status }}</p>
            </div>
          </div>
        </section>

        <section v-if="conflict.countryId && conflict.countryId.length > 0" class="section">
          <h2>Països Involucrats</h2>
          <div class="tags">
            <span v-for="id in conflict.countryId" :key="id" class="tag">
              País #{{ id }}
            </span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.btn-back {
  padding: 10px 20px;
  background-color: #e5e7eb;
  color: #1f2937;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 30px;
  transition: background-color 0.3s;
}

.btn-back:hover {
  background-color: #d1d5db;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
}

.error {
  color: #dc2626;
}

.detail-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 20px;
}

.detail-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #1f2937;
}

.status {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
}

.status.active {
  background-color: #d1fae5;
  color: #065f46;
}

.status.finished {
  background-color: #f3f4f6;
  color: #6b7280;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section {
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 20px;
}

.section:last-child {
  border-bottom: none;
}

.section h2 {
  margin: 0 0 15px 0;
  color: #374151;
  font-size: 1.3rem;
}

.section p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.info-item label {
  display: block;
  color: #9ca3af;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 5px;
}

.info-item p {
  margin: 0;
  color: #1f2937;
  font-weight: 500;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  display: inline-block;
  background-color: #e0e7ff;
  color: #4f46e5;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>