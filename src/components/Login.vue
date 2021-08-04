<template>
    <form @submit.prevent="handleSubmit">
        <error v-if="error" :error="error" />
        <h3>Login</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <label>Senha</label>
            <input type="password" class="form-control" v-model="password" placeholder="Senha"/>
        </div>

        <div class="d-grid gap-2">            
            <button class="btn btn-primary btn-block">Login</button>
        </div>

        <p class="forgot-password text-right">
            <router-link to="esqueci">Esqueceu a senha</router-link>
        </p>
    </form>
</template>

<script>
    import axios from 'axios'
    import Error from './Error.vue'
    export default {
        name: 'Login',
        compoents: {
            Error
        },
        data() {
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {            
            async handleSubmit() {
                try {
                    const response = await axios.post('login', {
                        email: this.email,
                        password: this.password
                    });

                    localStorage.setItem('token', response.data.token);
                    this.$store.dispatch('user',response.data.user);
                    this.$router.push('/');
                    console.log(response);
                } catch (e) {
                    this.error = "Email/Senha inválidos!"                    
                }

            }
        }
    }
</script>
