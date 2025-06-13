const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3001;

// Simulación de datos en memoria
let usuarios = [
  { id: 1, nombre: "Jugador1", progreso: { nivel: 1, experiencia: 0 } },
];

app.use(cors());
app.use(express.json());

// Obtener usuarios
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

// Crear nuevo usuario
app.post("/api/usuarios", (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  res.status(201).json(nuevo);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
