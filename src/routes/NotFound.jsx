import { Link } from 'react-router-dom'

const NotFound = () => {
    return(
        <div className="main-page">
            <h2>Page not found!</h2>
            <Link className="card" to="/"> Click here to be redirected to Home.</Link>
        </div>
        
    )
}

export default NotFound;