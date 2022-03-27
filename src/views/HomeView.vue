<script setup lang="ts">
import ProgramTile from "@/components/ProgramTile.vue";
import { useProgramsStore } from "@/stores/programs";
import { onMounted, computed } from "vue";
import EnrolledProgram from "../components/EnrolledProgram.vue";
const store = useProgramsStore();

onMounted(async () => store.fetchPrograms());

const handleClick = (id: number, isEnrolled: boolean) => {
  if (isEnrolled) {
    store.disableEnrolment(id);
  } else {
    store.enableEnrolment(id);
  }
};
</script>

<template>
  <main>
    <section>
      <h2>Enrolled Programs</h2>

      <p v-if="!store.hasEnrolledPrograms">
        You have not enrolled in any Programs yet. Click on a Program below to enrol.
      </p>
      <div class="tiles" v-if="store.hasEnrolledPrograms">
        <EnrolledProgram v-for="id in store.enrolledProgramIds" :id="id" :key="id" />
      </div>
    </section>
    <section>
      <h2>All Programs</h2>
      <div class="tiles" v-if="store.programs !== null">
        <ProgramTile
          @click="handleClick(program.id, program.enrolled)"
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
