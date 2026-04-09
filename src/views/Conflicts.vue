<script setup>
import { onMounted } from 'vue';
import { useConflictStore } from '../stores/conflict';
import ConflictCard from '../components/ConflictCard.vue';
import SearchBar from '../components/SearchBar.vue';
import FormConflict from '../components/FormConflict.vue';

const conflictStore = useConflictStore();

onMounted(async () => {
  if (conflictStore.conflicts.length === 0) {
    await conflictStore.getConflicts();
  }
});

</script>

<template>
  <div class="conflicts-page">
    <div class="page-header">
      <h2>Conflictos</h2>
      <SearchBar />
    </div>

    <FormConflict />

    <div v-if="conflictStore.loading" class="loading">
      Carregant conflictes...
    </div>

    <div v-else-if="conflictStore.error" class="error">
      {{ conflictStore.error }}
    </div>

    <div v-else-if="conflictStore.filteredConflicts.length === 0" class="empty">
       No s'han trobat conflictes
    </div>

    <ul v-else class="conflicts-list">
      <li v-for="conflict in conflictStore.filteredConflicts" :key="conflict.id">
        <ConflictCard :conflict="conflict" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.conflicts-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 2rem;
  color: #1f2937;
}

.conflicts-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
  color: #6b7280;
}

.error {
  color: #dc2626;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .page-header h2 {
    font-size: 1.5rem;
  }

  .conflicts-list {
    grid-template-columns: 1fr;
  }
}
</style>