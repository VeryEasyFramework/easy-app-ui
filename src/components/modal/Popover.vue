<template>
  <div
      ref="container"
      class="popover-container"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave">
    <Teleport to="#popovers">
      <div ref="popover" class="popover">

        <div class="text-dark">
          {{ text }}
        </div>


      </div>

    </Teleport>
    <div class="content">
      <slot></slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

const props = defineProps<{
  text?: string;
  wait?: number;
  position?: "top" | "bottom" | "left" | "right";
}>();

const showPopover = ref(false);
const top = ref("0px");
const left = ref("0px");
const opacity = computed(() => (showPopover.value ? (props.text ? 1 : 0) : 0));

const container = ref<HTMLElement | null>(null);
const popover = ref<HTMLElement | null>(null);


onMounted(() => {
});

const isIntersecting = ref(false);

function handleEnter(event: MouseEvent) {
  isIntersecting.value = true;
  setPosition();
  setTimeout(() => {
    if (!isIntersecting.value) return;
    showPopover.value = true;
  }, props.wait ?? 300);
}

function handleLeave() {
  isIntersecting.value = false;
  showPopover.value = false;
}

function setPosition() {
  const containerPosition = container.value?.getBoundingClientRect();
  const popoverHeight = popover.value?.offsetHeight;
  const popoverWidth = popover.value?.offsetWidth;
  let positionX;
  let positionY;

  if (window.innerHeight - containerPosition?.top! < popoverHeight!) {
    positionY = containerPosition?.top! - popoverHeight!;
  } else {
    positionY = containerPosition?.top;
  }

  if (window.innerWidth - containerPosition?.left! < popoverWidth!) {
    positionX = containerPosition?.left! + popoverWidth! + 5;
  } else {
    positionX = containerPosition?.left! + containerPosition?.width! + 5;
  }

  top.value = `${positionY}px`;
  left.value = `${positionX}px`;
}
</script>

<style scoped>
.popover-container {
  position: relative;
  display: inline-block;
  width: max-content;
}

.popover {
  position: fixed;
  top: v-bind(top);
  left: v-bind(left);
  width: max-content;
  background-color: var(--color-bg-brighter);

  border-radius: var(--border-radius);
  padding: 8px;

  opacity: v-bind(opacity);
  transition: all var(--snap-ease);
  box-shadow: var(--shadow);
}

.popover-container:hover .popover {
  display: block;
}
</style>
