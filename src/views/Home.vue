<script setup>
import { onMounted } from 'vue';
import { useConflictStore } from '../stores/conflict';

const conflictStore = useConflictStore();

onMounted(async () => {
  await conflictStore.getConflicts();
});

</script>

<template>
  <div class="home">
    <section class="hero">
      <h1>Global Conflict Monitor</h1>
      <p>Sistema de seguimiento y análisis de conflictos internacionales</p>
    </section>

    <section class="stats">
      <div class="stat-card">
        <h3>Total de Conflictos</h3>
        <p class="stat-number">{{ conflictStore.conflicts.length }}</p>
      </div>
      <div class="stat-card active">
        <h3>Conflictos Activos</h3>
        <p class="stat-number">{{ conflictStore.activeConflictsCount }}</p>
      </div>
      <div class="stat-card">
        <h3>Finalizados</h3>
        <p class="stat-number">{{ conflictStore.conflicts.length - conflictStore.activeConflictsCount }}</p>
      </div>
    </section>

    <section class="cta">
      <router-link to="/conflicts">
        <button class="btn-primary">Ver Todos los Conflictos</button>
      </router-link>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero {
  text-align: center;
  margin-bottom: 50px;
}

.hero h1 {
  font-size: 2.5rem;
  margin: 0 0 15px 0;
  color: #1f2937;
}

.hero p {
  font-size: 1.2rem;
  color: #6b7280;
  margin: 0;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0 0 15px 0;
  color: #6b7280;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-number {
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
}

.stat-card.active {
  border-left: 4px solid #059669;
}

.cta {
  text-align: center;
}

.btn-primary {
  padding: 15px 40px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #4338ca;
}
</style>