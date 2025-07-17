import { defineStore } from 'pinia'
import axios from 'axios'
import type { Film } from '../types/query'

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        searchQuery: '',
        movies: [] as Film[],
        currentPage: 1,
        totalPage: 0,
        totalResults: 0,
        loading: false,
        error: null as string | null,
        selectedMovie: null as Film | null,
        showPopup: false
    }),

    getters: {
        totalPages(state): number {
            return Math.ceil(state.totalResults / 10)
        }
    },

    actions: {
        async searchMovies(query: string) {
            this.searchQuery = query
            this.currentPage = 1
            await this.fetchMovies()
        },

        async fetchMovies () {
            this.loading = true
            this.error = null

            try {

                const res = await axios.get('https://www.omdbapi.com/', {
                    params: {
                        apikey: '8523cbb8',
                        s: this.searchQuery,
                        page: this.currentPage
                    }
                })

                if (res.data.Response === 'True') {
                    this.movies = res.data.Search
                    this.totalResults = parseInt(res.data.totalResults)
                } else {
                    this.movies = []
                    this.error = res.data.Error || 'No results'
                }

            } catch (e) {
                this.error = e instanceof Error ? e.message : 'Unknown error'
                this.movies = []
            } finally {
                this.loading = false
            }
        },

        async changePage(page: number) {
            this.currentPage = page
            await this.fetchMovies()
        },

        async openPopup(imdbID: string) {
            this.loading = true
            this.error = null

            try {
                const response = await axios.get('https://www.omdbapi.com/', {
                    params: {
                        apikey: '8523cbb8',
                        i: imdbID,
                    },
                });

        this.selectedMovie = response.data;
        this.showPopup = true;
            } catch (e) {
                this.error = e instanceof Error ? e.message : 'Failed to load movie details';
            } finally {
                this.loading = false
            }
        }, 
        
        closePopup() {
            this.showPopup = false
            this.selectedMovie = null
        }
    }
})