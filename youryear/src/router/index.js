import { createRouter, createWebHistory } from "vue-router";
import MainView from "../components/MainView.vue";

const routes = [
    {
        path: "/",
        name: "main",
        component: MainView,
    },
    {
        path: "/header",
        name: "header",
        component: () => import("../components/HeaderView.vue"),
    },
    {
        path: "/setView",
        name: "setView",
        component: () => import("../components/SetView.vue"),
    },
    {
        path: "/home/:nickname",
        name: "home",
        component: () => import("../components/HomeView.vue"),
    },
    {
        path: "/diary",
        name: "diary",
        component: () => import("../components/DiaryView.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;