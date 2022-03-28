<script setup lang="ts">
import type { ProgramTeam } from "@/stores/programs";

interface Props {
  initials?: string;
  color?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="avatar" :style="{ 'background-color': `#${props.color}` }">
    <span class="avatar__initials">{{ props.initials }}</span>
  </div>
</template>

<style scoped lang="less">
.avatar {
  border-radius: 50%;
  height: fit-content;
  padding: 18px;
}

.avatar__initials {
  color: #ffffff;
  font-size: 21px;
  font-weight: bold;
}
</style>
