import React from "react";
import { Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

function LienHe(props) {

    return (

        <Col xs="3" className="text-left">
            <ul className="list-inline">
                <li className="list-inline-item">
                    <span className="text-muted" href="#">
                        <u><b>{props.address}</b> </u>
                    </span>
                    <br></br>
                    <br></br>
                    <p>
                        <span><FontAwesomeIcon icon={faHome} /></span>{" "}
                        <span>{props.toanha}</span>
                    </p>
                    <p>
                        <span><FontAwesomeIcon icon={faPhone} /></span>{" "}
                        <span>{props.phone}</span>
                    </p>
                    <p>
                        <span><FontAwesomeIcon icon={faMailBulk} /></span>{" "}
                        <span>{props.gmail}</span>
                    </p>
                </li>
            </ul>
        </Col>

        

    )
};

export default LienHe;
