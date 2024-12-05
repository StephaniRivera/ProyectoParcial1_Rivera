import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kuki3000',
    port: 3306,
    database: 'bd_restaurante'
});

db.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:');
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});


app.get('/platos/', (req, res) => {
    const query = 'SELECT * FROM Platos';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los platos', error);
            return;
        }
        res.status(200).json(results);
    });
});


app.post('/platos/', (req, res) => {
    const { nombre, precio } = req.body;
    const query = 'INSERT INTO Platos (nombre, precio) VALUES (?, ?)';
    db.query(query, [nombre, precio], (error, results) => {
        if (error) {
            res.status(500).send('Error al crear el plato');
            return;
        }
        res.status(200).json('Plato creado exitosamente');
    });
});

// Eliminar un plato por ID
app.delete('/platos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Platos WHERE id_plato = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el plato');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Plato no encontrado');
        } else {
            res.status(200).json('Plato eliminado exitosamente');
        }
    });
});

// Actualizar un plato por ID
app.put('/platos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const query = 'UPDATE Platos SET nombre = ?, precio = ? WHERE id_plato = ?';
    db.query(query, [nombre, precio, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar el plato');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Plato no encontrado');
        } else {
            res.status(200).json('Plato actualizado exitosamente');
        }
    });
});


// Listar todos los ingredientes
app.get('/ingredientes', (req, res) => {
    const query = 'SELECT * FROM Ingredientes';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los ingredientes');
            return;
        }
        res.status(200).json(results);
    });
});


// Crear un nuevo ingrediente
app.post('/ingredientes/', (req, res) => {
    const { nombre, cantidad_disponible } = req.body;
    const query = 'INSERT INTO Ingredientes (nombre, cantidad_disponible) VALUES (?, ?)';
    db.query(query, [nombre, cantidad_disponible], (error, results) => {
        if (error) {
            res.status(500).send('Error al crear el ingrediente');
            return;
        }
        res.status(200).json('Ingrediente creado exitosamente');
    });
});

// Eliminar un ingrediente por ID
app.delete('/ingredientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Ingredientes WHERE id_ingrediente = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el ingrediente');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Ingrediente no encontrado');
        } else {
            res.status(200).json('Ingrediente eliminado exitosamente');
        }
    });
});

// Actualizar un ingrediente por ID
app.put('/ingredientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, cantidad_disponible } = req.body;
    const query = 'UPDATE Ingredientes SET nombre = ?, cantidad_disponible = ? WHERE id_ingrediente = ?';
    db.query(query, [nombre, cantidad_disponible, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar el ingrediente');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Ingrediente no encontrado');
        } else {
            res.status(200).json('Ingrediente actualizado exitosamente');
        }
    });
});

// Listar todos los elementos de la tabla IngredientesPlatos
app.get('/ingredientesplatos/', (req, res) => {
    const query = `
        SELECT 
            p.nombre AS plato_nombre, 
            ip.cantidad_usada
        FROM 
            IngredientesPlatos ip
        JOIN 
            Platos p ON ip.id_plato = p.id_plato
    `;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los datos de los platos');
            return;
        }
        res.status(200).json(results);
    });
});


