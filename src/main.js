import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/app.js';
import globalPlugin from './plugins/global';

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  // Manipule o erro aqui
  console.error('Erro capturado:', err);
  console.error('Instância do componente:', instance);
  console.error('Informação adicional:', info);
  // Você pode adicionar lógica personalizada, como enviar logs de erro para um serviço externo
};

app.use(router);
app.use(globalPlugin);
app.mount('#app');
