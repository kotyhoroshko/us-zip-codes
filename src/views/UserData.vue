<template>
  <div class="data">
    <ul class="list-container">
      <li v-for="(value, name) in zipCodeInfo" :key="value" class="list-item">
        <span class="w-1/4">{{ name }}:</span>
        <span class="w-3/4 font-semibold">{{ value }}</span>
      </li>
    </ul>
    <button class="btn-primary m-3" @click="$router.push('/')">Home</button>
    <button class="btn-primary m-3" @click.once="show">User info</button>
    <div class="user-info">
      <transition
        enter-from-class="translate-x-[150%] opacity-0"
        enter-active-class="transition duration-300"
      >
        <UserInfo
          v-if="showUserInfoList"
          :userInfoList="userInfoList"
          :utmParams="utmParams"
        ></UserInfo>
      </transition>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";

export default {
  name: "UserData",
  components: {
    UserInfo,
  },
  inject: ["zipCodeInfo", "referrer", "utmParams"],
  data() {
    return {
      userInfoList: {
        ip: { name: "ip", value: "" },
        city: { name: "city", value: "" },
        country: { name: "country", value: "" },
        userAgent: { name: "user agent", value: "" },
        referrer: { name: "referrer", value: "" },
      },
      showUserInfoList: false,
    };
  },
  methods: {
    show() {
      this.getIp();
      this.showUserInfoList = true;
    },
    getIp() {
      fetch(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=09e307afb65f4744817e2413927ca76a"
      )
        .then((response) => response.json())
        .then((response) => {
          this.userInfoList.ip.value = response.ip_address;
          this.userInfoList.city.value = response.city;
          this.userInfoList.country.value = response.country;
          this.userInfoList.userAgent.value = window.navigator.userAgent;
          this.userInfoList.referrer.value = this.referrer;
        })
        .catch((err) => (this.errorMsg = err + "Please try again later"));
    },
  },
  created() {
    if (!this.zipCodeInfo.zipCode) {
      this.$router.push("/");
    }
  },
};
</script>
