<template>
  <div class="card card-border rounded-[0.5rem]"><slot/></div>
</template>

<style scoped>
.card-border {
  @apply bg-white border dark:border-zinc-900 dark:bg-gray-800;
}
.card {
  @apply bg-white;
}

body.dark .card {
  background: rgb(31 41 55);
}
</style>
