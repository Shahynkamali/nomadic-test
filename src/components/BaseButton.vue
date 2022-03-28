<script setup lang="ts">
interface Props {
  fullWidth?: boolean;
  outlined?: boolean;
  onClick?: () => void;
}
defineProps<Props>();
</script>
<template>
  <button
    @click="onClick"
    class="button"
    :class="[outlined ? 'button--outlined' : 'button---base', fullWidth ? 'button--fullWidth' : '']"
  >
    <slot />
  </button>
</template>

<style scoped lang="less">
.button {
  border-radius: 21.5px;
  padding: 12px;
  outline: none;
  display: inline-flex;
  justify-content: center;
  font-size: medium;
  border: transparent;
  text-align: center;
  cursor: pointer;
}

.button--outlined {
  background: transparent;
  border: 1px solid white;
  color: white;
}

.button---base {
  background: white;
}

.button--fullWidth {
  width: 100%;
}
</style>
