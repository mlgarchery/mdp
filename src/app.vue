<template>
  <div id='container'>
    <div>
      <h2 ref="title"> mdp </h2>
    </div>
    <div id="parameters">
      <input 
        ref="discriminator"
        type="password" 
        placeholder="discriminator" 
        v-model=discriminator>
      <input 
        ref="secret"
        type="password" 
        placeholder="secret" 
        v-model=secret>
      <button 
        type="button"
        @mousedown="show_parameters"
        @mouseup="hide_parameters"
        @mouseleave="hide_parameters"
        v-touch:start="show_parameters"
        v-touch:end="hide_parameters"
        >show</button>
    </div>
    <div  class="separator">
      <p> Repeat (recommended when generating the password for the first time) </p>
    </div>
    <div id="repeat_parameters">
      <input 
        ref="repeat_discriminator"
        type="password" 
        placeholder="repeat discriminator" 
        v-model=repeat_discriminator>
      <input 
        ref="repeat_secret"
        type="password" 
        placeholder="repeat secret" 
        v-model=repeat_secret>
    </div>
    <div class="separator">
      <span class="error"> {{ generate_info_box }} </span>
    </div>
    <div id="button_generate">
      <button id="button_generate" type="button" @click="generate_password">Generate</button>
    </div>
    <div class="separator">
      <span class="positive" v-show="show_info_box">{{text_info_box}}</span>
    </div>
    <div id="password">
     
      <input 
        readonly
        size=35
        ref="clip"
        type="password"
        placeholder="generated password" 
        v-model=password 
        @click="copy_to_clipboard"
        @keyup="copy_to_clipboard"
        >
      <button 
        ref="show_password" 
        type="button" 
        @mousedown="show_password"
        @mouseup="hide_password"
        @mouseleave="hide_password"
        v-touch:start="show_password"
        v-touch:end="hide_password">
        
        show
      </button>
    </div>
    <div id="clear_clipboard">
      <button type="button" @click="clear_clipboard">Clear Clipboard</button>
    </div>
    <div class="separator">
      <span class="positive">{{clipboard_info_text}}</span>
    </div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import { mdp } from '/src/mdp.js';

export default Vue.extend({
  data() {
    return {
      discriminator: "",
      repeat_discriminator: "",
      secret: "",
      repeat_secret: "",
      password: "",
      clipboard_info_text: "",
      show_info_box: false,
      text_info_box: "",
      generate_info_box: ""
    };
  },
  methods: {
    generate_password(){
      if(!this.discriminator && !this.secret) return;
      if(this.repeat_discriminator || this.repeat_secret){
        if(!this.are_repeating_parameters_valid()){
          this.generate_info_box= "Non matching repeating parameters";
          setTimeout(() => this.generate_info_box = "", 1000);
          return;
        }
      }
      this.password = mdp(this.discriminator, this.secret);
      this.reset_parameters();
    },
    are_repeating_parameters_valid(){
      if(this.discriminator === this.repeat_discriminator && 
         this.secret === this.repeat_secret){
           return true;
      }
      return false;
    },
    reset_parameters(){
      this.discriminator = "";
      this.secret = "";
      this.repeat_discriminator = "";
      this.repeat_secret = "";
    },
    copy_to_clipboard(){
      const clip = this.$refs.clip;
      this.show_password();
      clip.select();
      document.execCommand('copy');
      this.hide_password();
      this.show_info_box = true;
      this.text_info_box = "Copied to clipboard!"; 
      setTimeout(() => {this.show_info_box=false; this.text_info_box=""}, 1000);
    },
    clear_clipboard(){
      const el = document.createElement('textarea');
      el.value = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      this.clipboard_info_text = "Emptied clipboard !"
      setTimeout(() => this.clipboard_info_text = "", 1000);
      // also clear password
      this.password = "";
    },
    show_parameters(){
      const discriminator = this.$refs.discriminator;
      const secret = this.$refs.secret;
      discriminator.setAttribute("type", "text");
      secret.setAttribute("type", "text");
    },
    hide_parameters(){
      const discriminator = this.$refs.discriminator;
      const secret = this.$refs.secret;
      discriminator.setAttribute("type", "password");
      secret.setAttribute("type", "password");
    },
    show_password(){
      const clip = this.$refs.clip;
      clip.setAttribute("type", "text")
    },
    hide_password(){
      const clip = this.$refs.clip;
      clip.setAttribute("type", "password")
    }
  }
});
</script>

<style lang="scss">
@import url('./main.scss');
</style>

<style lang="scss" scoped>
#container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 450px;

  & * {
    display: flex;
    flex-direction: row;
    margin-top: 2px;
  }
}
.separator{
  min-height: 1.3em;
}
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
.error {
  color: darkred;
}
.positive {
  color: darkgreen;
}
</style>