<!--
  Copyright © 2021 Informatize. Todos os direitos reservados
-->
<template>
  <div class="mx-2 px-2">
    <form-wizard
      title=" "
      subtitle=" "
      next-button-text="Avançar"
      back-button-text="Voltar"
      finish-button-text="Finalizar"
      step-size="xs"
      color="#00B0FF"
      @on-complete="onComplete(props)"
    >
      <tab-content
        title="Empresa"
        icon="fa fa-user">
        <v-divider class="mt-5 mb-10" />
        <v-row class="ml-0 mb-3">
          <v-icon>error</v-icon>
          <div v-text="'Campos obrigatórios'" />
        </v-row>
        <v-form ref="formularioEmpresa">
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                v-mask="['##.###.###/####-##']"
                :rules="[regrasValidacao.required, regrasValidacao.cnpj]"
                v-model="formularioEmpresa.nrCnpj"
                :disabled="buscandoCnpj"
                :loading="buscandoCnpj"
                :error-messages="mensagensErro.cnpjCadastrado"
                outlined
                dense
                validate-on-blur
                required
                append-icon="error"
                label="CNPJ"
                @blur="!buscandoCnpj && buscarCnpj(formularioEmpresa.nrCnpj)"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                v-mask="['##############']"
                v-model="formularioEmpresa.dsInsest"
                required
                outlined
                dense
                label="Inscrição estadual"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="mb-n6">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nmRazao"
                outlined
                dense
                maxlength="60"
                required
                append-icon="error"
                label="Razão social"
                @input="
                  formularioEmpresa.nmRazao = formularioEmpresa.nmRazao.toUpperCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nmFantas"
                outlined
                dense
                required
                maxlength="40"
                append-icon="error"
                label="Nome fantasia"
                @input="
                  formularioEmpresa.nmFantas = formularioEmpresa.nmFantas.toUpperCase()
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="6"
              lg="2">
              <v-text-field
                v-mask="['#####-###']"
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nrCep"
                :disabled="buscandoCep"
                :loading="buscandoCep"
                required
                outlined
                dense
                append-icon="error"
                label="CEP"
                @blur="!buscandoCep && buscarCep()"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6"
              lg="4">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nmEnd"
                outlined
                required
                maxlength="40"
                dense
                append-icon="error"
                label="Logradouro"
                @input="
                  formularioEmpresa.nmEnd = formularioEmpresa.nmEnd.toUpperCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6"
              lg="2">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nrEnd"
                outlined
                dense
                required
                maxlength="7"
                append-icon="error"
                label="Número"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6"
              lg="4">
              <v-text-field
                v-model="formularioEmpresa.dsCompl"
                outlined
                dense
                maxlength="20"
                label="Complemento"
                @input="
                  formularioEmpresa.dsCompl = formularioEmpresa.dsCompl.toUpperCase()
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              sm="12"
              md="6">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nmBairro"
                outlined
                required
                dense
                maxlength="30"
                append-icon="error"
                label="Bairro"
                @input="
                  formularioEmpresa.nmBairro = formularioEmpresa.nmBairro.toUpperCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6"
              md="3">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nmCidade"
                outlined
                dense
                maxlength="40"
                append-icon="error"
                required
                label="Cidade"
                @input="
                  formularioEmpresa.nmCidade = formularioEmpresa.nmCidade.toUpperCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6"
              md="3">
              <v-select
                :items="itensSelecionaveis.ufs"
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.sgEstado"
                outlined
                required
                dense
                append-icon="error"
                prepend-inner-icon="arrow_drop_down"
                label="UF"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                :rules="[regrasValidacao.required, regrasValidacao.email]"
                v-model="formularioEmpresa.nmEmail"
                outlined
                validate-on-blur
                dense
                maxlength="50"
                required
                append-icon="error"
                label="E-mail"
                @input="
                  formularioEmpresa.nmEmail = formularioEmpresa.nmEmail.toLowerCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                :rules="[
                  regrasValidacao.required,
                  regrasValidacao.email,
                  regrasValidacao.confirmaEmail,
                ]"
                v-model="formularioEmpresa.confirmaEmail"
                outlined
                validate-on-blur
                dense
                maxlength="50"
                required
                append-icon="error"
                label="Confirmar e-mail"
                @input="
                  formularioEmpresa.confirmaEmail = formularioEmpresa.confirmaEmail.toLowerCase()
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nmLogin"
                :error-messages="mensagensErro.loginCadastrado"
                :required="buscandoLogin"
                :disabled="buscandoLogin"
                :loading="buscandoLogin"
                outlined
                dense
                maxlength="30"
                append-icon="error"
                label="Nome de login (acesso)"
                @input="
                  formularioEmpresa.nmLogin = formularioEmpresa.nmLogin.toUpperCase()
                "
                @blur="!buscandoLogin && buscarLogin()"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-select
                :items="itensSelecionaveis.regime"
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.regFat"
                outlined
                maxlength="40"
                dense
                append-icon="error"
                prepend-inner-icon="arrow_drop_down"
                required
                label="Regime faturamento"
              />
            </v-col>
          </v-row>
          <v-row class="mb-6">
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nmCliente"
                outlined
                dense
                maxlength="40"
                required
                append-icon="error"
                label="Nome do contato"
                @input="
                  formularioEmpresa.nmCliente = formularioEmpresa.nmCliente.toUpperCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                v-mask="['(##) #####-####']"
                :rules="[regrasValidacao.required]"
                v-model="formularioEmpresa.nrTel"
                outlined
                dense
                required
                append-icon="error"
                label="Telefone"
              />
            </v-col>
          </v-row>
        </v-form>
      </tab-content>
      <tab-content
        title="Planos"
        icon="fa fa-briefcase">
        <v-divider class="mt-5 mb-10" />
        <v-row class="ml-0 mb-3">
          <v-icon>error</v-icon>
          <div v-text="'Campos obrigatórios'" />
        </v-row>
        <v-form ref="formularioPlanos">
          <v-row>
            <v-col class="mb-n6">
              <v-combobox
                v-model="formularioPlanos.produtos"
                :items="itensSelecionaveis.produtos"
                :rules="[regrasValidacao.requiredArray]"
                label="Quais produtos serão adquiridos?"
                required
                append-icon="error"
                prepend-inner-icon="arrow_drop_down"
                multiple
                outlined
                small-chips
                dense
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    class="mt-1"
                    small
                    pill
                    close
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      left
                      size="20"
                      v-text="data.item.text.slice(0, 1).toUpperCase()"
                    />
                    {{ data.item.text }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="4">
              <v-switch
                v-model="formularioPlanos.indicacao"
                :label="`Houve indicação? ${
                  formularioPlanos.indicacao ? 'SIM' : 'NÃO'
                }`"
                class="mt-0"
                color="primary"
                inset
                @change="
                  !formularioPlanos.indicacao && (formularioPlanos.nmIndic = '')
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="8">
              <v-text-field
                :rules="
                  formularioPlanos.indicacao ? [regrasValidacao.required] : []
                "
                v-model="formularioPlanos.nmIndic"
                :required="formularioPlanos.indicacao"
                :disabled="!formularioPlanos.indicacao"
                :filled="!formularioPlanos.indicacao"
                :append-icon="formularioPlanos.indicacao ? 'error' : ''"
                outlined
                maxlength="40"
                dense
                label="Origem da indicação"
                @input="
                  formularioPlanos.nmIndic = formularioPlanos.nmIndic.toUpperCase()
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="4">
              <v-select
                :items="itensSelecionaveis.planos"
                :rules="[regrasValidacao.required]"
                v-model="formularioPlanos.plano"
                outlined
                append-icon="error"
                prepend-inner-icon="arrow_drop_down"
                required
                dense
                label="Planos"
                @change="trocaPlano()"
              />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="8">
              <v-row>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <vuetify-money
                    :rules="[regrasValidacao.required]"
                    v-model="formularioPlanos.vlImperp"
                    :options="moeda"
                    :properties="{ appendIcon: 'error' }"
                    required
                    outlined
                    dense
                    label="Valor de implantação"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.parcelas"
                    v-model="formularioPlanos.qtParimp"
                    outlined
                    dense
                    label="Quantidade de parcelas"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-menu
                    ref="dtPriimp"
                    v-model="formularioPlanos.dtPriimpActivator"
                    :close-on-content-click="false"
                    :return-value.sync="formularioPlanos.dtPriimp"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formularioPlanos.dtPriimp"
                        v-bind="attrs"
                        label="Data primeira mensalidade implantação"
                        prepend-inner-icon="event"
                        readonly
                        outlined
                        dense
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="formularioPlanos.dtPriimp"
                      no-title
                      scrollable
                    >
                      <v-spacer/>
                      <v-btn
                        text
                        color="primary"
                        @click="formularioPlanos.dtPriimpActivator = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dtPriimp.save(formularioPlanos.dtPriimp)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.responsavel"
                    :rules="[regrasValidacao.required]"
                    v-model="formularioPlanos.idResimp"
                    outlined
                    required
                    dense
                    append-icon="error"
                    prepend-inner-icon="arrow_drop_down"
                    label="Responsável pela implantação"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6">
                  <vuetify-money
                    :rules="[regrasValidacao.required]"
                    v-model="formularioPlanos.vlMensal"
                    :options="moeda"
                    :properties="{ appendIcon: 'error' }"
                    required
                    append-icon="error"
                    outlined
                    dense
                    label="Valor de mensalidade"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6">
                  <v-menu
                    ref="dtPrimen"
                    v-model="formularioPlanos.dtPrimenActivator"
                    :close-on-content-click="false"
                    :return-value.sync="formularioPlanos.dtPrimen"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formularioPlanos.dtPrimen"
                        :rules="[regrasValidacao.required]"
                        v-bind="attrs"
                        label="Data primeira mensalidade"
                        required
                        prepend-inner-icon="event"
                        append-icon="error"
                        readonly
                        outlined
                        dense
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="formularioPlanos.dtPrimen"
                      no-title
                      scrollable
                    >
                      <v-spacer/>
                      <v-btn
                        text
                        color="primary"
                        @click="formularioPlanos.dtPrimenActivator = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dtPrimen.save(formularioPlanos.dtPrimen)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </tab-content>
      <tab-content
        title="Produtos"
        icon="fa fa-folder-open">
        <v-divider class="mt-5 mb-10" />
        <v-row class="ml-0 mb-3">
          <v-icon>error</v-icon>
          <div v-text="'Campos obrigatórios'" />
        </v-row>
        <v-form ref="formularioProdutos">
          <v-row>
            <v-col
              class="mb-n6"
            >
              <v-select
                :items="itensSelecionaveis.segmentos"
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.cdSeg"
                outlined
                dense
                append-icon="error"
                prepend-inner-icon="arrow_drop_down"
                required
                label="Segmento de atuação"
              />
            </v-col>
          </v-row>
          <v-row v-if="formularioEmpresa.regFat != 'MEI'">
            <v-col
              class="mb-n6"
              cols="12"
              sm="6">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.nmContador"
                outlined
                dense
                required
                maxlength="40"
                append-icon="error"
                label="Nome contador"
                @input="
                  formularioProdutos.nmContador = formularioProdutos.nmContador.toUpperCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6">
              <v-text-field
                v-mask="'(##) #####-####'"
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.nrTelcon"
                outlined
                dense
                required
                append-icon="error"
                label="Telefone contador"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6"
              md="4">
              <v-text-field
                :rules="[regrasValidacao.required, regrasValidacao.pdvs]"
                v-model="formularioProdutos.qtCaixas"
                outlined
                dense
                type="number"
                required
                append-icon="error"
                label="Quantidade de PDV's"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="4">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.qtTef"
                outlined
                dense
                type="number"
                required
                append-icon="error"
                label="Quantidade TEF"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="4">
              <vuetify-money
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.vlTef"
                :properties="{ appendIcon: 'error' }"
                :options="moeda"
                outlined
                dense
                required
                append-icon="error"
                label="Valor do TEF"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              sm="4">
              <v-select
                :items="itensSelecionaveis.os"
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.idSo"
                outlined
                dense
                append-icon="error"
                prepend-inner-icon="arrow_drop_down"
                required
                label="Sistema operacional"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="4">
              <v-text-field
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.nmSisatu"
                outlined
                dense
                required
                maxlength="40"
                append-icon="error"
                label="Sistema atual"
                @input="
                  formularioProdutos.nmSisatu = formularioProdutos.nmSisatu.toUpperCase()
                "
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="4">
              <vuetify-money
                :rules="[regrasValidacao.required]"
                v-model="formularioProdutos.vlSisatu"
                :properties="{ appendIcon: 'error' }"
                :options="moeda"
                outlined
                dense
                required
                append-icon="error"
                label="Valor do sistema atual"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4">
              <v-switch
                v-model="formularioProdutos.idDados"
                :label="`Haverá migração de dados? ${
                  formularioProdutos.idDados ? 'SIM' : 'NÃO'
                }`"
                class="mt-0"
                color="primary"
                inset
                @change="
                  !formularioProdutos.idDados &&
                    ((formularioProdutos.nmCarga = ''),
                    (formularioProdutos.idPlanil = false),
                    (formularioProdutos.idBarras = ''))
                "
              />
            </v-col>
            <v-col
              cols="12"
              md="8">
              <v-row>
                <v-col
                  cols="12"
                  class="mb-n6">
                  <v-combobox
                    v-model="formularioProdutos.nmCarga"
                    :items="itensSelecionaveis.migracao"
                    :rules="
                      formularioProdutos.idDados
                        ? [regrasValidacao.requiredArray]
                        : []
                    "
                    :disabled="!formularioProdutos.idDados"
                    :filled="!formularioProdutos.idDados"
                    :append-icon="formularioProdutos.idDados ? 'error' : ''"
                    required
                    label="Quais dados serão migrados?"
                    prepend-inner-icon="arrow_drop_down"
                    multiple
                    outlined
                    small-chips
                    dense
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        class="mt-1"
                        small
                        pill
                        close
                        @click:close="data.parent.selectItem(data.item)"
                      >
                        {{ data.item.text }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6">
                  <v-switch
                    v-model="formularioProdutos.idPlanil"
                    :label="`Os dados estão em Excel (.xls)? ${
                      formularioProdutos.idPlanil ? 'SIM' : 'NÃO'
                    }`"
                    :disabled="!formularioProdutos.idDados"
                    class="mt-0"
                    color="primary"
                    inset
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6">
                  <v-select
                    :items="itensSelecionaveis.barras"
                    :rules="
                      formularioProdutos.idDados
                        ? [regrasValidacao.required]
                        : []
                    "
                    v-model="formularioProdutos.idBarras"
                    :disabled="!formularioProdutos.idDados"
                    :filled="!formularioProdutos.idDados"
                    :append-icon="formularioProdutos.idDados ? 'error' : ''"
                    :required="formularioProdutos.idDados"
                    outlined
                    dense
                    prepend-inner-icon="arrow_drop_down"
                    label="Código de barras"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4">
              <v-switch
                v-model="formularioProdutos.cdEcomm"
                :label="`Contratar e-commerce? ${
                  formularioProdutos.cdEcomm ? 'SIM' : 'NÃO'
                }`"
                class="mt-0"
                color="primary"
                inset
                @change="
                  !formularioProdutos.cdEcomm &&
                    ((formularioProdutos.cdAtivaEcomm = false),
                    (formularioProdutos.nmEcomm = ''),
                    (formularioProdutos.vlImpcom = ''),
                    (formularioProdutos.qtParcom = ''),
                    (formularioProdutos.dtPricom= ''),
                    (formularioProdutos.idRescom = ''),
                    (formularioProdutos.vlMdl = ''))
                "
              />
            </v-col>
            <v-col
              cols="12"
              md="8">
              <v-row>
                <v-col
                  cols="12"
                  class="mb-n6"
                  md="6">
                  <vuetify-money
                    :rules="
                      formularioProdutos.cdEcomm
                        ? [regrasValidacao.required]
                        : []
                    "
                    :filled="!formularioProdutos.cdEcomm"
                    :required="formularioProdutos.cdEcomm"
                    :disabled="!formularioProdutos.cdEcomm"
                    v-model="formularioProdutos.vlImpcom"
                    :options="moeda"
                    :properties="{
                      appendIcon: formularioProdutos.cdEcomm ? 'error' : '',
                    }"
                    outlined
                    dense
                    label="Valor de implantação e-commerce"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.parcelas"
                    v-model="formularioProdutos.qtParcom"
                    :filled="!formularioProdutos.cdEcomm"
                    :disabled="!formularioProdutos.cdEcomm"
                    outlined
                    dense
                    label="Quantidade de parcelas"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-menu
                    ref="dtPricom"
                    v-model="formularioProdutos.dtPricomActivator"
                    :close-on-content-click="false"
                    :return-value.sync="formularioProdutos.dtPricom"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formularioProdutos.dtPricom"
                        v-bind="attrs"
                        :required="formularioProdutos.cdEcomm"
                        :filled="!formularioProdutos.cdEcomm"
                        :disabled="!formularioProdutos.cdEcomm"
                        label="Data primeira mensalidade implantação"
                        prepend-inner-icon="event"
                        readonly
                        outlined
                        dense
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="formularioProdutos.dtPricom"
                      no-title
                      scrollable
                    >
                      <v-spacer/>
                      <v-btn
                        text
                        color="primary"
                        @click="formularioProdutos.dtPricomActivator = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dtPricom.save(formularioProdutos.dtPricom)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.responsavel"
                    :rules="formularioProdutos.cdEcomm ? [regrasValidacao.required] : []"
                    :required="formularioProdutos.cdEcomm"
                    :append-icon="formularioProdutos.cdEcomm ? 'error' : ''"
                    :filled="!formularioProdutos.cdEcomm"
                    :disabled="!formularioProdutos.cdEcomm"
                    v-model="formularioProdutos.idRescom"
                    outlined
                    dense
                    prepend-inner-icon="arrow_drop_down"
                    label="Responsável pela implantação"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6">
                  <vuetify-money
                    :rules="
                      formularioProdutos.cdEcomm
                        ? [regrasValidacao.required]
                        : []
                    "
                    :filled="!formularioProdutos.cdEcomm"
                    :required="formularioProdutos.cdEcomm"
                    :disabled="!formularioProdutos.cdEcomm"
                    v-model="formularioProdutos.vlMdl"
                    :options="moeda"
                    :properties="{
                      appendIcon: formularioProdutos.cdEcomm ? 'error' : '',
                    }"
                    outlined
                    dense
                    label="Valor do módulo integrador"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </tab-content>
      <tab-content
        title="Confirmação"
        icon="fa fa-thumbs-up">
        <v-divider class="mt-5 mb-10" />
        <v-row class="ml-0 mb-3">
          <div v-text="'Confirmação dos dados'" />
        </v-row>
        <v-form>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                v-model="formularioEmpresa.nrCnpj"
                outlined
                dense
                readonly
                label="CNPJ"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="mb-n6">
              <v-text-field
                v-model="formularioEmpresa.nmRazao"
                outlined
                readonly
                dense
                label="Razão social"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                v-model="formularioEmpresa.nmFantas"
                readonly
                outlined
                dense
                label="Nome fantasia"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="3">
              <v-text-field
                v-model="formularioEmpresa.dsCompl"
                readonly
                outlined
                dense
                label="Complemento"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="3">
              <v-text-field
                v-model="formularioEmpresa.nmBairro"
                outlined
                readonly
                dense
                label="Bairro"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              md="6"
              lg="4">
              <v-text-field
                v-model="formularioEmpresa.nmEnd"
                outlined
                readonly
                dense
                label="Logradouro"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="6"
              lg="2">
              <v-text-field
                v-model="formularioEmpresa.nrEnd"
                readonly
                outlined
                dense
                label="Número"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6"
              md="3">
              <v-text-field
                v-model="formularioEmpresa.nmCidade"
                readonly
                outlined
                dense
                label="Cidade"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6"
              md="3">
              <v-select
                :items="itensSelecionaveis.ufs"
                v-model="formularioEmpresa.sgEstado"
                readonly
                outlined
                dense
                label="UF"
              />
            </v-col>
          </v-row>
          <v-row class="mb-6">
            <v-col
              class="mb-n6"
              cols="12"
              md="6">
              <v-text-field
                v-model="formularioEmpresa.nmEmail"
                outlined
                readonly
                dense
                label="E-mail"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="3">
              <v-select
                :items="itensSelecionaveis.regime"
                v-model="formularioEmpresa.regFat"
                outlined
                readonly
                dense
                label="Regime faturamento"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              md="3">
              <v-text-field
                v-model="formularioEmpresa.nmCliente"
                readonly
                outlined
                dense
                label="Nome do Contato"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-form>
          <v-row>
            <v-col class="mb-n6">
              <v-combobox
                v-model="formularioPlanos.produtos"
                :items="itensSelecionaveis.produtos"
                label="Quais produtos serão adquiridos?"
                multiple
                readonly
                outlined
                small-chips
                dense
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    class="mt-1"
                    small
                    readonly
                    pill
                    close
                  >
                    <v-avatar
                      class="accent white--text"
                      left
                      size="20"
                      v-text="data.item.text.slice(0, 1).toUpperCase()"
                    />
                    {{ data.item.text }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="4">
              <v-select
                :items="itensSelecionaveis.planos"
                v-model="formularioPlanos.plano"
                outlined
                readonly
                dense
                label="Planos"
              />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="8">
              <v-row>

                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <vuetify-money
                    v-model="formularioPlanos.vlImperp"
                    :options="moeda"
                    outlined
                    readonly
                    dense
                    label="Valor de implantação"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.parcelas"
                    v-model="formularioPlanos.qtParimp"
                    outlined
                    readonly
                    dense
                    label="Quantidade de parcelas"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-text-field
                    v-model="formularioPlanos.dtPriimp"
                    label="Data primeira mensalidade implantação"
                    prepend-inner-icon="event"
                    readonly
                    outlined
                    dense
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.responsavel"
                    v-model="formularioPlanos.idResimp"
                    outlined
                    readonly
                    dense
                    label="Responsável pela implantação"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <vuetify-money
                    v-model="formularioPlanos.vlMensal"
                    :options="moeda"
                    outlined
                    readonly
                    dense
                    label="Valor de mensalidade"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-text-field
                    v-model="formularioPlanos.dtPrimen"
                    label="Data primeira mensalidade"
                    prepend-inner-icon="event"
                    readonly
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
        <v-form>
          <v-row v-if="formularioEmpresa.regFat != 'MEI'">
            <v-col
              class="mb-n6"
              cols="12"
              sm="6">
              <v-text-field
                v-model="formularioProdutos.nmContador"
                outlined
                readonly
                dense
                label="Nome contador"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6">
              <v-text-field
                v-model="formularioProdutos.nrTelcon"
                readonly
                outlined
                dense
                label="Telefone contador"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6">
              <v-select
                :items="itensSelecionaveis.os"
                v-model="formularioProdutos.idSo"
                outlined
                readonly
                dense
                label="Sistema operacional"
              />
            </v-col>
            <v-col
              class="mb-n6"
              cols="12"
              sm="6">
              <v-select
                :items="itensSelecionaveis.segmentos"
                v-model="formularioProdutos.cdSeg"
                outlined
                readonly
                dense
                label="Segmento de atuação"
              />
            </v-col>
          </v-row>
          <v-row v-if="formularioProdutos.idDados">
            <v-col
              cols="12"
              md="4">
              <v-switch
                v-model="formularioProdutos.idDados"
                :label="`Haverá migração de dados? ${
                  formularioProdutos.idDados ? 'SIM' : 'NÃO'
                }`"
                readonly
                class="mt-0"
                color="primary"
                inset
              />
            </v-col>
            <v-col
              cols="12"
              md="8">
              <v-row>
                <v-col
                  cols="12"
                  class="mb-n6">
                  <v-combobox
                    v-model="formularioProdutos.nmCarga"
                    :items="itensSelecionaveis.migracao"
                    label="Quais dados serão migrados?"
                    multiple
                    readonly
                    outlined
                    small-chips
                    dense
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        class="mt-1"
                        readonly
                        small
                        pill
                        close
                      >
                        {{ data.item.text }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6">
                  <v-switch
                    v-model="formularioProdutos.idPlanil"
                    :label="`Os dados estão em Excel (.xls)? ${
                      formularioProdutos.idPlanil ? 'SIM' : 'NÃO'
                    }`"
                    readonly
                    class="mt-0"
                    color="primary"
                    inset
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6">
                  <v-select
                    :items="itensSelecionaveis.barras"
                    v-model="formularioProdutos.idBarras"
                    outlined
                    readonly
                    dense
                    label="Código de barras"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-if="formularioProdutos.cdEcomm">
            <v-col
              cols="12"
              md="4">
              <v-switch
                v-model="formularioProdutos.cdEcomm"
                :label="`Contratar e-commerce? ${
                  formularioProdutos.cdEcomm ? 'SIM' : 'NÃO'
                }`"
                class="mt-0"
                readonly
                color="primary"
                inset
              />
            </v-col>
            <v-col
              cols="12"
              md="8">
              <v-row>
                <v-col
                  cols="12"
                  class="mb-n6"
                  md="6">
                  <vuetify-money
                    v-model="formularioProdutos.vlImpcom"
                    :options="moeda"
                    outlined
                    readonly
                    dense
                    label="Valor de implantação e-commerce"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.parcelas"
                    v-model="formularioProdutos.qtParcom"
                    outlined
                    readonly
                    dense
                    label="Quantidade de parcelas"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="mb-n6"
                  sm="6">
                  <v-text-field
                    v-model="formularioProdutos.dtPricom"
                    label="Data primeira mensalidade implantação"
                    prepend-inner-icon="event"
                    readonly
                    outlined
                    dense
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6">
                  <v-select
                    :items="itensSelecionaveis.responsavel"
                    v-model="formularioProdutos.idRescom"
                    outlined
                    readonly
                    dense1
                    prepend-inner-icon="arrow_drop_down"
                    label="Responsável pela implantação"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6">
                  <vuetify-money
                    v-model="formularioProdutos.vlMdl"
                    :options="moeda"
                    outlined
                    readonly
                    dense
                    label="Valor do módulo integrador"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox v-model="termoAceite">
                <template v-slot:label>
                  <div>
                    Eu aceito os
                    <a
                      target="_blank"
                      href="https://www.saastecerp.com.br/politica-de-tratamento-de-dados/"
                      @click.stop
                    >
                      termos do uso e política de privacidade
                    </a>
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </tab-content>
      <template
        slot="footer"
        slot-scope="props">
        <v-row>
          <v-btn
            v-if="props.activeTabIndex > 0"
            color="primary light-blue accent-3"
            @click.native="voltar(props)"
          >Voltar</v-btn
          >
          <v-spacer />
          <v-btn
            v-if="!props.isLastStep"
            :disabled="buscandoLogin || buscandoCnpj"
            color="primary light-blue accent-3"
            @click.native="validarCamposFormulario(props)"
          >Próximo</v-btn
          >
          <v-btn
            v-else
            :loading="cadastroEmAndamento"
            :disabled="!termoAceite || cadastroEmAndamento"
            color="primary light-blue accent-3"
            @click.native="!cadastroEmAndamento && onComplete(props)"
          >Confirmar</v-btn
          >
        </v-row>
      </template>
    </form-wizard>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/pt-br";
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import { mask } from "vue-the-mask";
import axios from "axios";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Swal from "sweetalert2";
import GeradorPdf from "../../Util/GeradorPdf/GeradorPdf.js";
import Validacoes from "../../Util/Validacoes/Validacoes.js";
import { itensSelecionaveis } from "../../Util/Formularios/itensSelecionaveis.js";
export default {
  directives: { mask },
  components: {
    FormWizard,
    TabContent,
    WizardButton,
  },
  data: function () {
    return {
      itensSelecionaveis,
      hostname: null,
      cadastroEmAndamento: false,
      moeda: {
        locale: "pt-BR",
        prefix: "R$",
        suffix: "",
        length: 11,
        precision: 2,
      },
      termoAceite: false,
      buscandoCnpj: false,
      buscandoLogin: false,
      buscandoCep: false,
      mensagensErro: {
        cnpjCadastrado: "",
        loginCadastrado: "",
      },
      regrasValidacao: {
        required: (value) => !!value || "Campo obrigatório!",
        requiredArray: (value) =>
          (!!value && value.length != 0) || "Campo obrigatório!",
        cnpj: (value) =>
          (!!value && Validacoes.validarCnpj(value)) || "Cnpj inválido!",
        email: (value) => Validacoes.validarEmail(value) || "E-mail inválido.",
        confirmaEmail: (value) =>
          value == this.formularioEmpresa.nmEmail ||
          "Os e-mails digitados estão diferentes!",
        pdvs: (value) => value <= 50 || "Quantidade máxima de 50 PDV's",
      },
      formularioPlanos: {
        nmIndic: "",
        vlMensal: "",
        dtPrimen: "",
        dtPrimenActivator: false,
        vlImperp: "",
        qtParimp:"",
        dtPriimp:"",
        dtPriimpActivator: false,
        idResimp:"",
        plano: "",
        indicacao: false,
        produtos: "",
      },
      formularioEmpresa: {
        nmCliente: "",
        nmBairro: "",
        nmCidade: "",
        nmEnd: "",
        nmRazao: "",
        nmFantas: "",
        nmEmail: "",
        nmLogin: "",
        nrEnd: "",
        nrCep: "",
        nrCnpj: "",
        nrTel: "",
        dsCompl: "",
        dsInsest: "",
        sgEstado: "",
        regFat: "",
        confirmaEmail: "",
      },
      formularioProdutos: {
        idSo: "",
        cdSeg: "",
        nmContador: "",
        nmSisatu: "",
        nmCarga: "",
        nmEcomm: "",
        qtCaixas: "",
        vlImpcom: "",
        qtParcom:"",
        dtPricom:"",
        dtPricomActivator: false,
        idRescom:"",
        vlMdl: "",
        vlSisatu: "",
        cdAtivaEcomm: false,
        qtTef: "",
        vlTef: "",
        cdEcomm: false,
        idDados: false,
        idPlanil: false,
        idBarras: "",
        ecommerce: "",
        ecomm: "",
        nrTelcon: "",
        nrDddcon: "",
      },
    };
  },
  async created() {
    moment.locale("pt-BR");
  },
  methods: {
    async buscarLogin() {
      let nmLogin = this.formularioEmpresa.nmLogin;
      this.buscandoLogin = true;

      try {
        let user = await this.$wso2.getUserData();

        const objeto = { filtros: [{ ENT_NM_LOGIN: nmLogin }] };

        let response = await this.$wso2.get(
          { functionName: "SD.SP_SD940101006", server: "NDW", versao: "1" },
          10944,
          process.env.VUE_APP_CD_SIST,
          user.base.us01_nm_login,
          objeto,
          null,
          null
        );

        this.mensagensErro.loginCadastrado = "";
        if (response.database[0].verifica_nm_login) {
          this.mensagensErro.loginCadastrado =
            "O nome de login informado já se encontra em uso!";
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.buscandoLogin = false;
      }
    },
    async buscarCep() {
      if (!this.buscandoCep) {
        this.buscandoCep = true;
        this.$nprogress.start();

        let cep = this.formularioEmpresa.nrCep;
        cep = cep.replace(/[^\d]+/g, "");
        var URL = "https://viacep.com.br/ws/" + cep + "/json/";

        await axios
          .get(URL)
          .then((response) => {
            const dadoscep = JSON.parse(response.request.response);
            if (!dadoscep.erro) {
              this.formularioEmpresa.nmBairro = dadoscep.bairro.toUpperCase().slice(0, 30);
              this.formularioEmpresa.nmCidade = dadoscep.localidade.toUpperCase().slice(0, 40);
              this.formularioEmpresa.nmEnd = dadoscep.logradouro.toUpperCase().slice(0,40);
              this.formularioEmpresa.sgEstado = dadoscep.uf.toUpperCase();
              this.$notification["success"]({
                message: "Consulta",
                description: "Busca de cep realizada com sucesso!",
              });
            } else {
              this.$notification["warning"]({
                message: "Consulta",
                description:
                  "Endereço não localizado para o CEP informado. Favor prosseguir com o preenchimento manual.",
              });
              this.limparCamposDeRetornoDaBuscaPorCep();
            }
          })
          .catch((error) => {
            this.limparCamposDeRetornoDaBuscaPorCep();
            console.log("Consulta CEP (ERRO): ", error);
            Swal.fire({
              title: "Falha na consulta!",
              text:
                "Endereço não localizado para o CEP informado. Favor prosseguir com o preenchimento manual.",
              icon: "info",
              showConfirmButton: false,
              timer: 8000,
            });
          })
          .finally(() => {
            this.$nprogress.done();
            this.buscandoCep = false;
        });
      }
    },
    async verificarCnpjCadastrado(cnpj) {
      // verifica se o cnpj já foi cadastrado e muda mensagem de erro

      const cnpjSemFormatacao = cnpj.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        ""
      );
      let user = await this.$wso2.getUserData();
      let response = await this.$wso2.get(
        { functionName: "SD.SP_SD940101003", server: "NDW", versao: "1" },
        10944,
        process.env.VUE_APP_CD_SIST,
        user.base.us01_nm_login,
        { filtros: [{ ENT_NR_CNPJ: cnpjSemFormatacao }] },
        null,
        null
      );

      if (response.database[0].verifica_nr_cnpj) {
        this.mensagensErro.cnpjCadastrado = "CNPJ já cadastrado no sistema";
        return true;
      }

      this.mensagensErro.cnpjCadastrado = "";
      return false;
    },
    async buscarCnpj() {
      const cnpj = this.formularioEmpresa.nrCnpj;
      if (cnpj == null) {
        this.limparCamposDeRetornoDaBuscaPorCnpj();
        return;
      }
      const cnpjSemFormatacao = cnpj.replace(
        /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
        ""
      );


      if (
        !this.buscandoCnpj &&
        !(await this.verificarCnpjCadastrado(cnpj)) &&
        Validacoes.validarCnpj(cnpj)
      ) {
        this.buscandoCnpj = true;
        let dadosEncontrados = false;

        const service = {
          key: "localizador-sintegra",
        };

        const user = await this.$wso2.getUserData();

        // Busca de CNPJ na Sintegra
        try {
          this.$nprogress.start();
          const request = {
            filtros: {
              cnpj: cnpjSemFormatacao,
              plugin: "ST",
            },
          };

          let sintegraResponse = await this.$wso2.get(
            null,
            10944,
            process.env.VUE_APP_CD_SIST,
            user.base.us01_nm_login,
            request,
            null,
            service
          );
          const empresa = sintegraResponse.service;

          if (empresa && empresa.nome_empresarial) {
            this.limparCamposDeRetornoDaBuscaPorCnpj();
            const palavrasIndesejadas = ["não", "informado", "informada"];
            for (var dado in empresa) {
              for (var palavra in palavrasIndesejadas) {
                if (
                  empresa.hasOwnProperty(dado) &&
                  String(empresa[dado])
                    .toLowerCase()
                    .includes(palavrasIndesejadas[palavra])
                ) {
                  empresa[dado] = "";
                }
              }
            }
            empresa.inscricao_estadual &&
            (this.formularioEmpresa.dsInsest = empresa.inscricao_estadual);
            empresa.bairro &&
              (this.formularioEmpresa.nmBairro = empresa.bairro
                .toUpperCase()
                .substring(0, 30));
            empresa.municipio &&
              (this.formularioEmpresa.nmCidade = empresa.municipio
                .toUpperCase()
                .substring(0, 40));
            empresa.cep && (this.formularioEmpresa.nrCep = empresa.cep);
            empresa.complemento &&
              (this.formularioEmpresa.dsCompl = empresa.complemento
                .toUpperCase()
                .substring(0, 20));
            empresa.logradouro &&
              (this.formularioEmpresa.nmEnd = empresa.logradouro
                .toUpperCase()
                .substring(0, 40));
            empresa.numero && (this.formularioEmpresa.nrEnd = empresa.numero);
            empresa.nome_empresarial &&
              (this.formularioEmpresa.nmRazao = empresa.nome_empresarial
                .toUpperCase()
                .substring(0, 30));
            empresa.nome_fantasia &&
              (this.formularioEmpresa.nmFantas = empresa.nome_fantasia
                .toUpperCase()
                .substring(0, 30));
            empresa.uf &&
            (this.formularioEmpresa.sgEstado = empresa.uf.toUpperCase());

            this.$notification["success"]({
              message: "Consulta de CNPJ",
              description: `Consulta realizada no Sintegra`,
            });
            this.buscandoCnpj = false;
            dadosEncontrados = true;
          } else {
            console.log("Sintegra Falha");
            this.$notification["warning"]({
              message: "Consulta de CNPJ",
              description:
                "Sintegra não retornou dados, buscando cnpj na Receita Federal",
            });
          }
        } catch (e) {
          console.log("Falha na busca pela Sintegra", e);
        } finally {
          this.$nprogress.done();
        }

        if (!dadosEncontrados) {
          // Caso falha na busca com a Sintegra
          // Busca de CNPJ na Receita Federal
          try {
            this.$nprogress.start();
            let request = {
              filtros: {
                cnpj: cnpjSemFormatacao,
                plugin: "RF",
              },
            };

            let receitaResponse = await this.$wso2.get(
              null,
              10944,
              process.env.VUE_APP_CD_SIST,
              user.base.us01_nm_login,
              request,
              null,
              service
            );

            const empresa = receitaResponse.service;
            if (empresa && empresa.nome) {
              this.limparCamposDeRetornoDaBuscaPorCnpj();
              for (var propriedade in empresa) {
                if (
                  empresa.hasOwnProperty(propriedade) &&
                  String(empresa[propriedade]).includes("*")
                ) {
                  empresa[propriedade] = "";
                }
              }
              empresa.bairro &&
                (this.formularioEmpresa.nmBairro = empresa.bairro
                  .toUpperCase()
                  .substring(0, 30));
              empresa.municipio &&
                (this.formularioEmpresa.nmCidade = empresa.municipio
                  .toUpperCase()
                  .substring(0, 40));
              empresa.cep && (this.formularioEmpresa.nrCep = empresa.cep);
              empresa.logradouro &&
                (this.formularioEmpresa.nmEnd = empresa.logradouro
                  .toUpperCase()
                  .substring(0, 40));
              empresa.numero && (this.formularioEmpresa.nrEnd = empresa.numero);
              empresa.nome &&
                (this.formularioEmpresa.nmRazao = empresa.nome
                  .toUpperCase()
                  .substring(0, 30));
              empresa.fantasia &&
                (this.formularioEmpresa.nmFantas = empresa.fantasia
                  .toUpperCase()
                  .substring(0, 30));
              empresa.uf &&
              (this.formularioEmpresa.sgEstado = empresa.uf.toUpperCase());

              this.$notification["success"]({
                message: "Consulta de CNPJ",
                description: `Consulta realizada na Receita Federal`,
              });
            } else {
              this.limparCamposDeRetornoDaBuscaPorCnpj();
              this.$notification["warning"]({
                message: "Consulta de CNPJ",
                description: "Receita Federal não retornou dados",
              });
            }
          } catch (e) {
            console.log(e);
            this.limparCamposDeRetornoDaBuscaPorCnpj();
            Swal.fire({
              title: "Falha na localização de CNPJ",
              text:
                "Erro na comunicação com o serviço de localização de CNPJ. Favor contatar o suporte técnico.",
              icon: "warning",
              showConfirmButton: false,
              timer: 7000,
            });
          } finally {
            this.buscandoCnpj = false;
            this.$nprogress.done();
          }
        }
      }
    },
    async onComplete(props) {
      props.prevTab();
      props.prevTab();
      props.prevTab();
      const camposValidados =
        this.$refs.formularioEmpresa.validate() &&
        this.$refs.formularioPlanos.validate() &&
        this.$refs.formularioProdutos.validate();
      if (camposValidados) {
        let empresa = Object.assign(
          { qtTef: "Sim", dtContr: parseInt(moment().format("YYYYMMDD")) },
          this.formularioEmpresa,
          this.formularioPlanos,
          this.formularioProdutos
        );
        let empresaTratada = await this.tratarCamposParaCadastro(empresa);
        this.gerarInstituicao(empresaTratada);
      } else {
        Swal.fire({
          title: "Campos com erro!",
          text:
            "Não é possível completar o cadastro enquanto houver campos com erro",
          icon: "warning",
          showConfirmButton: false,
          timer: 8000,
        });
      }
    },
    async tratarCamposParaCadastro(empresa) {
      let obj = { ...empresa };
      obj.nrCep = obj.nrCep.replace(/[^0-9]/g, "");
      obj.nrCep = parseInt(obj.nrCep);

      obj.nrCnpj = obj.nrCnpj.replace(/[^0-9]/g, "");
      obj.nrCnpj = obj.nrCnpj.replace(".", "");

      obj.nrTel = obj.nrTel.replace(/[^0-9.]/g, "");
      obj.nrDddtel = obj.nrTel.substring(0, 2);
      obj.nrDddtel = parseInt(obj.nrDddtel);

      if (obj.nrTel.length == 11) {
        obj.nrTel = obj.nrTel.substring(2, 11);
      } else {
        obj.nrTel = obj.nrTel.substring(2, 10);
      }
      obj.nrTel = parseInt(obj.nrTel);

      obj.nmUsrRes = obj.nmRazao.split(" ")[0].substring(0, 15);
      obj.nmUsr = obj.nmCliente.split(" ")[0];


      if (obj.regFat !== 'MEI') {
        obj.nrTelcon = obj.nrTelcon.replace(/[^0-9.]/g, "");
        obj.nrDddcon = obj.nrTelcon.substring(0, 2);
        obj.nrDddcon = parseInt(obj.nrDddcon);

        if (obj.nrTelcon.length == 11) {
          obj.nrTelcon = obj.nrTelcon.substring(2, 11);
        } else {
          obj.nrTelcon = obj.nrTelcon.substring(2, 10);
        }
        obj.nrTelcon = parseInt(obj.nrTelcon);
      } else {
        obj.nrTelcon = 0
        obj.nrDddcon = 0
      }

      if (!obj.indicacao) {
        obj.nmIndic = " ";
      }

      if (!obj.dsInsest) {
        obj.dsInsest = " ";
      }

      obj.idBarras = obj.idDados ? obj.idBarras : 1;
      obj.idDados = obj.idDados ? 1 : 2;
      obj.idPlanil = obj.idPlanil ? 1 : 2;

      if(obj.nmCarga != ''){
        let idCarga = obj.nmCarga.map(el => el.value)
        obj.conversao = obj.idDados ? idCarga.map(el => {
          let value = this.itensSelecionaveis.migracao.filter(cr => cr.value == el)[0];
          console.log(value)
          if(value) return value.text
        })
          .filter(el => el)
          .toString()
        : "Não haverá carga de dados"
        obj.cdCarga = JSON.stringify(idCarga);
      }else{
        obj.cdCarga = "[]"
        obj.conversao = "Não haverá carga de dados"
      }
      if (!obj.cdEcomm) {
        obj.vlImpcom = 0;
        obj.vlMdl = 0;
      }

      if (obj.dsInsest) {
        obj.idIsento = 2;
      } else {
        obj.idIsento = 1;
      }
      if (!obj.dsCompl) {
        obj.dsCompl = " ";
      }

      // valores para cadastrar
      obj.vlMensal = parseFloat(obj.vlMensal);
      obj.dtPrimen = obj.dtPrimen.replace(/-/g, '');

      obj.vlImperp = parseFloat(obj.vlImperp);
      obj.qtParimp = obj.qtParimp ? obj.qtParimp : 0;
      obj.dtPriimp = obj.dtPriimp ? obj.dtPriimp.replace(/-/g, '') : 0;
      obj.idResimp = obj.idResimp;

      obj.vlImpcom = parseFloat(obj.vlImpcom);
      if(obj.cdEcomm) {
        obj.qtParcom = obj.qtParcom ? obj.qtParcom : 0;
        obj.dtPricom = obj.dtPricom ? obj.dtPricom.replace(/-/g, '') : 0;
        obj.idRescom = obj.idRescom;
      } else {
        obj.qtParcom = 0;
        obj.dtPricom = 0;
        obj.idRescom = 1;
      }

      obj.vlSisatu = parseFloat(obj.vlSisatu);
      obj.vlMdl = parseFloat(obj.vlMdl);
      obj.vlTef = parseFloat(obj.vlTef);

      let user = await this.$wso2.getUserData();
      let usuario = user;
      let nrUsr = usuario;

      obj.cdUsrrep = nrUsr.base.us01_nr_usr;
      obj.nmPlanos = obj.produtos.toString();
      obj.cdPlano = obj.plano;

      /**
       * Transforma Array de ids [1,2,3]
       * em string de produtos
       * string: produto1,produto2,produto3
       */
      let idProdutos = obj.produtos.map(el => el.value)
      obj.nmPlanos = idProdutos.map(el => {
        let value = this.itensSelecionaveis.produtos.filter(pr => pr.value == el)[0];
        console.log(value)
        if(value) return value.text
      })
        .filter(el => el)
        .toString();

      obj.cdProd = JSON.stringify(idProdutos);

      obj.nmRep = usuario.base.us01_nm_usr;
      obj.nmReg = obj.regFat;
      obj.nmContat = obj.nmCliente;

      obj.ativarEcom = obj.cdAtivaEcomm;
      obj.hostname = this.hostname;

      obj.ativacaoImediata = "Nao";

      console.log(obj);
      return obj;
    },
    async gerarInstituicao(empresa) {
      if(!this.cadastroEmAndamento) {
        this.cadastroEmAndamento = true
        try {
          const sections = [
            {
              // [Tiulo Primário]
              title: "Termo de aceite para cadastro de empresa",
            },
            {
              // [Sessão]
              rows: [
                [
                  {
                    label: "Representante",
                    content: String(empresa.nmRep).toUpperCase(),
                    position: 0,
                  },
                  {
                    label: "Produtos",
                    content: String(empresa.nmPlanos).replace(/,/g, ", ").toUpperCase(),
                    position: 50,
                  },
                ],
              ],
            },
            {
              // [Título Secundário e Sessão]
              title: "Dados da Loja",
              rows: [
                [
                  {
                    label: "Razão Social",
                    content: empresa.nmRazao.toUpperCase(),
                    position: 0,
                  },
                  {
                    label: "Nome Fantasia",
                    content: empresa.nmFantas.toUpperCase(),
                    position: 50,
                  },
                ],
                [
                  {
                    label: "CNPJ",
                    content: empresa.nrCnpj.replace(
                      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                      "$1.$2.$3/$4-$5"
                    ),
                    position: 0,
                  },
                  {
                    label: "Regime de Faturamento",
                    content: empresa.nmReg.toUpperCase(),
                    position: 20,
                  },
                  {
                    label: "Inscrição Estadual",
                    content: empresa.dsInsest,
                    position: 43,
                  },
                  {
                    label: "Município para fins de emissão de NFS-e",
                    content: empresa.nmCidade,
                    position: 63,
                  },
                ],
                [
                  {
                    label: "Endereço",
                    content: `${empresa.nmEnd}, ${empresa.nrEnd}, ${empresa.nmBairro}, ${empresa.nmCidade}, ${empresa.sgEstado}`,
                    position: 0,
                  },
                ],
              ],
            },
            {
              title: "Contato",
              rows: [
                [
                  { label: "Contato", content: empresa.nmContat, position: 0 },
                  { label: "E-mail", content: empresa.nmEmail, position: 33 },
                  {
                    label: "Telefone",
                    content: `(${empresa.nrDddtel}) ${
                      String(empresa.nrTel).length == 9
                        ? String(empresa.nrTel).replace(
                          /^(\d{5})(\d{4})/,
                          "$1-$2"
                        )
                        : String(empresa.nrTel).replace(
                          /^(\d{4})(\d{4})/,
                          "$1-$2"
                        )
                    }`,
                    position: 66,
                  },
                ],
                [
                  {
                    label: "Nome do contador",
                    content: empresa.nmContador,
                    position: 0,
                  },
                  {
                    label: "Telefone do contador",
                    content: (() => {
                      if(empresa.nrDddcon == 0 || empresa.nrTelcon == 0)
                        return "";
                      return `(${empresa.nrDddcon}) ${empresa.nrTelcon.length == 11
                        ? String(empresa.nrTelcon).replace(
                          /^(\d{5})(\d{4})/,
                          "$1-$2"
                        )
                        : String(empresa.nrTelcon).replace(
                          /^(\d{4})(\d{4})/,
                          "$1-$2"
                      )}`
                    })(),
                    position: 50,
                  },
                ],
              ],
            },
            {
              title: "Migração",
              rows: [
                [
                  {
                    label: "Dados p/ transferir",
                    content: empresa.idDados == 1 ? 'SIM': 'NÃO',
                    position: 0,
                  },
                  { label: "Dados (.XLS)",
                    content: empresa.idPlanil == 1 ? 'SIM': 'NÃO',
                    position: 30 },
                  {
                    label: "Gerar cód. de barras",
                    content: itensSelecionaveis.barras.filter(barra => barra.value == empresa.idBarras)[0].text.toUpperCase(),
                    position: 50,
                  },
                ],
                [
                  {
                    label: "Carga de dados",
                    content: empresa.conversao.replace(/,/g, ", ").toUpperCase(),
                    position: 0,
                  },
                ],
              ],
            },
            {
              title: "Informações do Ambiente Operacional",
              rows: [
                [
                  {
                    label: "Sistema operacional",
                    content: itensSelecionaveis.os.filter(os => os.value == empresa.idSo)[0].text.toUpperCase(),
                    position: 0,
                  },
                  {
                    label: "Quantidade de TEF",
                    content: empresa.qtTef,
                    position: 20,
                  },
                  {
                    label: "Valor do TEF",
                    content: empresa.vlTef.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 40,
                  },
                  { label: "Nº de PDVs",
                    content: empresa.qtCaixas,
                    position: 60,
                  },
                  {
                    label: "Valor do sistema atual",
                    content: empresa.vlSisatu.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 80,
                  },
                ],
                [
                  {
                    label: "Segmento de atuação",
                    content: itensSelecionaveis.segmentos.filter(seg => seg.value == empresa.cdSeg)[0].text.toUpperCase(),
                    position: 0,
                  },
                  {
                    label: "Nome do indicador",
                    content: empresa.nmIndic.toUpperCase(),
                    position: 50,
                  },
                  {
                    label: "Sistema atual",
                    content: empresa.nmSisatu.toUpperCase(),
                    position: 75,
                  },
                ],
              ],
            },
            {
              title: "Negociação Comercial",
              header: "Mensalidade",
              rows: [
                [
                  {
                    label: "Plano contratado",
                    content: itensSelecionaveis.planos[empresa.cdPlano - 1].text,
                    position: 0,
                  },
                  {
                    label: "Valor mensalidade",
                    content: empresa.vlMensal.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 33,
                  },
                  {
                    label: "Data primeira parcela",
                    content: empresa.dtPrimen ? empresa.dtPrimen.replace(/^(\d{4})(\d{2})(\d{2})/, "$3/$2/$1") : ' ',
                    position: 66,
                  },
                ],
              ],
            },
            {
              header: "Implantação ERP",
              rows: [
                [
                  {
                    label: "Valor implantação",
                    content: empresa.vlImperp.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 0,
                  },
                  {
                    label: "Nr. parcelas",
                    content: empresa.qtParimp ? String(empresa.qtParimp) : ' ',
                    position: 20,
                  },
                  {
                    label: "Data primeira parcela",
                    content: empresa.dtPriipm ? empresa.dtPriimp.replace(/^(\d{4})(\d{2})(\d{2})/, "$3/$2/$1") : ' ',
                    position: 40,
                  },
                  {
                    label: "Responsável pela implantação",
                    content: itensSelecionaveis.responsavel.filter(res => res.value == empresa.idResimp)[0].text.toUpperCase(),
                    position: 65,
                  },
                ],
              ],
            },
            {
              header: "Implantação SaaSEcomm",
              rows: [
                [
                  {
                    label: "Valor implantação",
                    content: empresa.vlImpcom.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 0,
                  },
                  {
                    label: "Nr. parcelas",
                    content: empresa.qtParcom ? String(empresa.qtParcom) : ' ',
                    position: 20,
                  },
                  {
                    label: "Data primeira parcela",
                    content: empresa.dtPricom ? empresa.dtPricom.replace(/^(\d{4})(\d{2})(\d{2})/, "$3/$2/$1") : ' ',
                    position: 40,
                  },
                  {
                    label: "Responsável pela implantação",
                    content: itensSelecionaveis.responsavel.filter(res => res.value == empresa.idRescom)[0].text.toUpperCase(),
                    position: 65,
                  },
                ],
                [
                  {
                    label: "Valor módulo integrador mensal",
                    content: empresa.vlMdl.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 0,
                  },
                ],
              ],
            },
            {
              title: "Dados de Acesso",
              rows: [
                [
                  { label: "Login", content: "Enviado ao cliente", position: 0 },
                  { label: "Senha", content: "Enviado ao cliente", position: 50 },
                ],
              ],
            },
          ];
          let doc = GeradorPdf.gerar(sections, String(empresa.nrCnpj));

          empresa.encoded = doc.output("datauristring");
          empresa.encoded = empresa.encoded.replace(
            "data:application/pdf;filename=generated.pdf;base64,",
            ""
          );

          let user = await this.$wso2.getUserData();
          let processo = { key: "criacao-instituicao" };
          let emailUsuario = user.base.us01_nm_email;
          empresa.emailRepresentante = emailUsuario;

          await this.$wso2.post(
            null,
            10944,
            process.env.VUE_APP_CD_SIST,
            user.base.us01_nm_login,
            empresa,
            processo
          );

          Swal.fire({
            title: "Processo Iniciado!",
            text: "Acompanhar estado do processo pela SaaSCom",
            icon: "success",
            confirmButtonColor: "#00B0FF",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
              this.$emit("cadastroConcluido");
              this.limparCamposFormulario();
            }
          });
        } catch (e) {
          console.log(e);
          Swal.fire({
            icon: "error",
            title: "Erro ao iniciar o cadastro de instituição!",
            text:
              "Houve um erro ao cadastrar a instituição na base de dados. Tente novamente em alguns instantes, se o erro persistir, contate a nossa equipe de suporte para podermos resolver seu problema.",
          });
        } finally {
          this.cadastroEmAndamento = false
        }
      }
    },
    trocaPlano() {
      switch (this.formularioPlanos.plano) {
      case 1:
        this.formularioPlanos.vlMensal = 0;
        break;
      case 2:
        this.formularioPlanos.vlMensal = 99.9;
        break;
      case 3:
        this.formularioPlanos.vlMensal = 75.9;
        break;
      }
    },
    limparCamposDeRetornoDaBuscaPorCnpj() {
      this.formularioEmpresa = {
        ...this.formularioEmpresa,
        dsInsest: "",
        nmBairro: "",
        nmCidade: "",
        nrCep: "",
        nmEnd: "",
        nrEnd: "",
        nmRazao: "",
        nmFantas: "",
        sgEstado: "",
      };
    },
    limparCamposDeRetornoDaBuscaPorCep() {
      this.formularioEmpresa = {
        ...this.formularioEmpresa,
        nmBairro: "",
        nmCidade: "",
        nmEnd: "",
        sgEstado: "",
      };
    },
    limparCamposFormulario() {
      // para cada campo dos formularios, atribuir uma string vazia
      const dadosFormularios = [
        this.formularioEmpresa,
        this.formularioProdutos,
        this.formularioPlanos,
      ];
      dadosFormularios.forEach((formulario) => {
        for (var campo in formulario) {
          if (formulario.hasOwnProperty(campo)) {
            formulario[campo] = "";
          }
        }
      });

      // para cada referencia de formulario, resetar a validação
      const referenciasFormularios = [
        this.$refs.formularioEmpresa,
        this.$refs.formularioPlanos,
        this.$refs.formularioProdutos,
      ];
      referenciasFormularios.forEach((formulario) => {
        formulario.resetValidation();
      });
    },
    voltar(props) {
      props.prevTab();
    },
    validarCamposFormulario(props) {
      if (props.activeTabIndex === 0) {
        if (
          this.validaFormularioEmpresa() &&
          !this.buscandoCnpj &&
          !this.buscandoLogin
        )
          props.nextTab();
        props.activeTabIndex = 0;
      } else if (props.activeTabIndex === 1) {
        if (this.validaFormularioPlanos(props)) props.nextTab();
        props.activeTabIndex = 1;
      } else {
        if (this.validaFormularioProdutos()) props.nextTab();
      }
    },
    validaFormularioEmpresa() {
      // Utiliza a validação do vuetify

      return this.$refs.formularioEmpresa.validate();
    },
    validaFormularioPlanos(props) {
      if (this.$refs.formularioPlanos.validate()) {
        // Utiliza a validação do vuetify
        if (
          this.formularioPlanos.vlMensal != 0.0 &&
          this.formularioPlanos.vlImperp != 0.0
        ) {
          props.nextTab();
        } else if (
          this.formularioPlanos.vlMensal == 0.0 ||
          this.formularioPlanos.vlImperp == 0.0
        ) {
          Swal.fire({
            title: "Atenção",
            text:
              "Há valores com R$0,00 deseja realmente prosseguir com o cadastro?",
            icon: "info",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            if (result.isConfirmed) {
              props.nextTab();
              return true;
            } else {
              return false;
            }
          });
        }
      }
    },
    validaFormularioProdutos() {
      // Utiliza a validação do vuetify
      return this.$refs.formularioProdutos.validate();
    },
  },
};
</script>

<style lang="scss" module>
@import "style.module";
</style>

<style scoped>
/* Remover input temporário depois da implementação com Vuetify */
/* input temporário  */
input {
  border: 1px solid rgb(228, 233, 240);
  border-radius: 2px;
  padding: 2px;
  transition: border-color 200ms;
}

input:hover,
input:focus {
  transition: border-color 200ms;
  border-color: rgb(83, 176, 249);
}

input:focus {
  -webkit-box-shadow: 0px 0px 1px 2px rgb(204, 233, 255) !important;
  box-shadow: 0px 0px 1px 2px rgb(204, 233, 255) !important;
}
/* input temporário */

::-webkit-input-placeholder {
  /* WebKit browsers */
  text-transform: none;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  text-transform: none;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  text-transform: none;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  text-transform: none;
}
::placeholder {
  /* Recent browsers */
  text-transform: none;
}

input {
  width: 100%;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.saas-button {
  min-width: 100px;
}

input {
  padding-left: 10px;
}

.vue-form-wizard * {
  line-height: 25px;
}

.altura {
  max-height: 60px;
}

@media only screen and (max-width: 349px) {
  .saas-button {
    min-width: 100%;
  }
}

@media only screen and (max-width: 767px) {
  .altura {
    max-height: inherit;
  }
}

body .ant-form-item > .ant-form-item,
body .ant-form-item :not(.ant-form) > .ant-form-item {
  margin-top: -10px;
}
</style>
