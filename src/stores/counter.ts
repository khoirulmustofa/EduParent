import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    // State: didefinisikan sebagai ref()
    const count = ref<number>(0)

    // Getters: didefinisikan sebagai computed()
    const doubleCount = computed(() => count.value * 2)

    // Actions: didefinisikan sebagai function
    function increment() {
        count.value++
    }

    function reset() {
        count.value = 0
    }

    // Ekspos semua properti yang ingin digunakan secara publik
    return {
        count,
        doubleCount,
        increment,
        reset
    }
})