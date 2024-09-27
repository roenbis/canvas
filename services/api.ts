import axios from 'axios';

const api = axios.create({
    baseURL: 'https://canvas-4qrj.onrender.com/api/',
});

export const fetchBlocks = () => api.get('blocks/');
export const createBlock = (block: { x: number; y: number; radius: number }) => api.post('blocks/', block);
export const deleteAllBlocksAndLinks = () => api.delete('clear/');
