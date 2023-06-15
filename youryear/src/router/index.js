import { createRouter, createWebHistory } from "vue-router";
import MainView from "../components/MainView.vue";

const routes = [
{
path: "/",
name: "main",
component: MainView,  
},
{
path: "/setView",
name: "setView",
component: () => import("../components/SetView.vue"),
},
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;