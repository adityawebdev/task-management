import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTodoApi } from "../../services/api";
const AddTodoModal = ({ setModal, setRefreshList }) => {
  const [taskDesc, setTaskDesc] = useState(" ");
  const handleTaskSubmit = async () => {
    console.log(taskDesc, "taskDesc");
    setModal(false);

    if (taskDesc === "") {
      toast("Task is required");
      return;
    }
    const result = await createTodoApi({ desc: taskDesc });
    console.log(result);
    if (result.status === 200 && result.data.status === 200) {
      toast("Task Added");
      setRefreshList(new Date());
    } else {
      toast(result.data.message);
    }
  };

  return (
    <main class="flex flex-col items-center justify-center h-full w-full absolute z-100 -top-20">
      <ToastContainer />
      <transition name="fade-up-down">
        <div
          v-show="show_modal"
          class="modal-wrapper inline-block flex items-center z-30"
        >
          <div class="modal max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-white max-h-screen shadow-lg flex-row rounded relative">
            <div class="modal-header p-5 bg-gray-900 text-gray-900 rounded-t">
              <h5 class="text-white text-2xl uppercase">Add Task</h5>
            </div>
            <div class="modal-body p-5  h-full overflow-y-auto ">
              <textarea
                rows={6}
                onChange={(e) => setTaskDesc(e.target.value)}
                cols={50}
                placeholder="Write task here ..."
                class="border-black"
              ></textarea>
            </div>
            <div class="modal-footer py-3 px-5 border0-t text-right">
              <button
                class="bg-green-500 px-5 py-2 text-white"
                onClick={handleTaskSubmit}
              >
                Save
              </button>
              <button
                class="bg-green-500 px-5 py-2 text-white"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>
    </main>
  );
};

export default AddTodoModal;
