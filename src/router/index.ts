import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "vuefire";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    meta: { authOptional: true },
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { authOptional: true },
  },
  {
    path: "/about",
    component: () => import("../views/About.vue"),
    meta: { authOptional: true },
  },
  {
    path: "/lists",
    component: () => import("../views/ListDashboard.vue"),
  },
  {
    path: "/task/:id",
    component: () => import("../views/TaskDetail.vue"),
  },
  {
    path: "/create-list",
    component: () => import("../views/CreateList.vue"),
  },
  {
    path: "/list/:listid",
    component: () => import("../views/ListDetail.vue"),
  },
  {
    path: "/task/:taskid",
    component: () => import("../views/TaskDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// https://vuefire.vuejs.org/guide/auth.html
router.beforeEach(async (to) => {
  // console.log(JSON.stringify(to));

  // unless otherwise specified, routes should default to needing authentication
  const needsAuth = !(to.meta.authOptional ?? false);

  if (needsAuth) {
    const currentUser = await getCurrentUser();
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: "/login",
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirect || '/')`
          redirect: to.fullPath,
        },
      };
    }
  }
});

export default router;
