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
        path: "/home",
        name: "home",
        component: () => import("../components/HomeView.vue"),
    },
    {
        path: "/diary",
        name: "diary",
        component: () => import("../components/DiaryView.vue"),
    },
    {
        path: "/detail/:idx",
        name: "detail",
        component: () => import("../components/DiaryDetail.vue"),
    },
    {
        path: "/write",
        name: "write",
        component: () => import("../components/DiaryWrite.vue"),
    },
    {
        path: "/bucket",
        name: "bucket",
        component: () => import("../components/BucketList.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;