<template>
  <div id='container'>
    <div id="title">
      <h2 ref="title"> mdp </h2>
    </div> 
    <div id="parameters">
      <IconWrapper name="shop.svg">
        <input class="sensitive" type="password" ref="discriminator" placeholder="discriminator" v-model=discriminator>
      </IconWrapper>
      <IconWrapper name="key.svg">
        <input class="sensitive" type="password" ref="secret" placeholder="secret" v-model=secret>
      </IconWrapper>
      <Icon 
        name="eye.svg"
        type="button"
        :class="{ 'shown': areParametersShown }"
        @mousedown="show_parameters"
        @mouseup="hide_parameters"
        @mouseleave="hide_parameters"
        @keydown="show_parameters"
        v-touch:start="show_parameters"
        v-touch:end="hide_parameters">
      </Icon>
    </div>
    <div  class="separator">
      <p> Repeat (recommended when generating the password for the first time) </p>
    </div>
    <div id="repeat_parameters">
      <IconWrapper name="shop.svg">
        <input class="sensitive" type="password" ref="repeat_discriminator" placeholder="repeat discriminator" v-model=repeat_discriminator>
      </IconWrapper>
      <IconWrapper name="key.svg">
        <input class="sensitive" type="password" ref="repeat_secret" placeholder="repeat secret" v-model=repeat_secret>
      </IconWrapper>
      <Icon v-if="are_repeating_parameters_valid" name="check-all.svg"></Icon>
      <Icon v-else name="x-circle.svg"></Icon>
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
      <IconWrapper name="lock.svg">
        <input 
          readonly
          class="sensitive"
          size=35
          ref="clip"
          type="password"
          placeholder="generated password" 
          v-model=password 
          @click="copy_to_clipboard"
          @keyup="copy_to_clipboard"
          >
      </IconWrapper>
      <Icon
        name="eye.svg"
        ref="show_password" 
        type="button"
        :class="{ 'shown': isPasswordShown }"
        @mousedown="show_password"
        @mouseup="hide_password"
        @mouseleave="hide_password"
        v-touch:start="show_password"
        v-touch:end="hide_password"
      ></Icon>
    </div>
    <div class="separator">
      <span class="positive">{{clipboard_info_text}}</span>
    </div>
    <div id="clear_clipboard">
      <button 
        type="button" 
        @click="clear_clipboard"
        @keydown.esc="clear_clipboard"
        @keydown.space="clear_clipboard"
        @keydown.delete="clear_clipboard"
      >Clear Clipboard (Esc)</button>
    </div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import Icon from './components/Icon';
import IconWrapper from './components/IconWrapper';
import { mdp } from '/src/mdp.js';

export default Vue.extend({
  created(){
    this.keydown_handler = e => {
      if(e.key === "Escape"){
        this.clear_clipboard();
      }
    }
    window.addEventListener('keydown', this.keydown_handler);
  },
  before_destroy() {
    console.log("We are about to destroy !")
    window.removeEventListener('keydown');
  },
  components: {
    IconWrapper,
    Icon
  },
  data() {
    return {
      discriminator: "",
      repeat_discriminator: "",
      secret: "",
      repeat_secret: "",
      areParametersShown: false,
      password: "",
      isPasswordShown: false,
      clipboard_info_text: "",
      show_info_box: false,
      text_info_box: "",
      generate_info_box: ""
    };
  },
  computed: {
    are_repeating_parameters_valid(){
      if(this.discriminator === "" || this.secret === "") return false;
      if(this.discriminator === this.repeat_discriminator && 
         this.secret === this.repeat_secret){
           return true;
      }
      return false;
    },
  },
  methods: {
    generate_password(){
      if(!this.discriminator && !this.secret) return;
      if(this.repeat_discriminator || this.repeat_secret){
        if(!this.are_repeating_parameters_valid){
          this.generate_info_box= "Non matching repeating parameters";
          setTimeout(() => this.generate_info_box = "", 1000);
          return;
        }
      }
      this.password = mdp(this.discriminator, this.secret);
      this.reset_parameters();
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
      this.reset_parameters();
    },
    show_parameters(){
      this.areParametersShown = true;
      const discriminator = this.$refs.discriminator;
      const secret = this.$refs.secret;
      discriminator.setAttribute("type", "text");
      secret.setAttribute("type", "text");
    },
    hide_parameters(){
      this.areParametersShown = false;
      const discriminator = this.$refs.discriminator;
      const secret = this.$refs.secret;
      discriminator.setAttribute("type", "password");
      secret.setAttribute("type", "password");
    },
    show_password(){
      this.isPasswordShown = true;
      const clip = this.$refs.clip;
      clip.setAttribute("type", "text")
    },
    hide_password(){
      this.isPasswordShown = false;
      const clip = this.$refs.clip;
      clip.setAttribute("type", "password")
    }
  }
});
</script>

<style lang="scss">
@import url('./scss/main.scss');
@import url('./scss/container.scss');
@import url('./scss/passwordField.scss');
@import url('./scss/button.scss');
</style>