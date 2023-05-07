import React, { useEffect, useState } from "react";
import Header from "./partials/Header";
import Todo from "./partials/Todo";
import AddTodoModal from "./partials/AddTodoModal";
import { getToken, getTodoApi } from "../services/api";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();

  const navigation2 = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigation2("/login");
    }

    fetchTodoList();
  }, [refreshList]);

  const fetchTodoList = async () => {
    const result = await getTodoApi();
    console.log("todolist", result);
    if (result.status === 200 && result.data.status) {
      setList(result.data.data.todos.reverse());
    }
  };

  const [modal, setModal] = useState(false);

  return (
    <>
      <Header modal={modal} />
      <section
        class=" bg-gradient-to-br from-pink-50 to-indigo-100 p-8"
        style={{ filter: `${modal ? "blur(8px)" : "blur(0px)"}` }}
      >
        <h1 class="text-center font-bold text-2xl text-indigo-500">Tasks</h1>

        <div class="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10">
          {list.map((todo) => (
            <Todo todo={todo} />
          ))}
        </div>
      </section>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          class="group rounded-2xl h-12 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden"
          onClick={() => setModal(true)}
        >
          Add
        </button>
      </div>
      <div>
        {modal && (
          <AddTodoModal setModal={setModal} setRefreshList={setRefreshList} />
        )}
      </div>
    </>
  );
};

export default Home;
