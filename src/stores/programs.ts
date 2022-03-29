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

export interface ProgramTeam {
  name: string;
  initials: string;
  color: string;
  your_progress: number;
  team_progress: number;
}

export const useProgramsStore = defineStore("programs", () => {
  const programs = ref<Programs>([]);
  const error = ref("");

  const getPrograms = async () => {
    try {
      const { data } = await axios.get<Programs>("programs");
      programs.value = data;
    } catch (e) {
      error.value = "Oops something went wrong";
    }
  };

  const getProgramTeam = async (id: number) => {
    const { data } = await axios.get<ProgramTeam>(`programs/${id}/team`);
    return { data };
  };

  const getProgram = async (id: number) => {
    const { data } = await axios.get<Program>(`programs/${id}`);
    return { data };
  };

  const toggleEnrolment = async (id: number, isEnrolled: boolean) => {
    const { status } = await axios.patch(`programs/${id}`, { enrolled: !isEnrolled });
    if (status === 204) await getPrograms();
  };

  const hasEnroledPrograms = computed(() => programs.value.some(program => program.enrolled));
  const enroledPrograms = computed(() => programs.value.filter(program => program.enrolled));
  const enroledProgramIds = computed(() => enroledPrograms.value.map(({ id }) => id));

  return {
    getPrograms,
    getProgramTeam,
    getProgram,
    toggleEnrolment,
    error,
    programs,
    hasEnroledPrograms,
    enroledProgramIds,
  };
});
