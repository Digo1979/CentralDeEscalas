<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">Início</router-link>
        <div class="collapse navbar-collapse flex-row-reverse">
          <ul class="navbar-nav ml-auto" v-if="!user">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Entrar</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/registrar" class="nav-link">Registrar</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto" v-if="user">
            <li class="nav-item">
              <a ref="javascript:void(0)" @click="handleClick" class="nav-link">Sair</a>
            </li>
          </ul>          
        </div>
      </div>
    </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'Nav',
    methods: {
      handleClick() {
        localStorage.removeItem('token');
        this.$store.dispatch('user',null);
        this.$router.push('/');
      }
    },
    computed:{
      ...mapGetters(['user'])
    }
  }      
</script>
