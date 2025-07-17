<template>
    <div :class="$style.header">
        <Logo />
        <Search/>
        <User />
    </div>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue';
import Search from './Search.vue'
import User from './User.vue';

import { ref } from 'vue';

</script>

<style lang="scss" module>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: $screen-s) {
        flex-direction: column;
        gap: 20px;
    }
}
</style>