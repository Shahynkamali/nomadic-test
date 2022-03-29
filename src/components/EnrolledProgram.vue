<script setup lang="ts">
import { useProgramsStore, type ProgramTeam, type Program } from "@/stores/programs";
import { computed, onMounted, reactive, ref } from "vue";
import BaseButton from "./BaseButton.vue";
import UserAvatar from "./UserAvatar.vue";
import PorgressBar from "./ProgressBar.vue";
import ErrorBox from "./ErrorBox.vue";
import AvatarImage from "@/assets/avatar.png";

interface Props {
  id: Program["id"];
}
interface State {
  team?: ProgramTeam;
  program?: Program;
}

const programImageUrl = computed(() => {
  if (state.program?.image) {
    const image = encodeURIComponent(state.program.image);
    return `https://res.cloudinary.com/nomadic/image/fetch/w_550,h_715,c_fill,e_blur:0,g_north,f_auto,q_80/${image}`;
  }
  return "";
});

const props = defineProps<Props>();
const state = reactive({
  team: undefined,
  program: undefined,
}) as State;

const error = ref("");

const store = useProgramsStore();
const { getProgramTeam, getProgram, toggleEnrolment } = store;

const removeProgram = (id?: number, isEnrolled?: boolean) => {
  if (id && isEnrolled) {
    toggleEnrolment(id, isEnrolled);
  }
};

onMounted(async () => {
  try {
    const { data: teamData } = await getProgramTeam(props.id);
    const { data: programData } = await getProgram(props.id);
    state.team = { ...teamData };
    state.program = { ...programData };
  } catch (e) {
    error.value = "Oops something went wrong";
  }
});
</script>

<template>
  <div class="card" v-if="state.team && state.program">
    <div class="card__image-wrapper">
      <img
        class="card__image"
        :src="programImageUrl"
        :alt="'Cover image for ' + state.program?.title"
      />
    </div>

    <div class="card__content">
      <h3 class="card__title">{{ state.program?.title }}</h3>
      <div class="card__columns">
        <div class="card__column--small card__column--center">
          <UserAvatar :image="AvatarImage" />
        </div>
        <div class="card__column--large">
          <h4 class="card__description">Your progress</h4>
          <PorgressBar :progress="state.team?.your_progress" />
        </div>
      </div>
      <div class="card__columns">
        <div class="card__column--small card__column--center">
          <UserAvatar :initials="state.team?.initials" :color="state.team?.color" />
        </div>
        <div class="card__column--large">
          <h4 class="card__description">Your team: {{ state.team?.name }}</h4>
          <PorgressBar :progress="state.team?.team_progress" />
        </div>
      </div>
      <div class="card__columns card__column--no-margin card__column--space-between">
        <div class="card__column--large card__column--margin-right">
          <BaseButton :full-width="true">Start program</BaseButton>
        </div>
        <div class="card__column--small card__column--align-right card__column--no-margin">
          <BaseButton
            :on-click="() => removeProgram(state.program?.id, state.program?.enrolled)"
            :outlined="true"
          >
            remove
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
  <ErrorBox v-else-if="error.length" />
</template>

<style scoped lang="less">
.card {
  border-radius: 15px;
  background-color: #0072ef;
  display: flex;

  @media (max-width: 980px) {
    flex-wrap: wrap;
  }
}

.card__image-wrapper {
  width: 100%;
  margin: 20px;
  display: inline-flex;
}

.card__image {
  height: auto;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;

  @media (max-width: 980px) {
    height: 200px;
  }
}

.card__content {
  margin: 20px 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 980px) {
    margin: 20px;
  }
}

.card__title {
  font-size: 24px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 20px;
}

.card__columns {
  display: flex;
  width: 100%;
  margin-bottom: 24px;
}

.card__column--small {
  width: auto;
  margin-right: 20px;
}

.card__column--large {
  width: 100%;
}

.card__column--no-margin {
  margin: 0;
}

.card__column--align-right {
  display: flex;
  justify-content: flex-end;
}

.card__column--margin-right {
  margin-right: 12px;
}

.card__column--center {
  display: flex;
  justify-content: center;
}

.card__description {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
}
</style>
