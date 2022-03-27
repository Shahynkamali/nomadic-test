<script setup lang="ts">
import ProgramTile from "@/components/ProgramTile.vue";
import { useProgramsStore } from "@/stores/programs";
import { onMounted } from "vue";
const store = useProgramsStore();
onMounted(() => store.loadPrograms());
</script>

<template>
  <main>
    <section>
      <h2>Enrolled Programs</h2>
      <p>You have not enrolled in any Programs yet. Click on a Program below to enrol.</p>
    </section>
    <section>
      <h2>All Programs</h2>
      <div class="tiles" v-if="store.programs !== null">
        <ProgramTile
          @click="store.enableEnrolment(program.id)"
          :program="program"
          v-for="program in store.programs"
          :key="program.id"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
section {
  margin-bottom: 3em;
}

h2 {
  margin-bottom: 1em;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}
</style>
