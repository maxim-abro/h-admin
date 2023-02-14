<template>
  <div class="card card-border"><slot/></div>
</template>

<style scoped>
.card-border {
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  border-width: 1px;
}
.card-border,
.dark .card-border {
  --tw-border-opacity: 1;
}
.card {
  background-color: rgba(255,255,255,var(--tw-bg-opacity));
  border-radius: 0.5rem;
}
</style>
