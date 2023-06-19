<template>
  <nav>
    <NavbarComponent :requestUser="requestUser" />
  </nav>
  <router-view />
</template>

<script>
import { axios } from "@/common/api.service.js";
import NavbarComponent from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      requestUser: "",
    };
  },
  methods: {
    async setUserInfo() {
      try {
        const responce = await axios.get("/auth/users/me/");
        const requestUser = responce.data["username"];
        window.localStorage.setItem("username", requestUser);
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
    setRequestUser() {
      setTimeout(() => {
        this.requestUser = window.localStorage.getItem("username");
      }, 100); // Adjust the delay as needed
    },
  },
  created() {
    this.setUserInfo();
    this.setRequestUser();
  },
};
</script>

<style>
body {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 300;
}
</style>
