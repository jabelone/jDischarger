import { route } from "quasar/wrappers";
import VueRouter from "vue-router";
import { Store } from "vuex";
import { StateInterface } from "../store";
import routes from "./routes";
import { RouteMeta } from "../types";
import { EventBus } from "../event-bus";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(({ Vue }) => {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.afterEach((to) => {
    const {title} = to.meta as RouteMeta;
    document.title = title ? `${title} - kCharge` : "kCharge";
    EventBus.$emit("title-update", title || "kCharge");
  });

  return Router;
});
