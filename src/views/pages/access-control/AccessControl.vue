<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <v-card>
        <v-card-title>Comum</v-card-title>
        <v-card-text>Nenhuma habilidade é necessária para visualizar este cartão</v-card-text>
        <v-card-text class="primary--text">
          Este cartão é visível para 'usuário' e 'administrador' tanto
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      v-if="$can('read', 'Analytics')"
      cols="12"
      md="6"
    >
      <v-card>
        <v-card-title>Análise</v-card-title>
        <v-card-text>O usuário com a habilidade 'Ler' do assunto 'Analytics' pode visualizar este cartão</v-card-text>
        <v-card-text class="text-danger">
          Este cartão está visível apenas para 'administrador'
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
