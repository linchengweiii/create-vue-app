<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const supportedLanguages = ['zh-TW', 'en-US']
</script>

<template>
  <header class="px-3 flex justify-between">
    <nav>
      <RouterLink to="/">
        <v-btn>{{ t('page.home') }}</v-btn>
      </RouterLink>
      <RouterLink to="/about">
        <v-btn>{{ t('page.about') }}</v-btn>
      </RouterLink>
    </nav>
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props">{{ t('language.label') }}</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(lang, index) in supportedLanguages"
          :key="index"
          :value="lang"
          :active="lang === locale"
          active-color="primary"
          @click="locale = lang"
        >
          <v-list-item-title>
            {{ t('language.option', '', { locale: lang }) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </header>

  <RouterView />
</template>
