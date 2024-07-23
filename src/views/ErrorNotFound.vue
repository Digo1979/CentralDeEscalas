<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const home = () => {
  router.push("/dashboard");
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="row no-gutters height-self-center">
        <div class="col-sm-12 text-center align-self-center">
          <div class="iq-error position-relative">
            <img
              src="/images/error/404.png"
              class="img-fluid iq-error-img"
              alt=""
            />
            <h2 class="mb-0 mt-4">Ops! Esta página não foi encontrada.</h2>
            <a
              class="btn btn-primary d-inline-flex align-items-center mt-3"
              style="color: white"
              @click="home()"
              ><i class="ri-home-4-line"></i>Voltar ao início</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
