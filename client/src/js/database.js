import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  

  const indexedDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = indexedDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method to add data to the database.
  const request = store.add(content);

  // Get confirmation of the request.
  const result = await request;
  console.log('result', result);
  return result;
};

export const getDb = async () => {


const indexedDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
const tx = indexedDb.transaction('jate', 'readonly');

// Open up the desired object store.
const store = tx.objectStore('jate');

// Use the .getAll() method to get all data in the database.
const request = store.getAll();

// Get confirmation of the request.
const result = await request;
console.log('result.value', result);
return result;
};

initdb();
