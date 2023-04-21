import { Outlet, Link } from "react-router-dom";
import { React, useState, useEffect } from 'react'

const Layout = () => {

    return (
        <div>
            <nav className="top-nav navbar fixed-top navbar-expand-lg text-reset">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-around" id="navbarSupportedContent">
                        <Link to="/"><h3 className="text-white fw-bold">College Application Hub</h3></Link>
                        <ul className="navbar-nav justify-content-around">
                            <li className="nav-item m-3">
                                <Link to="/"> <h5 className="text-white">Home</h5> </Link>
                            </li>
                            <li className="nav-item m-3">
                                <Link to="/new" > <h5 className="text-white">Create New Post</h5> </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    );
};

export default Layout;