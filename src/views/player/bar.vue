<template>
    <div class="bar-container">
    <span>{{playTime}}</span>
    <div class="bar-bg" ref="barBg" @touchstart.prevent="choseTime">
      <div class="bar-past" :style="{width:length}"></div>
      <div
        class="bar-point"
        :style="{left:length}"
        @touchstart.prevent="start"
        @touchmove.prevent="move"
        @touchend="end"
      ></div>
    </div>
    <span>{{setTime(allTime)}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      length,
      touch: {}
    }
  },
  props: {
    allTime: {
      type: Number
    },
    playTime: {
      type: String
    },
    width: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  watch: {
    width (val) {
      if (val && !this.touch.state) {
        val = val + '%'
        this.length = val
      }
    }
  },
  methods: {
    start (e) {
      this.touch.state = true
      const left = this.$refs.barBg.offsetLeft
      this.touch.startX = e.changedTouches[0].pageX - left
      this.touch.width = this.$refs.barBg.clientWidth
    },
    move (e) {
      if (!this.touch.state) {
        return
      }
      const left = this.$refs.barBg.offsetLeft
      const deltaX = e.changedTouches[0].pageX - left
      const width = Math.min(Math.max(0, deltaX), this.touch.width)
      this.touch.offsetWidth = width / this.touch.width * 100
      this._changeWidth(this.touch.offsetWidth)
    },
    end (e) {
      this.touch.state = false
      this.$emit('time', this.touch.offsetWidth, isNaN(this.index) ? '' : this.index)
    },
    _changeWidth (val) {
      this.length = val + '%'
    },
    choseTime (e) {
      this.touch.width = this.$refs.barBg.clientWidth
      const left = this.$refs.barBg.offsetLeft
      this.touch.endX = e.changedTouches[0].pageX - left
      const offsetWidth = this.touch.endX / this.touch.width * 100
      console.log(offsetWidth)

      this._changeWidth(offsetWidth)
      this.$emit('time', offsetWidth, isNaN(this.index) ? '' : this.index)
    },
    setTime (value) {
      if (!value) return ''
      let min = parseInt(value / (1000 * 60))
      if (min < 10) {
        min = '0' + min
      }
      let sec = parseInt(value % (1000 * 60) / 1000)
      if (sec < 10) {
        sec = '0' + sec
      }
      value = `${min}:${sec}`
      return value
    }
  }
}
</script>

<style lang="less" scoped>
.bar-container{
    margin: 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    color: #bdc3c7;
    font-size: 0.2rem;
    .bar-bg{
        width: 100%;
        margin: 0 0.16rem;
        height: 2px;
        background-color: #95a5a6;
        position: relative;
        .bar-past{
            height: 2px;
            background-color: #ecf0f1;
        }
        .bar-point{
            position: absolute;
            top: -6px;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            border: 3px solid red;
            background-color: #ecf0f1;
        }
    }
}
</style>
