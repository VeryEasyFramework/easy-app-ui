<template>

  <Container class="row shrink overflow-visible date-picker">
    <Container class="col horizontal-align-between vertical-align-center overflow-visible">

      <ButtonIcon class="flat" icon="chevron_left" @click="prevMonth"/>
      <TransitionFade speed="fast">

        <Container
            class="col shrink horizontal-align-between vertical-align-center overflow-visible"
            :key="currentMonth">
          <div>{{ monthNames[currentMonth] }}</div>
          <div>{{ currentYear }}</div>
        </Container>
      </TransitionFade>
      <ButtonIcon icon="chevron_right" class="flat" @click="nextMonth"/>
    </Container>
    <Container class="col-7 row-gap-0  shrink">

      <div class="weekday">Sun</div>
      <div class="weekday">Mon</div>
      <div class="weekday">Tue</div>
      <div class="weekday">Wed</div>
      <div class="weekday">Thu</div>
      <div class="weekday">Fri</div>
      <div class="weekday">Sat</div>
      <TransitionFade speed="fast">

        <div class="calendar-days" :key="currentMonth">

          <div class="day" :class="{
            'not-current-month': !day.isCurrentMonth,
            from: isEquals(day, from),
            to: isEquals(day, to),
            between: isBetween(day),
            disabled: isBefore(day)
          }" v-for="day in getAllDays(currentMonth, currentYear)"
               :key="day.date" @click="selectDay(day)">

            <div>{{ day.day }}</div>
          </div>

        </div>
      </TransitionFade>
    </Container>

  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import {ref} from "vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import TransitionFade from "@/components/transitions/TransitionFade.vue";
import ButtonDropdown from "@/components/buttons/ButtonDropdown.vue";

const currentMonth = ref<number>(new Date().getMonth())
const currentYear = ref<number>(new Date().getFullYear())
const selectMonthMode = ref<boolean>(false)
const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDay(month: number, year: number) {
  return new Date(year, month, 1).getDay()
}

interface Day {
  day: number | string
  isCurrentMonth: boolean
  date: string // '2022-01-01'
}

const emit = defineEmits<{
  (event: 'selected', value: {
    from: string
    to: string
  }): void
  (event: 'selectedSingle', value: string): void
  (event: 'clear'): void
}>()

const props = defineProps<{
  single?: boolean
}>()

function getAllDays(month: number, year: number) {
  const totalDays = 5 * 7
  const days = daysInMonth(month, year)
  const firstDay = getFirstDay(month, year)
  const lastDay = new Date(year, month, days).getDay()
  const allDays: Day[] = []
  const prevMonthDays = daysInMonth(month - 1, year)
  const nextMonthDays = daysInMonth(month + 1, year)

  for (let i = 0; i < totalDays; i++) {
    let day: Day = {
      day: '',
      isCurrentMonth: false,
      date: ''
    }
    if (i < firstDay) {
      day.day = prevMonthDays - firstDay + i + 1
      day.isCurrentMonth = false
      day.date = `${year}-${fillZero(month)}-${fillZero(prevMonthDays - firstDay + i + 1)}`
    } else if (i >= firstDay && i < days + firstDay) {
      day.day = i - firstDay + 1
      day.isCurrentMonth = true
      day.date = `${year}-${fillZero(month + 1)}-${fillZero(i - firstDay + 1)}`
    } else {
      day.day = i - days - firstDay + 1
      day.isCurrentMonth = false
      day.date = `${year}-${fillZero(month + 2)}-${i - days - firstDay + 1}`
    }
    allDays.push(day)
  }
  return allDays
}

function fillZero(num: number) {
  return num < 10 ? `0${num}` : num
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value = currentYear.value + 1
  }
  currentMonth.value = currentMonth.value + 1
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value = currentYear.value - 1
  }
  currentMonth.value = currentMonth.value - 1
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const from = ref<Day>()
const to = ref<Day>()

function selectDay(day: Day) {
  if (!to.value && !from.value) {
    from.value = day
    if (props.single) {
      from.value = undefined
      to.value = undefined
      emit('selectedSingle', day.date)
      return;
    }
    return
  }

  if (from.value && to.value) {
    from.value = day
    to.value = undefined
    return
  }

  if (isBefore(day)) {
    from.value = day
    to.value = undefined
    return
  }

  to.value = day

  emit('selected', {from: from.value!.date, to: to.value!.date})

}

function isEquals(day1?: Day, day2?: Day) {
  if (!day1 || !day2) {
    return false
  }
  return day1.date === day2.date
}

function isBetween(day: Day) {

  return from.value && to.value && day.date > from.value.date && day.date < to.value.date
}

function isBefore(day: Day) {
  return from.value && day.date < from.value.date
}
</script>

<style scoped lang="scss">
.date-picker {

  .calendar-days {
    text-align: center;
    display: grid;
    grid-template-columns: subgrid;
    column-gap: 0;
    grid-column: 1 / span 7;

    & .day {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--border-radius);

      &.not-current-month {
        color: var(--color-text-muted);
      }

      &:hover {
        background-color: var(--color-bg);
      }

      &:active {
        background-color: var(--color-primary);
        color: white;
      }

      &.from {
        background-color: var(--color-primary);
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        color: white;
      }

      &.to {
        background-color: var(--color-primary);
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        color: white;
      }

      &.to.from {
        border-radius: var(--border-radius);
      }

      &.between {
        border-radius: 0;
        background-color: var(--color-primary-brighter);
      }

      &.disabled {
        color: var(--color-text-muted);

      }
    }
  }

  .tools {

    border-top: 1px solid var(--color-widget-bg-bright);
  }

  .weekday {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    padding-inline: 0.1rem;
    padding-bottom: 0.7rem;
  }

  .btn {
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
