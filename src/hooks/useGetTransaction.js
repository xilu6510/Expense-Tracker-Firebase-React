import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import {
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  // const [transactions, setTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const transactionCollectionRef = collection(db, "transactions");
  const [transactionToals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
  const { userID } = useGetUserInfo("auth");

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID, orderBy("createAt"))
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalExpense = 0;
        let totalIncome = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();

          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });

        setTransactions(docs);

        let balance = totalIncome - totalExpense;

        setTransactionTotals({
          balance,
          income: totalIncome,
          expense: totalExpense,
        });
      });
    } catch (err) {
      console.log(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionToals };
};
