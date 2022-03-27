import { defineStore } from "pinia";
import axios from "axios";

export interface Program {
  id: number;
  title: string;
  image: string;
  enrolled: boolean;
}

type Programs = Program[];

interface RootState {
  programs: Programs | null;
}

export const useProgramsStore = defineStore({
  id: "programs",
  state: () =>
    ({
      programs: null,
    } as RootState),
  actions: {
    async loadPrograms() {
      if (this.programs === null) {
        const response = await axios.get<Programs>("programs");
        this.programs = response.data;
      }
    },
    async enableEnrolment(id: number) {
      if (this.programs) {
        const { status } = await axios.patch(`programs/${id}`, { enrolled: true });
        if (status === 204) {
          const selectedProgram = this.programs.find(program => program.id === id) as Program;
          this.programs = this.programs.map(program =>
            program.id === selectedProgram.id ? { ...selectedProgram, enrolled: true } : program
          );
        }
      }
    },
  },
});
