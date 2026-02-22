
import { computed, type Ref } from 'vue';

export function useIndonesianDate(dateIso: Ref<string | null | undefined>) {

  const formattedDate = computed(() => {
   if (!dateIso.value) return '-';

    // Perbaikan: Handle jika inputnya array (kadang Ionic return array string)
    const rawDate = Array.isArray(dateIso.value) ? dateIso.value[0] : dateIso.value;
    const date = new Date(rawDate);

    if (isNaN(date.getTime())) return '-';

    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long', // Senin
      day: 'numeric',  // 22
      month: 'long',   // Februari
      year: 'numeric'  // 2026
    }).format(date);
  });

  return {
    formattedDate
  };
}