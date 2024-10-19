<template>
  <Container class="action-wrapper">


    <Container class="row shrink overflow-visible">
      <CardWidget @click="setAction(action)" class="group-action" :class="{
        active: action.actionName === activeAction?.actionName
      }" v-for="action in group.actions"
                  :key="action.actionName">
        <Container>

          <Container class="col shrink horizontal-align-between">

            <div class="title-5">

              {{ formatString(action.actionName, "titleCase", "camelCase") }}
            </div>
            <div class="label badge bg-accent fit-content text-white" v-if="action.system">System
            </div>
            <div class="label badge bg-success-darker fit-content text-white" v-if="action.public">
              Public
            </div>
          </Container>
          <div class="text-small">{{ action.description }}</div>
        </Container>
      </CardWidget>
    </Container>
    <TransitionFade appear speed="fast">
      <ActionDetailView v-if="activeAction" :group-name="group.groupName" :action="activeAction"
                        :key="activeAction.actionName"/>

    </TransitionFade>

  </Container>
</template>

<script setup lang="ts">
import { DocsAction, DocsActionGroup } from "@vef/types/mod.ts";
import Container from "@/components/layout/Container.vue";
import { formatString } from "@/utils/index.ts";
import CardWidget from "@/components/widgets/CardWidget.vue";
import { ref } from "vue";
import TransitionFade from "@/components/transitions/TransitionFade.vue";

import ActionDetailView from "@/views/api/ActionDetailView.vue";

const props = defineProps<{
  group: DocsActionGroup
}>()

const showActionForm = ref(false)

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

  .badge {
    border-radius: var(--border-radius);
    padding: 0.1rem 0.25rem;
  }

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


.action-wrapper {
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr;
}
</style>
