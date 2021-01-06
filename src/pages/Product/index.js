import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { RiHandbagLine, RiFileWarningFill } from "react-icons/ri";
import { RiAddLine, RiDeleteBin6Fill } from "react-icons/ri";
import { Alert, Pagination, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Ui/Input";
import { BsSearch, BsCheckAll, BsPencil } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Link } from "react-router-dom";
import ModalM from "../../components/Ui/Modal";
import {
  clearValidasiProduct,
  deleteHistoryProduct,
  deleteProduct,
  getAllProduct,
  updateGrapichProduct,
  updateProduct,
} from "../../actions";
import { ImSpinner9 } from "react-icons/im";
import { VscWarning } from "react-icons/vsc";
import { BiImageAdd } from "react-icons/bi";
import { ImImages } from "react-icons/im";
import { baseUrlImage } from "../../configs/urlConfigs";
import { CountUp } from "use-count-up";

function Product(props) {
  const products = useSelector((state) => state.products);
  const category = useSelector((state) => state.category);
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
  const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
  const [dataDeleteDetail, setDataDeleteDetail] = useState([]);
  const [dataDetailUpdate, setDataDetailUpdate] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productId, setProductId] = useState("");
  const [showProductImage, setShowProductImage] = useState([]);
  const [showModalProductImage, setShowModalProductImage] = useState(false);
  const [
    showModalProductDescription,
    setShowModalProductDescription,
  ] = useState(false);
  const [productImage, setProductImage] = useState([]);
  const [productDescription, setProductDescription] = useState("");

  const [topQtyProduct, setTopQtyProduct] = useState([]);
  const [lowQtyProduct, setLowQtyProduct] = useState([]);
  const [topPriceProduct, setTopPriceProduct] = useState([]);

  const pages = new Array(products.totalData).fill(null).map((v, i) => i);

  const data = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
    },
    {
      name: "Page E",
      uv: 1890,
    },
    {
      name: "Page F",
      uv: 2390,
    },
    {
      name: "Page G",
      uv: 3490,
    },
  ];

  const productsTotalMax = (products, data = []) => {
    for (let product of products) {
      if (product.quantity > 0) {
        data.push({ Nama: product.name, Jumlah: product.quantity });
      }
    }
    const sh = data.sort((a, b) => b.Jumlah - a.Jumlah);
    const sp = sh.slice(0, 7);
    const random = sp.sort(() => 0.5 - Math.random());

    return random;
  };

  const productsTotalLow = (products, data = []) => {
    for (let product of products) {
      if (product.quantity > 0) {
        data.push({ Nama: product.name, Jumlah: product.quantity });
      }
    }
    const sh = data.sort((a, b) => a.Jumlah - b.Jumlah);
    const sp = sh.slice(0, 7);
    const random = sp.sort(() => 0.5 - Math.random());

    return random;
  };

  const productsPriceMax = (products, data = []) => {
    for (let product of products) {
      data.push({ Nama: product.name, Harga: product.price });
    }
    const sh = data.sort((a, b) => b.Harga - a.Harga);
    const sp = sh.slice(0, 7);
    const random = sp.sort(() => 0.5 - Math.random());

    return random;
  };

  useEffect(() => {
    if (products.error || products.message) {
      setTimeout(() => {
        dispatch(clearValidasiProduct());
      }, 3000);
    }

    if (topQtyProduct.length == 0) {
      setTopQtyProduct(productsTotalMax(products.products));
    }

    if (lowQtyProduct.length == 0) {
      setLowQtyProduct(productsTotalLow(products.products));
    }

    if (topPriceProduct.length == 0) {
      setTopPriceProduct(productsPriceMax(products.products));
    }

    if (products.updateGrapich) {
      setTopPriceProduct([]);
      setLowQtyProduct([]);
      setTopQtyProduct([]);
    }

    if (products.updateGrapich) {
      setTimeout(() => {
        dispatch(updateGrapichProduct());
      }, 100);
    }
  }, [products]);

  useEffect(() => {
    if (products.productHistory.length > 10) {
      const id = [];
      const removeHistory = products.productHistory.slice(
        10,
        products.productHistory.length
      );
      removeHistory.map((item) => {
        id.push({ id: item._id });
      });

      dispatch(deleteHistoryProduct(id));
    }
  }, [products.productHistory]);

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

  const renderModalDeleteProduct = () => {
    return (
      <ModalM
        show={showModalDeleteProduct}
        onHide={() => setShowModalDeleteProduct(false)}
        title={"Konfirmasi"}
        bgColor={darkMode ? "#84142d" : "#dc3545"}
        textButton="Hapus"
        onClick={handleClickDelete}
        icon={<RiDeleteBin6Fill className="icon-modal-button" />}
      >
        <h4>Apakah yakin ingin menghapus product {dataDeleteDetail.name}?</h4>
      </ModalM>
    );
  };

  const handleDeleteProduct = (e, productId) => {
    e.preventDefault();

    // const dataArray = [];
    const productDetail = products.products.find(
      (item, i) => item._id == productId
    );
    productDetail && setDataDeleteDetail(productDetail);

    console.log(productDetail);

    setShowModalDeleteProduct(true);
  };

  const handleClickDelete = (e) => {
    e.preventDefault();

    const data = {
      productId: dataDeleteDetail._id,
    };

    dispatch(deleteProduct(data));
    setShowModalDeleteProduct(false);
  };

  const renderModalUpdateProduct = () => {
    return (
      <ModalM
        show={showModalUpdateProduct}
        onHide={() => setShowModalUpdateProduct(false)}
        title="Ubah Produk"
        bgColor={darkMode ? "#055e68" : "#17a2b8"}
        textButton="Ubah"
        icon={<MdUpdate className="icon-modal-button" />}
        size="lg"
        onClick={toUpdateProduct}
      >
        <div>
          <Input
            type="text"
            label="Nama Produk"
            className="input-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Kategori Produk</label>
          <select
            className="form-control input-all mb-3"
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

          <Input
            type="number"
            label="Harga Produk"
            className="input-all"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            type="number"
            label="Jumlah Produk"
            className="input-all"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <label>Deskripsi Produk</label>
          <textarea
            style={{ height: "300px" }}
            className="form-control input-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {showProductImage.length > 0 &&
            showProductImage.map((item, i) => (
              <p className="render-image-name" key={i}>
                {item.image}
              </p>
            ))}

          {productPictures.length > 0 &&
            productPictures.map((item, i) => (
              <p className="render-image-name" key={i}>
                {item.name}
              </p>
            ))}

          <div className="input-type-file mt-3">
            <input
              type="file"
              name="image"
              id="productImage"
              onChange={handleChangeImage}
            />
            <label htmlFor="productImage" className="label-for-file">
              <BiImageAdd className="input-file-icon" />
              Gambar
            </label>
          </div>
        </div>
      </ModalM>
    );
  };

  const handleUpdateProduct = (e, productId) => {
    e.preventDefault();

    const productsArray = products.products;

    const dataDetail = productsArray.find((c, i) => c._id == productId);
    setName(dataDetail.name);
    if (dataDetail.category) {
      setCategoryId(dataDetail.category._id);
    } else {
      setCategoryId("");
    }
    setPrice(dataDetail.price);
    setQuantity(dataDetail.quantity);
    setDescription(dataDetail.description);
    setProductId(productId);

    // dataDetail.productPictures.map(item => {
    //     setProductPictures([...productPictures, item])
    // })

    setShowProductImage(dataDetail.productPictures);

    setShowModalUpdateProduct(true);
  };

  const handleChangeImage = (e) => {
    console.log(productPictures);
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const toUpdateProduct = () => {
    const form = new FormData();

    form.append("_id", productId);
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("category", categoryId);
    form.append("description", description);

    if (productPictures.length > 0) {
      productPictures.map((img) => {
        form.append("image", img);
      });
    }

    dispatch(updateProduct(form));

    setShowModalUpdateProduct(false);
  };

  const activePage = products.currentPage - 1;
  const handlePagination = (e, number) => {
    e.preventDefault();
    const searchi = {
      search: search,
    };

    dispatch(getAllProduct(number + 1, searchi));
  };

  const handleCangeSearch = (e) => {
    const searchi = {
      search: search,
    };

    if (search.length > 0) {
      dispatch(getAllProduct(1, searchi, true));
    } else {
      dispatch(getAllProduct(1, searchi, true));
    }
  };

  const renderModalProductImage = () => {
    return (
      <ModalM
        show={showModalProductImage}
        onHide={() => setShowModalProductImage(false)}
        title="Gambar"
        bgColor="#097efa"
        nonButton
      >
        <div
          className={
            darkMode
              ? "box-product-table-image bg-content-dark-mode"
              : "box-product-table-image"
          }
        >
          {productImage.length > 0 ? (
            productImage.map((img, i) => (
              <div key={i} className="product-table-image">
                <img src={baseUrlImage(img.image)} alt="" />
              </div>
            ))
          ) : (
            <>
              <p className="d-flex align-items-center">
                <RiFileWarningFill /> Tidak Ada Gambar
              </p>
            </>
          )}
        </div>
      </ModalM>
    );
  };

  const handleModalProductImage = (e, _id) => {
    setShowModalProductImage(true);

    const gambar = products.products.find((c) => c._id == _id).productPictures;
    setProductImage(gambar);
  };

  const renderModalProductDescription = () => {
    return (
      <ModalM
        show={showModalProductDescription}
        onHide={() => setShowModalProductDescription(false)}
        bgColor="#fd7e14"
        nonButton
        title="Deskripsi"
        size="lg"
      >
        <p>{productDescription}</p>
      </ModalM>
    );
  };

  const handleModalProductDescription = (e, _id) => {
    setShowModalProductDescription(true);
    const description = products.products.find((c) => c._id == _id).description;
    setProductDescription(description);
  };

  return (
    <Layout>
      {products.loading && !products.loadingSearch ? (
        <div className="loading-2">
          <ImSpinner9 className="loading-2-icon" />
        </div>
      ) : null}
      <div className="container-layout product">
        <div
          className={
            darkMode
              ? "container-layout-header bg-content-dark-mode"
              : "container-layout-header"
          }
        >
          <div className="container-layout-header-logo">
            <div
              className={
                darkMode
                  ? "bg-content-orange-dark-mode container-layout-header-icon "
                  : "container-layout-header-icon "
              }
            >
              <RiHandbagLine className="container-layout-logo-icon" />
            </div>
            <h2>Produk</h2>
          </div>

          <div className="container-layout-header-action ">
            <Link
              to="/produk/tambah"
              style={{ textDecoration: "none" }}
              className={
                darkMode
                  ? "container-layout-header-box-action container-layout-add bg-add-dark-mode"
                  : "container-layout-header-box-action container-layout-add"
              }
            >
              <RiAddLine className="container-layout-header-action-icon" />
              <p
                style={{ padding: 0, margin: 0 }}
                className="container-layout-header-action-title"
              >
                Tambah
              </p>
            </Link>
          </div>
        </div>

        <div className="product-main">
          <div className="product-main-wrapper ">
            <div className="product-main-left">
              <div
                className={
                  darkMode
                    ? "product-main-left-quantity bg-content-dark-mode"
                    : "product-main-left-quantity"
                }
              >
                <div className="product-main-left-count">
                  <div
                    className={
                      darkMode
                        ? "product-count-circle border-color-orange-dark-mode"
                        : "product-count-circle"
                    }
                  >
                    <h1 className={darkMode ? "text-color-dark-mode" : ""}>
                      <CountUp
                        isCounting
                        end={products.productsLength && products.productsLength}
                        duration={3.3}
                      />
                    </h1>
                  </div>
                  <h4 className={darkMode ? "text-color-dark-mode" : ""}>
                    Jumlah Produk
                  </h4>
                </div>
                <div className="product-count-top">
                  <BarChart width={150} height={70} data={data}>
                    <Bar dataKey="uv" fill={darkMode ? "white" : "#0F66BD"} />
                    <Tooltip />
                  </BarChart>
                  <h4 className={darkMode ? "text-color-dark-mode" : ""}>
                    Produk Terlaris
                  </h4>
                </div>
              </div>

              {productsPriceMax(products.products).length > 0 ? (
                <div
                  className={
                    darkMode
                      ? "product-main-left-grapich bg-content-dark-mode"
                      : "product-main-left-grapich"
                  }
                >
                  <h4
                    className="grapich-title"
                    style={{ marginBottom: "15px" }}
                  >
                    Harga Produk Termahal
                  </h4>
                  <LineChart
                    className="grapich"
                    width={530}
                    height={250}
                    data={topPriceProduct}
                    margin={{
                      top: 5,
                      right: 40,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Nama" />
                    <YAxis />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="Harga"
                      stroke={darkMode ? "#e16428" : "#0F66BD"}
                    />
                  </LineChart>
                </div>
              ) : null}
            </div>
            <div className="product-main-right">
              <div
                className={
                  darkMode
                    ? "product-main-right-quatity-max bg-content-dark-mode"
                    : "product-main-right-quatity-max"
                }
              >
                {productsTotalMax(products.products).length > 0 ? (
                  <>
                    <h4
                      className="grapich-title"
                      style={{ marginBottom: "15px" }}
                    >
                      Jumlah Produk Terbanyak
                    </h4>
                    <BarChart
                      className="grapich"
                      width={500}
                      height={250}
                      data={topQtyProduct}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={20}
                    >
                      <XAxis
                        dataKey="Nama"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar
                        dataKey="Jumlah"
                        fill={darkMode ? "#e16428" : "#0F66BD"}
                        background={{ fill: "#eee" }}
                      />
                    </BarChart>
                  </>
                ) : (
                  <Alert style={{ width: "100%" }} variant="danger">
                    <VscWarning className="message-validasi-icon" /> Produk
                    Kosong
                  </Alert>
                )}
              </div>

              {productsTotalLow(products.products).length > 0 ? (
                <div
                  className={
                    darkMode
                      ? "product-main-right-quatity-low bg-content-dark-mode"
                      : "product-main-right-quatity-low"
                  }
                >
                  <h4
                    className="grapich-title"
                    style={{ marginBottom: "15px" }}
                  >
                    Produk Hampir Habis
                  </h4>
                  <BarChart
                    className="grapich"
                    width={500}
                    height={250}
                    data={lowQtyProduct}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <XAxis
                      dataKey="Nama"
                      scale="point"
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar
                      dataKey="Jumlah"
                      fill={darkMode ? "#e16428" : "#0F66BD"}
                      background={{ fill: "#eee" }}
                    />
                  </BarChart>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {products.products.length > 0 ? (
          <div
            className={
              darkMode
                ? "table-data-product bg-content-dark-mode"
                : "table-data-product"
            }
          >
            <div className="table-data-product-header">
              <h3 className="grapich-title">Produk Detail</h3>
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleCangeSearch}
                placeholder="Cari Nama Product....."
                className={
                  darkMode
                    ? "input-all-dark-mode input-search-product"
                    : "input-all input-search-product"
                }
                iconleft={<BsSearch className="iconLeft" />}
                style={{ paddingLeft: "40px" }}
              />
            </div>

            {products.loadingSearch ? null : category.categoryData.length >
              0 ? (
              <div className="category-pagination-main mt-3">
                {pages.map((number) => (
                  // <button key={number} className={ activePage == number ? 'category-pagination active' : 'category-pagination'} onClick={(e) => handlePagination(e, number)}>{number+1}</button>
                  <Pagination.Item
                    onClick={(e) => handlePagination(e, number)}
                    key={number}
                    active={number === activePage}
                    className="category-pagination"
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
              </div>
            ) : null}

            {products.loadingSearch ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "171px" }}
              >
                <div>
                  <ImSpinner9 className="loading loading-md mr-2" />
                  Mencari.....
                </div>
              </div>
            ) : products.productsS && products.productsS.length > 0 ? (
              <Table striped bordered responsive="lg" className="table-data">
                <thead>
                  <tr className={darkMode ? "text-color-dark-mode" : ""}>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Slug</th>
                    <th>Gambar</th>
                    <th>Jumlah</th>
                    <th>Harga</th>
                    <th>Deskripsi</th>
                    <th>Category</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.productsS &&
                    products.productsS.map((item, i) => (
                      <tr
                        key={item._id}
                        className={darkMode ? "link-color-dark-mode" : ""}
                      >
                        <td>{i + 1 + 10 * (products.currentPage - 1)}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>
                          <ImImages
                            className="table-data-icon icon-table-image"
                            onClick={(e) =>
                              handleModalProductImage(e, item._id)
                            }
                          />
                        </td>
                        <td>{item.quantity}</td>
                        <td>Rp.{item.price}</td>
                        <td>
                          <BsPencil
                            className="table-data-icon icon-table-description"
                            onClick={(e) =>
                              handleModalProductDescription(e, item._id)
                            }
                          />
                        </td>
                        <td>
                          {item.category
                            ? item.category.name
                            : "Tidak Ada Kategori"}
                        </td>
                        <td className="td-action">
                          <button
                            onClick={(e) => handleUpdateProduct(e, item._id)}
                            className={
                              darkMode
                                ? "btn btn-sm container-layout-update btn-hover bg-update-dark-mode"
                                : "btn btn-sm container-layout-update btn-hover"
                            }
                          >
                            <MdUpdate /> Ubah
                          </button>
                          <button
                            onClick={(e) =>
                              handleDeleteProduct(e, item._id, item.name)
                            }
                            className={
                              darkMode
                                ? "btn btn-sm container-layout-delete btn-hover bg-delete-dark-mode"
                                : "btn btn-sm container-layout-delete btn-hover"
                            }
                          >
                            <RiDeleteBin6Fill /> Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <div className="product-notfound">
                <RiFileWarningFill className="product-notfound-icon" />
                <h2>Tidak Ditemukan!</h2>
              </div>
            )}
          </div>
        ) : null}

        <div
          className={
            darkMode
              ? "product-content-history bg-content-dark-mode"
              : "product-content-history"
          }
        >
          <h3 className="grapich-title">History</h3>
          <Table
            striped
            bordered
            hover
            size="sm"
            responsive="md"
            className="table-data"
          >
            <thead>
              <tr className="bg-dark text-white">
                <th>No.</th>
                <th>Oleh</th>
                <th>Nama Produk</th>
                <th>Status</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {products.productHistory &&
                products.productHistory.map((item, i) => {
                  if (item.status === "Diubah") {
                    return (
                      <tr
                        key={item._id}
                        className="text-white"
                        style={{
                          background: `${darkMode ? "#055e68" : "#20c997"}`,
                        }}
                      >
                        <td>{i + 1}</td>
                        <td>{item.author.fullName}</td>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>{item.time}</td>
                      </tr>
                    );
                  } else if (item.status === "Ditambahkan") {
                    return (
                      <tr
                        key={item._id}
                        className="text-white"
                        style={{
                          background: `${darkMode ? "#22267b" : "#007bff"}`,
                        }}
                      >
                        <td>{i + 1}</td>
                        <td>{item.author.fullName}</td>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>{item.time}</td>
                      </tr>
                    );
                  } else if (item.status === "Dihapus") {
                    return (
                      <tr
                        key={item._id}
                        className="text-white"
                        style={{
                          background: `${darkMode ? "#84142d" : "#dc3545"}`,
                        }}
                      >
                        <td>{i + 1}</td>
                        <td>{item.author.fullName}</td>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>{item.time}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </Table>
        </div>
      </div>

      {renderModalDeleteProduct()}
      {renderModalUpdateProduct()}
      {renderModalProductImage()}
      {renderModalProductDescription()}

      {products.message ? (
        <div className="message-validasi-success message-validasi">
          <div>
            <p className="message-validasi-text">
              <BsCheckAll className="message-validasi-icon" />{" "}
              {products.message}
            </p>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}

export default Product;
