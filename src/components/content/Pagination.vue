<template>
    <div :class="$style.pagination">
        <!-- Кнопка "Назад" -->
        <div 
            :class="[
                $style.pagination__arrow,
                $style.pagination__prev,
                { [$style.pagination__disabled]: movieStore.currentPage === 1 }
            ]"
            @click="movieStore.changePage(movieStore.currentPage - 1)"
        >
            <img 
                :src="movieStore.currentPage === 1 
                    ? '/icons/arrow-disabled-prev.svg' 
                    : '/icons/arrow-active-prev.svg'" 
                alt="Previous"
            >
        </div>

        <!-- Первая страница -->
        <div 
            :class="[
                $style.pagination__page,
                { [$style.pagination__active]: movieStore.currentPage === 1 }
            ]"
            @click="movieStore.changePage(1)"
        >
            <p>1</p>
        </div>

        <!-- Многоточие после первой страницы (если нужно) -->
        <div 
            v-if="showStartEllipsis"
            :class="$style.pagination__ellipsis"
        >
            <p>...</p>
        </div>

        <!-- Основной диапазон страниц -->
        <div 
            v-for="page in middlePages"
            :key="page"
            :class="[
                $style.pagination__page,
                { [$style.pagination__active]: page === movieStore.currentPage }
            ]"
            @click="movieStore.changePage(page)"
        >
            <p>{{ page }}</p>
        </div>

        <!-- Многоточие перед последней страницей (если нужно) -->
        <div 
            v-if="showEndEllipsis"
            :class="$style.pagination__ellipsis"
        >
            <p>...</p>
        </div>

        <!-- Последняя страница -->
        <div 
            v-if="movieStore.totalPages > 1"
            :class="[
                $style.pagination__page,
                { [$style.pagination__active]: movieStore.currentPage === movieStore.totalPages }
            ]"
            @click="movieStore.changePage(movieStore.totalPages)"
        >
            <p>{{ movieStore.totalPages }}</p>
        </div>

        <!-- Кнопка "Вперед" -->
        <div 
            :class="[
                $style.pagination__arrow,
                $style.pagination__next,
                { [$style.pagination__disabled]: movieStore.currentPage === movieStore.totalPages }
            ]"
            @click="movieStore.changePage(movieStore.currentPage + 1)"
        >
            <img 
                :src="movieStore.currentPage === movieStore.totalPages 
                    ? '/icons/arrow-disabled-next.svg' 
                    : '/icons/arrow-active-next.svg'" 
                alt="Next"
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMoviesStore } from '../../../stores/movies';
import { computed } from 'vue';

const movieStore = useMoviesStore();

const middlePages = computed(() => {
    const pages = [];
    const current = movieStore.currentPage;
    const total = movieStore.totalPages;
    
    if (total <= 5) {
        for (let i = 2; i < total; i++) {
            pages.push(i);
        }
        return pages;
    }
    
    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);
    
    if (current <= 3) {
        end = 4;
    } else if (current >= total - 2) {
        start = total - 3;
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
});

const showStartEllipsis = computed(() => {
    return movieStore.totalPages > 5 && movieStore.currentPage > 3;
});

const showEndEllipsis = computed(() => {
    return movieStore.totalPages > 5 && movieStore.currentPage < movieStore.totalPages - 2;
});
</script>

<style lang="scss" module>
.pagination {
    margin-top: 87px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 27px;
    font-size: 14px;

    &__arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 27px;
        width: 27px;
        cursor: pointer;
        
        img {
            width: 18px;
            height: auto;
            display: block;
        }
    }

    &__prev {
        background-color: $bgWhite;
        border: 1px solid $gray;
        border-radius: 5px 0 0 5px;
    }

    &__next {
        background-color: $bgWhite;
        border: 1px solid $gray;
        border-radius: 0 5px 5px 0;
    }

    &__page, &__ellipsis {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 27px;
        min-width: 27px;
        padding: 0 5px;
        background-color: $bgWhite;
        border: 1px solid $gray;
        cursor: pointer;
    }

    &__page {
        border: 1px solid $gray;
        background-color: $bgWhite;
        
        p {
            margin: 0;
            padding: 0;
        }

        &:hover {
            background-color: lighten($activeWhite, 5%);
        }
    }

    &__active {
        background-color: $activeWhite !important;
        font-weight: bold;
        fill: $blue;
    }

    &__disabled {
        opacity: 0.5;
        cursor: not-allowed;
        fill: $gray;
    }

    &__ellipsis {
        cursor: default;
        p {
            margin: 0;
            padding: 0;
        }
    }
}
</style>