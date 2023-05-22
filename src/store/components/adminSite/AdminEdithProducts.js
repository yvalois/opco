import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { editProducts } from "../../../redux/store/actions/productActions";
import "./AdminEdithProducts.css";
import Swal from "sweetalert2";


const AdminEdithProducts = () => {
  const dispatch = useDispatch();
  const Products = useSelector(state => state.product);
  const category = useSelector(state => state.category);
  const subCategory = useSelector(state => state.subcategory);
  const { initialLoad, products, loading } = Products;
  const [productFind, setProductFind] = useState(false);
  const { categories, categoriesLoaded } = category;
  const { subCategories, subCategoriesLoaded } = subCategory;
  const [product, setProduct] = useState({});




  const { id } = useParams();

  useEffect(() => {
    if (!productFind) {
      if (!initialLoad) {
        const Product = products.find((p) => p._id === id);
        setProduct({ ...Product, newImg: "" });
        setProductFind(true);
      }
    }
  }, [initialLoad]);

  const handleChange = (e) => {
    e.preventDefault();

    dispatch(editProducts(product, id));
    Swal.fire({
      title: "Success",
      text: "Product has been updated",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }



  return (
    <div className="admin-edith-products">
      <Loader isLoading={loading} />
      <div className="title-adminsite">
        <h2>Edit</h2>
      </div>
      {!productFind ?
        <div className="loading-products">
          <h2>Loading...</h2>
        </div>
        :
        <form className="edit-product-form"
          onSubmit={(e) => { handleChange(e) }}
        >
          <div className="edit-top-products-detail">
            <div className="inputs-flex-colum">
              <p>Name: </p>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })}
              />
            </div>
            <div className="inputs-flex-colum">
              <p>Price: </p>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })}
              />
            </div>
            <div className="inputs-flex-colum">
              <p>stock: </p>
              <input
                type="number"
                value={product.countInStock}
                onChange={(e) =>
                  setProduct({ ...product, countInStock: e.target.value })}
              />
            </div>
            <div className="inputs-flex-colum">
              <p>discount: </p>
              <input
                type="number"
                value={product.discount}
                onChange={(e) =>
                  setProduct({ ...product, discount: e.target.value })}
              />
            </div>

          </div>
          <div>
            <div className="edit-category-admin-product">
              <p>Category: </p>
              <select
                value={product.categorieId._id}
                onChange={(e) =>
                  setProduct({ ...product, categorieId: e.target.value })}
              >
                <option value={product.categorieId._id}>{product.categorieId.name}</option>
                {categoriesLoaded &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}

              </select>
            </div>
            <div className="edit-category-admin-product">
              <p>Sub category: </p>
              <select
                value={product.subCategoryId._id}
                onChange={(e) =>
                  setProduct({ ...product, subCategoryId: e.target.value })}
              >
                <option value={product.subCategoryId._id}>{product.subCategoryId.name}</option>
                {subCategoriesLoaded &&
                  subCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}

              </select>
            </div>
          </div>
          <div className="admin-edit-description">
            <p>Description: </p>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })}
            />
          </div>
          <div className="edit-body-products-detail">

            <div className="edit-image-select-product">
              <p>Image:</p>
              {product.newImg !== "" ?
                <img src={product.newImg} alt="product" />
                :
                <img src={product.imageUrl.url} alt="product" />

              }
            </div>
            <div>
              <input
                type="file"
                onChange={(e) =>
                  convertImageToBase64(e.target.files[0]).then((base64) =>
                    setProduct({ ...product, newImg: base64 }))}
              />

            </div>
          </div>

          <div className="edit-submits-inputs">
            <input
              type="submit"
              className="edit-submit-save"
              value="Save"
            />
          </div>
        </form>
      }
    </div>
  );
};

export default AdminEdithProducts;
