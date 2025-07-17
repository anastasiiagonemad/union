<template>
    <div :class="$style.user">
        <img src="/icons/user.svg" alt="user">
        <p>Your Name</p>
    </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" module>
.user {
    display: flex;
    align-items: center;
    gap: 9px;
}
</style>