<template>
  <div class="container my-2">
    <div class="card shadow p-2 mb-4 bg-body rounded">
      <div class="card-body">
        <h1 class="mb-3">Create a Question</h1>
        <form @submit.prevent="onSubmit">
          <textarea
            v-model="questionBody"
            class="form-control"
            placeholder="What do you want to ask?"
            rows="10"
          ></textarea>
          <button type="submit" class="btn btn-success mt-3">Publish</button>
          <button class="btn btn-danger mt-3 mx-1" @click="cancel">
            Cancel
          </button>
        </form>
        <p v-if="error" class="muted mt-2">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";

export default {
  name: "QuestionEditor",
  props: {
    slug: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      questionBody: null,
      error: null,
    };
  },
  methods: {
    async performNetworkRequest() {
      let endpoint = "/api/v1/questions/";
      let method = "POST";
      if (this.slug !== undefined && this.slug !== "") {
        endpoint += `${this.slug}/`;
        method = "PUT";
      }
      try {
        const responce = await axios({
          method: method,
          url: endpoint,
          data: { content: this.questionBody },
        });
        this.$router.push({
          name: "question",
          params: { slug: responce.data.slug },
        });
      } catch (error) {
        this.error = error.responce.statusText;
      }
    },
    onSubmit() {
      if (!this.questionBody) {
        this.error = "You can't send an empty question!";
      } else if (this.questionBody.length > 240) {
        this.error = "Ensure this field has no more than 240 characters!";
      } else {
        this.performNetworkRequest();
      }
    },
    cancel() {
      this.$router.push({
        name: "home",
      });
    },
  },
  created() {
    document.title = "Editor - Trivia";
  },
  async beforeRouteEnter(to, from, next) {
    if (to.params.slug !== undefined && to.params.slug !== "") {
      const endpoint = `/api/v1/questions/${to.params.slug}/`;
      try {
        const response = await axios.get(endpoint);
        return next((vm) => (vm.questionBody = response.data.content));
      } catch (error) {
        console.log(error);
        alert(error.responce.statusText);
      }
    } else {
      return next();
    }
  },
};
</script>
