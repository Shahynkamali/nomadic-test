<script setup lang="ts">
import ProgramTile from "@/components/ProgramTile.vue";
import { useProgramsStore } from "@/stores/programs";
import { onMounted, computed } from "vue";
import EnrolledProgram from "@/components/EnrolledProgram.vue";
import { storeToRefs } from "pinia";
import ErrorBox from "@/components/ErrorBox.vue";

const store = useProgramsStore();
const { getPrograms, toggleEnrolment } = store;
const { programs, hasEnroledPrograms, enroledProgramIds, error } = storeToRefs(store);

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
      <p v-if="!hasEnroledPrograms && programs.length">
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
      <easy />
      <div class="tiles tiles__large" v-if="programs.length">
        <ProgramTile
          @click="enrolProgram(program.id, program.enrolled)"
          :program="program"
          v-for="program in store.programs"
          :key="program.id"
        />
      </div>
      <ErrorBox v-else-if="error.length" />
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
  grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));

  @media (max-width: 580px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

.tiles__single {
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 780px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
