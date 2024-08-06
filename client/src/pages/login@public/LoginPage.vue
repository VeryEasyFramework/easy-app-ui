<template>
  <Grid justify="center" align="center">

    <WidgetCard class="px-4 py-3" bg-color="bg-dark">
      <Grid row fit center>
        <TextTitle>Login</TextTitle>

        <InputData label="Email" v-model="creds.email"/>
        <InputPassword label="Password" v-model="creds.password"/>
        <ButtonIcon icon="login" @clicked="handleLogin"/>

      </Grid>
    </WidgetCard>
  </Grid>
</template>

<script setup lang="ts">

import {ref} from "vue";

import {ButtonIcon, InputData, InputPassword, TextTitle} from "@eveffer/easy-client";
import {useAppStore} from "@/stores/index.ts";
import {router} from "@/router/index.ts";

const appStore = useAppStore();

const creds = ref({
  email: "",
  password: ""
});
const handleLogin = async () => {
  const {email, password} = creds.value;
  if (!email || !password) {
    return;
  }
  // await appStore.login(email, password);
  appStore.isAuthenticated = true;
  await router.push("/app/api");


};
</script>

<style scoped lang="scss">

</style>
