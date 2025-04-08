import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import App from './App.vue'
import Layout from './Layout.vue'

import SoundproofMaterialsId from './pages/soundproof/materials/id/Index.vue'
import SoundproofConstructionsId from './pages/soundproof/constructions/id/Index.vue'

import VibrationMaterialsId from './pages/vibration_isolation/materials/id/index.vue'

import AcousticMaterialsId from './pages/acoustic/materials/id/index.vue'
import AcousticBrands from './pages/acoustic/brands/index.vue'
// import AcousticBrandsId from './pages/acoustic/brands/id/Index.vue'
import AcousticBrandsId from './pages/acoustic/brands/id/index-new.vue'
import AcousticBrandsIdChartModel from './pages/acoustic/brands/id/chart/model/index.vue'

import DocumentAirId from './pages/documents/air/id/index.vue'
import DocumentSertificatesId from './pages/documents/certificates/id/Index.vue'
import DocumentTechcardId from './pages/documents/techcard/id/Index.vue'
import DocumentHookupId from './pages/documents/hookup/id/Index.vue'
import DocumentTechlistId from './pages/documents/techlist/id/Index.vue'
import DocumentProtocol from './pages/documents/protocol/id/Index.vue'


import OurObjects from './pages/our-objects/index.vue'
import OurObject from './pages/our-objects/id/index.vue'

import Calc from './pages/calc/index.vue'

import ProfileCalc from './pages/profilecalc/index.vue'
import ProfileDoc from './pages/profiledoc/index.vue'
import ProfileFoto from './pages/profilefoto/index.vue'

import SearchPage from './pages/search/index.vue'
import store from './store'

const theme = localStorage.getItem("theme") ?? "light";

if (theme === 'light' || theme === 'dark') {
  document.documentElement.setAttribute("color-scheme", theme);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    { 
      path: '/', 
      children: [
        { path: "/", component: App },

        { path: '/soundproof', component: App  },
        { path: '/vibration_isolation', component: App  },
        { path: '/acoustic', component: App  },
        { path: '/documents', component: App  },

        { path: "/soundproof/materials/:id?", component: SoundproofMaterialsId },

        { path: "/soundproof/constructions/:id?", component: SoundproofConstructionsId },

        { path: "/vibration_isolation/materials/:id?", component: VibrationMaterialsId },

        { path: "/acoustic/materials/:id?", component: AcousticMaterialsId },
        { path: "/acoustic/brands", component: AcousticBrands },
        { path: "/acoustic/brands/:id", component: AcousticBrandsId },
        { path: "/acoustic/brands/:id/chart/:model", component: AcousticBrandsIdChartModel },

        { path: "/documents/air/:id?", component: DocumentAirId },
        { path: "/documents/certificates/:id?", component: DocumentSertificatesId },
        { path: "/documents/techcard/:id?", component: DocumentTechcardId },
        { path: "/documents/hookup/:id?", component: DocumentHookupId },
        { path: "/documents/techlist/:id?", component: DocumentTechlistId },
        { path: "/documents/protocol/:id?", component: DocumentProtocol },

        
        { path: "/our-objects", component: OurObjects },
        { path: "/our-objects/:id", component: OurObject},

        { path: "/search", component: SearchPage },
        {
          path: '/profilecalc',
          component: ProfileCalc
        },
        {
          path: '/profiledoc',
          component: ProfileDoc
        },
        {
          path: '/profilefoto',
          component: ProfileFoto
        },
        
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
