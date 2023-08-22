import React, { useState, useEffect } from "react";
import "./style.css";
import {
    IoIosAmericanFootballSharp,
    IoIosAmericanFootball,
    IoIosFootball,
} from "react-icons/io";
import {
    BiSolidBall,
    BiSolidTennisBall,
    BiFootball,
    BiSolidBowlingBall,
    BiSolidCricketBall,
} from "react-icons/bi";
import { FaVolleyballBall, FaBasketballBall } from "react-icons/fa";
import {
    GiVolleyballBall,
    GiShuttlecock,
    GiBasketballBall,
    GiTennisBall,
} from "react-icons/gi";
export default function (props) {
    const [showId, setShowId] = useState(false);
    const { id, value, handleClick, status, disabled, matchedStatus } = props;
    const arr = [];
    return (
        <div
            className={`card ${matchedStatus && "matched"} ${
                status && "card-rotate"
            }`}
            onClick={() => {
                if (!disabled && !status) handleClick(id, value);
            }}
        >
            <div className="card-front">
                <img src="/cardBG.jpg" alt="Card" />
            </div>
            <div className="card-back">
                <div className="shine"></div>
                {value === 1 ? (
                    <IoIosFootball
                        className="icon"
                        style={{ color: "black" }}
                    />
                ) : value === 2 ? (
                    <GiTennisBall
                        className="icon"
                        style={{ color: "#DDEB14" }}
                    />
                ) : value === 3 ? (
                    <GiVolleyballBall
                        className="icon"
                        style={{ color: "white" }}
                    />
                ) : value === 4 ? (
                    <BiSolidCricketBall
                        className="icon"
                        style={{ color: "#830F10" }}
                    />
                ) : value === 5 ? (
                    <IoIosAmericanFootball
                        className="icon"
                        style={{ color: "#B54F45" }}
                    />
                ) : value === 6 ? (
                    <GiBasketballBall
                        className="icon"
                        style={{ color: "#FC7400" }}
                    />
                ) : value === 7 ? (
                    <GiShuttlecock
                        className="icon"
                        style={{ color: "white" }}
                    />
                ) : (
                    <BiSolidBowlingBall
                        className="icon"
                        style={{ color: "black" }}
                    />
                )}
            </div>
        </div>
    );
}
