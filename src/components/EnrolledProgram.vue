<template>
  <div>
    <p>{{ program.name }}</p>
    <p>{{ id }}</p>
  </div>
</template>

<script setup lang="ts">
import { useProgramsStore } from "@/stores/programs";
import { onMounted, ref } from "vue";
interface TeamDetails {
  name: string;
  initials: string;
  color: string;
  your_progress: number;
  team_progress: number;
}
interface Props {
  id: number;
}
const props = defineProps<Props>();
const program = ref<TeamDetails>({
  name: "",
  initials: "",
  color: "",
  your_progress: 0,
  team_progress: 0,
});

const store = useProgramsStore();
onMounted(async () => {
  const response = await store.fetchProgramTeamDetails(props.id);
});
</script>
