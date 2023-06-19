<template>
  <div class="home mt-3">
    <div class="container">
      <div v-for="question in questions" :key="question.uuid">
        <div class="card shadow p-2 mb-4 bg-body rounded">
          <div class="card-body">
            <p class="mb-0">
              Posted by:
              <span class="question-author">{{ question.author }}</span>
            </p>
            <router-link
              :to="{ name: 'question', params: { slug: question.slug } }"
              class="question-link"
            >
              <h2>{{ question.content }}</h2>
            </router-link>
            <p class="mb-0">Answers: {{ question.answers_count }}</p>
          </div>
        </div>
      </div>
      <div class="my-4">
        <p v-show="loadingQuestion">...loading...</p>
        <button
          v-show="next"
          @click="getQuestions"
          class="btn btn-sm btn-secondary"
        >
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";
export default {
  name: "HomeView",
  data() {
    return {
      questions: [],
      next: null,
      loadingQuestion: false,
    };
  },
  methods: {
    async getQuestions() {
      let endpoint = "/api/v1/questions/";
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingQuestion - true;
      try {
        const response = await axios.get(endpoint);
        this.questions.push(...response.data.results);
        this.loadingQuestion = false;
        if (response.data.next) {
          this.next = response.data.next;
        } else {
          this.next = null;
        }
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
  },
  created() {
    document.title = "Trivia";
    this.getQuestions();
  },
};
</script>

<style>
html,
body {
  height: 100%;
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 400;
  background: linear-gradient(45deg, #4158d0, #c850c0, #ffcc70);
  background-size: 600% 100%;
  animation: gradientAnimation 15s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.question-author {
  font-weight: bold;
  color: #dc3545;
}

.question-link {
  font-weight: 200;
  color: black;
  text-decoration: none;
}

.question-link:hover {
  color: #424642;
}
</style>
