import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return <div style={{backgroundColor: 'var(--primary)'}} className="h-100 p-3">
<header> <span className="text-white fs-3 fw-bold"> QVITAE </span> </header>
        <main className="h-100 w-100 d-flex align-items-center justify-content-center">
            <i>
                <h1 className="text-white fs-1 fw-bold">Ha ocurrido un error inesperado </h1>
            </i>
        </main>
    </div>
}