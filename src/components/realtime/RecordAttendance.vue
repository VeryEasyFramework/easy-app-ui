<template>
  <Container class="col shrink overflow-visible">
    <TransitionList>


      <Popover :text="`${user.firstName} ${user.lastName}`" v-for="user in users" :key="user.id">
        <Container
            class="col cursor-pointer label overflow-visible avatar shrink vertical-align-center bg-primary border px-2"
            :key="user.id">

          <MaterialIcon icon="person" class="avatar"/>
          <div>{{ formatString(`${user.firstName} ${user.lastName}`, "initials") }}</div>
        </Container>
      </Popover>
    </TransitionList>
  </Container>
</template>

<script setup lang="ts">
import { User } from "@vef/types/mod.ts";
import Container from "@/components/layout/Container.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import { formatString } from "@/utils/index.ts";
import TransitionList from "@/components/transitions/TransitionList.vue";
import Popover from "@/components/modal/Popover.vue";

const props = defineProps<{
  users: User[]
}>()
</script>

<style scoped lang="scss">
.avatar {
  color: white;
}
</style>
