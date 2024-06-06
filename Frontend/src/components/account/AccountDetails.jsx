import moment from "moment";
import React from "react";
import { FcRating } from "react-icons/fc";

export const AccountDetails = ({ account }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 px-6 py-8 my-10 bg-blue-200 border-y-4 border-blue-800 rounded shadow">
      <h3 className="w-full flex items-center text-xl my-5 p-3 text-left font-bold   text-blue-900 bg-slate-50 rounded shadow-md">
        <FcRating className="mr-1" size={35} />
        Account Details:-
      </h3>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
        Account ID
        <span className="w-full lg:w-auto">
          {account._id}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
          Created At
        <span className="w-full lg:w-auto">
          {moment(account.createdAt).format("DD MMMM YYYY")}
        </span>
      </div>

      <div className=" w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
          Balance
        <span className="w-full lg:w-auto">
          {account.balance}
          {/* {new Intl.NumberFormat("ar-EG", {
            style: "currency",
            currency: "EGP",
          }).format(account.balance)} */}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
          OutGoing Transcations
        <span className="w-full lg:w-auto ">
          {account.out.length > 0
            ? account.out.reduce(
                  (totalAmount, log) => (totalAmount += log.balance_transfered),
                  0
                )
            : 0}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
          Incoming Transcations
        <span className="w-full lg:w-auto ">
          {account.in.length > 0
            ? account.in.reduce(
                  (totalAmount, log) => (totalAmount += log.balance_transfered),
                  0
                )
            : 0}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
          Deposit Amount
        <span className="w-full lg:w-auto ">
          {account.deposit_logs.length > 0
            ? account.deposit_logs.reduce(
                  (totalAmount, log) => (totalAmount += log.depositted_amount),
                  0
                )
            : 0}
        </span>
      </div>

      <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
          Withdrawal Amount
        <span className="w-full lg:w-auto ">
          {account.withdraw_logs.length > 0
            ? account.withdraw_logs.reduce(
                  (totalAmount, log) => (totalAmount += log.withdrawed_amount),
                  0
                )
            : 0}
        </span>
      </div>
    </div>
  );
};
