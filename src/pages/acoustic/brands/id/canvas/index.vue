<template>
    <canvas ref="canvas" style="background-color: lightgray;" />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const canvasSize = { width: 1000, height: 500 }
const elements = [
    { width: 10, height: 50, x: 10, y: 10, color: "blue" },
    { width: 10, height: 50, x: 30, y: 10, color: "gray" },
    { width: 10, height: 50, x: 50, y: 10, color: "green" },
    { width: 10, height: 50, x: 70, y: 10, color: "black" },
    { width: 10, height: 50, x: 90, y: 10, color: "red" },
]

const canvas = ref()

const resizeCanvas = () => {
    canvas.value.height = window.innerHeight
    canvas.value.width = window.innerWidth

    drawCanvas()
}

const drawCanvas = () => {
    const ctx = canvas.value.getContext("2d");

    const { width, height } = canvas.value.getBoundingClientRect()

    const innerCanvasPosition = { x: (width - canvasSize.width) / 2, y: (height - canvasSize.height) / 2  }

    ctx.fillStyle = "white";
    ctx.fillRect(innerCanvasPosition.x, innerCanvasPosition.y, canvasSize.width, canvasSize.height);

    elements.forEach((element) => {
        ctx.fillStyle = element.color
        ctx.fillRect(innerCanvasPosition.x + element.x, innerCanvasPosition.y + element.y, element.width, element.height);
    })   
}

onMounted(() => {
    resizeCanvas()

    window.addEventListener('resize', resizeCanvas, true)
})

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
})

defineExpose({ canvas })
</script>