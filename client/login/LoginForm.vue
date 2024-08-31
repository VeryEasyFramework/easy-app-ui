<template>
  <Container class="center-items">
    <CardWidget class="px-5 py-4">
      <Container class="center-items row-gap-2">
        <Logo/>
        <h2 class="title">Login</h2>
      </Container>
      <Form name="login" @submitted="handleSubmit">
        <Container class="">

          <InputDataField required focus label="Email" name="email"
                          v-model="credentials.email"/>
          <InputPasswordField label="Password" name="password" v-model="credentials.password"/>
          <Container class="py-4">

            <Button type="submit">Login</Button>
          </Container>
        </Container>
      </Form>
    </CardWidget>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import InputDataField from "@/components/inputs/InputData.vue";
import InputPasswordField from "@/components/inputs/InputPassword.vue";
import Button from "@/components/buttons/Button.vue";
import Form from "@/components/form/Form.vue";
import HeaderLogo from "@/components/HeaderLogo.vue";
import Logo from "@/components/Logo.vue";


const credentials = {
  email: '',
  password: ''
}

function handleSubmit() {
  console.log('submitted')
}
</script>

<style scoped>

</style>
