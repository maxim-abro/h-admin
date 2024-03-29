import { createApp } from "vue";
import { createPinia } from "pinia";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useAuthStore } from "@/stores/auth";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("auth-layout", AuthLayout);
app.component("default-layout", DefaultLayout);
app.use(createPinia());
const authStore = useAuthStore();
app.use(router);

app.mount("#app");
