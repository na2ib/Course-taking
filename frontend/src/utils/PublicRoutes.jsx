import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoutes({ children }) {

    const token = localStorage.getItem('token')

    if (token) {
        return <Navigate to='/' replace />
    }

    return children

}

export default PublicRoutes
