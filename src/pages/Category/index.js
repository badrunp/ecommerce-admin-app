import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { TiFolderDelete } from "react-icons/ti";
import {
  MdSystemUpdateAlt,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ReactChecboxTree from "react-checkbox-tree";
import { FcFolder, FcFile } from "react-icons/fc";
import { RiFolderOpenFill } from "react-icons/ri";
import { IoIosCheckboxOutline, IoIosCheckbox } from "react-icons/io";
import Input from "../../components/Ui/Input";
import ModalM from "../../components/Ui/Modal";
import { BsPencil, BsCheckAll } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { RiFileWarningFill } from "react-icons/ri";
import { CgFolderAdd } from "react-icons/cg";
import { VscWarning } from "react-icons/vsc";
import {
  PieChart,
  Pie,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Alert, Col, Form, Pagination, Row, Table } from "react-bootstrap";
import { CountUp } from "use-count-up";
import { BiImageAdd } from "react-icons/bi";
import {
  addCategory,
  closeMessageValidasi,
  deleteAllCategory,
  deleteCategory,
  deleteHistoryCategory,
  getAllCategory,
  updateCategory,
  updateGrapich,
} from "../../actions";
import { ImSpinner9 } from "react-icons/im";
import { motion } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import _debounce from "lodash.debounce";

function Category() {
  const category = useSelector((state) => state.category);
  const { darkMode } = useSelector((state) => state.darkMode);
  const userSetting = useSelector((state) => state.userSetting);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const [expanded, setExpanded] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalRemoveAll, setModalRemoveAll] = useState(false);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryImage, setcategoryImage] = useState("");
  const [search, setSearch] = useState("");
  const [randomR, setRandomR] = useState([]);
  const [resize, setResize] = useState(386);

  const pages = new Array(category.totalPage).fill(null).map((v, i) => i);

  useEffect(() => {
    if (category.categoryHistory.length > 10) {
      const id = [];
      const removeHistory = category.categoryHistory.slice(
        10,
        category.categoryHistory.length
      );
      removeHistory.map((item) => {
        id.push({ id: item._id });
      });

      dispatch(deleteHistoryCategory(id));
    }

    if (category.updateGrapich) {
      setRandomR([]);
    }

    if (randomR.length === 0) {
      setRandomR(categoryTotalMax(category.categories));
    }

    if (category.error || category.message) {
      setTimeout(() => {
        dispatch(closeMessageValidasi());
      }, 3000);
    }
  }, [category]);

  useEffect(() => {
    if (containerRef.current) {
      const handleResize = _debounce(
        () => setResize(containerRef.current.offsetWidth),
        100
      );

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [setResize, resize]);

  const renderCategoryList = (categories) => {
    let myCategory = [];
    for (let item of categories) {
      myCategory.push({
        label: item.name,
        value: item._id,
        children: item.children.length > 0 && renderCategoryList(item.children),
      });
    }

    return myCategory;
  };

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

  const dataCategories = (categories, data = []) => {
    for (let cate of categories) {
      if (cate.children.length != 0) {
        data.push({
          name: cate.name,
          value: cate.children.length == 0 ? null : cate.children.length,
        });

        if (cate.children.length > 0) {
          dataCategories(cate.children, data);
        }
      }
    }
    return data;
  };

  const categoryTotalMax = (categories, data = []) => {
    for (let cate of categories) {
      data.push({
        name: cate.name,
        Jumlah: cate.children.length == 0 ? 0 : cate.children.length,
        Jumlah: cate.children.length == 0 ? 0 : cate.children.length,
      });

      if (cate.children.length > 0) {
        categoryTotalMax(cate.children, data);
      }
    }

    const sh = data.sort((a, b) => b.Jumlah - a.Jumlah);
    const ah = sh.filter((item) => item.Jumlah !== 0);
    const sp = ah.slice(0, 5);
    // const random = sp.sort(() => 0.5 - Math.random());

    return sp;
  };

  const addNewCategory = () => {
    const form = new FormData();

    form.append("name", name);
    form.append("parentId", parentId);
    form.append("image", categoryImage);

    dispatch(addCategory(form));

    setName("");
    setParentId("");
    setcategoryImage("");
    setModalAdd(false);
  };

  const handleCategoryImage = (e) => {
    console.log(e.target.files[0]);
    setcategoryImage(e.target.files[0]);
  };

  const clearInputName = () => {
    setName("");
  };

  const renderModalAddCategory = () => {
    return (
      <ModalM
        show={modalAdd}
        onHide={() => setModalAdd(false)}
        onClick={addNewCategory}
        icon={<CgFolderAdd className="icon-modal-button" />}
        title="Add Category"
        bgColor={darkMode ? "#22267b" : "#0F66BD"}
        textButton="Tambah"
      >
        <div className="row">
          <div className="col">
            <Input
              placeholder="Name Category"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={
                name.length > 0 ? (
                  <IoIosClose
                    onClick={clearInputName}
                    className="icon-input-clear"
                  />
                ) : null
              }
              style={{ padding: "20px 15px" }}
              className={darkMode ? "input-all-dark-mode" : "input-all"}
            />

            <select
              className={
                darkMode
                  ? "input-all-dark-mode form-control mb-3 select-all"
                  : "input-all form-control mb-3 select-all"
              }
              style={{ height: "45px" }}
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">Pilih Kategori</option>
              {renderOptionsCategory(category.categories).map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>

            <p>{categoryImage.name}</p>

            <div className="input-type-file">
              <input
                type="file"
                name="image"
                id="file"
                onChange={handleCategoryImage}
              />
              <label htmlFor="file" className="label-for-file">
                <BiImageAdd className="input-file-icon" />
                Gambar
              </label>
            </div>
          </div>
        </div>
      </ModalM>
    );
  };

  const renderModalRemoveCategory = () => {
    return (
      <ModalM
        onHide={() => setModalRemove(false)}
        show={modalRemove}
        onClick={removeCategory}
        bgColor={darkMode ? "#84142d" : "#dc3545"}
        title="Apakah kamu yakin?"
        textButton="Hapus"
        icon={<TiFolderDelete className="icon-modal-button" />}
      >
        <h4 style={{ margin: 0, padding: 0 }}>Kategori yang dipilih</h4>
        {checkedArray.map((item, i) => (
          <p key={i} style={{ margin: 0, padding: 0 }}>
            {i + 1}. {item.name}
          </p>
        ))}
      </ModalM>
    );
  };

  const handleCheckedExpanded = () => {
    const categories = renderOptionsCategory(category.categories);

    let expandedArray = [];
    let checkedArray = [];

    expanded.map((categoryId, i) => {
      const category = categories.find((item, i) => item.value === categoryId);
      category && expandedArray.push(category);
    });

    checked.map((categoryId, i) => {
      const category = categories.find((item, i) => item.value === categoryId);
      category && checkedArray.push(category);
    });

    setExpandedArray(expandedArray);
    setCheckedArray(checkedArray);

    console.log({ expandedArray, checkedArray });
  };

  const handleModalRemove = () => {
    handleCheckedExpanded();
    setModalRemove(true);
  };

  const removeCategory = () => {
    const checkedId = checkedArray.map((item, i) => ({ _id: item.value }));
    dispatch(deleteCategory(checkedId));

    setChecked([]);
    setModalRemove(false);
  };

  const renderModalUpdateCategory = () => {
    return (
      <ModalM
        show={modalUpdate}
        onHide={() => setModalUpdate(false)}
        title="Ubah Category"
        onClick={updateCategoryForm}
        bgColor={darkMode ? "#055e68" : "#17a2b8"}
        textButton="Ubah"
        icon={<MdSystemUpdateAlt className="icon-modal-button" />}
        size="lg"
      >
        <h4 style={{ margin: 0, padding: 0 }}>Expanded</h4>

        {expandedArray.length > 0 &&
          expandedArray.map((item, i) => (
            <Form className="mt-2" key={i}>
              <Row>
                <Col>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={item.name}
                    className="input-all"
                    onChange={(e) =>
                      handleCangeInput("name", e.target.value, i, "expanded")
                    }
                  />
                </Col>

                <Col>
                  <select
                    className="form-control input-all"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCangeInput(
                        "parentId",
                        e.target.value,
                        i,
                        "expanded"
                      )
                    }
                  >
                    <option value="">Pilih Kategori</option>
                    {renderOptionsCategory(category.categories).map((itemi) => (
                      <option key={itemi.value} value={itemi.value}>
                        {itemi.name}
                      </option>
                    ))}
                  </select>
                </Col>

                <Col>
                  <select
                    className="form-control input-all"
                    value={item.type}
                    onChange={(e) =>
                      handleCangeInput("type", e.target.value, i, "expanded")
                    }
                  >
                    <option value="">Pilih Tipe</option>
                    <option value="store">Store</option>
                    <option value="produk">Produk</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            </Form>
          ))}

        <h4 style={{ margin: 0, padding: 0 }}>Checked</h4>

        {checkedArray.length > 0 &&
          checkedArray.map((item, i) => (
            <Form className="mt-2" key={i}>
              <Row>
                <Col>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={item.name}
                    className={darkMode ? "input-all-dark-mode" : "input-all"}
                    onChange={(e) =>
                      handleCangeInput("name", e.target.value, i, "checked")
                    }
                  />
                </Col>

                <Col>
                  <select
                    className={
                      darkMode
                        ? "input-all-dark-mode form-control"
                        : "input-all form-control"
                    }
                    value={item.parentId}
                    onChange={(e) =>
                      handleCangeInput("parentId", e.target.value, i, "checked")
                    }
                  >
                    <option value="">Pilih Kategori</option>
                    {renderOptionsCategory(category.categories).map((itemi) => (
                      <option key={itemi.value} value={itemi.value}>
                        {itemi.name}
                      </option>
                    ))}
                  </select>
                </Col>

                <Col>
                  <select
                    className={
                      darkMode
                        ? "input-all-dark-mode form-control"
                        : "input-all form-control"
                    }
                    value={item.type}
                    onChange={(e) =>
                      handleCangeInput("type", e.target.value, i, "checked")
                    }
                  >
                    <option value="">Pilih Tipe</option>
                    <option value="store">Store</option>
                    <option value="produk">Produk</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            </Form>
          ))}
      </ModalM>
    );
  };

  const handleUpdateCategory = () => {
    handleCheckedExpanded();
    setModalUpdate(true);
  };

  const updateCategoryForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategory(form));
    setChecked([]);
    setModalUpdate(false);
  };

  const handleCangeInput = (key, value, index, type) => {
    if (type === "checked") {
      const updateCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updateCheckedArray);
    } else if (type === "expanded") {
      const updateExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updateExpandedArray);
    }
  };

  const renderModalRemoveAllcategory = () => {
    return (
      <ModalM
        show={modalRemoveAll}
        onHide={() => setModalRemoveAll(false)}
        title="Yakin menghapus semua?"
        textButton="Yakin"
        bgColor={darkMode ? "#84142d" : "#dc3545"}
        onClick={handleToRemoveAllCategory}
        icon={<TiFolderDelete className="icon-modal-button" />}
      >
        <h4 style={{ margin: 0, padding: 0 }}>kategori yang dipilih</h4>
        {renderOptionsCategory(category.categories) &&
          renderOptionsCategory(category.categories).map((item, i) => (
            <p key={item.value} style={{ margin: 0, padding: 0 }}>
              {i + 1}. {item.name}
            </p>
          ))}
      </ModalM>
    );
  };

  const handleRemoveAllcategory = () => {
    setModalRemoveAll(true);
  };

  const handleToRemoveAllCategory = () => {
    dispatch(deleteAllCategory());

    setChecked([]);
    setModalRemoveAll(false);
  };

  const handlePagination = (e, page) => {
    e.preventDefault();
    const cari = {
      search: search,
    };
    dispatch(getAllCategory(page + 1, cari));
  };

  const activePage = category.current_page - 1;
  const handleCangeSearch = (e) => {
    const cari = {
      search: search,
    };
    if (search.length > 0) {
      dispatch(getAllCategory(1, cari, true));
    } else {
      dispatch(getAllCategory(1, cari, true));
    }
  };

  return (
    <Layout>
      {category.loading && !category.loadingSearch ? (
        <div className="loading-2">
          <ImSpinner9 className="loading-2-icon" />
          {/* <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
          </div> */}
        </div>
      ) : null}

      <div className="category">
        <div
          className={
            darkMode
              ? "category-header bg-content-dark-mode"
              : "category-header"
          }
        >
          <div className="category-header-logo">
            <div
              className={
                darkMode
                  ? "category-header-icon bg-content-orange-dark-mode"
                  : "category-header-icon"
              }
            >
              <BsPencil className="category-logo-icon" />
            </div>
            <h2>Kategori</h2>
          </div>
          <div className="category-header-action">
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              className={
                darkMode
                  ? "category-header-box-action category-add bg-add-dark-mode"
                  : "category-header-box-action category-add"
              }
              onClick={() => setModalAdd(true)}
            >
              <CgFolderAdd className="category-action-icon category-action-add" />
              <p className="category-action-title">Tambah</p>
            </motion.button>
          </div>
        </div>

        {category.categories.length > 0 ? (
          <div
            className={
              darkMode
                ? "category-table-data mt-4 bg-content-dark-mode"
                : "category-table-data mt-4"
            }
          >
            <div className="category-table-data-remove">
              <h2 className="grapich-title">Detail Kategori</h2>

              <div className="d-flex" style={{ position: "relative" }}>
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={handleCangeSearch}
                  placeholder="Cari Kategori..."
                  className={
                    darkMode
                      ? "input-all-dark-mode input-search-category"
                      : "input-all input-search-category"
                  }
                  iconleft={<BsSearch className="iconLeft" />}
                  style={{ paddingLeft: "40px" }}
                />
              </div>
            </div>

            {category.loadingSearch ? null : category.categoryData.length >
              0 ? (
              <div className="category-pagination-main">
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

            {category.loadingSearch ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "171px" }}
              >
                <div>
                  <ImSpinner9 className="loading loading-md mr-2" />
                  Mencari.....
                </div>
              </div>
            ) : category.categoryData.length > 0 ? (
              <Table
                striped
                bordered
                hover
                responsive="lg"
                className={
                  darkMode ? "table-data text-color-dark-mode" : "table-data"
                }
              >
                <thead>
                  <tr>
                    <th>_id</th>
                    <th>Nama</th>
                    <th>Slug</th>
                    <th>Type</th>
                    <th>Dibuat Tanggal</th>
                    <th>Diubah Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {category.categoryData &&
                    category.categoryData.map((item, i) => (
                      <tr
                        key={item._id}
                        className={darkMode ? "link-color-dark-mode" : ""}
                      >
                        <td>{i + 1 + 10 * (category.current_page - 1)}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>
                          {item.type !== "undefined" ? (
                            item.type
                          ) : (
                            <span
                              style={{
                                display: "inline-block",
                                background: "red",
                                padding: "2px 5px",
                                color: "white",
                                borderRadius: "2px",
                              }}
                            >
                              ||
                            </span>
                          )}
                        </td>
                        <td>{item.createdAt}</td>
                        <td>{item.updatedAt}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <div className="category-notfound">
                <RiFileWarningFill className="category-notfound-icon" />
                <h2>Tidak Ditemukan!</h2>
              </div>
            )}
          </div>
        ) : null}

        <div className="category-content mt-3">
          <div className="category-content-left">
            <div
              className={
                darkMode
                  ? "category-content-left-main bg-content-dark-mode"
                  : "category-content-left-main"
              }
            >
              <div className="category-content-left-header">
                <h3 className="category-content-left-title grapich-title">
                  Struktur kategori
                </h3>
                <div className="d-flex">
                  <motion.button
                    whileTap={{
                      scale: 0.9,
                    }}
                    style={{
                      fontSize: "14px",
                      padding: "8px 10px",
                      height: "max-content",
                    }}
                    className={
                      checked.length || expanded.length > 0
                        ? `${
                            darkMode
                              ? "category-header-box-action category-update disable-button bg-update-dark-mode"
                              : "category-header-box-action category-update disable-button"
                          }`
                        : `${
                            darkMode
                              ? "category-header-box-action category-update bg-update-dark-mode"
                              : "category-header-box-action category-update"
                          }`
                    }
                    onClick={handleUpdateCategory}
                  >
                    <MdSystemUpdateAlt
                      style={{ fontSize: "16px" }}
                      className="category-action-icon category-action-update"
                    />
                    <p className="category-action-title">Ubah</p>
                  </motion.button>
                  <motion.button
                    whileTap={{
                      scale: 0.9,
                    }}
                    style={{
                      fontSize: "14px",
                      padding: "8px 10px",
                      height: "max-content",
                    }}
                    className={
                      checked.length > 0
                        ? `${
                            darkMode
                              ? "category-header-box-action category-delete disable-button bg-delete-dark-mode"
                              : "category-header-box-action category-delete disable-button"
                          }`
                        : `${
                            darkMode
                              ? "category-header-box-action category-delete bg-delete-dark-mode"
                              : "category-header-box-action category-delete"
                          }`
                    }
                    onClick={handleModalRemove}
                  >
                    <TiFolderDelete
                      style={{ fontSize: "16px" }}
                      className="category-action-icon category-action-delete"
                    />
                    <p className="category-action-title">Hapus</p>
                  </motion.button>
                </div>
              </div>
              <div className="category-item">
                {category.categories.length > 0 ? (
                  <ReactChecboxTree
                    nodes={renderCategoryList(category.categories)}
                    checked={checked}
                    expanded={expanded}
                    onCheck={(checked) => setChecked(checked)}
                    onExpand={(expanded) => setExpanded(expanded)}
                    icons={{
                      check: (
                        <IoIosCheckbox
                          className={
                            darkMode
                              ? "icon-category-item icon-category-sm text-color-dark-mode"
                              : "icon-category-item icon-category-sm"
                          }
                        />
                      ),
                      uncheck: (
                        <IoIosCheckboxOutline
                          className={
                            darkMode
                              ? "icon-category-item icon-category-sm text-color-dark-mode"
                              : "icon-category-item icon-category-sm"
                          }
                        />
                      ),
                      halfCheck: (
                        <IoIosCheckboxOutline
                          className={
                            darkMode
                              ? "icon-category-item icon-category-sm text-color-dark-mode"
                              : "icon-category-item icon-category-sm"
                          }
                        />
                      ),
                      expandOpen: (
                        <MdKeyboardArrowRight
                          className={
                            darkMode
                              ? "icon-category-item category-icon-arrow text-color-dark-mode"
                              : "icon-category-item category-icon-arrow"
                          }
                        />
                      ),
                      expandClose: (
                        <MdKeyboardArrowDown
                          className={
                            darkMode
                              ? "icon-category-item category-icon-arrow text-color-dark-mode"
                              : "icon-category-item category-icon-arrow"
                          }
                        />
                      ),
                      parentOpen: (
                        <RiFolderOpenFill className="icon-category-item openfolder" />
                      ),
                      parentClose: <FcFolder className="icon-category-item" />,
                      leaf: <FcFile className="icon-category-item" />,
                    }}
                  />
                ) : (
                  <Alert variant="danger">
                    <VscWarning className="message-validasi-icon" /> Kategori
                    Kosong
                  </Alert>
                )}
              </div>
            </div>

            {userSetting.category.categoryQuantity ? (
              <div
                ref={containerRef}
                style={{ flexDirection: `${resize <= 385 ? "column" : "row"}` }}
                className={
                  categoryTotalMax(category.categories).length > 0
                    ? `${
                        darkMode
                          ? "category-content-left-bottom mt-3 bg-content-dark-mode"
                          : "category-content-left-bottom mt-3"
                      }`
                    : `${
                        darkMode
                          ? "category-content-left-bottom bg-content-dark-mode mt-3"
                          : "category-content-left-bottom mt-3"
                      }`
                }
              >
                <div className="category-content-bag mb-2 mt-2">
                  <div
                    className={
                      darkMode
                        ? "category-content-total border-color-orange-dark-mode"
                        : "category-content-total"
                    }
                  >
                    <h2 className={darkMode ? "text-color-dark-mode" : ""}>
                      <CountUp
                        isCounting
                        end={category.categoryLength && category.categoryLength}
                        duration={3.3}
                      />
                    </h2>
                  </div>
                  <h4
                    className={
                      darkMode
                        ? "text-color-dark-mode grapich-title"
                        : "grapich-title"
                    }
                  >
                    Jumlah Kategori
                  </h4>
                </div>
                <div>
                  {dataCategories(category.categories).length > 0 ? (
                    <PieChart
                      width={240}
                      height={250}
                      style={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                      }}
                    >
                      <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={dataCategories(category.categories)}
                        cx={110}
                        cy={120}
                        outerRadius={70}
                        fill={darkMode ? "rgba(255,255,255,.3)" : "#0F66BD"}
                        label
                      />
                      <Tooltip />
                    </PieChart>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          {userSetting.category.categoryTopQuantity ? (
            <div className="category-content-right">
              {categoryTotalMax(category.categories).length > 0 ? (
                <div
                  className={
                    darkMode
                      ? "category-content-right-top bg-content-dark-mode"
                      : "category-content-right-top"
                  }
                >
                  <h3 className="grapich-title">Kategori Terbanyak</h3>

                  <ComposedChart
                    width={600}
                    height={300}
                    data={categoryTotalMax(category.categories)}
                    margin={{
                      top: 30,
                      right: 10,
                      bottom: 20,
                      left: 10,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar
                      dataKey="Jumlah"
                      barSize={20}
                      fill={darkMode ? "#e16428" : "#0F66BD"}
                    />
                    <Line
                      type="monotone"
                      dataKey="Jumlah"
                      stroke={darkMode ? "#ff5733" : "#ff7300"}
                    />
                  </ComposedChart>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {userSetting.category.categoryHistory ? (
          category.categoryHistory.length > 0 ? (
            <div
              className={
                darkMode
                  ? "category-content-left-history bg-content-dark-mode"
                  : "category-content-left-history"
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
                    <th>Nama Kategori</th>
                    <th>Status</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {category.categoryHistory &&
                    category.categoryHistory.map((item, i) => {
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
          ) : null
        ) : null}
      </div>

      {renderModalAddCategory()}
      {renderModalRemoveCategory()}
      {renderModalUpdateCategory()}

      {category.error ? (
        <div className="message-validasi-error message-validasi">
          <div>
            <p className="message-validasi-text">
              <VscWarning className="message-validasi-icon" /> {category.error}
            </p>
          </div>
        </div>
      ) : null}

      {category.message ? (
        <div className="message-validasi-success message-validasi">
          <div>
            <p className="message-validasi-text">
              <BsCheckAll className="message-validasi-icon" />{" "}
              {category.message}
            </p>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}

export default Category;
