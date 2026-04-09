<script setup>

</script>

<template>
  <header class="header">
    <div class="container">
      <h1 class="title">Global Conflict Monitor</h1>
      <nav>
        <ul class="nav-list">
          <li>
            <router-link class="link" to="/">Home</router-link>
          </li>
          <li>
            <router-link class="link" to="/conflicts">Conflicts</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #000022;
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  margin: 0 0 20px 0;
  font-size: 1.8rem;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.link:hover {
  color: #4f46e5;
}
</style>