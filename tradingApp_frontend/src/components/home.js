import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/home.css"

const Home = () => {
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
        axios('http://localhost:8081/api/tradingdetails')
            .then(res => {
                setData(res.data)
            })
    }, [])

    const handleDelete = (id) => {
        fetch('http://localhost:8081/api/tradingdetails/' + id, {
            method: 'delete'
        }).then((res) => {
            window.location.reload();
        })
            .catch(
                err => {
                    console.log(err)
                })
    }

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
        <div id="homediv">
            <h2 className='title'>Trading App</h2>
            <Link to="/create">Add</Link>
            <table id="tradingtable">
                <thead>
                    <tr>
                        <th>TradeData Time</th>
                        <th>Stock Name</th>
                        <th>Listing Price</th>
                        <th>Quantity</th>
                        <th>Type</th>
                        <th>Price Per Unit</th>
                        <th>Actons</th>
                    </tr>
                </thead>
                <tbody>
                    {records.slice(0).reverse().map((item, index) => {
                        return <tr key={index}>
                            <td>{item.tradeDataTime}</td>
                            <td>{item.stockName}</td>
                            <td>{item.listingPrice}</td>
                            <td>{item.quantity}</td>
                            <td>{item.type}</td>
                            <td>{item.pricePerUnit}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>Update</Link>
                                <button className='deletebutton' onClick={() => handleDelete(item.id)}>Delete</button>
                                <Link to={`/order/${item.id}`}>Order</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
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
export default Home;
