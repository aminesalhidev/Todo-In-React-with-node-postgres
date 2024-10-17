// src/index.ts
import express, { NextFunction, Request, Response } from 'express';
import VerificaConnessione from './database/VerificaConnessione';
import pool from './database/db'; 
import cors from 'cors';


const app = express();
const port =  3001; 


app.use(express.json());
app.use(cors());


app.use(cors( {    
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content-type', 'Authorization']    
}));



//creazione del midlware
const Verificazione =  (req: Request, res:Response, next: NextFunction)  => {
const {titolo, completata}= req.body;

    if (!titolo || titolo.trim()) {
    return res.status(400).json({error:'Campo titolo non puo essere vuoto'});
    };


    next();
}



app.get('/attivita', async (req: Request, res: Response) => {
    try {
        const risultato = await pool.query('SELECT * FROM attivita');
        res.json(risultato.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Abbiamo un problema nel recupero di tutti gli utenti' });
    }
  });




app.post('/attivita', async (req: Request, res: Response)  => {
  const {titolo , completata} = req.body; 
  try {
    const risposta = await pool.query('insert into attivita (titolo,completata) values ($1,$2) RETURNING *', [titolo, completata]);
    res.status(201).json(risposta.rows[0]);
    
   } catch (err) {
    console.error('Errore durante aggiunta della task');
    res.status(500).json({error: 'Errore aggiunta task dalla parte del server'});
   }
})




app.put('/attivita/:id', async (req: Request, res: Response)  => {
    const TaskID = parseInt (req.params.id);
    const {titolo, completata} = req.body;
    
  try {
    const risultato = await pool.query ('update attivita set titolo = $1, completata = $2, where id = $4 returning*',  [titolo, completata, TaskID]);          
    res.json(risultato.rows[0]);

} catch (err){
    console.error(err);
    res.status(500).json({error: 'problema nella modifica della task'});

   }
})



app.delete('/attivita/:id', async (req: Request, res: Response)  => {
    const taskId = parseInt (req.params.id);



    try {           
        const risoltato = await pool.query ('DELETE from attivita where id = $1 returning *', [taskId]);
        res.json('message: Task eliminata con successo');
   
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'problema eliminazione task'});
    
   }
})



app.listen(port, async () => {
    try {
      VerificaConnessione(); //c
      console.log(`Server in ascolto sulla porta {port} riuscito`);
     
    } catch (err) {
      console.log('impossibile avviare il server :', err);
      process.exit(1);
    }
  });
  