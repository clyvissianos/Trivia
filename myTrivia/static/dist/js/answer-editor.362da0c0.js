"use strict";(self["webpackChunkmytrivia_frontend"]=self["webpackChunkmytrivia_frontend"]||[]).push([[701],{3404:function(t,e,r){r.r(e),r.d(e,{default:function(){return y}});var s=r(6252),n=r(9963),o=r(3577);const a={class:"container mt-2"},u=(0,s._)("h1",{class:"mb-3"},"Edit Your Answer",-1),i=(0,s._)("button",{type:"submit",class:"btn btn-success mt-3"},"Publish",-1),l={key:0,class:"muted mt-2"};function c(t,e,r,c,d,m){return(0,s.wg)(),(0,s.iD)("div",a,[u,(0,s._)("form",{onSubmit:e[1]||(e[1]=(0,n.iM)(((...t)=>m.onSubmit&&m.onSubmit(...t)),["prevent"]))},[(0,s.wy)((0,s._)("textarea",{"onUpdate:modelValue":e[0]||(e[0]=t=>d.answerBody=t),class:"form-control",rows:"10"},null,512),[[n.nr,d.answerBody]]),i],32),d.error?((0,s.wg)(),(0,s.iD)("p",l,(0,o.zw)(d.error),1)):(0,s.kq)("",!0)])}r(7658);var d=r(718),m={name:"AnswerEditor",props:{uuid:{type:String,required:!0}},data(){return{questionSlug:null,answerBody:null,error:null}},methods:{async onSubmit(){if(!this.answerBody)return void(this.error="You can't submit an empty answer!");const t=`/api/v1/answers/${this.uuid}/`;try{await d.o.put(t,{body:this.answerBody}),this.$router.push({name:"question",params:{slug:this.questionSlug}})}catch(e){console.log(e),alert(e.response.statusText)}}},async beforeRouteEnter(t,e,r){const s=`/api/v1/answers/${t.params.uuid}/`;try{const t=await d.o.get(s);return r((e=>(e.answerBody=t.data.body,e.questionSlug=t.data.question_slug)))}catch(n){console.log(n),alert(n.responce.statusText)}}},w=r(3744);const p=(0,w.Z)(m,[["render",c]]);var y=p}}]);
//# sourceMappingURL=answer-editor.362da0c0.js.map