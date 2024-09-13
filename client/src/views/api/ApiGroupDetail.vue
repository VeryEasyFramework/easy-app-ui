<template>
  <Container class="col shrink overflow-visible">


    <Container class="row shrink overflow-visible">
      <CardWidget @click="setAction(action)" class="group-action" :class="{
        active: action.actionName === activeAction?.actionName
      }" v-for="action in group.actions"
                  :key="action.actionName">
        <div class="title-5">

          {{ formatString(action.actionName, "titleCase", "camelCase") }}
        </div>
        <div class="text-small">{{ action.description }}</div>
      </CardWidget>
    </Container>
    <TransitionFade appear speed="fast">

      <CardWidget v-if="activeAction" :key="activeAction.actionName">
        {{ activeAction }}
      </CardWidget>
    </TransitionFade>
  </Container>
</template>

<script setup lang="ts">
import {DocsAction, DocsActionGroup} from "@/api/apiTypes.ts";
import Container from "@/components/layout/Container.vue";
import {formatString} from "../../utils/index.ts";
import CardWidget from "@/components/widgets/CardWidget.vue";
import {ref} from "vue";
import TransitionFade from "@/components/transitions/TransitionFade.vue";

const props = defineProps<{
  group: DocsActionGroup
}>()

const activeAction = ref<DocsAction>()

function setAction(action: DocsAction) {
  activeAction.value = action
}
</script>

<style lang="scss">

.title-5 {
  transition: all var(--snap-ease);

}

.group-action {
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--snap-ease);


  &:hover {
    background-color: var(--color-primary-bright);
    color: white;

    .title-5 {
      color: white;
    }
  }

  &.active {
    background-color: var(--color-primary);
    color: white;

    .title-5 {
      color: white;
    }
  }
}

</style>
