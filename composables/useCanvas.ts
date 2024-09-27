export function useCanvas(canvas: Ref<HTMLCanvasElement | null>, blocks: Ref<Block[]>, links: Ref<Link[]>) {
    const ctx = ref<CanvasRenderingContext2D | null>(null);

    const initializeCanvas = () => {
        if (canvas.value) {
            canvas.value.width = window.innerWidth - 70;
            canvas.value.height = window.innerHeight - 70;
            ctx.value = canvas.value.getContext('2d');
        }
    };

    const drawCanvas = () => {
        if (ctx.value) {
            ctx.value.clearRect(0, 0, canvas.value!.width, canvas.value!.height);

            links.value.forEach((link) => drawLink(link));
            blocks.value.forEach((block) => drawBlock(block));
        }
    };

    const drawBlock = (block: Block) => {
        ctx.value!.beginPath();
        ctx.value!.arc(block.x, block.y, block.radius, 0, Math.PI * 2);
        ctx.value!.fillStyle = 'blue';
        ctx.value!.fill();
        ctx.value!.lineWidth = 2;
        ctx.value!.strokeStyle = 'black';
        ctx.value!.stroke();
    };

    const drawLink = (link: Link) => {
        ctx.value!.beginPath();
        ctx.value!.moveTo(link.from.x, link.from.y);
        ctx.value!.lineTo(link.to.x, link.to.y);
        ctx.value!.strokeStyle = 'black';
        ctx.value!.lineWidth = 2;
        ctx.value!.stroke();
    };

    return { initializeCanvas, drawCanvas };
}
