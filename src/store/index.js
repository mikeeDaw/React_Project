import { proxy } from 'valtio';

const state = proxy({
    intro: true,
    color : '#0f5d39',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './jupiter.png',
    fullDecal: './space.jpg',
});

export default state;