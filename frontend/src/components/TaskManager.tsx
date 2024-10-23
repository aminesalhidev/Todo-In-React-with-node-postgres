import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Importa il CSS qui


interface Attivita {
    id: number;
    titolo: string;
    completata: boolean;
}


const GestoreAttivita: React.FC = () => {
    const [attivita, setAttivita] = useState<Attivita[]>([]);
    const [titoloAttivita, setTitoloAttivita] = useState<string>('');
    const [idAttivitaDaModificare, setIdAttivitaDaModificare] = useState<number | null>(null);
    const [successo,setsuccesso] = useState<string | null>(null);
    const [error,seterrore] = useState<string | null>(null);


    useEffect(() => {
        const recuperaAttivita = async () => {
        try {
            const risposta = await axios.get<Attivita[]>('http://localhost:3001/attivita');
            setAttivita(risposta.data);
        } catch (errore) {
            console.error('Errore nel recupero delle attività:', errore);
            seterrore('errore riguardante il ricupero dei dati dal server');
        }};
       recuperaAttivita();
    }, []);


    const gestisciAttivita = async () => {
        const titoloPulito = titoloAttivita.trim();
        if (!titoloPulito) return alert('Il titolo non può essere vuoto!');
        try {
            if (idAttivitaDaModificare) {
                const risposta = await axios.put<Attivita>(`http://localhost:3001/attivita/${idAttivitaDaModificare}`, { titolo: titoloPulito });
                setAttivita(attivita.map(task => (task.id === idAttivitaDaModificare ? risposta.data : task)));
                setsuccesso('Modificazione task avvenuta con successo');
                setIdAttivitaDaModificare(null);
            } else {
                const risposta = await axios.post<Attivita>('http://localhost:3001/attivita', { titolo: titoloPulito, completata: true });
                setAttivita([...attivita, risposta.data]);
                setsuccesso('To Do inserito con sucesso!');
            }
            setTitoloAttivita('');
        } catch (errore) {
            console.error('Errore nella gestione della task:', errore);
            seterrore('Errore nella gestione del To Do');
        }
    };
    

    const eliminaAttivita = async (id: number) => {
     if (!window.confirm(`Sei sicuro di voler eliminare l'utente con ID ${id}?`)) return;

        try {
            await axios.delete(`http://localhost:3001/attivita/${id}`);
                setAttivita((attivita.filter(task => task.id !== id)));
                setsuccesso('To Do eliminata con successo');
        } catch (errore) {
              console.error('Errore nell\'eliminazione della To Do:', errore);
                seterrore('errore riguardante eliminazione della To Do');
        }

    };

    
    return (
        <div>
            < p className='SottoTitolo'> | <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00009 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 14.5758 4.93935 14.226
                 5.36679L9.65273 10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 
                 14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z" fill="#33363F"/></svg>
                 TO DO LIST 
            </p>

            <div>
                <input type="text" value={titoloAttivita} onChange={(e) => setTitoloAttivita(e.target.value)}  placeholder="Inserisci Un TODO"/>
                <button  className='Buttone' onClick={gestisciAttivita}>{idAttivitaDaModificare ? 'Modifica Attivita' : 'Aggiunti Attivita'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successo && <p style={{ color: 'green' }}>{successo}</p>}
            </div>

            <ul>    
                {attivita.map(task => (
                    <li key={task.id}>
                        <span  >{task.titolo}</span>
                        <span>{task.completata}</span>
                        <button className='ButtoneModifica' onClick={() => { setIdAttivitaDaModificare(task.id); setTitoloAttivita(task.titolo);}}> Modifica</button> 
                        <button className='ButtoneElimina'  onClick={() => eliminaAttivita(task.id)}>Elimina</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default GestoreAttivita;
