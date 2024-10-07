<template>
  <ListDetailLayout max-width="max-content" no-bg>

    <template #list>
      <Container class="row shrink gap-3 text-center">
        <div class="title-4">Groups</div>
        <Container class="row shrink row-gap-3">


          <CardWidget @click="setGroup(group)" class="group-card cursor-pointer" :class="{
          active: group.groupName === activeGroup?.groupName
        }" v-for="group in docs"
                      :key="group.groupName">
            <div class="text-capitalize group-title">
              {{ group.groupName }}
            </div>
          </CardWidget>
        </Container>
      </Container>
    </template>
    <template #detail>
      <TransitionFade appear speed="fast">

        <Container v-if="activeGroup" class="group-detail" :key="activeGroup.groupName">
          <div class="title-3">
            {{ formatString(activeGroup?.groupName || "", "titleCase", "camelCase") }}
          </div>
          <ApiGroupDetail :group="activeGroup"/>
        </Container>
      </TransitionFade>
    </template>
  </ListDetailLayout>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {DocsActionGroup} from "@vef/easy-api/src/types.ts";
import {easyApi} from "@/api/index.ts";
import ListDetailLayout from "@/components/layout/ListDetailLayout.vue";
import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import ApiGroupDetail from "@/views/api/ApiGroupDetail.vue";
import {formatString} from "../../utils/index.ts";
import TransitionFade from "@/components/transitions/TransitionFade.vue";

const docs = ref<DocsActionGroup[]>([])
const activeGroup = ref<DocsActionGroup>()

function setGroup(g: DocsActionGroup) {
  activeGroup.value = g
}

onMounted(async () => {
  console.log("ApiExplorerView mounted")
  docs.value = await easyApi.call("app", "apiDocs")
})
</script>

<style lang="scss">
.group-card {
  transition: all var(--snap-ease);

  &:hover {
    background-color: var(--color-primary-brighter);
    color: white;
  }

  .group-title {
    font-size: 1rem;
  }

  &.active {
    background-color: var(--color-primary);

    color: white;
    font-weight: bold;


  }

}

.group-detail {
  grid-template-rows: auto 1fr;
}
</style>
