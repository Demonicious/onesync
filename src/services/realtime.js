import app from "./app";
import { getDatabase, ref, child, onValue, set, update as updt } from "@firebase/database";

const db    = getDatabase(app);
const dbRef = ref(db);

export const getChild  = (name) => child(dbRef, name);
export const subscribe = (child, valueCallback) => {
    if(typeof child === 'string') {
        child = getChild(child);
    }

    onValue(child, snap => valueCallback(snap));
}

export const write = async (child, data) => set(getChild(child), data);
export const update = async(data) => updt(dbRef, data);