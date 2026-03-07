import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface BookmarkItem {
    id: string;           // unique key: "surah_nomor:ayat_nomor"
    surahNomor: number;
    surahNama: string;      // Arabic name
    surahNamaLatin: string;
    ayatNomor: number;
    ayatAr: string;         // Arabic text (trimmed)
    ayatIdn: string;        // Indonesian translation (trimmed)
    createdAt: string;      // ISO date string
}

const STORAGE_KEY = 'quran_bookmarks';

export const useBookmarkStore = defineStore('bookmark', () => {
    const bookmarks = ref<BookmarkItem[]>(loadFromStorage());

    function loadFromStorage(): BookmarkItem[] {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    function saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks.value));
    }

    function getBookmarkId(surahNomor: number, ayatNomor: number): string {
        return `${surahNomor}:${ayatNomor}`;
    }

    const isBookmarked = (surahNomor: number, ayatNomor: number): boolean => {
        const id = getBookmarkId(surahNomor, ayatNomor);
        return bookmarks.value.some(b => b.id === id);
    };

    const toggleBookmark = (data: {
        surahNomor: number;
        surahNama: string;
        surahNamaLatin: string;
        ayatNomor: number;
        ayatAr: string;
        ayatIdn: string;
    }) => {
        const id = getBookmarkId(data.surahNomor, data.ayatNomor);
        const idx = bookmarks.value.findIndex(b => b.id === id);

        if (idx !== -1) {
            // Remove bookmark
            bookmarks.value.splice(idx, 1);
        } else {
            // Add bookmark
            bookmarks.value.unshift({
                id,
                surahNomor: data.surahNomor,
                surahNama: data.surahNama,
                surahNamaLatin: data.surahNamaLatin,
                ayatNomor: data.ayatNomor,
                ayatAr: data.ayatAr.substring(0, 150),   // Limit stored text
                ayatIdn: data.ayatIdn.substring(0, 200),
                createdAt: new Date().toISOString(),
            });
        }
        saveToStorage();
    };

    const removeBookmark = (id: string) => {
        const idx = bookmarks.value.findIndex(b => b.id === id);
        if (idx !== -1) {
            bookmarks.value.splice(idx, 1);
            saveToStorage();
        }
    };

    const totalBookmarks = computed(() => bookmarks.value.length);

    return {
        bookmarks,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        totalBookmarks,
    };
});
