<template>
  <div class="button-wrapper">
    <el-button class="button" @click="$emit('click', $event)">
      <slot />
    </el-button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Button",
};
</script>

<style lang="scss" scoped>
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin: 28px;
  }
}
</style>
