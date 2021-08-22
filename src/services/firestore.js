import app from "./app.js";
import { getFirestore, doc, collection, onSnapshot, getDoc, getDocs, query, where, addDoc } from "@firebase/firestore";

const db = getFirestore(app);

export const subscribeDocument = (params, callback) => onSnapshot(
    doc(
        db,
        ...params,
    ),
    (doc) => callback(doc)
)

export const subscribeCollection = (params, callback) => onSnapshot(
    collection(
        db,
        ...params
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
        where(...whereQuery)
    )
)

export const writeDocument = async (params, data) => addDoc(
    collection(
        db,
        ...params
    ),
    data
);