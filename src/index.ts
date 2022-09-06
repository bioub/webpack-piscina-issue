import Piscina from "piscina"
import "./monitor.worker"

const piscina = new Piscina({ filename: "./monitor.worker.js" })

piscina.run({})
