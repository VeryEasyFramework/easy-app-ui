<template>
  <CardWidget class="px-5 py-4">
    <Container class="row-gap-5">

      <Container class="header row-gap-2">
        <div>

        </div>
      </Container>
      <FormBase name="login" @submitted="handleSubmit">
        <Container class="px-3 row-gap-3">

          <InputDataField label="Email" placeholder="Enter your email..." required focus
                          name="email"
                          v-model="credentials.email"/>
          <InputPasswordField label="Password" required placeholder="Enter your password..."
                              name="password"
                              v-model="credentials.password"/>
          <Container class="py-4">

            <Button type="submit">Login</Button>
          </Container>
        </Container>
      </FormBase>
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
import {reactive} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import {router} from "@/router/index.ts";

const appStore = useAppStore()
const credentials = reactive({
  email: '',
  password: ''
})

async function handleSubmit() {
  if (!credentials.email || !credentials.password) {
    return
  }
  await appStore.login(credentials.email, credentials.password)
  if (appStore.isAuthenticated) {
    await router.push({name: 'home'})
  }
}
</script>

<style scoped>

</style>
