export interface Block {
    id: number;
    x: number;
    y: number;
    radius: number;
}

export interface Link {
    from: Block;
    to: Block;
}