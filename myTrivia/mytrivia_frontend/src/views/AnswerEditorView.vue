<template>
  <div class="container mt-2">
    <div class="card shadow p-2 mb-4 bg-body rounded">
      <div class="card-body">
        <h1 class="mb-3">Edit Your Answer</h1>
        <form @submit.prevent="onSubmit">
          <textarea
            v-model="answerBody"
            class="form-control"
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
  name: "AnswerEditor",
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      questionSlug: null,
      answerBody: null,
      error: null,
    };
  },
  methods: {
    async onSubmit() {
      if (!this.answerBody) {
        this.error = "You can't submit an empty answer!";
        return;
      }
      const endpoint = `/api/v1/answers/${this.uuid}/`;
      try {
        await axios.put(endpoint, { body: this.answerBody });
        this.$router.push({
          name: "question",
          params: { slug: this.questionSlug },
        });
      } catch (error) {
        console.log(error);
        alert(error.response.statusText);
      }
    },
    cancel() {
      this.$router.push({
        name: "question",
        params: { slug: this.questionSlug },
      });
    },
  },
  async beforeRouteEnter(to, from, next) {
    const endpoint = `/api/v1/answers/${to.params.uuid}/`;
    try {
      const response = await axios.get(endpoint);
      return next(
        (vm) => (
          (vm.answerBody = response.data.body),
          (vm.questionSlug = response.data.question_slug)
        )
      );
    } catch (error) {
      console.log(error);
      alert(error.responce.statusText);
    }
  },
};
</script>
