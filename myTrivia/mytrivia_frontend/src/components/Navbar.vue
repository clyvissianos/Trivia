<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary my-navbar">
    <div class="container d-flex justify-content-center">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Trivia Home
      </router-link>
      <span class="navbar-text loggedUser-brand flex-grow-1 text-center"
        >Welcome {{ requestUser }} - You are logged in!</span
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item me-2">
            <router-link
              class="btn btn-danger"
              :to="{ name: 'question-editor' }"
            >
              Create a Question
            </router-link>
          </li>
          <li class="nav-item">
            <a class="btn btn-outline-secondary" href="/accounts/logout/">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  props: {
    requestUser: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      internalRequestUser: null, // Internal data for displaying the prop
    };
  },
  watch: {
    requestUser(newVal) {
      this.internalRequestUser = newVal;
    },
  },
  created() {
    this.internalRequestUser = this.requestUser; // Set the initial value
  },
};
</script>

<style>
.my-navbar {
  border-bottom: 1px solid;
}
.navbar-brand {
  font-weight: bold #ddd;
  font-size: 150%;
}
.navbar-brand:hover {
  color: #dc3545 !important;
}

.loggedUser-brand {
  font-weight: bold #ddd;
  font-size: 100%;
}
</style>
