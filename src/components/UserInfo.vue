<template>
  <ul class="list-container">
    <li v-for="item in userInfoList" :key="item" class="list-item">
      <span class="w-2/5">{{ item.name }}:</span>
      <span class="w-3/5 font-semibold">{{ item.value }}</span>
    </li>
    <li v-for="(value, name) in utmParams" :key="name" class="list-item">
      <span class="w-2/5">{{ name }}:</span>
      <span class="w-3/5 font-semibold">{{ value }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    userInfoList: {
      type: Object,
    },
    utmParams: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>