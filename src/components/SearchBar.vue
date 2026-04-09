<script setup>
import { computed } from 'vue';
import { useConflictStore } from '../stores/conflict';

const conflictStore = useConflictStore();

const searchValue = computed({
  get: () => conflictStore.searchQuery,
  set: (value) => {
    conflictStore.searchQuery = value;
  }
});

</script>

<template>
  <div class="search-container">
    <input
      v-model="searchValue"
      type="text"
      placeholder="Buscar conflictos..."
      class="search-input"
    />
    <span class="search-icon">🔍</span>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #4f46e5;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>