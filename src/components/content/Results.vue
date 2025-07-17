<template>
    <div :class="$style.results">
        <div 
          v-show="movieStore.searchQuery.length === 0"
          :class="$style.results__greeting"
        >
            <div :class="$style.results__greeting__text">
                <h1>Hello, dear friend.</h1>
                <p>Dive into the world of cinema! Start typing the 
                desired film in the search bar.</p>
            </div>
            <div :class="$style.results__greeting__img">
                <img src="/images/uni-blue.webp" alt="uni blue">
            </div>
        </div>
        <div v-if="movieStore.loading">
            <Loader />
        </div>
        <div 
          v-else-if="movieStore.error"
          :class="$style.results__error"
        >
          <p>{{ movieStore.error }}</p>
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
import Loader from './loader.vue';

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
            repeat(auto-fill, minmax(200px, 1fr));
            column-gap: 56px;
            row-gap: 53px; 
            place-content: center;
            width: 100%;

            @media screen and (max-width: $screen-s) {
                grid-template-columns: 1fr;
            }
        }
        &__card {
            width: 100%;
        }
    }

    &__greeting {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;

        &__text {
            h1 {
                font-size: 5vw;
                margin: 0;
            }
            p {
                margin: 10px 0;
                font-size: 1vw;
            }

            @media screen and (max-width: $screen-sm) {
                h1 {
                    font-size: 10vw;
                }
                p {
                    font-size: 5vw;
                }
            }
        }

        &__img {
            display: flex;
            justify-content: center;

            @media screen and (min-width: $screen-l) {
                justify-content: end;
            }
           img {
            width: 350px;
            height: 100%;
            @media screen and (min-width: $screen-l) {
                width: 600px;
            }
           }

        }
    }

    &__error {
        display: flex;
        justify-content: center;
        p {
            font-size: 5vw;
            text-transform: uppercase;
        }
    }
}
</style>