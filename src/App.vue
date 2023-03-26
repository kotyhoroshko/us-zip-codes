<template>
  <div class="px-2 py-10 mx-auto text-center text-slate-700 font-special bg-gradient-to-b from-white to-violet-500 min-h-[100svh]">
    <router-view v-slot="slotProps">
      <transition
        mode="out-in"
        enter-from-class="translate-y-[-150%] opacity-0"
        leave-to-class="translate-y-[150%] opacity-0"
        enter-active-class="transition duration-300"
        leave-active-class="transition duration-300"
      >
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zipCodeInfo: {
        zipCode: "",
        country: "",
        state: "",
        county: "",
        city: "",
      },
      referrer: document.referrer || "Not detected",
      utmParams: {
        utm_campaign: "",
        utm_source: "",
        utm_medium: "",
        utm_content: "",
      },
    };
  },
  provide() {
    return {
      zipCodeInfo: this.zipCodeInfo,
      referrer: this.referrer,
      utmParams: this.utmParams,
    };
  },
  mounted() {
    let utmParams = new URLSearchParams(window.location.search);
    this.utmParams.utm_campaign = utmParams.get("utm_campaign") || "Not detected";
    this.utmParams.utm_source = utmParams.get("utm_source") || "Not detected";
    this.utmParams.utm_medium = utmParams.get("utm_medium") || "Not detected";
    this.utmParams.utm_content = utmParams.get("utm_content") || "Not detected";
  },
};
</script>
