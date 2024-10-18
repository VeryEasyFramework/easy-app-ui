<template>


  <div ref="dropdown" class="dropdown-container" :class="{
    disabled: !edit,
  }">
    <div @click="handleClick">

      <slot name="label">
        <Container class="selected-choice col shrink" :class="{
          'empty': !label,
          disabled: !edit,
          [labelClass??'']: labelClass,
        }">
          <MaterialIcon v-if="icon" :icon="icon ||'person'"/>
          <div class="choice">{{ label || `Choose ${emptyLabel}` }}

          </div>
          <MaterialIcon class="arrow" :class="{
          active: open,
          disabled: !edit,
        }" icon="chevron_right"/>
        </Container>
      </slot>
    </div>
    <div ref="popover" class="select-dropdown py-2" popover="auto">
      <Container class="row shrink dropdown pt-2">
        <Container class="row shrink px-2 input">

          <slot name="input">
            <input ref="input" v-model="searchValue" placeholder="Search..."/>
          </slot>
        </Container>
        <Container class="row shrink gap-0 w-100 px-3 stufff">
          <slot name="content" :hide="hidePopover">

          </slot>
        </Container>
        <Container class="footer px-2 py-2">

          <slot name="footer">
            <div class="text-small btn cursor-pointer horizontal-align-self-end"
                 @click="$emit('clear',hidePopover)">Clear
            </div>
          </slot>
        </Container>
      </Container>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from "vue";
import Container from "@/components/layout/Container.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import { MaterialIcons } from "@/components/icons/materialIcons.ts";

const open = ref(false);
const props = defineProps<{
  searchValue?: string
  label?: string | number
  icon?: MaterialIcons
  edit?: boolean
  labelClass?: string
  emptyLabel?: string
}>()
const input = useTemplateRef<HTMLInputElement>('input')
const searchValue = computed({
  get: () => props.searchValue,
  set: (value: string) => {
    emit('update:searchValue', value)
  }
})
const emit = defineEmits<{
  (event: 'update:searchValue', value: string): void
  (event: 'open', value: boolean): void
  (event: 'clear', value: () => void): void
}>()


const top = ref("0px");
const left = ref("0px");

function handleClick(evt: MouseEvent) {
  if (!props.edit) {
    return
  }
  if (open.value) {
    hidePopover()
    return
  }
  showPopover()
}

const popover = useTemplateRef<HTMLElement>('popover');

const dropdown = useTemplateRef<HTMLElement>('dropdown');


function showPopover() {
  // setPosition();
  popover.value?.showPopover();
  input.value?.focus();
  open.value = true;
  emit('open', true)
}


function hidePopover() {
  popover.value?.hidePopover();
}


function setPosition(target?: HTMLElement) {
  const parentRect = dropdown.value?.getBoundingClientRect()
  const popoverEl = target || popover.value

  if (!popoverEl) {
    return
  }

  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  const popoverRect = popoverEl.getBoundingClientRect()
  const parentHeight = parentRect?.height || 0
  const parentWidth = parentRect?.width || 0
  const topPos = parentRect?.top || 0
  const leftPos = parentRect?.left || 0
  const rightPos = parentRect?.right || 0
  const bottomPos = parentRect?.bottom || 0
  const popoverHeight = popoverRect.height
  const popoverWidth = popoverRect.width

  const topPosValue = bottomPos + popoverHeight > windowHeight ? topPos - popoverHeight : topPos + parentHeight
  const leftPosValue = rightPos + popoverWidth > windowWidth ? windowWidth - popoverWidth : rightPos

  top.value = `${topPosValue}px`
  left.value = `${leftPos}px`

  popoverEl.style.setProperty('--popover-top', top.value)
  popoverEl.style.setProperty('--popover-left', left.value)
  popoverEl.style.opacity = '1'
  popoverEl.style.minWidth = `${parentWidth}px`;

}

function handleScroll(event: WheelEvent) {
  const target = event.target as HTMLElement
  if (target.closest('.select-dropdown[popover]')) {
    return
  }

  hidePopover()
}

onMounted(() => {

  popover.value?.addEventListener('toggle', (event) => {
    const toggleEvent = event as ToggleEvent
    open.value = toggleEvent.newState === 'open'
    const target = event.target as HTMLElement
    if (toggleEvent.newState === 'open') {
      window.addEventListener('wheel', handleScroll)
      setPosition(target)

    }
    if (toggleEvent.newState === 'closed') {
      window.removeEventListener('wheel', handleScroll)
      target.style.opacity = '0'
    }
    emit('open', toggleEvent.newState === 'open')
  })
  hidePopover();
})


</script>

<style lang="scss">
.stufff {
  min-height: 150px;
  height: 200px;
}

.dropdown-container {
  .btn {
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
    }
  }

  .selected-choice {
    cursor: pointer;
    position: relative;
    line-height: var(--line-height);
    height: var(--line-height);
    font-size: 0.7rem;
    font-weight: bold;
    border: 1px solid transparent;

    border-radius: var(--border-radius);

    padding: 0 var(--padding-x);
    background-color: var(--color-primary-bright);
    color: white;
    align-items: center;
    max-width: var(--input-width);
    box-sizing: border-box;
    overflow: hidden;

    .arrow {
      transition: rotate var(--snap-ease);
      position: absolute;
      right: 0.2rem;

      &.active {
        rotate: 90deg;
      }

      &.disabled {
        display: none;
      }
    }

    &:hover:not(.disabled) {
      .arrow {
        rotate: 90deg;
      }

      .choice {

        color: white;
      }

      &.empty {


        .choice {
          color: var(--color-primary);
        }
      }
    }

    &.empty {
      color: var(--color-text-muted);
      border-color: var(--color-border);
      background-color: var(--color-input-bg);

    }

    .choice {


    }
  }

  .select-dropdown {
    .dropdown {

      background-color: var(--color-widget-bg);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);

      .footer {
        border-top: 1px solid var(--color-border);
      }

      .choice {


        line-height: 1.5;
        font-size: 0.7rem;
        border-radius: var(--border-radius);

        font-weight: bold;
        //background-color: var(--color-text-muted-brighter);
        &.active {
          color: var(--color-primary);
        }

        &:hover {
          cursor: pointer;
          border-color: var(--color-primary);
          color: var(--color-primary);
          //color: white;
        }


      }
    }


    &[popover] {
      position: absolute;
      inset: 0;
      top: var(--popover-top);
      left: var(--popover-left);
      margin: 0;
      border: none;
      padding: 0;
      overflow: visible;
      opacity: 0;
      color: unset;
      background-color: inherit;


    }

  }

}

.popover {
  --popover-top: 0;
  --popover-left: 0;
}

</style>

