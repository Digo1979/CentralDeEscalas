/*
  Copyright © 2021 Informatize. Todos os direitos reservados

  Registro para trabalhar Progressive Web App (PWA)

  eslint-disable no-console */
import { register } from "register-service-worker";
import * as alertify from "alertifyjs";

const notifyUserAboutUpdate = worker => {
  alertify
    .alert(
      "Será realizada a atualização do aplicativo antes de prosseguir",
      function() {
        worker.postMessage({ action: "skipWaiting" });
      }
    )
    .set({ title: "Atualização SaaSCom" })
    .set({ labels: { ok: "Atualizar!" } })
    .set({ pinnable: false, modal: true })
    .set("movable", false)
    .set("closable", false)
    .set("resizable", false);
};

const notifyUserAboutOffline = worker => {
  worker.postMessage({ action: "notifyOffline" });
};

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      //console.log(
      //  'App foi iniciado e está servido de cache para o service worker.\n' +
      //    'para maiores detalhes acesse https://goo.gl/AFskqB',
      //)
    },
    registered() {
      //console.log('Service worker foi registrado.')
    },
    cached() {
      //console.log('O conteúdo foi armazenado em cache para uso.')
    },
    updatefound() {
      //console.log('Novo conteúdo está sendo baixado.')
    },
    updated(registration) {
      notifyUserAboutUpdate(registration.waiting);
      //console.log('Novo conteúdo baixado; Favor atualizar.')
    },
    offline(registration) {
      notifyUserAboutOffline(registration.waiting);
      //console.log('Conexão com a internet não encontrada. App está rodando em modo offline.')
    },
    error(error) {
      // eslint-disable-next-line
      console.error("Erro durante o registro do service worker:", error);
    },
  });

  var refreshing;
  navigator.serviceWorker.addEventListener("controllerchange", function() {
    if (refreshing) return;
    console.log("refreshing because controllerchange was activated");
    window.location.reload();
    refreshing = true;
  });
}
