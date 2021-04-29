import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar! */}
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/books">
                <i className="fa fa-book"></i> Livros
            </Link>
        </nav>
    </aside>