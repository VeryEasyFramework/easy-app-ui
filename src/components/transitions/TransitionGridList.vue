<template>
  <div ref="el">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const el = ref<HTMLSlotElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const props = defineProps<{
  speed?: number;
}>();

const marginBottom = ref("0px");
onMounted(() => {

  const lastNodes: Node[] = [];
  const isBeingRemoved: Node[] = [];
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {

      const parent = mutation.target;
      if (mutation.removedNodes.length) {
        mutation.removedNodes.forEach((node: any) => {

          if (node.nodeType === Node.ELEMENT_NODE) {
            // Temporarily re-add the node to the DOM

            if (lastNodes.includes(node)) {
              lastNodes.splice(lastNodes.indexOf(node), 1);
              return;
            }

            // node.style.height = `43px`;
            isBeingRemoved.push(node);
            if (mutation.nextSibling && mutation.nextSibling.nodeType === Node.ELEMENT_NODE) {
              parent.insertBefore(node, mutation.nextSibling);
            } else {
              parent.appendChild(node);
            }

            node.classList.remove("fade-in");
            node.classList.add("stop"); // Add the animation class
            lastNodes.push(node);
            node.addEventListener(
              "animationend",
              () => {
                parent.removeChild(node);
              },
              { once: true }
            );
          }
        });
      }
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node: any) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            node.style.marginBottom = marginBottom.value;
            if (!isBeingRemoved.includes(node)) {
              node.style.setProperty("--height", `${node.offsetHeight}px`);

              node.classList.add("fade-in");
            } else {

              isBeingRemoved.splice(isBeingRemoved.indexOf(node), 1);
            }
          }
        });
      }
    });
  });


  const container = el.value as HTMLElement;
  const parentEl = container.parentElement as HTMLElement;
  parentEl.style.setProperty("--speed", `${props.speed || 0.3}s`);
  const rowGap = getComputedStyle(parentEl).rowGap;
  parentEl.style.rowGap = "0";
  marginBottom.value = rowGap;

  while (container.firstChild) {
    const child = container.firstChild;
    if (child) {
      parentEl.appendChild(child);
    }
  }
  container.remove();
  for (let i = 0; i < parentEl.children.length; i++) {
    const child = parentEl.children[i] as any;
    child.style.marginBottom = rowGap;
  }
  // get the grid-gap from the parent
  observer.observe(parentEl, {
    childList: true
  });
});
</script>

<style>
@keyframes stop {
  from {
    height: var(--height);
    grid-template-columns: 1fr;
    opacity: 1;
  }
  to {
    height: 0;
    margin-bottom: 0;
    grid-template-columns: 0fr;
    opacity: 0;
  }
}

.child {
  margin-bottom: v-bind(marginBottom) !important;
}

.stop {
  overflow: hidden;
  animation: stop var(--speed) forwards var(--ease);
}

@keyframes fadeIn {
  from {
    height: 0;
    margin-bottom: 0;
    grid-template-columns: 0fr;
    opacity: 0;
  }
  to {
    height: var(--height);
    grid-template-columns: 1fr;
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn var(--speed) forwards var(--ease);
}
</style>
