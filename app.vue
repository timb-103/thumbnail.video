<template>
  <main>
    <!-- Header -->
    <h1>Video Thumbnail API</h1>
    <p>
      Get thumbnail images from any public video URL via API or browser.
      <mark>100% free</mark>, <em>no login required</em> &
      <a href="https://github.com/timb-103/thumbnail.video" target="_blank">open source</a>.
    </p>

    <!-- Form -->
    <form @submit.prevent="submit()" v-if="!imgSrc">
      <!-- URL Input-->
      <p>
        <label>URL:</label>
        <input
          type="text"
          v-model="url"
          placeholder="Eg. https://amazon.com/video.mp4"
          style="width: 350px"
        />
      </p>

      <!-- Seconds Input -->
      <p>
        <label>Time (seconds):</label>
        <input type="number" v-model="seconds" placeholder="1" max="10" style="width: 150px" />
      </p>

      <!-- Errors -->
      <p>
        <code v-if="errors">{{ errors }}</code>
      </p>

      <!-- Submit -->
      <button type="submit" :disabled="loading">Get Thumbnail</button>
      <p>
        <small><a href="" @click.prevent="tryDemo()">or try example url</a></small>
      </p>
    </form>

    <div v-if="imgSrc">
      <!-- Image -->
      <div class="image-container">
        <img :src="imgSrc" />
        <a :href="imgSrc" download="thumbnail.png" class="button">Download</a>
      </div>

      <!-- API URLs -->
      <p>
        <code>https://thumbnail.video/api/get?url={{ url }}&seconds={{ seconds }}</code>
      </p>

      <!-- Clear Button-->
      <div>
        <button @click="clear()" style="width: 100%">Clear</button>
      </div>
    </div>

    <hr />

    <!-- API Infos -->
    <details>
      <summary>Use via API or browser</summary>
      <code style="margin-top: 5px">
        (GET): thumbnail.video/api/get?url={video_url}&seconds=${seconds}
      </code>
    </details>

    <details>
      <summary>Test video URLs</summary>
      <p>
        Here's a list of public video URL's that you can test with:
        <a href="https://gist.github.com/jsturgis/3b19447b304616f18657" target="_blank">
          public video URL's
        </a>
      </p>
    </details>
  </main>
</template>

<script setup lang="ts">
// import 'simpledotcss/simple.min.css'

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
  if (loading.value) {
    return
  }
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
/** Image */
.image-container {
  position: relative;
}
.image-container > a {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.image-container > img {
  width: 100%;
}
</style>
