import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import App from './App.vue'
import Layout from './Layout.vue'

import SoundproofConstructions from './pages/soundproof/constructions/index.vue'
import SoundproofConstructionsId from './pages/soundproof/constructions/id/index.vue'
import SoundproofMaterialsId from './pages/soundproof/materials/id/index.vue'
import SoundproofMaterials from './pages/soundproof/materials/Index.vue'

import AcousticBrands from './pages/acoustic/brands/index.vue'
import AcousticBrandsId from './pages/acoustic/brands/id/Index.vue'
import AcousticMaterials from './pages/acoustic/materials/index.vue'
import AcousticMaterialsId from './pages/acoustic/materials/id/index.vue'

import VibrationMaterialsId from './pages/vibration_isolation/materials/id/index.vue'
import VibrationMaterials from './pages/vibration_isolation/materials/index.vue'

import DocumentAir from './pages/documents/air/index.vue'
import DocumentAirId from './pages/documents/air/id/index.vue'

import DocumentSertificates from './pages/documents/certificates/index.vue'
import DocumentSertificatesId from './pages/documents/certificates/id/index.vue'

import DocumentTechcard from './pages/documents/techcard/index.vue'
import DocumentTechcardId from './pages/documents/techcard/id/index.vue'

import DocumentHookup from './pages/documents/hookup/index.vue'
import DocumentHookupId from './pages/documents/hookup/id/index.vue'

import DocumentProtocol from './pages/documents/protocol/id/index.vue'
import DocumentBim from './pages/documents/bim/id/index.vue'

import OurObjects from './pages/our-objects/Index.vue'
import OurObject from './pages/our-objects/id/index.vue'

import Calc from './pages/calc/index.vue'
import store from './store'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    { 
      path: '/', 
      children: [
        { path: "/", component: App },
        { path: "/soundproof/materials", component: SoundproofMaterials },
        { path: "/soundproof/constructions", component: SoundproofConstructions },
        { path: "/soundproof/materials/:id", component: SoundproofMaterialsId },
        { path: "/soundproof/constructions/:id", component: SoundproofConstructionsId },

        { path: "/vibration_isolation/materials", component: VibrationMaterials },
        { path: "/vibration_isolation/materials/:id", component: VibrationMaterialsId },

        { path: "/acoustic/brands", component: AcousticBrands },
        { path: "/acoustic/brands/:id", component: AcousticBrandsId },

        { path: "/acoustic/materials", component: AcousticMaterials },
        { path: "/acoustic/materials/:id", component: AcousticMaterialsId },

        { path: "/documents/air", component: DocumentAir },
        { path: "/documents/air/:id", component: DocumentAirId },
        
        { path: "/acoustic/brands/:id", component: AcousticBrands },

        { path: "/documents/certificates", component: DocumentSertificates },
        { path: "/documents/certificates/:id", component: DocumentSertificatesId },

        { path: "/documents/techcard", component: DocumentTechcard },
        { path: "/documents/techcard/:id", component: DocumentTechcardId },

        { path: "/documents/hookup", component: DocumentHookup },
        { path: "/documents/hookup/:id", component: DocumentHookupId },

        { path: "/documents/protocol/:id", component: DocumentProtocol },
        { path: "/documents/bim/:id", component: DocumentBim },
        
        { path: "/our-objects", component: OurObjects },
        { path: "/our-objects/:id", component: OurObject},
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
