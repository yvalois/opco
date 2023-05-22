import "./AdminCategories.css";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  deleteCategory,
  newCategory,
} from "../../../redux/store/actions/categoryAction";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";

const AdminCategories = () => {
  const category = useSelector((state) => state.category);
  const { categories, categoriesLoaded, loading } = category;
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  const handleNewCategory = () => {
    if (categoryName !== "") {
      try {
      dispatch(newCategory(categoryName));
      setCategoryName("");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "New category has been added",
      });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error creating category",
        });
      }

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter category name",
      });
    }
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };



  return (
    <div className="admin-categories">
      <Loader isLoading={loading} />
      <div className="title-adminsite">
        <h2>Category</h2>
      </div>
      <div className="admin-categories-options">
        <div className="admin-categories-option-title">
          <h3>New Category</h3>
          <div className="admin-categories-inside">
            <p>Name: </p>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button onClick={handleNewCategory}>Create</button>
          </div>
        </div>
        <div className="admin-categories-exist">
          <h3>Categories</h3>
          {categoriesLoaded ? (
            <>
              {categories.map((category, index) => (
                <div className="admin-categorie-map" key={index}>
                  <div className="admin-categories-bubble">
                    <p>{index}</p>
                    <p>Name: {category.name}</p>
                    <div onClick={() => handleDeleteCategory(category._id)}>
                      <MdDeleteForever className="dasboard-icon" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="admin-categories-loading">
              <h2>Loading...</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
