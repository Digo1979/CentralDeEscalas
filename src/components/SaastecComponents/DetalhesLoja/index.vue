<!--
  Copyright © 2021 Informatize. Todos os direitos reservados
-->
<template>
  <v-col
    cols="11"
    md="10"
    class="white">
    <v-row
      class="pa-2 pl-3"
      align="center">
      <div class="text-h4 font-weight-bold text-secondary">{{ empresa.ce045_nm_fantas || "não informado" }}</div>
    </v-row>
    <v-row>
      <v-btn
        :disabled="empresa.sd001_nr_filial == 27"
        dense
        dark
        class="ml-3"
        small
        color="light-blue accent-3"
        @click="$emit('adicionarFilial')"
      >
        Adicionar filial
      </v-btn>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        md="3">
        <!-- empresa -->
        <div class="pt-2 text-subtitle text-secondary">Nr. empresa</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ String(empresa.sd001_nr_inst).replace(/(\d{4})(\d{1})/g,"$1-$2") || "não informado" }}</div>
      </v-col>
      <v-col
        cols="6"
        md="3">
        <!-- filial -->
        <div class="pt-2 text-subtitle text-secondary">Nr. filial</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ (function(nr_filial){
          if(nr_filial.length > 1) return nr_filial.substring(0,nr_filial.length-1) + "-" + nr_filial.slice(-1)
          return nr_filial
        })(String(empresa.sd001_nr_filial)) || "não informado" }}</div>
      </v-col>

      <v-col
        cols="6"
        class="pb-0">
        <!-- situação -->
        <div class="pt-2 text-subtitle text-secondary">Situação</div>
        <v-menu
          :disabled="!isRepresentante"
          offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div style="width: 125px">
              <v-btn
                v-bind="attrs"
                :color="corSituacao(empresa.ce045_cd_situac)"
                dark
                dense
                class="pl-0"
                text
                small
                block
                v-on="on"
              >
                {{
                  itensSelecionaveis.situacao.filter(
                    (obj) => obj.value == empresa.ce045_cd_situac
                  )[0].text
                }}
                <v-spacer v-if="isRepresentante" />
                <v-icon
                  dark
                  right>
                  {{ isRepresentante ? "expand_more" : "" }}
                </v-icon>
              </v-btn>
            </div>
          </template>
          <v-list>
            <v-list-item
              v-for="(itemLista, index) in itensSelecionaveis.situacao"
              :key="index"
              @click="$emit('mudarSituacao', itemLista.value)"
            >
              <v-list-item-title>{{
                itemLista && itemLista.text
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>


    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6">
        <!-- razao -->
        <div class="pt-2 text-subtitle text-secondary">Razão social</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nm_razao || "não informado" }}</div>
        <!-- fantasia -->
        <div class="pt-2 text-subtitle text-secondary">Nome fantasia</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nm_fantas || "não informado" }}</div>
        <!-- cnpj e inscrição -->
        <div class="pt-2 text-subtitle text-secondary">CNPJ</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nr_cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5") || "não informado" }}</div>
        <div class="pt-2 text-subtitle text-secondary">Inscrição estadual</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_ds_insest || "não informado" }}</div>
      </v-col>
      <v-col
        cols="12"
        md="6">
        <!-- endereço -->
        <div class="text-h5">Endereço</div>
        <div class="pt-2 text-subtitle text-secondary">Rua e número</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nm_end || "não informado" }}, {{ empresa.ce045_nr_end || "não informado" }}</div>
        <div class="pt-2 text-subtitle text-secondary">Bairro</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nm_bairro || "não informado" }}</div>
        <div class="pt-2 text-subtitle text-secondary">Cidade e Estado</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nm_cidade || "não informado" }} - {{ empresa.ce045_sg_estado || "não informado" }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6">
        <!-- contato -->
        <div class="text-h5">Contato</div>
        <div class="pt-2 text-subtitle text-secondary">Nome</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nm_contat || "não informado" }}</div>
        <div class="pt-2 text-subtitle text-secondary">E-mail</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.ce045_nm_email || "não informado" }}</div>
        <div class="pt-2 text-subtitle text-secondary">Telefone</div>
        <div class="text-body-1 pt-0 font-weight-medium">
          ({{ empresa.ce045_nr_dddtel || "não informado" }}) {{ empresa.ce045_nr_tel || "não informado" }}
          <a
            :href="linkMensagemWhatsappPara(empresa.ce045_nr_dddtel, empresa.ce045_nr_tel)"
            target="_blank">
            <v-icon color="blue">sms</v-icon>
          </a>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6">
        <!-- valores -->
        <div class="text-h5">Valores</div>
        <div class="pt-2 text-subtitle text-secondary">Representante Responsável</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ empresa.us01_nm_usr || "não informado" }}</div>
        <div class="pt-2 text-subtitle text-secondary">Valor de implantação</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ Number(empresa.sd001_vl_imperp).toLocaleString("pt-br", {style: "currency",currency: "BRL",}) || "não informado" }}</div>
        <div class="pt-2 text-subtitle text-secondary">Valor da mensalidade</div>
        <div class="text-body-1 pt-0 font-weight-medium">{{ Number(empresa.sd001_vl_mensal).toLocaleString("pt-br", {style: "currency",currency: "BRL",}) || "não informado" }}</div>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      class="mt-5 mb-2">
      Cadastrada em {{ moment(empresa.sd001_dt_contr.toString()).format("LL") }}
    </v-row>

  </v-col>
</template>

<script>
import moment from "moment";
import "moment/locale/pt-br";
import { itensSelecionaveis } from "../../Util/Formularios/itensSelecionaveis.js";

export default {
  props: {
    empresa: {
      type: Object,
      default: function () {
        return {};
      },
    },
    showEndereco: {
      type: Boolean,
      default: true,
    },
    isRepresentante: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      itensSelecionaveis,
      moment: moment,
    };
  },
  async mounted() {
    moment.locale("pt-BR");
  },
  methods: {
    corSituacao(value) {
      switch (value) {
      case 1:
        return "light-blue accent-3";
      case 2:
        return "red";
      case 3:
        return "blue-grey lighten-4";
      }
    },
    linkMensagemWhatsappPara(ddd,numero) {
      if(!ddd || !numero) return ""

      let phone = "55" + String(ddd) + String(numero)
      let text = "Olá"

      let encode = (function(obj) {
        var str = [];
        for (var p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        return str.join("&");
      })({ phone, text })

      return `https://api.whatsapp.com/send?${encode}`
    },
  },
};
</script>
