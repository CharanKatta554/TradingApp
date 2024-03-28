import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../css/update.css"

function Update() {
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
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("data... ", data.listingPrice)
        axios.put(`http://localhost:8081/api/tradingdetails/${id}`, data)
            .then(res => {
                console.log("data... ", data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="updateform">
            <form onSubmit={handleSubmit}>
                <h5>Update Trade Details</h5>

                <label>Enter StockName</label>
                <input type="text" name="stockName" placeholder="Enter Stock Name" value={data.stockName} onChange={handleChange} /><br />

                <label>Enter Listing Price</label>
                <input type="text" name="listingPrice" value={data.listingPrice} onChange={handleChange} /><br />

                <label>Enter Quantity</label>
                <input type="text" name="quantity" value={data.quantity} onChange={handleChange} /><br />

                <label>Enter Type</label>
                <input type="text" name="type" value={data.type} onChange={handleChange} /><br />

                <label>Enter Price Per Unit</label>
                <input type="text" name="pricePerUnit" value={data.pricePerUnit} onChange={handleChange} /><br />
                <br />
                <button>Update</button>
            </form>
            <Link to={"/"}>Cancel</Link>
        </div>
    )
}

export default Update