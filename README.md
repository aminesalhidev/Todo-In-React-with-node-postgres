# Applicazione di Gestione delle Attività (To-Do List)

L'obiettivo di questo progetto è sviluppare una semplice applicazione di gestione delle attività (to-do list) utilizzando TypeScript, HTML e CSS. Questo esercizio aiuterà a comprendere i concetti fondamentali di TypeScript e sviluppo web, oltre a migliorare le competenze nella manipolazione del DOM.

## Obiettivi del Progetto

1. **Giorno 1: Struttura e funzionalità di base**
    - Creare una semplice applicazione di gestione delle attività in TypeScript.
    - Utilizzare HTML e CSS per il layout di base.
    - Implementare la logica per aggiungere, modificare e rimuovere attività.
  
2. **Giorno 2: Funzionalità avanzate**
    - Aggiungere funzionalità per modificare le attività esistenti.
    - Implementare la possibilità di segnare le attività come completate.
    - Aggiungere la persistenza dei dati (opzionale) usando il `localStorage`.
    - Implementare una semplice validazione per evitare attività vuote.

## Requisiti

### 1. Giorno 1: Struttura e funzionalità di base

#### Inizializzazione del progetto:
- Configura un nuovo progetto utilizzando npm e TypeScript.
- Includi una configurazione minima di TypeScript (`tsconfig.json`).

#### Interfaccia utente di base:
- Crea una interfaccia In React:
  - Un campo di testo per aggiungere nuove attività.
  - Una lista che mostri le attività aggiunte.
  - Ogni attività deve avere un pulsante "Modifica" e un pulsante "Elimina".

#### Gestione delle attività:
- Implementa un'interfaccia TypeScript per descrivere una singola attività (`Task`).
- Aggiungi la logica per aggiungere, modificare e rimuovere le attività dalla lista.

### 2. Giorno 2: Funzionalità avanzate

#### Modifica delle attività:
- Implementa la possibilità di modificare il testo di un'attività esistente.
- Quando l'utente clicca su "Modifica", il testo dell'attività deve diventare modificabile, e un pulsante "Salva" deve comparire per confermare le modifiche.

#### Segnare come completata:
- Aggiungi una casella di spunta accanto a ogni attività per segnare come completata.
- Le attività completate devono essere visivamente distinte (ad esempio, barrando il testo o cambiando il colore).

#### Persistenza dei dati (opzionale):
- Usa `localStorage` per salvare lo stato delle attività, così che non vengano perse al ricaricamento della pagina.

#### Validazione:
- Implementa una semplice validazione per evitare l'aggiunta di attività vuote.

### Dettagli tecnici:
- Il progetto deve essere sviluppato utilizzando solo TypeScript, HTML e CSS.
- Non è necessario usare framework come React o Angular.
- Non è richiesto gestire errori complessi o scrivere unit test.

## Istruzioni per l'Installazione

1. **Clona il repository**:
   ```bash
   git clone https://github.com/tuo-utente/to-do-list.git
   cd to-do-list
