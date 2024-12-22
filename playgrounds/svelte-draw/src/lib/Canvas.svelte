<script lang="ts">
    import { onMount } from 'svelte';
    
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    onMount(() => {
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.strokeStyle = '#000000';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
    });
    
    function startDrawing(e: MouseEvent) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e: MouseEvent) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
</script>

<div class="canvas-container">
    <canvas
        bind:this={canvas}
        width="800"
        height="600"
        on:mousedown={startDrawing}
        on:mousemove={draw}
        on:mouseup={stopDrawing}
        on:mouseleave={stopDrawing}
    ></canvas>
    <button on:click={clearCanvas}>Clear Canvas</button>
</div>

<style>
    .canvas-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
    }
    
    canvas {
        border: 1px solid #ccc;
        background: white;
    }
    
    button {
        padding: 0.5rem 1rem;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button:hover {
        background: #45a049;
    }
</style>
