<template>
    <div 
      :class="$style.card" 
      @click="movieStore.openPopup(film.imdbID)"
    >
        <div v-if="film.Poster" :class="$style.card__poster">
            <img 
              :src="film.Poster.length
                ? film.Poster 
                : '/images/placeholder.webp'" 
              alt="poster"
            >
        </div>
        <div :class="$style.card__description">
            <p>Name: {{ film.Title }}</p>
            <p>Year: {{ film.Year }}</p>
            <p>imdbID: {{ film.imdbID }}</p>
            <p>Type: {{ film.Type }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Film } from '../../../types/query';
import { useMoviesStore } from '../../../stores/movies';

defineProps<{
    film: Film
}>()

const movieStore = useMoviesStore()
</script>

<style lang="scss" module>
.card {
    display: flex;
    flex-direction: column;
    gap: 23px;
    width: 245px;
    height: 381px;
    cursor: pointer;

    &__poster {
        img {
            width: 100%;
            height: 270px;
            object-fit: cover;
            border-radius: 10px;
        }
    }
    &__description {
        p {
            line-height: normal;
            font-size: 16px;
            margin: 5px;
        }
    }
}
</style>