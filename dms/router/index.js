import { createRouter, createWebHistory } from "vue-router";
import { auth,assignRoleToUser  } from "../firebase/firebase";
import home from "@/components/home.vue";
import signin from "@/components/signin.vue";
import register from "@/components/register.vue";
import deleteuser from "@/components/deleteuser.vue";
import download from "@/components/download.vue";
import relations from "@/components/relations.vue";
import cash from "@/components/cash.vue";
import ops from "@/components/ops.vue";
import cs from "@/components/cs.vue";
import Addstaff from "@/components/Addstaff.vue";
import Editstaff from "@/components/Editstaff.vue";
import stafflist from "@/components/stafflist.vue";
import admin from "@/components/admin.vue";
import department from "@/components/department.vue";
import admin_login from "@/components/admin_login.vue";
import forgetpass from "@/components/forgetpass.vue";
import contactus from "@/components/contactus.vue";

const routes = [
  { path: "/", redirect: "/home", component: home },

  { path: "/home", component: home },
  {
    path: "/department",
    component: department,

    meta: { requiresAuth: true ,requiredRole: "Owner"},
  },
  {
    path: "/contactus",
    component: contactus,

    meta: { requiresAuth: false},
  },

  {
    path: "/signin",
    component: signin,
    name: "login",
  },

  {
    path: "/forgetpass",
    component: forgetpass,
    meta: { requiresAuth: true,requiredRole: "Owner" },
  },

  {
    path: "/register",
    component: register,
    meta: { requiresAuth: true ,requiredRole: "Owner"},
  },
  {
    path: "/admin",
    component: admin,
    meta: { requiresAuth: true,requiredRole: "Owner"},
  },
  {
    path: "/admin_login",
    component: admin_login,
    meta: { requiresAuth: false },
  },

  {
    path: "/deleteuser",
    component: deleteuser,
    meta: { requiresAuth: true ,requiredRole: "Owner" },
  },
  {
    path: "/download",
    component: download,
    meta: { requiresAuth: true },
  },

  {
    path: "/ops",
    component: ops,
    meta: { requiresAuth: true,requiredRole: "Owner" },
  },

  {
    path: "/cs",
    component: cs,
    meta: { requiresAuth: true },
  },
  {
    path: "/cash",
    component: cash,
    meta: { requiresAuth: true },
  },
  {
    path: "/relations",
    component: relations,
    meta: { requiresAuth: true },
  },

  {
    path: "/stafflist",
    component: stafflist,
    meta: { requiresAuth: true },
  },
  {
    path: "/Editstaff/:id",
    component: Editstaff,
    name: "edit",
    meta: { requiresAuth: true },
  },
  {
    path: "/Addstaff",
    component: Addstaff,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];
const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next();
    return;
  }
  
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = auth.currentUser;
  
  if (requiresAuth) {
    if (!user) {
      next("/signin");
    } else {
      const idTokenResult = await user.getIdTokenResult();
      console.log("ID Token Result:", idTokenResult); // Debugging statement
      const userRole = idTokenResult.claims.role; // Get the user's role from claims
      const requiredRole = to.meta.requiredRole;
      
      console.log("User Role:", userRole);
      console.log("Required Role:", requiredRole);
      
      if (userRole !== requiredRole) {
        await assignRoleToUser(user.uid, requiredRole);
        next(); // User has the required role, allow access
      } else {
        console.log("Access Denied!");
        next("/home"); // User doesn't have required role, redirect
      }
    }
  } else {
    next(); // No authentication required, allow access
  }
});

export default router;
 