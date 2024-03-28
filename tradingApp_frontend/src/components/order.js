import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../css/order.css"

function Order() {
    const { id } = useParams()
    const intialData = { id: id, stockName: "", listingPrice: "", quantity: "", type: "", pricePerUnit: "" }
    const [data, setData] = useState(intialData)
    useEffect(() => {
        axios.get("http://localhost:8081/api/tradingdetails/" + id)
            .then(res => {
                setData({ ...data, stockName: res.data.stockName, listingPrice: res.data.listingPrice, quantity: res.data.quantity, type: res.data.type, pricePerUnit: res.data.pricePerUnit })
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = () => {
        axios.post("http://localhost:8081/api/orderdetails/" + id)
            .then(res => {
                window.alert("Your Order is Placed")
            })
            .catch(err => console.log(err))
    }
    const navigate = useNavigate()

    return (
        <center>
            <h2>Order Details</h2>
            <div className="maincard">
                <div className="card">
                    <p><b>Stock Name: </b>{data.stockName}</p>
                    <p><b>listing Price: </b>{data.listingPrice}</p>
                    <p><b>Quantity: </b>{data.quantity}</p>
                    <p><b>Type: </b>{data.type}</p>
                    <p><b>price Per Unit: </b>{data.pricePerUnit}</p>
                </div>
                <button className="orderbutton" onClick={handleSubmit}>Confirm Order</button>
                <Link to={"/confirmorders"}>Go to Orders Page</Link>
            </div>
            <Link to={"/"}>Cancel</Link>
        </center>
    )
}

export default Order