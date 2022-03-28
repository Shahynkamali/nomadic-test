import { defineStore } from "pinia";
import axios from "axios";
import { computed, reactive, ref } from "vue";

export interface Program {
  id: number;
  title: string;
  image: string;
  enrolled: boolean;
}

type Programs = Program[];

export interface ProgramTeam {
  name: string;
  initials: string;
  color: string;
  your_progress: number;
  team_progress: number;
}

export const useProgramsStore = defineStore("programs", () => {
  const programs = ref<Programs>([]);
  const getPrograms = async () => {
    const { data } = await axios.get<Programs>("programs");
    programs.value = data;
  };

  const getProgramTeam = async (id: number) => {
    const { data, status } = await axios.get<ProgramTeam>(`programs/${id}/team`);
    return { data, status };
  };

  const getProgram = async (id: number) => {
    const { data, status } = await axios.get<Program>(`programs/${id}`);
    return { data, status };
  };

  const toggleEnrolment = async (id: number, isEnrolled: boolean) => {
    const { status } = await axios.patch(`programs/${id}`, { enrolled: !isEnrolled });
    if (status === 204) {
      const selectedProgram = programs.value.find(program => program.id === id) as Program;
      programs.value = programs.value.map(program =>
        program.id === selectedProgram.id ? { ...selectedProgram, enrolled: !isEnrolled } : program
      );
    }
  };

  const hasEnroledPrograms = computed(() => programs.value.some(program => program.enrolled));
  const enroledPrograms = computed(() => programs.value.filter(program => program.enrolled));
  const enroledProgramIds = computed(() => enroledPrograms.value.map(({ id, ...rest }) => id));

  return {
    getPrograms,
    getProgramTeam,
    getProgram,
    toggleEnrolment,
    programs,
    hasEnroledPrograms,
    enroledProgramIds,
  };
});
