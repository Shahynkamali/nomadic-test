<script setup lang="ts">
import ProgramTile from "@/components/ProgramTile.vue";
import { useProgramsStore } from "@/stores/programs";
import { onMounted, computed } from "vue";
import EnrolledProgram from "@/components/EnrolledProgram.vue";
import { storeToRefs } from "pinia";

const store = useProgramsStore();
const { getPrograms, toggleEnrolment } = store;
const { programs, hasEnroledPrograms, enroledProgramIds } = storeToRefs(store);

const enrolProgram = (id: number, enroled: boolean) => {
  if (!enroled) toggleEnrolment(id, enroled);
  return null;
};
const hasOneProgram = computed(() => enroledProgramIds.value.length === 1);

onMounted(async () => getPrograms());
</script>

<template>
  <main>
    <section>
      <h2>Enrolled Programs</h2>
      <p v-if="!hasEnroledPrograms">
        You have not enrolled in any Programs yet. Click on a Program below to enrol.
      </p>
      <div
        class="tiles"
        :class="[hasOneProgram ? 'tiles__single' : 'tiles__small']"
        v-if="hasEnroledPrograms"
      >
        <EnrolledProgram v-for="id in enroledProgramIds" :id="id" :key="id" />
      </div>
    </section>
    <section>
      <h2>All Programs</h2>
      <div class="tiles tiles__large" v-if="programs">
        <ProgramTile
          @click="enrolProgram(program.id, program.enrolled)"
          :program="program"
          v-for="program in store.programs"
          :key="program.id"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
section {
  margin-bottom: 3rem;
}

h2 {
  margin-bottom: 1rem;
}

.tiles {
  display: grid;
  grid-gap: 20px;
}

.tiles__large {
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.tiles__small {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.tiles__single {
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 780px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
