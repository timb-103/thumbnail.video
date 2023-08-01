<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Video Thumbnail API</h1>
      <p>Get thumbnail images from any public video URL via API or browser.</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="submit()">
      <!-- URL Input-->
      <div>
        <label>
          <span>Public video URL</span>
          <a href="" @click.prevent="tryDemo()">Try example</a>
        </label>
        <input type="text" v-model="url" placeholder="Eg. https://amazon.com/video.mp4" />
      </div>

      <!-- Seconds Input -->
      <div>
        <label>Time to take thumbnail (seconds):</label>
        <input type="number" v-model="seconds" placeholder="1" max="10" />
      </div>

      <p v-if="errors">{{ errors }}</p>

      <!-- Submit -->
      <button type="submit" :disabled="loading">Get Thumbnail</button>

      <!-- Image -->
      <div class="image-container" v-if="imgSrc">
        <img :src="imgSrc" />
        <a :href="imgSrc" download="thumbnail.png">Download</a>
      </div>

      <!-- API URLs -->
      <div class="" v-if="imgSrc && url">
        <label>Get via API:</label>
        <code class="code-scroll">
          thumbnail.video/api/get?url={{ url }}&seconds={{ seconds }}
        </code>

        <label>View in browser:</label>
        <code class="code-scroll">
          thumbnail.video/api/get?url={{ url }}&seconds={{ seconds }}
        </code>
      </div>

      <div v-if="imgSrc && url">
        <a href="" @click.prevent="clear()">Clear</a>
      </div>
    </form>

    <!-- API Info -->
    <div class="info">
      <div>
        <p><strong>Use via API or browser</strong></p>
        <code style="margin-top: 5px">
          (GET) thumbnail.video/api/get?url={video_url}&seconds=${seconds}
        </code>
      </div>

      <div>
        <p><strong>Test video URLs</strong></p>
        <p>
          Here's a list of public video URL's that you can test with:
          <a href="https://gist.github.com/jsturgis/3b19447b304616f18657" target="_blank">
            public video URL's
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const url = ref('')
const seconds = ref(1)
const loading = ref(false)
const imgSrc = ref('')
const errors = ref('')
const demoURL = ref(
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
)

useSeoMeta({ title: 'Video Thumbnail API' })

function tryDemo() {
  url.value = demoURL.value
  submit()
}

async function submit() {
  loading.value = true
  imgSrc.value = ''
  errors.value = ''

  try {
    const response = await $fetch<Buffer>(
      `/api/get?url=${encodeURIComponent(url.value)}&seconds=${seconds.value}`
    )
    processImageBuffer(response)
  } catch (error: any) {
    console.log('Error getting thumbnail:', error)
    errors.value = error.statusMessage || error.message
  }

  loading.value = false
}

function processImageBuffer(imageBuffer: Buffer) {
  const imageBlob = new Blob([imageBuffer], { type: 'image/png' })
  const objectURL = URL.createObjectURL(imageBlob)
  imgSrc.value = objectURL
}

function clear() {
  url.value = ''
  imgSrc.value = ''
}
</script>

<style>
body {
  font-size: 16px;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji;
  line-height: 1.7em;
}

p {
  margin: 0;
}

.container {
  margin: 60px auto;
  max-width: 600px;
}

.header {
  text-align: center;
}

form {
  border-radius: 8px;
  box-shadow: 0 4px 8px -2px #091e4240, 0 0 0 1px #091e4214;
  margin-top: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 1.1em;
  width: 100%;
}

button {
  background: #000;
  border: 1px solid #000;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 15px;
}
button:hover:not(:disabled) {
  background: #fff;
  color: #000;
}
button:disabled {
  opacity: 0.4;
}

code {
  background: #ededed;
  border: 1px solid #ededed;
  border-radius: 3px;
  font-size: 14.5px;
  padding: 0.2rem 0.375rem;
  white-space: pre-line;
  box-sizing: border-box;
  overflow: auto;
  white-space: nowrap;
  width: 100%;
  display: inline-block;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

/** Image */
.image-container {
  position: relative;
}
.image-container > img {
  width: 100%;
  display: block;
}
.image-container > a {
  background: #fff;
  border: 1px solid lightgrey;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #000;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 10px 15px;
  text-decoration: none;
}
.image-container > a:hover {
  background: #fafafa;
}
</style>
