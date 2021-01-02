import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateComp from '../components/HOC'
import TambahProduct from '../pages/AddProduct'
import Category from '../pages/Category'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Order from '../pages/Order'
import Page from '../pages/Page'
import Product from '../pages/Product'
import Profil from '../pages/Profil'
import UpdatePassword from '../pages/Profil/component/UpdatePasword'
import Register from '../pages/Register'

function Routes() {
    return (
        <>
            <Switch>
                <PrivateComp exact path="/" component={Home} />
                <PrivateComp exact path="/halaman" component={Page} />
                <PrivateComp exact path="/produk" component={Product} />
                <PrivateComp exact path="/kategori" component={Category} />
                <PrivateComp exact path="/order" component={Order} />
                <PrivateComp exact path="/profil" component={Profil} />
                <PrivateComp exact path="/profil/password/ubah" component={UpdatePassword} />
                <PrivateComp exact path="/produk/tambah" component={TambahProduct} />

                <Route exact path="/masuk" component={Login} />
                <Route exact path="/daftar" component={Register} />
            </Switch>
        </>
    )
}

export default Routes
