<template>
  <CardWidget class="px-5 py-4">
    <Container class="row-gap-5">

      <Container class="header horizontal-align-center row-gap-2">
        <div class="title-3">
          {{ title }}
        </div>
      </Container>
      <FormBase name="login" @submitted="handleSubmit">
        <Container class="px-3 row-gap-3">

          <InputDataField label="Email" placeholder="Enter your email..." required focus
                          name="email"
                          :error="errors.email"
                          v-model="credentials.email"/>
          <InputPasswordField v-if="!forgotPassword" label="Password" required
                              placeholder="Enter your password..."
                              name="password"
                              :error="errors.password"
                              v-model="credentials.password"/>
          <Container class="py-4">

            <Button type="submit" :disabled="submitting">
              {{ submitting ? "Submitting..." : forgotPassword ? "Send Reset Email" : "Login" }}
            </Button>
          </Container>
        </Container>

      </FormBase>
    </Container>
    <Container class="row justify-center">
      <Button :disabled="submitting" type="button" class="flat" @click="setForgotPassword">
        {{ submitting ? "Submitting..." : forgotPassword ? 'Back to Login' : 'Forgot Password' }}
      </Button>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";

import InputDataField from "@/components/inputs/InputData.vue";
import InputPasswordField from "@/components/inputs/InputPassword.vue";
import Button from "@/components/buttons/Button.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import FormBase from "@/components/form/FormBase.vue";
import {reactive, ref} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import {router} from "@/router/index.ts";
import {easyApi} from "@/api/index.ts";
import {notify} from "@/notify/index.ts";

const appStore = useAppStore()
const credentials = reactive({
  email: '',
  password: ''
})
const errors = reactive({
  email: '',
  password: ''
})
const title = ref('Login')

const forgotPassword = ref(false)

async function setForgotPassword() {
  credentials.password = ''
  forgotPassword.value = !forgotPassword.value

  title.value = forgotPassword.value ? 'Reset Password' : 'Login'
}

const submitting = ref(false)

async function handleSubmit() {
  errors.email = ''
  errors.password = ''
  if (!credentials.email) {
    errors.email = 'Email is required'
    return
  }

  if (forgotPassword.value) {
    submitting.value = true
    const result = await easyApi.call<{
      message: string
    }>("auth", "resetPassword", {email: credentials.email})
    notify({
      message: result.message,
      type: 'success'
    })
    submitting.value = false
    await setForgotPassword()
  }
  if (!credentials.password) {
    errors.password = 'Password is required'
    return
  }
  submitting.value = true
  await appStore.login(credentials.email, credentials.password)
  submitting.value = false
  if (appStore.isAuthenticated) {
    await router.push({name: 'home'})
  }
}
</script>

<style scoped>

</style>
