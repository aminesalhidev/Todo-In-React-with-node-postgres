import express, {Request, Response } from 'express';
import VerificaConnessione from './database/VerificaConnessione';
import pool from './database/db';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization']
}));


// Route per ottenere tutte le attività
app.get('/attivita', async (req: Request, res: Response) => {
   
    try { 
        const risultato = await pool.query('SELECT * FROM attivita');
        res.json(risultato.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Abbiamo un problema nel recupero di tutte le attività' });
    }
});


// Route per aggiungere una nuova attività
app.post('/attivita', async (req: Request, res: Response) => {
    const { titolo, completata } = req.body;
    try {
        const risposta = await pool.query( 'INSERT INTO attivita (titolo, completata) VALUES ($1, $2) RETURNING *',
            [titolo, completata]
        );
        res.status(201).json(risposta.rows[0]);
    } catch (err) {
        console.error('Errore durante aggiunta della task', err);
        res.status(500).json({ error: 'Errore nell\'aggiunta della task' });
    }
});


// Route per modificare un'attività esistente
app.put('/attivita/:id', async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const { titolo, completata } = req.body;
    try {
        const risultato = await pool.query(
            'UPDATE attivita SET titolo = $1, completata = $2, data_modifica = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [titolo, completata, taskId]
        );
        res.json(risultato.rows[0]);
    } catch (err) {
        console.error('Errore durante la modifica della task', err);
        res.status(500).json({ error: 'Problema nella modifica della task' });
    }
});


// Route per eliminare un'attività
app.delete('/attivita/:id', async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM attivita WHERE id = $1 RETURNING *', [taskId]);
        res.json({ message: 'Task eliminata con successo' });
    } catch (err) {
        console.error('Errore durante eliminazione della task', err);
        res.status(500).json({ error: 'Problema nell\'eliminazione della task' });
    }
});


// Avvio del server
app.listen(port, async () => {
    try {
        await VerificaConnessione(); // Verifica la connessione al database
        console.log(`Server in ascolto sulla porta ${port}`);
    } catch (err) {
        console.error('Impossibile avviare il server:', err);
        process.exit(1);
    }
});
