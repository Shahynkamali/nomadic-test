import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

export interface Program {
  id: number;
  title: string;
  image: string;
  enrolled: boolean;
}

type Programs = Program[];

export const useProgramsStore = defineStore("programs", () => {
  const programs = ref<Programs>([]);
  const fetchPrograms = async () => {
    const response = await axios.get<Programs>("programs");
    programs.value = response.data;
  };

  const fetchProgramTeamDetails = async (id: number) => {
    const { data } = await axios.get<Program>(`programs/${id}/team`);
    return { data };
  };

  const enableEnrolment = async (id: number) => {
    const { status } = await axios.patch(`programs/${id}`, { enrolled: true });
    if (status === 204) {
      const selectedProgram = programs.value.find(program => program.id === id) as Program;
      programs.value = programs.value.map(program =>
        program.id === selectedProgram.id ? { ...selectedProgram, enrolled: true } : program
      );
    }
  };

  const disableEnrolment = async (id: number) => {
    const { status } = await axios.patch(`programs/${id}`, { enrolled: false });
    if (status === 204) {
      const selectedProgram = programs.value.find(program => program.id === id) as Program;
      programs.value = programs.value.map(program =>
        program.id === selectedProgram.id ? { ...selectedProgram, enrolled: false } : program
      );
    }
  };

  const hasEnrolledPrograms = computed(() => programs.value.some(program => program.enrolled));
  const enrolledPrograms = computed(() => programs.value.filter(program => program.enrolled));
  const enrolledProgramIds = computed(() => enrolledPrograms.value.map(({ id, ...rest }) => id));

  return {
    programs,
    fetchPrograms,
    enableEnrolment,
    disableEnrolment,
    fetchProgramTeamDetails,
    hasEnrolledPrograms,
    enrolledProgramIds,
  };
});
