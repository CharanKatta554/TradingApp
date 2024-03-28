import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../css/create.css"

function Create() {
    const intialData = { stockName: "", listingPrice: "", quantity: "", type: "", pricePerUnit: "" }
    const [data, setData] = useState(intialData)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8081/api/tradingdetails/`, data)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="createform">
            <form onSubmit={handleSubmit}>
                <h5>Enter Trade Details</h5>

                <label>Enter StockName: </label>
                <input type="text" name="stockName" placeholder="Enter Stock Name" value={data.stockName} onChange={handleChange} /><br />

                <label>Enter Listing Price: </label>
                <input type="text" name="listingPrice" placeholder="Enter Listing Price" value={data.listingPrice} onChange={handleChange} /><br />

                <label>Enter Quantity: </label>
                <input type="text" name="quantity" placeholder="Enter Quantity" value={data.quantity} onChange={handleChange} /><br />

                <label>Choose Type: </label>
                <select name="type" onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select> <br></br>

                <label>Enter Price Per Unit: </label>
                <input type="text" name="pricePerUnit" placeholder="Enter Price Per Unit" value={data.pricePerUnit} onChange={handleChange} /><br />
                <br />
                <button>Create</button>
            </form>
            <Link to={"/"}>Cancel</Link>
        </div>
    )
}

export default Create