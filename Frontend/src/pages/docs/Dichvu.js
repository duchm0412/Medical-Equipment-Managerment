import { Col } from "reactstrap";
import React from "react";

function Dichvu(props) {

    return (
        <Col xs="3" className="text-left">
            <ul className="list-inline">
                <li className="list-inline-item">
                    <image>{props.image}</image>        
                    <br></br>
                    <p>
                        {props.text}
                    </p>
                </li>
            </ul>
        </Col>


    )
};
export default Dichvu;
