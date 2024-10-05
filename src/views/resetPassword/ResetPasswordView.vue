<template>
  <Container class="row horizontal-align-center vertical-align-center">
    <CardWidget class="px-5 py-4">
      <Container class="row-gap-5">

        <Container class="header row-gap-2">
          <div class="title-4">


            Reset Your Password
          </div>
        </Container>
        <FormBase name="login" @submitted="handleSubmit">
          <Container class="px-3 row-gap-3">


            <InputPasswordField label="Password" required placeholder="Enter your password..."
                                name="password"
                                :error="passwordError"
                                v-model="credentials.password"/>
            <InputPasswordField label="Confirm Password" required
                                :error="confirmPasswordError"
                                placeholder="Confirm your password..." name="confirmPassword"
                                v-model="credentials.confirmPassword"/>
            <Container class="py-4">

              <Button type="submit">Reset Password</Button>
            </Container>
          </Container>
        </FormBase>
      </Container>
      <Container class="row justify-center">
        <Button type="button" class="flat" @click="() => router.push({name: 'login'})">
          Back to Login
        </Button>
      </Container>
    </CardWidget>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import {onBeforeMount, reactive, ref} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import Button from "@/components/buttons/Button.vue";
import FormBase from "@/components/form/FormBase.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import InputPasswordField from "@/components/inputs/InputPassword.vue";
import {useRoute} from "vue-router";
import {easyApi} from "@/api/index.ts";
import {notify} from "@/notify/index.ts";
import {router} from "@/router/index.ts";

const appStore = useAppStore()
const credentials = reactive({
  confirmPassword: '',
  password: ''
})
const token = ref()
const route = useRoute()
const passwordError = ref('')
const confirmPasswordError = ref('')
onBeforeMount(async () => {
  token.value = route.query.token as string
  if (!token.value) {
    await appStore.logout()
  }
})

async function handleSubmit() {
  passwordError.value = ''
  confirmPasswordError.value = ''
  if (!credentials.password) {
    passwordError.value = 'Password is required'
    return
  }
  if (!credentials.confirmPassword) {
    confirmPasswordError.value = 'Please confirm your password'
    return
  }
  if (credentials.password !== credentials.confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match'
    return
  }

  passwordError.value = ''
  const result = await easyApi.call<{ status: string }>("auth", "setNewPassword", {
    token: token.value,
    password: credentials.password
  })


  if (result.status === 'success') {
    notify({
      message: result.status
    })
    await router.push({name: 'login'})
  }

}
</script>

<style lang="scss">
.main-grid {
  background-color: var(--color-primary-light);
}
</style>
