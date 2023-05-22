import "./Subcategory.css";
import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createSubcategoryOption, deletesubcategoryoption, newSubCategory, deleteSubCategory } from "../../../redux/store/actions/subCategoryAction";

export default function Subcategory() {
  const subcategory = useSelector(state => state.subcategory);
  const { subCategories, subCategoriesLoaded } = subcategory;
  const dispatch = useDispatch();

  const [subcategoryName, setSubcategoryName] = useState("");
  const [option, setOption] = useState("");

  const createSubCategory = () => {
    if (subcategoryName === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must enter a subcategory name!",
      });
    } else {

      dispatch(newSubCategory(subcategoryName)).
        then(() => {
          setSubcategoryName("");
          Swal.fire({
            icon: "success",
            title: "Subcategory created!",
            text: "You can now add products to this subcategory.",
          });
        }).catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  }

  const handleNewOption = (id) => {
    if (option === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must enter a option name!",
      });
    } else {
      dispatch(createSubcategoryOption(id, option)).
        then(() => {
          setOption("");
          Swal.fire({
            icon: "success",
            title: "Option created!",
            text: "You can now add products to this option.",
          });
        }).catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  }

  const deleteSubCategoryOtions = (id, optionId) => {
    try {
      dispatch(deletesubcategoryoption(id, optionId)).
        then(() => {
          Swal.fire({
            icon: "success",
            title: "Option deleted!",
            text: "You can now add products to this option.",
          });
        })
    }
    catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  const DeleteSubCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteSubCategory(id)).
          then(() => {
            Swal.fire({
              icon: "success",
              title: "Subcategory deleted!",
              text: "Category deleted.",
            });
          }).catch(err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  }





  console.log("subcategory", subcategory);
  return (
    <div className="admin-subCategories">
      <div className="title-adminsite">
        <h2>SubCategory</h2>
      </div>
      <div className="admin-categories-options">
        <div className="admin-categories-option-title">
          <h3>New SubCategory</h3>
          <div className="admin-categories-inside">
            <p>Name: </p>
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
            />
            <button
              onClick={() => createSubCategory()}
            >Create</button>
          </div>
        </div>
        <div className="admin-categories-exist">
          <h3>Sub Categories</h3>
          {subCategoriesLoaded ? subCategories.length > 0 ? (
            subCategories.map((subcategory, index) => (
              <div className="admin-sub-categorie-map" key={index}>
                {subcategory.name}
                <div><input
                  type="text"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                />
                  <button
                    onClick={() => handleNewOption(subcategory._id)}
                  >add option</button></div>

                {subcategory.options.map((option) => (
                  <>
                    <div className="subcategorie-options" key={option._id}>
                      <div
                        onClick={() => deleteSubCategoryOtions(subcategory._id, option._id)}
                        className="subcategorie-option-delete"
                      >X
                      </div>
                      {option.name}
                    </div>


                  </>
                ))}
                <div
                  onClick={() => DeleteSubCategory(subcategory._id)}
                  className="subcategorie-delete">
                  <MdDeleteForever className="dasboard-icon" />
                </div>
              </div>
            ))
          ) : (
            <div className="admin-categories-loading">
              <p>No subcategories yet...</p>
            </div>
          ) : (
            <div className="admin-categories-loading">
              <h2>Loading...</h2>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
