<template>
  <div>
    <h2 ref="title"> mdp </h2>
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
        >show</button>
    <div>
      <p> Repeat (recommended when generating the password for the first time) </p>
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
    <div>
    </div>
    <button name="generate" type="button" @click="generate">Generate</button>
    <span class="error"> {{ generate_info_box }} </span>
    <div id="result">
      <div>
        <span id="info_box" class="positive" v-show="show_info_box">{{text_info_box}}</span>
        <br/>
      </div>
      <input 
        readonly
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
        @mouseleave="hide_password">
        show
      </button>
    </div>
    <div>
      <button type="button" @click="clear_clipboard">Clear Clipboard</button>
      <div id="empty_result"><span class="positive">{{clipboard_info_text}}</span></div>
    </div>
  </div>
</template>

<script lang="js">
import 'babel-polyfill';
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
    generate(){
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

<style lang="scss" scoped>
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
.error {
  color: red;
}
.positive {
  color: green;
}
</style>