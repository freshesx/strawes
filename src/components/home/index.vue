<template>
  <mn-scroller>
    <mn-container>
      <mn-section>
        <mn-letter>
          <mn-letter-body>
            <h1>Hi</h1>
            <small>I am Vue Human!</small>
          </mn-letter-body>
        </mn-letter>

        <mn-card>
          <mn-card-item>
            <mn-card-body>Hello World!</mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              Welcome to use vue tempalte with vue-human.
            </mn-card-body>
          </mn-card-item>
        </mn-card>

        <mn-section-btn>
          <mn-btn :icon="icons.chatbubbleWorking" theme="primary" @click="bubble">Start</mn-btn>
          <mn-btn theme="secondary-link" @click="$router.push({ name: 'signIn' })">Sign in</mn-btn>
        </mn-section-btn>
      </mn-section>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import Message from 'vue-human/utils/Message'

  export default {
    data () {
      return {
        icons: {
          chatbubbleWorking: require('vue-human-icons/js/iconic/chatbubble-working')
        }
      }
    },
    methods: {
      bubble ($event, button) {
        button.loading = true
        setTimeout(() => {
          button.loading = false
          Message.create({ message: 'Hi, bubble!' }).show()
        }, 800)
      }
    }
  }
</script>
