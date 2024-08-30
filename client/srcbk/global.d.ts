import type { Ref } from "vue";

import { RouteLocationNormalized, Router } from "vue-router";
import type {
  Grid,
  GridItem,
  TextBase,
  TransitionFade,
  TransitionRouterView,
  WidgetCard,
} from "@eveffer/easy-client";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $isMobile: Ref<boolean>;
    $route: RouteLocationNormalized;
    $router: Router;
  }

  interface GlobalComponents {
    Grid: typeof Grid;
    GridItem: typeof GridItem;
    WidgetCard: typeof WidgetCard;
    TransitionRouterView: typeof TransitionRouterView;
    TransitionFade: typeof TransitionFade;
    TextBase: typeof TextBase;
  }
}
