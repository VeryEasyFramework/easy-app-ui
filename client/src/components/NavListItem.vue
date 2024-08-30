<template>
  <div class="nav-list-item">
    <RouterLink :to="link">{{ label }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  link: string
}>()
</script>

<style>

.nav-list-item {
  a {
    color: var(--color-text);
    text-decoration: none;
    display: block;
    transition: color var(--snap-ease-slow);
  }

  &:hover {
    a {

      color: var(--color-primary);
    }

  }
}

</style>
