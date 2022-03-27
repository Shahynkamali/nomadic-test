import { defineStore } from "pinia";
import axios from "axios";
import { nullLiteral } from "@babel/types";


export interface Program {
  id: number;
  title: string
  image: string;
  enrolled: boolean;
}

type Programs = Program[];

interface RootState {
  programs: Programs | null;
}


export const useProgramsStore = defineStore({
  id: "programs",
  state: () => ({
    programs: null,
  } as RootState),
  actions: {
    async loadPrograms() {
      if (this.programs === null) {
        const response = await axios.get<Programs>("programs");
        this.programs = response.data;
      }
    },
  },
});
