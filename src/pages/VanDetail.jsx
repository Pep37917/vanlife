import React from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { getVan } from "../api"

export default function VanDetail() {
    const { id } = useParams()
    const location = useLocation()
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])
    
    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const search = location.state?.search || ""
    const type = location.state?.type || ""

    return (
        <div className="van-detail-container">

            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span>
            </Link>

            {van ? (
                <div className="van-detail">
                    <div className="category-buttons">
                    </div>
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p className="van-description">{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}