import { useEffect, useState } from "react";
import useAxios from "../../hooks/UseAxios";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllUsers = () => {
  const axiosInstace = useAxios();
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axiosInstace.get("/users").then((data) => {
      console.log(data);
      setUsers(data.data);
    });
  }, [axiosInstace, toggle]);

  const deleteUserFunc = async (id) => {
    await axiosInstace.delete(`/users/delete/${id}`);
    setToggle(!toggle);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (userId) {
      axiosInstace
        .patch(`/update/user/${userId}`, data)
        .then(() => {
          setToggle(!toggle);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.photo} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <FaEdit></FaEdit>
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body"
                      >
                        <div className="form-control ">
                          <label className="label">
                            <span className="label-text">Name</span>
                          </label>
                          <input
                            defaultValue={user?.name}
                            type="text"
                            placeholder="Enter Your Name"
                            {...register("name")}
                            className="input input-bordered"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Photo URL</span>
                          </label>
                          <input
                            defaultValue={user?.photo}
                            {...register("photo")}
                            type="text"
                            placeholder="Enter Your photo URL"
                            className="input input-bordered"
                            required
                          />
                        </div>
                        <div className="form-control mt-6 ">
                          <button
                            onClick={() => setUserId(user?._id)}
                            className="btn bg-[#f0d345] hover:bg-[#e7cb3c]"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
                <th>
                  <button
                    className="btn"
                    onClick={() => deleteUserFunc(user?._id)}
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
