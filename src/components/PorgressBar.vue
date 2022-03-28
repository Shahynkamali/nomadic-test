<script setup lang="ts">
import type { ProgramTeam } from "@/stores/programs";

interface Props {
  progress?: number;
}

const props = defineProps<Props>();
</script>
<template>
  <progress class="progress" id="file" :value="props.progress" max="100" />
  <p class="progress__description">{{ props.progress }}% Complete</p>
</template>

<style scoped lang="less">
.progress {
  -webkit-appearance: none;
}

.progress::-webkit-progress-bar {
  background-color: #005393;
  border-radius: 3px;
  height: 6px;
}

.progress::-webkit-progress-value {
  background-color: #ffffff;
}

.progress__description {
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
}
</style>
