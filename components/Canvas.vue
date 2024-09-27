<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Block, Link } from '@/types';
import { useCanvas } from '@/composables/useCanvas';
import { fetchBlocks, createBlock, deleteAllBlocksAndLinks } from '@/services/api';

const blocks = ref<Block[]>([]);
const links = ref<Link[]>([]);
const canvas = ref<HTMLCanvasElement | null>(null);
let draggingBlock = ref<Block | null>(null);
let isDrawingLine = ref<boolean>(false);

const { initializeCanvas, drawCanvas } = useCanvas(canvas, blocks, links);

onMounted(async () => {
  const response = await fetchBlocks();
  blocks.value = response.data;
  initializeCanvas();
  drawCanvas();
});

const handleCreateBlock = async (x: number, y: number, radius: number) => {
  const response = await createBlock({ x, y, radius });
  blocks.value.push(response.data);
  drawCanvas();
};

const handleMouseDown = (event: MouseEvent) => {
  const { offsetX, offsetY } = event;

  const selectedBlock = blocks.value.find(
      (block) => Math.sqrt((block.x - offsetX) ** 2 + (block.y - offsetY) ** 2) <= block.radius
  );

  if (selectedBlock) {
    draggingBlock.value = selectedBlock;
    isDrawingLine.value = true;
  } else {
    handleCreateBlock(offsetX, offsetY, 30);
  }
};

const handleMouseMove = () => {
  if (isDrawingLine.value) drawCanvas();
};

const handleMouseUp = (event: MouseEvent) => {
  const { offsetX, offsetY } = event;

  if (isDrawingLine.value && draggingBlock.value) {
    const targetBlock = blocks.value.find(
        (block) => Math.sqrt((block.x - offsetX) ** 2 + (block.y - offsetY) ** 2) <= block.radius
    );

    if (targetBlock && targetBlock !== draggingBlock.value) {
      links.value.push({ from: draggingBlock.value, to: targetBlock });
    }

    draggingBlock.value = null;
    isDrawingLine.value = false;
    drawCanvas();
  }
};

const clearCanvas = async () => {
  await deleteAllBlocksAndLinks();
  blocks.value = [];
  links.value = [];
  drawCanvas();
};
</script>

<template>
  <div class="canvas-container">
    <button class="clear-button" @click="clearCanvas">Очистить</button>
    <canvas ref="canvas" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"></canvas>
  </div>
</template>