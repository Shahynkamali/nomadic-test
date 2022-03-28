<script setup lang="ts">
import { computed } from "vue";
import type { Program } from "@/stores/programs";

interface Props {
  program: Program;
}

const props = defineProps<Props>();

const isEnrolled = computed(() => props.program.enrolled);

const programImageUrl = computed(() => {
  const image = encodeURIComponent(props.program.image);
  return `https://res.cloudinary.com/nomadic/image/fetch/w_550,h_715,c_fill,e_blur:0,g_north,f_auto,q_80/${image}`;
});
</script>

<template>
  <div
    class="program-tile"
    :class="[isEnrolled ? 'program-tile--active' : 'program-tile--non-active']"
  >
    <div class="image-tile-wrapper">
      <div class="image-tile">
        <img :src="programImageUrl" :alt="'Cover image for ' + program.title" />
      </div>
    </div>
    <p>
      <strong>{{ program.title }}</strong>
    </p>
    <p class="schedule">
      <span class="indicator"></span>
      <span v-if="isEnrolled">Enrolled</span>
      <span v-else>Start Now</span>
    </p>
  </div>
</template>

<style lang="less" scoped>
.program-tile {
  .image-tile-wrapper {
    position: relative;
    margin-bottom: 0.5em;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    transition: all 0.3s ease-out;
    will-change: transform;

    &:before {
      content: "";
      display: block;
      padding-top: 130%;
    }

    .image-tile {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #fff;
      border-radius: 12px;
      -webkit-box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .title {
        padding: 0.6em;
        color: white;
        text-transform: none;
        font-weight: bold;
        position: relative;
        font-size: 1.8em;
        font-weight: 200;
        line-height: 100%;
        text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.8);

        @media (max-width: 480px) {
          font-size: 1.1em;
        }
      }
    }
  }

  strong {
    font-weight: bold;
  }

  &:hover {
    .image-tile-wrapper {
      -webkit-transform: scale(1.05);
      -ms-transform: scale(1.05);
      transform: scale(1.05);
      will-change: transform;
    }
  }

  p {
    color: #000;
  }

  .schedule {
    display: flex;
    color: #444;
  }

  .indicator {
    width: 0.5em;
    height: 0.5em;
    background: #2aaadb;
    display: inline-block;
    border-radius: 17px;
    margin-right: 0.2em;
    position: relative;
    top: 7px;

    &.registered {
      background: #999999;
    }
  }
}

.program-tile--active {
  cursor: auto;
}

.program-tile--non-active {
  cursor: pointer;
}
</style>
