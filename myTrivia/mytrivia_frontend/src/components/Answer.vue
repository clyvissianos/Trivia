<template>
  <div>
    <p class="text-muted">
      <strong>{{ answer.author }} &#8901; {{ answer.created_at }}</strong>
    </p>
    <p style="white-space: pre-wrap">{{ answer.body }}</p>
    <div v-if="isAnswerAuthor">
      <router-link
        :to="{ name: 'answer-editor', params: { uuid: answer.uuid } }"
        class="btn btn-sm btn-warning"
      >
        Edit
      </router-link>
      <button
        class="btn btn-sm btn-danger mx-1"
        @click="showDeleteConfirmationBtn = !showDeleteConfirmationBtn"
      >
        Delete
      </button>
      <button
        v-show="showDeleteConfirmationBtn"
        class="btn btn-sm btn-outline-danger"
        @click="triggerDeleteAnswer"
      >
        Yes, delete my answer!
      </button>
      <button class="btn btn-sm btn-primary">
        Likes&nbsp;
        <span class="badge bg-danger">{{ likesCounter }}</span>
      </button>
    </div>
    <div v-else>
      <button
        class="btn btn-sm"
        :class="{
          'btn-warning': userLikedAnswer,
          'btn-outline-primary': !userLikedAnswer,
        }"
        @click="toggleLike"
      >
        Like Answer&nbsp;
        <span class="badge bg-success">{{ likesCounter }}</span>
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";
export default {
  name: "AnswerComponent",
  props: {
    answer: {
      type: Object,
      required: true,
    },
    requestUser: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showDeleteConfirmationBtn: false,
      userLikedAnswer: this.answer.user_has_liked_answer,
      likesCounter: this.answer.likes_count,
    };
  },
  computed: {
    isAnswerAuthor() {
      return this.answer.author === this.requestUser;
    },
  },
  methods: {
    toggleLike() {
      this.userLikedAnswer === false ? this.likeAnswer() : this.unLikeAnswer();
    },
    async likeAnswer() {
      this.userLikedAnswer = true;
      this.likesCounter += 1;
      const endpoint = `/api/v1/answers/${this.answer.uuid}/like/`;
      try {
        await axios.post(endpoint);
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
    async unLikeAnswer() {
      this.userLikedAnswer = false;
      this.likesCounter -= 1;
      const endpoint = `/api/v1/answers/${this.answer.uuid}/like/`;
      try {
        await axios.delete(endpoint);
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
    triggerDeleteAnswer() {
      this.$emit("delete-answer", this.answer);
    },
  },
};
</script>
