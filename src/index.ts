import Piscina from 'piscina';
import { resolve } from 'path';

const piscina = new Piscina({ filename: resolve(__dirname, './monitor.worker.js') });

piscina.run({});
