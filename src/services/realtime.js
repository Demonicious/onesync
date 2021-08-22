import app from "./app";
import { getDatabase, ref, child, onValue } from "@firebase/database";

const db    = getDatabase(app);
const dbRef = ref(db);

export const getDatabase = () => db;

export const getRef      = () => dbRef;

export const getChild    = (name) => child(dbRef, name);

export const subscribe   = (child, valueCallback) => {
    if(typeof child === 'string') {
        child = getChild(child);
    }

    onValue(child, snap => valueCallback(snap));
}