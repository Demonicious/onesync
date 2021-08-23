import app from "./app.js";
import { getFirestore, doc, collection, onSnapshot, getDoc, getDocs, query, where, addDoc, serverTimestamp, orderBy } from "@firebase/firestore";

const db = getFirestore(app);

export const subscribeDocument = (params, callback) => onSnapshot(
    doc(
        db,
        ...params,
    ),
    (doc) => callback(doc)
)

export const subscribeCollection = (params, callback) => onSnapshot(
    query(
        collection(
        db,
        ...params
        ),
        orderBy('timestamp', 'asc')
    ),
    snap => callback(snap)
)

export const getDocument = async(params) => getDoc(
    doc(
        db,
        ...params
    )
);

export const queryWhereDocuments = async(params, whereQuery) => getDocs(
    query(
        collection(
            db,
            ...params
        ),
        where(...whereQuery),
        orderBy('timestamp', 'asc')
    )
)

export const writeDocument = async (params, data) => addDoc(
    collection(
        db,
        ...params
    ),
    {
        ...data,
        timestamp: serverTimestamp()
    }
);