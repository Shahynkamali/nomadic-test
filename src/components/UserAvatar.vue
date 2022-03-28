<script setup lang="ts">
interface Props {
  image?: string;
  initials?: string;
  color?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <img
    class="avatar__radius"
    v-if="props.image"
    alt="avatar"
    src="@/assets/avatar.png"
    width="70"
    height="70"
  />
  <div
    v-else-if="props.initials"
    class="avatar avatar__radius"
    :style="{ 'background-color': `#${props.color ? props.color : '000000'}` }"
  >
    <span class="avatar__initials">{{ props.initials }}</span>
  </div>
</template>

<style scoped lang="less">
.avatar {
  height: fit-content;
  padding: 18px;
}

.avatar__radius {
  border-radius: 50%;
}

.avatar__initials {
  color: #ffffff;
  font-size: 21px;
  font-weight: bold;
}
</style>
