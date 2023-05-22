import "./Adminproducts.css";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProducts, fetchNewProduct } from "../../../redux/store/actions/productActions";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";

const Adminproducts = () => {
  const navigate = useNavigate();
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const subcategory = useSelector((state) => state.subcategory);
  const { products, initialLoad, loading } = product;
  const { categories, categoriesLoaded } = category;
  const { subCategories, subCategoriesLoaded } = subcategory;




  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: "",
    imageToCharge: "",
    category: "",
    subcategory: "",
    discount: 0
  });

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("countInStock", newProduct.countInStock);
    formData.append("imageUrl", newProduct.imageToCharge);
    formData.append("category", newProduct.category);
    //if value "" alert 
    if (newProduct.name === "" || newProduct.price === "" || newProduct.description === "" || newProduct.countInStock === "" || newProduct.imageToCharge === "" || newProduct.category === "", newProduct.subcategory === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields",
      });
      return;
    }
    try{
    dispatch(fetchNewProduct(newProduct));
    setNewProduct({
      name: "",
      price: "",
      description: "",
      countInStock: "",
      imageToCharge: "",
      category: "",
      subcategory: "",
      discount: 0
    });
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Product has been added",
    });
    }catch(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });
    }

  }

  const navigateToDetails = (id) => {
    navigate(`/store/admin/products/${id}`);
  }




  return (
    <div className="admin-product-container">
      <Loader isLoading={loading} />
      <div className="title-adminsite">
        <h2>Products</h2>
      </div>
      <div className="admin-products-option">
        <div className="admin-products-new">
          <h3>New Products</h3>
          <div className="admin-products-detail">

            <form onSubmit={handleSubmit}>
              <div className="top-products-detail">
                <div className="inputs-flex-colum">
                  <p>Name: </p>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="inputs-flex-colum">
                  <p>Price: </p>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div className="inputs-flex-colum">
                  <p>stock: </p>
                  <input
                    type="number"
                    value={newProduct.countInStock}
                    onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
                  />
                </div >

              </div>
              <div className="body-products-detail">
                <p>Description: </p>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />

              </div>
              <div className="body-products-detail">

                <div className="image-select-product ">

                  {newProduct.imageToCharge !== "" &&
                    <div className="image-product-selected">
                      <div
                        className="image-product-selected-close"
                        onClick={() => setNewProduct({ ...newProduct, imageToCharge: "" })}
                      >X</div>
                      <img src={newProduct.imageToCharge} alt="selected-image" />
                    </div>
                  }

                  {newProduct.imageToCharge === "" &&
                    <>
                      <input
                        className="input-select-product"
                        id="file-upload"
                        type="file"
                        onChange={(e) => {
                          convertImageToBase64(e.target.files[0]).then((image) => {
                            setNewProduct({ ...newProduct, imageToCharge: image });
                          })
                        }}
                      />
                      <label className="custom-input-button" htmlFor="file-upload"> choose image </label>
                    </>
                  }

       
                </div>
                <div className="category-admin-product">
                 
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}

                    >
                      <option value="">Category...</option>
                      {categoriesLoaded &&
                        categories.map((category, index) => (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="category-admin-product">
                 
                    <select
                      value={newProduct.subcategory}
                      onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}

                    >
                      <option value="">SubCategory...</option>
                      {subCategoriesLoaded &&
                        subCategories.map((subcategory, index) => (
                          <option key={index} value={subcategory._id}>
                            {subcategory.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    discount:
                    <input 
                    type="number" 
                    placeholder="Discount" 
                    value={newProduct.discount}
                    onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                    />
                  </div>
              </div>

              <div className="footer-product-detail">
                <input
                  type="submit"
                  className="button-admin-product-save"
                  value="Guardar"
                />

              </div>
            </form>
          </div>
        </div>
        <div className="admin-products-exist">
          <h3>Products</h3>
          {initialLoad === false ? (
            <>
              {products.map((item, index) => (
                <div className="admin-products-detail-old" key={index}>
                  <div className="top-products-detail">
                    <div className="old-detail-name">
                      <p>Name: </p>
                      {item.name}
                    </div>
                    <div>
                      <p>Price: </p>
                      {item.price}
                    </div>
                    <div className="category-admin-products">
                      <p>Categories: </p>
                      {item.categorieId.name}
                    </div>
                    <div>
                      <p>stock: </p>
                      {item.countInStock}
                    </div>
                    <div className="image-admin-products">
                      <img src={item.imageUrl.url} alt="" />
                    </div>
                    <div>
                      <button
                        onClick={() => navigateToDetails(item._id)}
                      >edit</button>
                      <button
                        onClick={() => dispatch(deleteProducts(item._id))}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  {/* <div className="body-products-detail">
                    <p>Descripcion: </p>
                    {item.description}
                  </div> */}
                  {/* <div className="products-detail-image">
                      <img src={item.imageUrl} alt="product" />
                    </div> */}


                </div>
              ))}
            </>
          ) : (
            <div className="admin-products-detail">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminproducts;
