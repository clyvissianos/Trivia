<template>
  <div class="container mt-3">
    <div class="card shadow p-2 mb-4 bg-body rounded">
      <div class="card-body">
        <div v-if="question">
          <h1>{{ question.content }}</h1>
          <p class="mb-0">
            Posted by:
            <span class="author-name">{{ question.author }}</span>
          </p>
          <p>{{ question.created_at }}</p>

          <QuestionsUDComponent v-if="isQuestionAuthor" :slug="question.slug" />

          <div v-if="userHasAnswered">
            <p class="answer-added">You've written an answer!</p>
          </div>
          <div v-else-if="showForm">
            <form @submit.prevent="onSubmit">
              <p>Answer the Question</p>
              <textarea
                v-model="newAnswerBody"
                class="form-control"
                placeholder="Share your knowledge...!"
                rows="10"
              ></textarea>
              <button type="submit" class="btn btn-success my-3">
                Submit your Answer
              </button>
            </form>
            <p v-if="error" class="error mt-2">{{ error }}</p>
          </div>
          <div v-else>
            <button class="btn btn-success" @click="showForm = true">
              Answer the question
            </button>
          </div>
          <hr />
        </div>
        <div v-else>
          <h1 class="error text-center">404 - Question Not Found</h1>
        </div>
        <div v-if="question">
          <AnswerComponent
            v-for="answer in answers"
            :key="answer.uuid"
            :answer="answer"
            :requestUser="requestUser"
            @delete-answer="deleteAnswer"
          />
        </div>
        <div class="my-4">
          <p v-show="loadingAnswers">...loading...</p>
          <button
            v-show="next"
            @click="getQuestionAnswers"
            class="btn btn-sm btn-secondary"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/api.service.js";
import AnswerComponent from "@/components/Answer.vue";
import QuestionsUDComponent from "@/components/QuestionsUD.vue";
export default {
  name: "QuestionView",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  components: {
    AnswerComponent,
    QuestionsUDComponent,
  },
  data() {
    return {
      question: null,
      answers: [],
      next: null,
      loadingAnswers: false,
      userHasAnswered: false,
      showForm: false,
      newAnswerBody: null,
      error: null,
      requestUser: null,
    };
  },
  computed: {
    isQuestionAuthor() {
      return this.question.author == this.requestUser;
    },
  },
  methods: {
    setRequestUser() {
      this.requestUser = window.localStorage.getItem("username");
    },
    setPageTitle(title) {
      document.title = title;
    },
    async getQuestionData() {
      const endpoint = `/api/v1/questions/${this.slug}/`;
      try {
        const response = await axios.get(endpoint);
        this.question = response.data;
        this.userHasAnswered = response.data.user_has_answered;
        this.setPageTitle(response.data.content);
      } catch (error) {
        console.log(error.response);
        const title = "404 - Not Found!";
        this.setPageTitle(title);
      }
    },
    async getQuestionAnswers() {
      let endpoint = `/api/v1/questions/${this.slug}/answers/`;
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingAnswers = true;
      try {
        const response = await axios.get(endpoint);
        this.answers.push(...response.data.results);
        console.log(this.answers);
        this.loadingAnswers = false;
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
    async onSubmit() {
      if (!this.newAnswerBody) {
        this.error = "You can't send an empty answer!";
        return;
      }
      const endpoint = `/api/v1/questions/${this.slug}/answer/`;
      try {
        const response = await axios.post(endpoint, {
          body: this.newAnswerBody,
        });
        this.answers.unshift(response.data);
        this.newAnswerBody = null;
        this.showForm = false;
        this.userHasAnswered = true;
        if (this.error) {
          this.error = null;
        }
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    },
    async deleteAnswer(answer) {
      const endpoint = `/api/v1/answers/${answer.uuid}/`;
      try {
        await axios.delete(endpoint);
        this.answers.splice(this.answers.indexOf(answer), 1);
        this.userHasAnswered = false;
      } catch (error) {
        console.log(error);
        alert(error.response.statusText);
      }
    },
  },
  created() {
    this.getQuestionData();
    this.getQuestionAnswers();
    this.setRequestUser();
  },
};
</script>

<style>
.author-name {
  font-weight: bold;
  color: #dc3545;
}

.error {
  color: #dc3545;
}

.answer-added {
  font-weight: bold;
  color: green;
}
</style>
