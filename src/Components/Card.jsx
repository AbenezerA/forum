import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'

const Card = (props) => {
    const [dateParsed, setDateParsed] = useState("");

    useEffect(() => {

        const parseDate = async () => {
            let date_raw = props.created_at;
            setDateParsed(date_raw.slice(0, 10) + " " + date_raw.slice(11,16) + " UTC");
        }
        parseDate();       
    }, []);

    // console.log("date parsed: ", dateParsed);

    return(
        <div className="card mb-4">
            <Link className="card-link" to={"/post/" + props.id}>
                <div className="card-header">Posted on {dateParsed} </div>
                <div className="card-body">                
                    <h4>{props.title}</h4>                    
                </div>
                <div className="card-text"> Upvotes: {props.upvotes}</div>               
            </Link>
        </div>
    )
}

export default Card;