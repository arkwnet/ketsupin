<template>
  <div>
    <div class="header">
      <div class="wrapper">ケツピンカッター</div>
    </div>
    <div class="main">
      <div class="wrapper">
        <div class="control">
          画像ファイルを選択：<input class="file" type="file" ref="file" @change="load" />
        </div>
        <div class="input"><img :src="imageInputUrl" /></div>
        <div class="output"><img :src="imageOutputUrl" /></div>
      </div>
      <canvas class="canvas" ref="canvasInput" width="1600" height="900"></canvas>
      <canvas class="canvas" ref="canvasOutput" width="1320" height="900"></canvas>
    </div>
    <div class="footer">
      <div class="wrapper">Copyright (c) 2023 Sora Arakawa<br />Licensed under the MIT License</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imageInput: new Image(),
      imageInputUrl: '/img/input.png',
      imageOutputUrl: '/img/output.png',
      canvasInput: null,
      contextInput: null,
      canvasOutput: null,
      contextOutput: null
    }
  },
  mounted() {
    this.canvasInput = this.$refs.canvasInput
    this.contextInput = this.canvasInput.getContext('2d')
    this.canvasOutput = this.$refs.canvasOutput
    this.contextOutput = this.canvasOutput.getContext('2d')
  },
  methods: {
    load() {
      let reader = new FileReader()
      let vm = this
      reader.onload = function (e) {
        vm.imageInputUrl = e.target.result
        vm.imageInput.src = vm.imageInputUrl
        vm.imageInput.onload = function () {
          vm.contextInput.drawImage(vm.imageInput, 0, 0, 1600, 900)
          vm.contextOutput.drawImage(vm.canvasInput, 140, 0, 1320, 900, 0, 0, 1320, 900)
          vm.imageOutputUrl = vm.canvasOutput.toDataURL()
        }
      }
      reader.readAsDataURL(this.$refs.file.files[0])
    }
  }
}
</script>
