<template>
    <div :class="$style.search">
        <input
          v-model="searchQuery" 
          name="search" 
          :class="$style.search__field"
          type="text"
          placeholder="search movie"
          @keyup.enter="handleSearch"
        >
        <img 
          :class="$style.search__icon" 
          src="/icons/search-icon.svg" 
          alt="search icon"
          @click="handleSearch"
        >
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMoviesStore } from '../../../stores/movies';

const movieStore = useMoviesStore()
const searchQuery = ref('')

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        movieStore.searchMovies(searchQuery.value)
    }
}
</script>

<style lang="scss" module>
.search {
    display: flex;
    justify-content: center;
    width: 17.4vw;
    position: relative;
    background-color: $bgWhite;
     @media screen and (max-width: $screen-s) {
            width: 100%;
        }
    &__field {
        position: relative;
        z-index: 1;
        border: 1px solid $gray;
        width: 14.5vw;
        border-radius: 5px;
        padding: 10px 15px;
        font-family: $font-main;

        @media screen and (max-width: $screen-s) {
            width: 100%;
        }
    }
    &__icon {
        position: absolute;
        right: 15px;
        top: 10px;
        cursor: pointer;
        z-index: 2;
    }
}
</style>