<template>
    <div :class="$style.popup">
        <div :class="$style.popup__layout"></div>
        <div :class="$style.popup__content">
            <div 
              :class="$style.popup__content__close" 
              @click="$emit('close')">
                <img src="/icons/close.svg" alt="close">
            </div>
            <div :class="$style.popup__container">
                <div :class="$style.popup__content__poster">
                <img v-if="film.Poster" :src="film.Poster" alt="poster">
                <img v-else src="/images/placeholder.webp" alt="poster">
            </div>
            <div :class="$style.popup__content__description">
                <h2>{{ film.Title }}</h2>
                <p>{{ film.Year }}</p>
                <p>{{ film.Plot }}</p>
                <p>Actors: {{ film.Actors }}</p>
                <p>Country: {{ film.Country }}</p>
                <p>Boxes: {{ film.BoxOffice }}</p>
                <p>Awards: {{ film.Awards }}</p>
                <p>Rating: {{ film.imdbRating }}</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Film } from '../../../types/query';
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
    document.body.style.overflow = '';
})

const props = defineProps<{film: Film}>()

const emit = defineEmits(['close'])

console.log(props.film)
</script>

<style lang="scss" module>
.popup {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    &__container {
        display: flex;
        justify-content: space-between;
        gap: 10vw;

        @media screen and (max-width: $screen-sm) {
            flex-direction: column;
        }
    }
    &__layout {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0, .7);
        z-index: 10;
    }

    &__content {
        overflow-y: scroll;
        padding: 0 20px;
        position: absolute;
        z-index: 50;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 50vw);
        height: auto;
        box-shadow: 2px 3px 50px rgba(0,0,0,0.4);
        background-color: $white;
        border-radius: 10px;

        @media screen and (max-width: $screen-sm) {
            width: calc(100% - 15vw);
            height: 60vh;
        }

        &__close {
            display: flex;
            justify-content: end;
            padding: 20px;
            img {
                width: 25px;
                height: 25px;
            }
        }

        &__poster {
            display: flex;
            img {
                width: 300px;
                height: 20vw;
                object-fit: cover;
                object-position: top;
                border-radius: 10px;

                @media screen and (max-width: $screen-sm) {
                    height: 40vw;
                }
            }
        }

        &__description {
            h2 {
                font-family: $font-bold;
                font-size: 5vw;
                margin: 0;
            }
            p {
                font-size: 16px;
                max-width: 80%;
            }
        }
    }
}
</style>