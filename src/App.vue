<template>
  <div>
    <div class="header">
      <div class="wrapper">
        <h1>ケツピンカッター</h1>
        <h2>ケツピン画像の両端をカットする反SDGsアプリ</h2>
      </div>
    </div>
    <div class="main">
      <div class="wrapper">
        <div class="control">
          画像ファイルを選択：<input class="file" type="file" ref="file" @change="load" />
        </div>
        <div class="input"><img :src="imageInputUrl" /></div>
        <p class="center"><img src="./assets/arrow.png" /></p>
        <div class="output"><img :src="imageOutputUrl" /></div>
        <canvas class="canvas" ref="canvasInput" width="1600" height="900"></canvas>
        <canvas class="canvas" ref="canvasOutput" width="1320" height="900"></canvas>
        <p class="center">
          右クリックメニュー「名前を付けて画像を保存」またはロングタップで保存できます。
        </p>
      </div>
    </div>
    <div class="footer">
      <div class="wrapper">
        <p><img src="./assets/sdgs.png" width="128" /></p>
        <p>
          Copyright (c) 2023 <a href="https://arkw.net/">Sora Arakawa</a><br />Licensed under the
          MIT License
        </p>
        <p><a href="https://github.com/arkwnet/ketsupin">GitHub Repository</a></p>
      </div>
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
