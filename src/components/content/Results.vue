<template>
    <div :class="$style.results">
        <div v-if="movieStore.loading">Loading...</div>
        <div 
          v-else-if="movieStore.error"
        >
          Error: {{ movieStore.error }}
        </div>

        <div 
          v-else-if="movieStore.movies.length" 
          :class="$style.results__container"
        >
           <div :class="$style.results__container__info">
             <p 
        :class="$style.results__container__info__searchQuery"
        >
                You searched for: 
                <span>{{ movieStore.searchQuery}}</span>
             </p>
            <p :class="$style.results__container__info__value">
                {{ movieStore.totalResults }} results
            </p>
           </div>
            <div :class="$style.results__container__cards">
                <Card 
                    v-for="movie in movieStore.movies"
                    :key="movie.imdbID"
                    :film="movie"
                    :class="$style.results__container__card"
                />
            </div>

            <Pagination />
        </div>

        <div v-else-if="movieStore.searchQuery">
            No results found for "{{ movieStore.searchQuery }}"
        </div>

        <Popup 
          v-if="movieStore.showPopup" 
          :film="movieStore.selectedMovie" 
          @close="movieStore.closePopup"
        />
    </div>

</template>

<script lang="ts" setup>
import { useMoviesStore } from '../../../stores/movies';
import Card from './Card.vue';
import Popup from './Popup.vue';
import Pagination from './Pagination.vue';

const movieStore = useMoviesStore()
</script>

<style lang="scss" module>
.results {
    margin-top: 46px;
    width: 100%;
    &__container {
        &__info {
            display: flex;
            align-items: center;
            gap: 17px;

            &__searchQuery {
                font-size: 22px;
                span {
                    text-decoration: underline;
                }
            }

            &__value {
                font-size: 14px;
                background-color: $blue;
                padding: 5px 15px;
                color: $white;
                border-radius: 5px;

            }
        }
        &__cards {
            margin-top: 57px;
            display: grid;
            grid-template-columns: 
            repeat(auto-fit, minmax(280px, 1fr));
            column-gap: 56px;
            row-gap: 53px; 
            place-content: center;
            width: 100%;

            @media screen and (max-width: $screen-sm) {
                grid-template-columns: 1fr;
            }
        }
        &__card {
            width: 100%;
        }
    }
}
</style>