<template>
    <div class="myIcon">
        阿峰记账
        <Icon name="icon"></Icon>
    </div>
</template>

<script lang="ts">
  export default {
    name: 'MyIcon'
  };
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/helper.scss';
    .myIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 48px;
        font-size: 30px;
        background: #ddd;
        font-family: $font-kai;

    }

    .myIcon > .icon {
        width: 32px !important;
        height: 32px !important;
    }
</style>