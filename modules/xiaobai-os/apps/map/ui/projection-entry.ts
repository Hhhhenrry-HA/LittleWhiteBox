import { createApp } from 'vue';
import MapProjection from './MapProjection.vue';
import './projection.css';

const app = createApp(MapProjection);
app.mount('#app');
window.addEventListener('pagehide', event => { if (!event.persisted) { app.unmount(); } });
