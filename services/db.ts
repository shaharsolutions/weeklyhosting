const DB_NAME = 'hostingRoutineDB';
const DB_VERSION = 3; // Incremented version to trigger schema upgrade
const STORES = ['tasks', 'shoppingList', 'settings', 'consecutiveWeeks', 'lastCompletionDate'];

let dbConnection: IDBDatabase;

function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (dbConnection) {
      return resolve(dbConnection);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', request.error);
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      dbConnection = request.result;
      resolve(dbConnection);
    };

    request.onupgradeneeded = (event) => {
      console.log(`Upgrading database from version ${event.oldVersion} to ${DB_VERSION}`);
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      STORES.forEach(storeName => {
        // If the store exists from a previous version, delete it to recreate it correctly.
        if (dbInstance.objectStoreNames.contains(storeName)) {
          dbInstance.deleteObjectStore(storeName);
        }
        // Create store without keyPath, as we'll use an explicit key.
        dbInstance.createObjectStore(storeName);
      });
    };
  });
}

async function get<T>(storeName: string): Promise<T | undefined> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    // We use a fixed key 'data' for our singleton data per store
    const request = store.get('data');

    request.onerror = () => {
        reject(request.error);
    };

    request.onsuccess = () => {
        // The result is the value itself, not an object wrapping it.
        resolve(request.result as T | undefined);
    };
  });
}


async function set<T>(storeName: string, value: T): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        // Using 'put' with the value and an explicit, out-of-line key.
        const request = store.put(value, 'data');

        request.onerror = () => {
            reject(request.error);
        };
        request.onsuccess = () => {
            resolve();
        };
    });
}

export const db = {
  get,
  set,
};