<template>
    <div :class="$style.logo">
        <img :class="$style.logo__img" src="/icons/logo.svg" alt="logo">
        <img :class="$style.logo__text" src="/icons/logo-text.svg" alt="mooz">
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" module>
.logo {
    display: flex;
    align-items: center;
    gap: 13px;
    max-width: 134px;
    height: 36px;

    &__img {
        width: 36px;
        height: 30px;
    }
}
</style>