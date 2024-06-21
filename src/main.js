import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import App from './App.vue'
import Layout from './Layout.vue'
import SoundproofConstructions from './pages/soundproof/constructions/[id]/index.vue'
import SoundproofMaterials from './pages/soundproof/materials/[id]/index.vue'
import DocumentSertificates from './pages/documents/certificates/[id]/index.vue'
import DocumentTechcard from './pages/documents/techcard/[id]/index.vue'
import DocumentHookup from './pages/documents/hookup/[id]/index.vue'
import Calc from './pages/calc/index.vue'
import store from './store'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    { 
      path: '/', 
      component: App, 
      children: [
        { path: "/soundproof/constructions/:id", component: SoundproofConstructions },
        { path: "/soundproof/materials/:id", component: SoundproofMaterials },
        { path: "/documents/certificates/:id", component: DocumentSertificates },
        { path: "/documents/techcard/:id", component: DocumentTechcard },
        { path: "/documents/hookup/:id", component: DocumentHookup }
     ]
    },
    {
      path: '/calc',
      alias: ['/calc/:id'],
      component: Calc
    }
  ],
});

createApp(Layout).use(store).use(router).mount('#app')
