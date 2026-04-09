import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useConflictStore = defineStore("conflicts", () => {
  const API_URL = "/api/v1";
  const conflicts = ref([]);
  const countries = ref([]);
  const factions = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref("");

  const filteredConflicts = computed(() => {
    if (!searchQuery.value) return conflicts.value;
    return conflicts.value.filter(conflict =>
      conflict.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const activeConflictsCount = computed(() => {
    return conflicts.value.filter(c => c.status === "ACTIVE").length;
  });

  const getConflicts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/conflicts`);
      if (!response.ok) throw new Error("Error al cargar conflictos");
      const data = await response.json();
      conflicts.value = data;
    } catch (e) {
      error.value = e.message;
      console.error("Error al obtener conflictos:", e);
    } finally {
      loading.value = false;
    }
  };

  const getConflictById = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/conflicts/${id}`);
      if (!response.ok) throw new Error("Conflicto no encontrado");
      const data = await response.json();
      return data;
    } catch (e) {
      error.value = e.message;
      console.error("Error al obtener conflicto:", e);
    } finally {
      loading.value = false;
    }
  };

  // Acción: crear nuevo conflicto
  const createConflict = async (newConflict) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/conflicts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newConflict)
      });
      if (!response.ok) throw new Error("Error al crear conflicto");
      const data = await response.json();
      conflicts.value.push(data);
      return data;
    } catch (e) {
      error.value = e.message;
      console.error("Error al crear conflicto:", e);
    } finally {
      loading.value = false;
    }
  };

  const getCountries = async () => {
    try {
      const response = await fetch(`${API_URL}/countries`);
      if (!response.ok) throw new Error("Error al cargar países");
      const data = await response.json();
      countries.value = data;
    } catch (e) {
      console.error("Error al obtener países:", e);
    }
  };

  const getFactions = async () => {
    try {
      const response = await fetch(`${API_URL}/factions`);
      if (!response.ok) throw new Error("Error al cargar facciones");
      const data = await response.json();
      factions.value = data;
    } catch (e) {
      console.error("Error al obtener facciones:", e);
    }
  };

  return {
    conflicts,
    countries,
    factions,
    loading,
    error,
    searchQuery,
    filteredConflicts,
    activeConflictsCount,
    getConflicts,
    getConflictById,
    createConflict,
    getCountries,
    getFactions
  };
}, {
  persist: true
});