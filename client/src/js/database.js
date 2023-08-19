import {openDB} from "idb";

const initializeDatabase = async () =>
  openDB("uniqueDB", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("uniqueStore")) {
        console.log("Unique database already exists");
        return;
      }
      db.createObjectStore("uniqueStore", {keyPath: "id", autoIncrement: true});
      console.log("Unique database created");
    },
  });

export const putDb = async (content) => {
  console.log("Adding to the unique database");

  const uniqueDb = await openDB("uniqueDB", 1);
  const tx = uniqueDb.transaction("uniqueStore", "readwrite");
  const store = tx.objectStore("uniqueStore");

  const request = store.put({id: 1, content: content});

  const result = await request;
  console.log("🚀 - Data added to the unique database", result);
};

export const getDb = async () => {
  console.log("Retrieving from the unique database");

  const uniqueDb = await openDB("uniqueDB", 1);
  const tx = uniqueDb.transaction("uniqueStore", "readonly");
  const store = tx.objectStore("uniqueStore");

  const request = store.get(1);

  const result = await request;
  return result?.content;
};

export const removeFromUniqueDb = async (id) => {
  console.log("Removing from the unique database", id);

  const uniqueDb = await openDB("uniqueDB", 1);
  const tx = uniqueDb.transaction("uniqueStore", "readwrite");
  const store = tx.objectStore("uniqueStore");

  const request = store.delete(id);

  const result = await request;
  console.log("Data removed from the unique database", result);
};

initializeDatabase();
