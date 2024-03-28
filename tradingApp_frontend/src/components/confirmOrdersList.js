import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/confirmOrders.css"

const ConfirmOrdersList = () => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const navigate = useNavigate()
    useEffect(() => {
        axios('http://localhost:8081/api/orderdetails')
            .then(res => {
                setData(res.data)
            })
    }, [])
    function prevPage() {
        if (currentPage != firstIndex) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage != lastIndex) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changePage(id) {
        setCurrentPage(id);
    }


    return (
        <div>
            <h2 id='title'>Orders</h2>
            <div class="order">
                {records.slice(0).reverse().map((trade, index) => {
                    return (
                        <div className='content' key={index}>
                            <p><b>StockName: </b>{trade.stockName}</p>
                            <p><b>Quantity: </b>{trade.quantity}</p>
                            <p><b>Price Per Unit: </b>{trade.pricePerUnit}</p>
                            <p><b>Type: </b>{trade.type}</p>
                            <p><b>Status: </b>{trade.status}</p>
                        </div>
                    );
                })}
            </div>
            <Link to={"/"}>Cancel</Link>
            <nav>
                <ul class="pagination">
                    <li class="page-item">
                        <a href="#" className="page-link" onClick={prevPage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? "active" : ""}`} key={i}>
                                <a href="#" className="page-item" onClick={() => changePage}>{n}</a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>

    );
}
export default ConfirmOrdersList;
