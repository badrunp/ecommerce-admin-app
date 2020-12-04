import React, { useState } from 'react'
import Layout from '../../components/Layout';
import './style.css';
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { TiFolderDelete } from 'react-icons/ti'
import { MdSystemUpdateAlt, MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { useSelector } from 'react-redux';
import ReactChecboxTree from 'react-checkbox-tree'
import { FcFolder, FcFile } from 'react-icons/fc'
import { RiFolderOpenFill } from 'react-icons/ri'
import { IoIosCheckboxOutline, IoIosCheckbox } from 'react-icons/io'
import Input from '../../components/Ui/Input';
import ModalM from '../../components/Ui/Modal';
import { BsPencil } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import {CgFolderAdd} from 'react-icons/cg'


function Category() {

    const category = useSelector(state => state.category)

    const [expanded, setExpanded] = useState([]);
    const [checked, setChecked] = useState([])
    const [expandedArray, setExpandedArray] = useState([]);
    const [checkedArray, setCheckedArray] = useState([])
    const [modalAdd, setModalAdd] = useState(false)
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('')
    const [categoryImage, setcategoryImage] = useState('')

    const renderCategoryList = (categories) => {
        let myCategory = [];
        for (let item of categories) {
            myCategory.push(
                {
                    label: item.name,
                    value: item._id,
                    children: item.children.length > 0 && renderCategoryList(item.children)
                }
            )
        }

        return myCategory
    }

    const renderOptionsCategory = (categories, option = []) => {
        for (let cate of categories) {
            option.push({ value: cate._id, name: cate.name })

            if (cate.children.length > 0) {
                renderOptionsCategory(cate.children, option)
            }
        }
        return option
    }

    const addCategory = () => {
        alert(6)
    }

    const clearInputName = () => {
        setName('')
    }


    const renderModalAddCategory = () => {
        return (
            <ModalM
                show={modalAdd}
                onHide={() => setModalAdd(false)}
                onClick={addCategory}
                icon={(<CgFolderAdd className="icon-modal-button" />)}
            >
                <div className="row">
                    <div className="col">
                        <Input
                            placeholder="Name Category"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={name.length > 0 ? (<IoIosClose onClick={clearInputName} className="icon-input-clear" />) : null}
                        />

                        <select className="form-control mb-3 select-all">
                            <option>Select Category</option>
                            {
                                renderOptionsCategory(category.categories).map(item =>
                                    <option key={item.value} value={item.value}>{item.name}</option>
                                )
                            }
                        </select>

                        <input type="file" name="image" />
                    </div>
                </div>

            </ModalM>
        )
    }

    return (
        <Layout>
            <div className="category">
                <div className="category-header">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col">
                            <div className="category-header-title">
                                <h2><BsPencil className="category-icon" /> Category</h2>
                            </div>
                        </div>
                        <div className="col">
                            <div className="category-header-action d-flex justify-content-end">
                                <div className="category-add">
                                    <button onClick={() => setModalAdd(true)}><AiOutlineFolderAdd className="icon-add-category text-primary" /> Add</button>
                                </div>
                                <div className="category-delete">
                                    <button><TiFolderDelete className="icon-remove-category text-danger" /> Remove</button>
                                </div>
                                <div className="category-update">
                                    <button><MdSystemUpdateAlt className="icon-update-category text-info" /> Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="category-wrapper mt-1">
                    <div className="row d-flex justify-content-between">
                        <div className="category-item col">
                            <ReactChecboxTree
                                nodes={renderCategoryList(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox className="icon-category-item icon-category-sm" />,
                                    uncheck: <IoIosCheckboxOutline className="icon-category-item icon-category-sm" />,
                                    halfCheck: <IoIosCheckboxOutline className="icon-category-item icon-category-sm" />,
                                    expandOpen: <MdKeyboardArrowRight className="icon-category-item" />,
                                    expandClose: <MdKeyboardArrowDown className="icon-category-item" />,
                                    parentOpen: <RiFolderOpenFill className="icon-category-item openfolder" />,
                                    parentClose: <FcFolder className="icon-category-item" />,
                                    leaf: <FcFile className="icon-category-item" />
                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>



            {renderModalAddCategory()}
        </Layout>
    )
}

export default Category
