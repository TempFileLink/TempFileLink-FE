<template>
  <div>{{ data }}</div>
  <div>{{ token }}</div>
</template>

<script lang="ts" setup>
const { data, token } = useAuth();
</script>
