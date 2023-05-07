import React from "react";
import moment from "moment/moment";
const Todo = ({ todo }) => {
  return (
    <div className="m-auto h-52 w-full max-w-md bg-white shadow p-2 border-t-4 border-red-600 rounded">
      <header className="p-2 border-b flex">
        <div className="flex flex-col">{todo.desc}</div>
      </header>
      <div className="flex flex-wrap p-2 w-full gap-4">
        <div className="flex flex-col w-full">
          <h4 className="text-xs">
            {todo.isCompleted ? "Completed" : "Not Completed"}
          </h4>
        </div>

        <div className="flex flex-col">
          <h1 className="text-md">{moment(todo.data).fromNow()}</h1>
        </div>

        <div className="flex flex-col">
          <h4 className="text-xs">N° Quittance</h4>
          <h1 className="text-md font-thin">QUITTANCE-22-2022-8-7488a</h1>
        </div>
      </div>
    </div>
  );
};

export default Todo;
