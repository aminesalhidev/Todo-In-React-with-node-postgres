import React, {useEffect, useState} from "react";
import axios from 'axios';


interface Task {
    id: number;
    titolo : string;
};


const Home: React.FC = () => {

    const [task, setTask] =useState<Task[]>([]);
    const [Completata, setcompletata ]= useState<string>('');
    const [successo, setSuccesso] = useState<string>('');
    const [loading, setloading] = useState<string>('');
    const [errore, seterrore] = useState<string>('');


useEffect (()  => {
    const aggiuntaTask = async () => {
    try {
        const risultato = await axios.get('http://localhost:3001/attivita');
        setTask(risultato.data);
    } catch (error) {    
        console.error('Errore di rete : error');
        seterrore ('Errore durante il caricamento delle task.');
    };  
}};




const Convalida = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
    const risposta = await axios.get ('http://localhost:3001/attivita');
     setTask(risposta.data);
      } catch (error) {
       // prendo la risposta dal backend incaso di errore.
        console.error ('error: errre riguardante aggiunta della task');
        seterrore('errore durante aggiunta della task');


      }



}

const EliminaUtente = async (id:number) => {
    if(!window.confirm('Sei sicuro Che vuoi eliminare questa task'));
        try {
            const rispossa = await axios.delete ('http:localhost:3001/attivita');
            setSuccesso('Task eliminata con successo');
            <label>       
                  Checkbox: <input type="checkbox" name="myCheckbox" defaultChecked={true} /> </label>            
        } catch (error) {
        console.log('errore durante eliminazione della task');
        seterrore('Errore durante elimnazione della task');
    }
}

const ModificaUtente = async () => {


}



const aggiuntiUtente = async () =>  {


}
    
}

return (


<form className="AggiuntiTask" onSubmit={Convalida}>
    <div>
        <h2>Benvenuto nel tuo TodoList utente</h2>
        <input type="text" placeholder="Che obiettivi giornalieri hai Oggi?"/>
        <button className='AggiuntiTask' onClick={aggiuntiUtente(task)}>Aggiunti Task</button>
        <button className='EliminaUtente' onClick={EliminaUtente (task.id)}> EliminaUtente </button>
        <button className='ModificaUtente' onClick={ModificaUtente (id.task)}>ModificaUtente</button>

        <form className="tabella task" onSubmit={convalida}>
            <div>
                <input type="text" placeholder="gestire il tuo tempo con un TODO"/>
                <button className='AggiuntiTask' onClick={aggiuntiUtente(task)}>Aggiunti Task</button>
                <p className="errore">Errore aggiunta task</p>

            </div>


        </form>
    </div>
</form>
 






)










