<template>
  <div>test</div>
  <PDFViewer v-if="pdf" :source="pdf" style="height: 100vh; width: 100%" />
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import PDFViewer from "pdf-viewer-vue";
import crossFetch from "cross-fetch";

const pdf = ref(null);

const { link } = defineProps(["link"]);

onMounted(async () => {
  const response = await crossFetch(link);
  const base64_body = (await response.buffer()).toString("base64");

  pdf.value = base64_body;
});
</script>
