import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateComp({ component: Component, ...rest}) {
    return <Route {...rest} component={(props) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'))
        if(token && user){
            return <Component {...props} />
        }else{
            localStorage.clear()
            return <Redirect to="/masuk" />
        }
    }}  />
}

export default PrivateComp
