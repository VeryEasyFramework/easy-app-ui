<template>
  <button class="button icon" :class="{
    [color??'primary']: color,
  }" :type="type||'button'">
    <MaterialIcon :icon="icon" :size="size??1.4"/>
  </button>
</template>
<script setup lang="ts">

import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import {MaterialIcons} from "@/components/icons/materialIcons.ts";
import {MainColor} from "@/types/colors.ts";

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon: MaterialIcons
  size?: number
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info"
}>()
</script>
