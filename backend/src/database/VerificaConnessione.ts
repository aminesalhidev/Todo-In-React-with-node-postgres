import pool from "./db";
export const VerificaConnessione = async () => {
 try {
    await pool.query ('select * from attivita');
    console.log('Connessione riuscita al database');
 } catch (err){
    console.log('Errore di connessione al database');
    
 }

}

export default VerificaConnessione;