<template>
  <section>
    <h1>{{ title }}</h1>
    <button
      type="button"
      :disabled="uiState === 'listening'"
      @click="getNewIntent"
    >
      {{ uiState === "listening" ? "Listening..." : "Start listening" }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSpeechStore } from "@/stores/speech";

withDefaults(defineProps<{ title?: string }>(), {
  title: "Speech controls",
});

const emit = defineEmits<{
  statusChange: [aborted: boolean];
}>();

const store = useSpeechStore();
const uiState = computed(() => store.uiState);

async function getNewIntent() {
  await store.getSpeech();
  emit("statusChange", false);
}
</script>

<style scoped>
button {
  border-radius: 0.5rem;
  background: teal;
  margin-top: 10px;
  transition: background-color 200ms ease-out;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
