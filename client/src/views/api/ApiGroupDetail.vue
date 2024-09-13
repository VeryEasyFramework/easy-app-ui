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

      <CardWidget v-if="activeAction" :key="activeAction.actionName">
        <Container class="action-form row shrink  row-gap-4 horizontal-align-center">
          <Container class="header">

            <Container class="row shrink horizontal-align-center">

              <div class="title-4 text-center">

                {{ formatString(activeAction.actionName, 'titleCase', 'camelCase') }}
              </div>
              <div class="text-small text-center">{{ activeAction.description }}</div>
            </Container>

          </Container>
          <Container class="row shrink row-gap-3 inputs horizontal-align-center">

            <component :is="inputFieldMap[param.type]" v-for="param in activeAction.params"
                       :key="param.paramName"
                       :required="param.required"
                       :label="formatString(param.paramName,'titleCase','camelCase')"/>
          </Container>
          <div class="horizontal-align-self-center">

            <ButtonIcon icon="play_arrow" color="secondary"
                        label="Run Action"/>
          </div>
        </Container>
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
import {inputFieldMap} from "../../components/inputs/index.ts";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";

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

  .header {
    grid-template-columns: 1fr;
  }
}
</style>
