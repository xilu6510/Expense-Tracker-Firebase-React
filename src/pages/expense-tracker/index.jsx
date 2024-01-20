import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import Select from "react-select";
import "./style.scss";
import { Transaction } from "firebase/firestore";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();

  const { transactions, transactionToals } = useGetTransaction();

  const { name, profilePhoto } = useGetUserInfo();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expense } = transactionToals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
      expenseCategory,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const navigate = useNavigate();

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const expenseOptions = [
    { value: "transport", label: "transport" },
    { value: "grocery", label: "grocery" },
    { value: "skin care", label: "skin care" },
    { value: "rent", label: "rent" },
    { value: "restaurants", label: "restaurants" },
    { value: "entertainment", label: "entertainment" },
    { value: "others", label: "others" },
  ];

  let imgBlock;
  if (profilePhoto) {
    imgBlock = <img src={profilePhoto} alt="profile photo" />;
  } else {
    imgBlock = <img src="../../../public/user.png" alt="profile photo" />;
  }

  const [expenseCategory, setExpenseCategory] = useState("unknown");
  return (
    <div className="expense-container">
      <div className="expense-tracker">
        <div className="inner-container">
          <div className="user-info">
            <h1>
              {name}'s <br />
              Expense Tracker
            </h1>
            <div>
              <div className="profile-photo-block">
                {imgBlock}
                <button onClick={signUserOut}>Sign Out</button>
              </div>
            </div>
          </div>

          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>

          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expense}</p>
            </div>
          </div>
          <h3>New Transaction</h3>
          <form action="" className="add-transaction" onSubmit={onSubmit}>
            <div className="type-block">
              <input
                type="text"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>

            <div className="expense-or-income">
              <div className="expense-cat">
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="expense">Expense</label>
              </div>

              <div className="income-cat">
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="income">Income</label>
              </div>
            </div>

            <Select
              placeholder={"Select Category"}
              options={expenseOptions}
              onChange={setExpenseCategory}
            />

            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>

        <ul>
          {transactions.map((transaction, key) => {
            const {
              description,
              transactionAmount,
              transactionType,
              expenseCategory,
            } = transaction;
            return (
              <li>
                <h4
                  style={{
                    color: transactionType === "expense" ? "red" : "black",
                  }}
                >
                  {description} | ${transactionAmount} | {transactionType}|{" "}
                  {expenseCategory.value}{" "}
                </h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
