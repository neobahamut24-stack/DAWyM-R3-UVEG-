
const express = require("express");
const path = require("path");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;


app.disable('x-powered-by');
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

// Consultar todas las tareas
app.get("/api/tareas", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, titulo, descripcion, completada, fecha_creacion
             FROM tareas
             ORDER BY fecha_creacion DESC`
        );

        res.json(rows);
    } catch (error) {
        console.error("Error al consultar tareas:", error);
        res.status(500).json({
            error: "No se pudieron consultar las tareas."
        });
    }
});

// Crear una tarea
app.post("/api/tareas", async (req, res) => {
    try {
        const titulo = String(req.body.titulo || "").trim();
        const descripcion = req.body.descripcion
            ? String(req.body.descripcion).trim()
            : null;

        if (!titulo) {
            return res.status(400).json({
                error: "El título es obligatorio."
            });
        }

        if (titulo.length > 150) {
            return res.status(400).json({
                error: "El título no puede superar los 150 caracteres."
            });
        }

        const [result] = await pool.execute(
            "INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)",
            [titulo, descripcion]
        );

        const [rows] = await pool.execute(
            `SELECT id, titulo, descripcion, completada, fecha_creacion
             FROM tareas WHERE id = ?`,
            [result.insertId]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error al crear tarea:", error);
        res.status(500).json({
            error: "No se pudo crear la tarea."
        });
    }
});

// Actualizar el estado de una tarea
app.patch("/api/tareas/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const completada = req.body.completada;

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "Identificador inválido."
            });
        }

        if (typeof completada !== "boolean") {
            return res.status(400).json({
                error: "El estado completada debe ser verdadero o falso."
            });
        }

        const [result] = await pool.execute(
            "UPDATE tareas SET completada = ? WHERE id = ?",
            [completada ? 1 : 0, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Tarea no encontrada."
            });
        }

        res.json({
            mensaje: "Estado actualizado correctamente."
        });
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
        res.status(500).json({
            error: "No se pudo actualizar la tarea."
        });
    }
});

// Eliminar todas las tareas completadas
// Esta ruta debe ir antes de DELETE /api/tareas/:id
app.delete("/api/tareas/completadas", async (req, res) => {
    try {
        const [result] = await pool.execute(
            "DELETE FROM tareas WHERE completada = 1"
        );

        res.json({
            mensaje: "Tareas completadas eliminadas.",
            eliminadas: result.affectedRows
        });
    } catch (error) {
        console.error("Error al limpiar tareas:", error);
        res.status(500).json({
            error: "No se pudieron eliminar las tareas completadas."
        });
    }
});

// Eliminar una tarea por identificador
app.delete("/api/tareas/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "Identificador inválido."
            });
        }

        const [result] = await pool.execute(
            "DELETE FROM tareas WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Tarea no encontrada."
            });
        }

        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).json({
            error: "No se pudo eliminar la tarea."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});
