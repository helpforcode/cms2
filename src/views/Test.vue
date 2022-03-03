<template>

  <div>
    <div class="pie ten"></div>
    <div class="pie twentyfive"></div>
    <div class="pie fifty"></div>
    <div class="pie seventyfive"></div>
    <div class="pie onehundred"></div>

    <svg>
      <circle cx="115" cy="115" r="110"></circle>
      <path d="M115,115 L115,5 A110,110 1 0,1 190,35 z"></path>
    </svg>

    <div class="clock"></div>

    <div class="round-text">
      <svg viewBox="0 0 100 100">
        <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
        <text>
          <textPath xlink:href="#circle">
            You-need-to-know-css-tricks-You-need-to-know-css-tricks-You-
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
name: "Test"
}
</script>

<style scoped>
.pie {
  width: 5em;
  height: 5em;
  display: block;
  border-radius: 50%;
  background-color: #92ae92;
  border: 2px solid #444f44;
  float: left;
  margin: 1em;
}

.ten {
  background-image: linear-gradient(126deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%);
}

.twentyfive {
  background-image: linear-gradient(180deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%);
}

.fifty {
  background-image: linear-gradient(90deg, white 50%, transparent 50%);
}


/* Slices greater than 50% require first gradient
   to be transparent -> green */

.seventyfive {
  background-image: linear-gradient(180deg, transparent 50%, #92ae92 50%), linear-gradient(90deg, white 50%, transparent 50%);
}

.onehundred {
  background-image: none;
}


* {
  margin: 0;
  padding: 0;
}

.clock {
  position: absolute;
  width: 300px;
  height: 300px;
  border: 20px solid #b06a26;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  background: #fefbf2;
  transform: translate(-50%, -50%);
  box-shadow: inset 0px 0px 10px black;
}

.clock::before {
  position: absolute;
  content: '';
  height: 130px;
  width: 10px;
  background: black;
  top: 50%;
  left: calc(50% - 5px);
  border-radius: 5px;
  animation: spin 6s linear infinite;
  transform-origin: top;
}

.clock::after {
  position: absolute;
  content: '';
  height: 100px;
  width: 10px;
  background: black;
  top: 50%;
  left: calc(50% - 5px);
  border-radius: 5px;
  animation: spin 72s linear infinite;
  transform-origin: top;
}

@keyframes spin {
  0% {
    transform: rotate(-180deg)
  }
  100% {
    transform: rotate(180deg)
  }
}

.round-text {
  width: 400px;
  height: 400px;
  margin: 80px auto;
}

.round-text svg {
  overflow: visible;
  animation: circular-text-rotate 5s linear paused infinite;
}
.round-text svg:hover {
  animation-play-state: running;
}
.round-text path {
  fill: none;
}
.round-text text {
  fill: #b4a078;
}
@keyframes circular-text-rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>
