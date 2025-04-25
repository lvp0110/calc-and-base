import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Breadcrumb {
    link?: string;
    title: string
}

export const useBreadcrumbs = (rootBreadcrumbs) => {
    const route = useRoute()
    
    return computed(() => {
        const breadcrumbs = rootBreadcrumbs

        if (route.params.id) {
            breadcrumbs.push({ title: route.params.id })
        }

        if (breadcrumbs.length >= 3) {
            breadcrumbs[0].title = "..."
        }

        return breadcrumbs
    })
}