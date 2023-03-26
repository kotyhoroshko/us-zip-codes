<template>
  <div class="mt-16">
    <p>Please type US ZIP code</p>
    <form action="#" @submit.prevent class="flex justify-center mt-1">
      <input
        v-model="zipCode"
        name="zip"
        type="text"
        pattern="[0-9]{5}"
        minlength="5"
        maxlength="5"
        placeholder="12345"
        @input="checkInput"
        class="input-primary"
      />
      <button @click.prevent="findCity" class="btn-primary rounded-l-none">
        Search
      </button>
    </form>
    <transition
      enter-from-class="translate-y-[150%] opacity-0"
      enter-active-class="transition duration-300"
    >
      <span class="error-msg" v-if="errorMsg">{{ errorMsg }}</span>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      zipCode: "",
      errorMsg: "",
    };
  },
  inject: ["zipCodeInfo"],
  methods: {
    checkInput() {
      this.zipCode = this.zipCode.replace(/\D/g, "");
    },
    findCity() {
      if (
        this.zipCode.length == 5 &&
        !isNaN(this.zipCode) &&
        Number(`${this.zipCode}`) >= 501 &&
        Number(`${this.zipCode}`) <= 99950
      ) {
        this.errorMsg = "";
        this.getZipInfo();
      } else {
        this.errorMsg =
          "Please type correct US ZIP code 00501-99950 (5 digits)";
      }
    },
    getZipInfo() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "40f9d8ac68mshfde94aef26df271p12ec39jsn87d9b7a963fa",
          "X-RapidAPI-Host": "vanitysoft-boundaries-io-v1.p.rapidapi.com",
        },
      };
      fetch(
        `https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode?zipcode=${this.zipCode}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.zipCodeInfo.zipCode = this.zipCode;
          this.zipCodeInfo.country = response.features[0].properties.country;
          this.zipCodeInfo.state = response.features[0].properties.state;
          this.zipCodeInfo.county = response.features[0].properties.county;
          this.zipCodeInfo.city = response.features[0].properties.city;
          this.$router.push("/data/");
        })
        .catch((err) => (this.errorMsg = err + "Please try again later"));
    },
  },
};
</script>