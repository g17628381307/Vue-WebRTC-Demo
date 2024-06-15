
<script lang="ts" setup>
import SvgIcon from "./SvgIcon.vue";
import { useUserInfo } from "@/pinia/userInfo";
import { SETTINGS_VIDEO } from "@/enum";
import { ref, onMounted } from "vue";

const userInfo = useUserInfo();
let isShow = ref(false);
const videoInputOptions = ref<any[]>([]);
onMounted(() => {
  (async () => {
    const res = await navigator.mediaDevices.enumerateDevices();
    console.log(res, "res");
    videoInputOptions.value = res?.filter(i => i.kind === "videoinput");
    userInfo.settings.videoInputDeviceId = res.find(
      i => i.kind === "videoinput"
    )?.deviceId as any;
    console.log(videoInputOptions.value, "videoInputOptions");
  })();
});
</script>

<template>
  <div>
    <SvgIcon
      name="setting"
      size="32"
      :class="['setting-menu', isShow ? 'open-setting' : '']"
      color="#e5bc64"
      @click="isShow = !isShow"
    />
    <div class="settings-mask" @click="isShow = false" v-if="isShow"></div>
    <Transition name="T_top_dow">
      <div class="setting show-box" @click.stop="void 0" v-if="isShow">
        <span class="title">通话设置</span>
        <div class="item">
          <span class="name">对方声音</span>
          <input type="checkbox" v-model="userInfo.settings.remoteAudio" />
        </div>
        <div class="item">
          <span class="name">本地声音</span>
          <input type="checkbox" v-model="userInfo.settings.localAudio" />
        </div>
        <div class="item">
          <span class="name">对方视频</span>
          <input type="checkbox" v-model="userInfo.settings.remoteVideo" />
        </div>
        <div class="item">
          <span class="name">本地视频</span>
          <input type="checkbox" v-model="userInfo.settings.localVideo" />
        </div>
        <div class="item">
          <span class="name">视频通话</span>
          <input
            type="radio"
            name="radio"
            :value="SETTINGS_VIDEO.USER"
            v-model="userInfo.settings.video"
          />
        </div>
        <!-- <div class="item">
          <span class="name">音频输入选择</span>
          <select class="input-select">
            <option
              v-for="(state) in videoInputOptions"
              :key="state.deviceId"
              :value="state.deviceId"
            >{{state.label}}</option>
          </select>
          <input
            type="radio"
            name="radio"
            :value="SETTINGS_VIDEO.DISPLAY"
            v-model="userInfo.settings.video"
          />
        </div>-->

        <div class="item">
          <span class="name">视频输入选择</span>
          <select v-model="userInfo.settings.videoInputDeviceId" class="input-select">
            <option
              v-for="(state) in videoInputOptions"
              :key="state.deviceId"
              :value="state.deviceId"
            >{{state.label}}</option>
          </select>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style lang="less" scoped>
input {
  cursor: pointer;
}
.setting-menu {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2001;
  transition: 0.22s;
  cursor: pointer;
}
.open-setting {
  transform: rotate(90deg);
}
.settings-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 2001;
}
.setting {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  width: 300px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  z-index: 2002;
  .title {
    align-self: center;
    font-size: 16px;
    font-weight: bold;
    color: @color-theme;
  }
  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 12px;
    margin-top: 12px;
  }
}

.input-select {
  width: 180px;
}
</style>
