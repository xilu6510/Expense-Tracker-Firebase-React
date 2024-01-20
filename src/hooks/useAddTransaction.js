import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  // get the collection from the cloud firestore, the collection name is "transactions"
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    expenseCategory,
  }) => {
    /* each data is called document in the firestore. 
    transactionCollectionRef is the location where we can add the data to */
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      expenseCategory,
      createAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
