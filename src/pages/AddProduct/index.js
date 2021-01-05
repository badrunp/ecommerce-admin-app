import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Ui/Input";
import "./style.css";
import { RiAddLine } from "react-icons/ri";
import { BiImageAdd } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearValidasiProduct } from "../../actions";
import { ImSpinner9 } from "react-icons/im";
import { VscWarning } from "react-icons/vsc";

function TambahProduct(props) {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.products);
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);

  const [lengthName, setLengthName] = useState(false);
  const [lengthPrice, setLengthPrice] = useState(false);
  const [lengthQuantity, setLengthQuantity] = useState(false);
  const [lengthCategoryId, setLengthCategoryId] = useState(false);
  const [lengthDescription, setLengthDescription] = useState(false);

  const renderOptionsCategory = (categories, option = []) => {
    for (let cate of categories) {
      option.push({
        value: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        type: cate.type,
      });

      if (cate.children.length > 0) {
        renderOptionsCategory(cate.children, option);
      }
    }
    return option;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("name", name);
    form.append("category", categoryId);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    productPictures.map((item, i) => {
      form.append("image", item);
    });

    if (name === "") {
      setLengthName(true);
    } else {
      setLengthName(false);
    }

    if (categoryId === "") {
      setLengthCategoryId(true);
    } else {
      setLengthCategoryId(false);
    }

    if (quantity == "") {
      setLengthQuantity(true);
    } else {
      setLengthQuantity(false);
    }

    if (price == "") {
      setLengthPrice(true);
    } else {
      setLengthPrice(false);
    }

    if (description === "") {
      setLengthDescription(true);
    } else {
      setLengthDescription(false);
    }

    if (
      name == "" ||
      categoryId == "" ||
      quantity == "" ||
      price == "" ||
      description == ""
    ) {
      return;
    } else {
      dispatch(addProduct(form));
    }
  };

  const handleChangeImage = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  useEffect(() => {
    if (product.error || product.message) {
      setTimeout(() => {
        dispatch(clearValidasiProduct());
      }, 3000);
    }

    if (product.message) {
      return props.history.push("/produk");
    }
  }, [product]);

  return (
    <>
      <Layout>
        {product.loading ? (
          <div className="loading-2">
            <ImSpinner9 className="loading-2-icon" />
          </div>
        ) : null}

        <div className="product-add">
          <div
            className={
              darkMode
                ? "product-add-main bg-content-dark-mode"
                : "product-add-main"
            }
          >
            <div
              className={
                darkMode
                  ? "product-add-title border-color-dark-mode bg-add-dark-mode"
                  : "product-add-title"
              }
            >
              <h2>Tambah Produk</h2>
            </div>
            <div className="product-add-form">
              <div>
                <Input
                  type="text"
                  label="Nama Produk"
                  className={
                    lengthName
                      ? `${
                          darkMode
                            ? "input-all is-invalid-input input-all-dark-mode"
                            : "input-all is-invalid-input"
                        }`
                      : `${darkMode ? "input-all-dark-mode" : "input-all"}`
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {lengthName ? (
                  <div
                    style={{ display: "block", margin: "-7px 0 10px 0" }}
                    className="invalid-feedback"
                  >
                    Tidak boleh kosong!
                  </div>
                ) : null}

                <label>Kategori Produk</label>
                <select
                  className={
                    lengthCategoryId
                      ? `${
                          darkMode
                            ? "form-control input-all-dark-mode mb-3 is-invalid-input"
                            : "form-control input-all mb-3 is-invalid-input"
                        }`
                      : `${
                          darkMode
                            ? "form-control input-all-dark-mode mb-3"
                            : "form-control input-all mb-3"
                        }`
                  }
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Pilih Kategori</option>

                  {renderOptionsCategory(category.categories).map((item, i) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>

                {lengthCategoryId ? (
                  <div
                    style={{ display: "block", margin: "-7px 0 10px 0" }}
                    className="invalid-feedback"
                  >
                    Tidak boleh kosong!
                  </div>
                ) : null}

                <Input
                  type="number"
                  label="Harga Produk"
                  className={
                    lengthPrice
                      ? `${
                          darkMode
                            ? "input-all is-invalid-input input-all-dark-mode"
                            : "input-all is-invalid-input"
                        }`
                      : `${darkMode ? "input-all-dark-mode" : "input-all"}`
                  }
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {lengthPrice ? (
                  <div
                    style={{ display: "block", margin: "-7px 0 10px 0" }}
                    className="invalid-feedback"
                  >
                    Tidak boleh kosong!
                  </div>
                ) : null}

                <Input
                  type="number"
                  label="Jumlah Produk"
                  className={
                    lengthQuantity
                      ? `${
                          darkMode
                            ? "input-all is-invalid-input input-all-dark-mode"
                            : "input-all is-invalid-input"
                        }`
                      : `${darkMode ? "input-all-dark-mode" : "input-all"}`
                  }
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {lengthQuantity ? (
                  <div
                    style={{ display: "block", margin: "-7px 0 10px 0" }}
                    className="invalid-feedback"
                  >
                    Tidak boleh kosong!
                  </div>
                ) : null}

                <label>Deskripsi Produk</label>
                <textarea
                  className={
                    lengthDescription
                      ? `${
                          darkMode
                            ? "form-control input-all-dark-mode is-invalid-input"
                            : "form-control input-all is-invalid-input"
                        }`
                      : `${
                          darkMode
                            ? "form-control input-all-dark-mode"
                            : "form-control input-all"
                        }`
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {lengthDescription ? (
                  <div
                    style={{ display: "block", margin: "10px 0 10px 0" }}
                    className="invalid-feedback mt-1"
                  >
                    Tidak boleh kosong!
                  </div>
                ) : null}

                {productPictures.length > 0 &&
                  productPictures.map((item, i) => (
                    <p className="render-image-name" key={i}>
                      {item.name}
                    </p>
                  ))}

                <div className="input-type-file mt-4">
                  <input
                    type="file"
                    name="image"
                    id="productImage"
                    onChange={handleChangeImage}
                  />
                  <label
                    htmlFor="productImage"
                    className="label-for-file btn-hover"
                  >
                    <BiImageAdd className="input-file-icon" />
                    Gambar
                  </label>
                </div>

                <div className="button-form-add-produk mt-2">
                  <motion.button
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={handleAddProduct}
                    className={
                      darkMode
                        ? "container-layout-header-box-action container-layout-add btn-hover bg-add-dark-mode"
                        : "container-layout-header-box-action container-layout-add btn-hover"
                    }
                  >
                    <RiAddLine className="container-layout-header-action-icon" />
                    <p
                      style={{ padding: 0, margin: 0 }}
                      className="container-layout-header-action-title"
                    >
                      Tambah
                    </p>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {product.error ? (
          <div className="message-validasi-error message-validasi">
            <div>
              <p className="message-validasi-text">
                <VscWarning className="message-validasi-icon" /> {product.error}
              </p>
            </div>
          </div>
        ) : null}
      </Layout>
    </>
  );
}

export default TambahProduct;
