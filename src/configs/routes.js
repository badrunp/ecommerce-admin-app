import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateComp from '../components/HOC'
import Category from '../pages/Category'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Order from '../pages/Order'
import Page from '../pages/Page'
import Product from '../pages/Product'
import Register from '../pages/Register'

function Routes() {
    return (
        <>
            <Switch>
                <PrivateComp exact path="/" component={Home} />
                <PrivateComp exact path="/page" component={Page} />
                <PrivateComp exact path="/product" component={Product} />
                <PrivateComp exact path="/category" component={Category} />
                <PrivateComp exact path="/order" component={Order} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </>
    )
}

export default Routes
