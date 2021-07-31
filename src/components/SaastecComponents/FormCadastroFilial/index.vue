<template>
  <div class="mx-2 px-2">
    <form-wizard
      :title="razao"
      subtitle="Preencha os dados abaixo para incluir uma nova filial"
      next-button-text="Avançar"
      back-button-text="Voltar"
      finish-button-text="Finalizar"
      step-size="xs"
      color="#00B0FF"
      @on-complete="onComplete(props)"
    >
      <v-form ref="formFilial">
        <v-row>
          <v-col
            class="mb-n6"
            cols="12"
            md="4">
            <v-text-field
              v-mask="['##.###.###/####-##']"
              v-model="formFilial.nrCnpj"
              :rules="[regrasValidacao.required, regrasValidacao.cnpj]"
              :disabled="buscandoCnpj"
              :loading="buscandoCnpj"
              :error-messages="mensagensErro.cnpjCadastrado"
              outlined
              dense
              validate-on-blur
              required
              append-icon="error"
              label="CNPJ"
              @blur="!buscandoCnpj && buscarCnpj(formFilial.nrCnpj)"
            />
          </v-col>

          <v-col
            class="mb-n6"
            cols="12"
            md="4">
            <v-text-field
              v-model="formFilial.dsInsest"
              label="Inscrição estadual"
              dense
              maxlength="14"
              required
              outlined
              @input="formFilial.dsInsest = formFilial.dsInsest.toUpperCase()"
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="4">
            <label />
            <v-select
              v-model="formFilial.nmReg"
              :items="itensSelecionaveis.regime"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Regime de faturamento"
              required
              prepend-inner-icon="arrow_drop_down"
              maxlength="40"
              outlined
              dense
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="mb-n6"
            cols="12"
            md="6">
            <v-text-field
              v-model="formFilial.nmRazao"
              :rules="[regrasValidacao.required]"
              label="Razão social"
              outlined
              append-icon="error"
              maxlength="60"
              dense
              required
              @input="formFilial.nmRazao = formFilial.nmRazao.toUpperCase()"
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="6">
            <v-text-field
              v-model="formFilial.nmFantas"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Nome fantasia"
              maxlength="40"
              outlined
              dense
              required
              @input="formFilial.nmFantas = formFilial.nmFantas.toUpperCase()"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            class="mb-n6"
            md="4">
            <v-switch
              v-model="formFilial.idDados"
              :label="`Haverá migração de dados? ${
                formFilial.idDados ? 'SIM' : 'NÃO'
              }`"
              class="mt-0"
              inset
              style="padding: 0px"
              @change="
                !formFilial.idDados &&
                  ((formFilial.nmCarga = ''),
                  (formFilial.idPlanil = false),
                  (formFilial.idBarras = ''))
              "
            />
          </v-col>
          <v-col
            cols="12"
            md="8">
            <v-row>
              <v-col class="mb-n6">
                <v-combobox
                  v-model="formFilial.carga"
                  :items="itensSelecionaveis.migracao"
                  :rules="formFilial.idDados ? [regrasValidacao.required] : []"
                  :required="formFilial.idDados"
                  :disabled="!formFilial.idDados"
                  :filled="!formFilial.idDados"
                  :append-icon="formFilial.idDados ? 'error' : ''"
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
              <v-col class="mb-n6">
                <v-switch
                  v-model="formFilial.idPlanil"
                  :label="`Os dados estão em template .XLS? ${
                    formFilial.idPlanil ? 'SIM' : 'NÃO'
                  }`"
                  :disabled="!formFilial.idDados"
                  class="mt-0"
                  inset
                />
              </v-col>
              <v-col class="mb-n6">
                <v-select
                  v-model="formFilial.idBarras"
                  :items="itensSelecionaveis.barras"
                  :rules="formFilial.idDados ? [regrasValidacao.required] : []"
                  :required="formFilial.idDados"
                  :disabled="!formFilial.idDados"
                  :filled="!formFilial.idDados"
                  :append-icon="formFilial.idDados ? 'error' : ''"
                  label="Haverá migração de Cód. Barras?"
                  prepend-inner-icon="arrow_drop_down"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="mb-n6"
            cols="12"
            md="4">
            <v-text-field
              v-mask="['(##) ####-####']"
              v-model="formFilial.nrTel"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Telefone"
              outlined
              required
              placeholder="(99) 9999-9999"
              dense
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="4">
            <v-text-field
              v-mask="['(##) #####-####']"
              v-model="formFilial.nrCel"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              outlined
              required
              placeholder="(99) 9999-9999"
              label="Celular"
              dense
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="4">
            <v-text-field
              v-model="formFilial.dsEmail"
              :rules="[regrasValidacao.required, regrasValidacao.email]"
              append-icon="error"
              label="E-mail de contato"
              outlined
              maxlength="60"
              dense
              required
              @input="formFilial.dsEmail = formFilial.dsEmail.toLowerCase()"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            class="mb-n6"
            md="4">
            <v-text-field
              v-mask="['#####-###']"
              v-model="formFilial.nrCep"
              :rules="[regrasValidacao.required]"
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
            cols="12"
            class="mb-n6"
            md="4">
            <v-text-field
              v-model="formFilial.nmEnd"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Logradouro"
              maxlength="40"
              outlined
              dense
              required
              @input="formFilial.nmEnd = formFilial.nmEnd.toUpperCase()"
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="4">
            <v-text-field
              v-model="formFilial.nrEnd"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Número"
              maxlength="7"
              dense
              outlined
              required
              @input="formFilial.nrEnd = formFilial.nrEnd.toUpperCase()"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            class="mb-n6"
            md="3">
            <v-text-field
              v-model="formFilial.nmBairro"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Bairro"
              maxlength="30"
              outlined
              dense
              required
              @input="formFilial.nmBairro = formFilial.nmBairro.toUpperCase()"
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="3">
            <v-text-field
              v-model="formFilial.dsCompl"
              label="Complemento"
              outlined
              maxlength="20"
              dense
              required
              @input="formFilial.dsCompl = formFilial.dsCompl.toUpperCase()"
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="3">
            <v-text-field
              v-model="formFilial.nmCidade"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Cidade"
              maxlength="40"
              outlined
              dense
              required
              @input="formFilial.nmCidade = formFilial.nmCidade.toUpperCase()"
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="3">
            <label />
            <v-select
              v-model="formFilial.sgEstado"
              :items="itensSelecionaveis.ufs"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="UF"
              outlined
              prepend-inner-icon="arrow_drop_down"
              dense
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="mb-n6"
            cols="12"
            md="6">
            <v-text-field
              v-model="formFilial.nmLogin"
              :rules="[regrasValidacao.required]"
              :error-messages="mensagensErro.loginCadastrado"
              :required="buscandoLogin"
              :disabled="buscandoLogin"
              :loading="buscandoLogin"
              outlined
              maxlength="30"
              dense
              append-icon="error"
              label="Nome de login (acesso)"
              @input="formFilial.nmLogin = formFilial.nmLogin.toUpperCase()"
              @blur="!buscandoLogin && buscarLogin()"
            />
          </v-col>

          <v-col
            class="mb-n6"
            cols="12"
            md="6">
            <v-text-field
              v-model="formFilial.nmContat"
              :rules="[regrasValidacao.required]"
              append-icon="error"
              label="Nome do responsável"
              outlined
              maxlength="40"
              dense
              required
              @input="formFilial.nmContat = formFilial.nmContat.toUpperCase()"
            />
          </v-col>

          <v-col
            cols="12"
            class="mb-n6"
            md="6">
            <vuetify-money
              v-model="formFilial.vlImperp"
              :options="moeda"
              :rules="[regrasValidacao.required]"
              :properties="{ appendIcon: 'error' }"
              label="Valor de implantação"
              outlined
              required
              dense
            />
          </v-col>

          <v-col 
            cols="12" 
            class="mb-n6"
            sm="6">
            <v-select
              :items="itensSelecionaveis.parcelas"
              v-model="formFilial.qtParimp"
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
              v-model="formFilial.dtPriimpActivator"
              :close-on-content-click="false"
              :return-value.sync="formFilial.dtPriimp"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formFilial.dtPriimp"
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
                v-model="formFilial.dtPriimp"
                no-title
                scrollable
              >
                <v-spacer/>
                <v-btn
                  text
                  color="primary"
                  @click="formFilial.dtPriimpActivator = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dtPriimp.save(formFilial.dtPriimp)"
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
              v-model="formFilial.idResimp"
              outlined
              required
              dense
              append-icon="error"
              prepend-inner-icon="arrow_drop_down"
              label="Responsável pela implantação"
            />
          </v-col>

          <v-col
            cols="12"
            md="6">
            <vuetify-money
              v-model="formFilial.vlMensal"
              :options="moeda"
              :rules="[regrasValidacao.required]"
              :properties="{ appendIcon: 'error' }"
              label="Valor de mensalidade"
              outlined
              required
              dense
            />
          </v-col>
          <v-col
            cols="12"
            sm="6">
            <v-menu
              ref="dtPrimen"
              v-model="formFilial.dtPrimenActivator"
              :close-on-content-click="false"
              :return-value.sync="formFilial.dtPrimen"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formFilial.dtPrimen"
                  :rules="[regrasValidacao.required]"
                  v-bind="attrs"
                  label="Data primeira mensalidade"
                  required
                  prepend-inner-icon="event"
                  readonly
                  outlined
                  dense
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="formFilial.dtPrimen"
                no-title
                scrollable
              >
                <v-spacer/>
                <v-btn
                  text
                  color="primary"
                  @click="formFilial.dtPrimenActivator = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dtPrimen.save(formFilial.dtPrimen)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-form>
      <template
        slot="footer"
        slot-scope="props">
        <v-row>
          <v-spacer />
          <v-btn
            v-if="!props.isLastStep"
            :style="props.fillButtonStyle"
            :disabled="cadastroEmAndamento"
            :loading="cadastroEmAndamento"
            color="primary light-blue accent-3"
            @click.native="!cadastroEmAndamento && validate(props)"
          >
            Confirmar
          </v-btn>
        </v-row>
      </template>
    </form-wizard>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/pt-br";
import GeradorPdf from "../../Util/GeradorPdf/GeradorPdf";
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import { mask } from "vue-the-mask";
import axios from "axios";
import Validacoes from "../../Util/Validacoes/Validacoes.js";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { itensSelecionaveis } from "../../Util/Formularios/itensSelecionaveis.js";
import Swal from "sweetalert2";
export default {
  directives: { mask },
  components: {
    FormWizard,
    TabContent,
    WizardButton,
  },
  props: {
    instituicao: {
      type: Number,
      default: null,
    },
    razao: {
      type: String,
      default: null,
    },
  },

  data: function () {
    return {
      nmPlanos: [],
      itensSelecionaveis,
      cargaDados: [],
      cadastroEmAndamento: false,
      ecomm: null,
      dadosMigracao: null,
      usuario: null,
      regrasValidacao: {
        required: (v) => !!v || "Campo obrigatório!",
        cnpj: (v) => Validacoes.validarCnpj(v) || "Cnpj inválido",
        email: (value) => Validacoes.validarEmail(value) || "E-mail inválido.",
      },
      formFilial: {
        nrCnpj: "",
        dsInsest: "",
        nmRazao: "",
        nmReg: "",
        idDados: "",
        nmFantas: "",
        nrTel: "",
        nrCel: "",
        dsEmail: "",
        nrCep: "",
        nmEnd: "",
        idPlanil: "",
        idBarras: "",
        nrEnd: "",
        nmBairro: "",
        dsCompl: "",
        carga: "",
        nmCarga: "",
        cdCarga: "",
        nmCidade: "",
        sgEstado: "",
        nmLogin: "",
        nmContat: "",
        vlImperp: "",
        vlMensal: "",
        dtPrimen: "",
        dtPrimenActivator: false,
        qtParimp:"",
        dtPriimp:"",
        dtPriimpActivator: false,
        idResimp:"",
      },
      mensagensErro: {
        cnpjCadastrado: "",
        loginCadastrado: "",
      },
      buscandoCep: false,
      buscandoLogin: false,
      buscandoCnpj: false,
      indic: null,
      moeda: {
        locale: "pt-BR",
        prefix: "R$",
        suffix: "",
        length: 11,
        precision: 2,
      },
      items: [],
      regimeFaturamento: null,
      descPlanos: null,
      dadosEmpresaTravados: false,
      dadosEnderecoTravados: false,
      consultaEmpresa: false,
      user: null,
      dadoscep: [],
      visibleModalCadastro: false,
      senhaTokens: {
        F: {
          pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
        },
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      },
      termoAceite: false,
      backgroundNumber: 1,
    };
  },
  async created() {
    moment.locale("pt-BR");
  },
  methods: {
    trataArray(arr) {
      let s = new Set(arr);
      let it = s.values();
      return Array.from(it);
    },

    async buscarLogin() {
      let nmLogin = this.formFilial.nmLogin;
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

        let cep = this.formFilial.nrCep;
        cep = cep.replace(/[^\d]+/g, "");
        var URL = "https://viacep.com.br/ws/" + cep + "/json/";

        await axios
          .get(URL)
          .then((response) => {
            const dadoscep = JSON.parse(response.request.response);
            if (!dadoscep.erro) {
              this.formFilial.nmBairro = dadoscep.bairro.toUpperCase().slice(0, 30);
              this.formFilial.nmCidade = dadoscep.localidade.toUpperCase().slice(0, 40);
              this.formFilial.nmEnd = dadoscep.logradouro.toUpperCase().slice(0, 40);
              this.formFilial.sgEstado = dadoscep.uf.toUpperCase();
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
              text: "Endereço não localizado para o CEP informado. Favor prosseguir com o preenchimento manual.",
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
      const cnpj = this.formFilial.nrCnpj;
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
          let empresa = sintegraResponse.service;

          if (empresa && empresa.nome_empresarial) {
            this.limparCamposDeRetornoDaBuscaPorCnpj();
            // limpeza de dados ilegíveis do Sintegra (ex: fantasia: "NÃO INFORMADO")
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
            (this.formFilial.dsInsest = empresa.inscricao_estadual);
            empresa.bairro &&
              (this.formFilial.nmBairro = empresa.bairro
                .toUpperCase()
                .substring(0, 30));
            empresa.municipio &&
              (this.formFilial.nmCidade = empresa.municipio
                .toUpperCase()
                .substring(0, 40));
            empresa.cep && (this.formFilial.nrCep = empresa.cep);
            empresa.complemento &&
              (this.formFilial.dsCompl = empresa.complemento
                .toUpperCase()
                .substring(0, 20));
            empresa.logradouro &&
              (this.formFilial.nmEnd = empresa.logradouro
                .toUpperCase()
                .substring(0, 40));
            empresa.numero && (this.formFilial.nrEnd = empresa.numero);
            empresa.nome_empresarial &&
              (this.formFilial.nmRazao = empresa.nome_empresarial
                .toUpperCase()
                .substring(0, 30));
            empresa.nome_fantasia &&
              (this.formFilial.nmFantas = empresa.nome_fantasia
                .toUpperCase()
                .substring(0, 30));
            empresa.uf && (this.formFilial.sgEstado = empresa.uf.toUpperCase());

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

            let empresa = receitaResponse.service;
            if (empresa && empresa.nome) {
              this.limparCamposDeRetornoDaBuscaPorCnpj();
              // limpeza de dados ilegíveis da receita (ex: fantasia: "**********")
              for (var propriedade in empresa) {
                if (
                  empresa.hasOwnProperty(propriedade) &&
                  String(empresa[propriedade]).includes("*")
                ) {
                  empresa[propriedade] = "";
                }
              }
              empresa.bairro &&
                (this.formFilial.nmBairro = empresa.bairro
                  .toUpperCase()
                  .substring(0, 30));
              empresa.municipio &&
                (this.formFilial.nmCidade = empresa.municipio
                  .toUpperCase()
                  .substring(0, 40));
              empresa.cep && (this.formFilial.nrCep = empresa.cep);
              empresa.logradouro &&
                (this.formFilial.nmEnd = empresa.logradouro
                  .toUpperCase()
                  .substring(0, 40));
              empresa.numero && (this.formFilial.nrEnd = empresa.numero);
              empresa.nome &&
                (this.formFilial.nmRazao = empresa.nome
                  .toUpperCase()
                  .substring(0, 30));
              empresa.fantasia &&
                (this.formFilial.nmFantas = empresa.fantasia
                  .toUpperCase()
                  .substring(0, 30));
              empresa.uf &&
              (this.formFilial.sgEstado = empresa.uf.toUpperCase());

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
              text: "Erro na comunicação com o serviço de localização de CNPJ. Favor contatar o suporte técnico.",
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
    exibirModalCadastro() {
      this.visibleModalCadastro = true;
    },
    handleOk() {
      this.visibleModalCadastro = false;
    },
    limparDados() {
      this.$refs.formFilial.reset();
    },
    async validate() {
      let user = await this.$wso2.getUserData();

      if (
        !(await this.verificarCnpjCadastrado(this.formFilial.nrCnpj)) &&
        this.$refs.formFilial.validate()
      ) {
        let filial = Object.assign({}, this.formFilial);

        if (filial.dsInsest) {
          filial.idIsento = 1;
        } else {
          filial.idIsento = 0;
        }
        filial.idPlanil = filial.idPlanil ? 1 : 2;

        /**
         * Transforma Array de ids [1,2,3]
         * em string de carga de conversão
         * string: carga1,carga2,carga3
         */
        filial.cdCarga = filial.idDados ? JSON.stringify(filial.carga.map(el => el.value)) : '[]';
        if (filial.idDados){
          filial.nmCarga = filial.carga.map(el => {
            let value = this.itensSelecionaveis.migracao.filter(cr => cr.value == el.value)[0];
            if(value) return value.text
          })
            .filter(el => el)
            .toString();
        }
        filial.nmCarga = filial.idDados ? filial.nmCarga : "Não há carga de dados";
        filial.idBarras = filial.idDados ? filial.idBarras : 1;
        filial.idDados = filial.idDados ? 1 : 2;

        filial.nmUsr = filial.nmContat;
        filial.cdUsrrep = user.base.us01_nr_usr;
        filial.nmRep = user.base.us01_nm_usr;
        filial.dtContr = parseInt(moment().format("YYYYMMDD"));

        filial.nrCep = filial.nrCep.replace(/[^\d]+/g, "");

        filial.nrInst = this.instituicao;

        filial.nrCnpj = filial.nrCnpj.replace(/\D+/g, "");

        filial.nrTel = filial.nrTel.replace(/\D+/g, "");
        filial.nrCel = filial.nrCel.replace(/\D+/g, "");

        filial.nrDddtel = parseInt(filial.nrTel.substring(0, 2));
        filial.nrTel = parseInt(filial.nrTel.substring(2, 10));

        filial.nrDddcel = parseInt(filial.nrCel.substring(0, 2));
        filial.nrCel = parseInt(filial.nrCel.substring(2, 11));

        filial.vlMensal = parseFloat(filial.vlMensal);
        filial.dtPrimen = filial.dtPrimen.replace(/-/g, '');

        filial.vlImperp = parseFloat(filial.vlImperp);
        filial.qtParimp = filial.qtParimp ? filial.qtParimp : 0;
        filial.dtPriimp = filial.dtPriimp ? filial.dtPriimp.replace(/-/g, '') : 0;
        filial.idResimp = filial.idResimp;


        if (this.formFilial.vlMensal == 0.0 || this.formFilial.vlImperp == 0.0) {
          Swal.fire({
            title: "Atenção",
            text: "Há valores com R$0,00 deseja realmente concluir o cadastro?",
            icon: "info",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            if (result.isConfirmed) {
              return this.cadastroNovaLoja(filial);
            } else {
              return false;
            }
          });
        }
        if (this.formFilial.vlMensal != 0.0 && this.formFilial.vlImperp != 0.0) {
          this.cadastroNovaLoja(filial);
        }
      }
    },
    async cadastroNovaLoja(loja) {
      if (!this.cadastroEmAndamento) {
        this.cadastroEmAndamento = true;
        try {
          const sections = [
            { title: "Termo de aceite para cadastro de filial nova" },
            {
              // [Sessão]
              rows: [
                [
                  {
                    label: "Representante",
                    content: loja.nmRep.toUpperCase(),
                    position: 0,
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
                    content: loja.nmRazao.toUpperCase(),
                    position: 0,
                  },
                  {
                    label: "Nome Fantasia",
                    content: loja.nmFantas.toUpperCase(),
                    position: 50,
                  },
                ],
                [
                  {
                    label: "CNPJ",
                    content: loja.nrCnpj.replace(
                      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                      "$1.$2.$3/$4-$5"
                    ),
                    position: 0,
                  },
                  {
                    label: "Regime de Faturamento",
                    content: loja.nmReg.toUpperCase(),
                    position: 20,
                  },
                  {
                    label: "Inscrição Estadual",
                    content: loja.dsInsest,
                    position: 43,
                  },
                  {
                    label: "Município para fins de emissão de NFS-e",
                    content: loja.nmCidade,
                    position: 63,
                  },
                ],
                [
                  {
                    label: "Endereço",
                    content: `${loja.nmEnd}, ${loja.nrEnd}, ${loja.nmBairro}, ${loja.nmCidade}, ${loja.sgEstado}`,
                    position: 0,
                  },
                ],
              ],
            },
            {
              title: "Contato",
              rows: [
                [
                  { label: "Contato", content: loja.nmContat, position: 0 },
                  { label: "E-mail", content: loja.dsEmail, position: 33 },
                  {
                    label: "Telefone",
                    content: `(${loja.nrDddtel}) ${String(loja.nrTel).replace(
                      /^(\d{4})(\d{4})/,
                      "$1-$2"
                    )}`,
                    position: 60,
                  },
                  {
                    label: "Celular",
                    content: `(${loja.nrDddcel}) ${String(loja.nrCel).replace(
                      /^(\d{5})(\d{4})/,
                      "$1-$2"
                    )}`,
                    position: 77,
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
                    content: loja.idDados == 1 ? 'SIM': 'NÃO',
                    position: 0,
                  },
                  { label: "Dados (.XLS)", content: loja.idPlanil == 1 ? 'SIM': 'NÃO', position: 30 },
                  {
                    label: "Gerar cód. de barras",
                    content: itensSelecionaveis.barras.filter(barra => barra.value == loja.idBarras)[0].text.toUpperCase(),
                    position: 50,
                  },
                ],
                [
                  {
                    label: "Carga de dados",
                    content: String(loja.nmCarga).replace(/,/g, ", ").toUpperCase(),
                    position: 0,
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
                    content: '',
                    position: 0,
                  },
                  {
                    label: "Valor mensalidade",
                    content: loja.vlMensal.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 33,
                  },
                  {
                    label: "Data primeira parcela",
                    content: loja.dtPrimen ? loja.dtPrimen.replace(/^(\d{4})(\d{2})(\d{2})/, "$3/$2/$1") : ' ',
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
                    content: loja.vlImperp.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }),
                    position: 0,
                  },
                  {
                    label: "Nr. parcelas",
                    content: loja.qtParimp ? String(loja.qtParimp) : ' ',
                    position: 20,
                  },
                  {
                    label: "Data primeira parcela",                
                    content: loja.dtPriipm ? loja.dtPriimp.replace(/^(\d{4})(\d{2})(\d{2})/, "$3/$2/$1") : ' ',
                    position: 40,
                  },
                  {
                    label: "Responsável pela implantação",                
                    content: itensSelecionaveis.responsavel.filter(res => res.value == loja.idResimp)[0].text.toUpperCase(),
                    position: 65,
                  },
                ],
              ],
            },
            {
              title: "Dados de Acesso",
              rows: [
                [
                  {
                    label: "Login",
                    content: "Enviado ao cliente",
                    position: 0,
                  },
                  {
                    label: "Senha",
                    content: "Enviado ao cliente",
                    position: 50,
                  },
                ],
              ],
            },
          ];

          let doc = GeradorPdf.gerar(sections, String(loja.nrCnpj));

          loja.encoded = doc.output("datauristring");
          loja.encoded = loja.encoded.replace(
            "data:application/pdf;filename=generated.pdf;base64,",
            ""
          );

          let processo = { key: "criacao-loja" };
          let user = await this.$wso2.getUserData();
          let emailUsuario = user.base.us01_nm_email;
          loja.emailRepresentante = emailUsuario;

          await this.$wso2.post(
            null,
            10944,
            process.env.VUE_APP_CD_SIST,
            user.base.us01_nm_login,
            loja,
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
              this.handleOk();
              this.limparCamposFormulario();
            }
          });
        } catch (e) {
          console.log(e);
          this.erroCadastro(
            "Erro ao iniciar o cadastro de filial!",
            "Houve um erro ao cadastrar a filial na base de dados. Tente novamente em alguns instantes, se o erro persistir, contate a nossa equipe de suporte para podermos resolver seu problema."
          );
        } finally {
          this.cadastroEmAndamento = false;
        }
      }
    },
    async erroCadastro(title, msg) {
      return Swal.fire({
        icon: "error",
        title: title,
        text: msg,
      });
    },
    limparCamposDeRetornoDaBuscaPorCnpj() {
      this.formFilial = {
        ...this.formFilial,
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
      this.formFilial = {
        ...this.formFilial,
        nmBairro: "",
        nmCidade: "",
        nmEnd: "",
        sgEstado: "",
      };
    },
    limparCamposFormulario() {
      // para cada campo dos formularios, atribuir uma string vazia
      const dadosFormularios = [this.formFilial];
      dadosFormularios.forEach((formulario) => {
        for (var campo in formulario) {
          if (formulario.hasOwnProperty(campo)) {
            formulario[campo] = "";
          }
        }
      });

      // para cada referencia de formulario, resetar a validação.
      const referenciasFormularios = [this.$refs.formFilial];
      referenciasFormularios.forEach((formulario) => {
        formulario.resetValidation();
      });
    },
  },
};
</script>

<style lang="scss" module>
@import "style.module";
</style>

