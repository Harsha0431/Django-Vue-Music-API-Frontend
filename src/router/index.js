import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/library',
            name: 'library',
            component: () => import('../views/MusicView.vue'),
            children: [
                { path: '', component: () => import('../views/LikedListView.vue'), name:'liked-list' },
                { path: 'interested', component: () => import('../views/InterestedList.vue'), name:'interested-list' },
                { path: 'recommended', component: () => import('../views/RecommendedList.vue'), name: 'recommended-list' }
            ]
        },
        {
            path: '/artist/:name?',
            name: 'artist',
            component: () => import('../views/ArtistView.vue')
        },
        {
            path: '/artist/:name/profile',
            name: 'artist-profile',
            component: () => import('../views/SingleArtistView.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/LoginView.vue')
        }
    ]
})

export default router
