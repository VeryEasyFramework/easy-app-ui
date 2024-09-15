<template>
  <Container class="row shrink">
    <div class="title-4">Colors</div>
    <Container class="row shrink">
      <CardWidget v-for="color in colors" :key="color">

        <Container class="row shrink ">
          <div class="title-5 text-white text-capitalize color-sample" :class="`bg-${color}`">
            {{ color }}
          </div>

          <Container class="col">
            <div v-for="modifier in modifiers" :key="modifier"
            >

              <div :class="`text-${color}`" class="label text-capitalize ">{{
                  modifier
                }}
              </div>
              <div :class="`bg-${color}-${modifier} text-white`"
                   class="text-center py-1 label color-sample">
                {{ color }}-{{ modifier }}
              </div>
            </div>
          </Container>
        </Container>
      </CardWidget>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";


const colors = [
  'primary',
  'secondary',
  'info',
  'accent',
  'success',
  'warning',
  'error',
]

const modifiers = [
  'darker',
  'dark',
  'bright',
  'brighter',
]

</script>

<style lang="scss">
@import "@/style";

.color-sample {
  padding: var(--border-radius) calc(var(--border-radius) * 2);
  border-radius: var(--border-radius);

}

.color-sample {
  $each-color: (
      'primary': $primary,
      'secondary': $secondary,
      'info': $info,
      'accent': $accent,
      'success': $success,
      'warning': $warning,
      'error': $error,
  );

  @each $color, $value in $each-color {
    &.bg-#{$color} {
      &:after {
        font-size: 0.8rem;
        content: '  #{$value}';
      }
    }

  }


}
</style>
