import { createApp } from 'vue';

import App from './App.vue';
import BaseBadge from './components/BaseBadge.vue';
import BaseCardSlot from './components/BaseCardSlot.vue';

const app = createApp(App);
app.component('base-badge', BaseBadge);
app.component('base-card-slot', BaseCardSlot);

app.mount('#app');
