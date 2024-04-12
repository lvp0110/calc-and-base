<template>

  
<div class="sc accordion-flush" id="accordionFlushExample" style="width: 100%;">
 
    <div class="accordion-item" >
      <div class="accordion-header" id="flush-headingOne" >
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
           <h5>КОНСТРУКЦИИ</h5>
        </button>
      </div>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <VoiceSearch />
          <SoundproofConstr />
          <AcousticConstr />
          <VibrationConstr />
        </div>
      </div>
    </div>
    
    <div class="accordion-item">
      <div class="accordion-header" id="flush-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
           <h5>МАТЕРИАЛЫ</h5>
        </button>
      </div>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <VoiceSearch />
          <SoundproofMaterial />
          <AcousticMaterial />
          <VibrationMaterial />
        </div>
      </div>
    </div>
    
    <div class="accordion-item">
      <div class="accordion-header" id="flush-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
           <h5>ДОКУМЕНТЫ</h5>
        </button>
      </div>
      <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <!-- <LoginForm/> -->
          <VoiceSearch />
          <CertificatesBases/>
          <TestBase/>
        </div>
      </div>
    </div>

    <div class="accordion-item"  @click="redirectToUrl('https://db.acoustic.ru/')">
      <div class="accordion-header" id="flush-headingFour" >
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour" style="border-radius: 15px;">
           <h5>КАЛЬКУЛЯТОР</h5>
        </button></div>
        <a href="https://db.acoustic.ru/" class="d-grid gap-2"  style="text-decoration: none;"> 
           </a> 
    </div>
</div>
  
</template>

<script >

  import VoiceSearch from "./components/VoiceSearch.vue";
  import InstallBase from "./components/InstallBase.vue";
  import TechnicalBase from "./components/TechnicalBase.vue";
  import CertificatesBases from "./components/CertificatesBases.vue";
  import SoundproofConstr from "./components/SoundproofConstr.vue";
  import AcousticConstr from "./components/AcousticConstr.vue";
  import VibrationConstr from "./components/VibrationConstr.vue";
  import SoundproofMaterial from "./components/SoundproofMaterial.vue";
  import AcousticMaterial from "./components/AcousticMaterial.vue";
  import VibrationMaterial from "./components/VibrationMaterial.vue";
  import LoginForm from "./components/LoginForm.vue";
  import TestBase from "./components/TestBase.vue";
  import { mapState } from 'vuex'

  export default {
    created()
    {
      this.$store.dispatch('getData')
      this.$store.dispatch('getSecondArray')
    },
    components:{
      VoiceSearch,
      InstallBase,
      TechnicalBase,
      CertificatesBases,
      SoundproofConstr,
      AcousticConstr,
      VibrationConstr,
      SoundproofMaterial,
      AcousticMaterial,
      VibrationMaterial,
			LoginForm,
      TestBase
    },
    computed: {
      ...mapState(['title', 'options'])
   },
   methods: {
    redirectToUrl(url) {
      window.location.href = url;
    }
}
  }
</script>

<style>

hr{
	filter: drop-shadow(2px 3px 2px );
	background: #000;
	width: 95%;
} 
.btn{
  border-radius: 8px;
}
.accordion-header{
  background: rgb(241, 237, 237);
  
}
.accordion-flush .accordion-item .accordion-button{
  border-radius: 15px;
  height: 110px;
  margin-top: 5px;
  box-shadow: 3px 1px 4px 0px #96b3cd;
}

.accordion-button {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.7rem 1rem;
    font-size: 1.3rem;
    color: #fff;
    text-align: left;
    background-color: #6cabc8; /** 6b9ccd */
    border: 0;
    overflow-anchor: none;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,border-radius .15s ease;font-weight: 600;
}
.accordion-button:not(.collapsed) {
    color: #0c63e4;
    background-color: #fcfdfd;
    box-shadow: inset 0 -1px 0 rgba(243, 106, 106, 0.125);
}  

</style>
