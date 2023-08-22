import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./style.css";
import { BiRefresh } from "react-icons/bi";
export default function () {
    const initialStatus = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ];
    const arr = [1, 2, 3, 4, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    const [values, setValues] = useState(randomize(arr));
    const [matchedStatus, setMatchedStatus] = useState(initialStatus);
    const [currentStatus, setCurrentStatus] = useState(initialStatus);
    const [disabled, setDisabled] = useState(false);
    const [matchedCount, setMatchedCount] = useState(0);
    const [flipCount, setFlipCount] = useState(0);
    const [prevValue, setPrevValue] = useState(-1);
    const [prevId, setPrevId] = useState(-1);
    const [opened, setOpened] = useState(false);
    function randomize(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    function handleClick(id, value) {
        if (!opened) {
            handleFirst(id, value);
        } else {
            setDisabled(true);
            setCurrentStatus((prev) => {
                const temp = [...prev];
                temp[id] = true;
                return temp;
            });
            setTimeout(() => {
                if (prevValue === value) {
                    handleMatched(id);
                } else {
                    handleMisMatched(id);
                }
            }, 1000);
            setTimeout(() => {
                setDisabled(false);
            }, 1500);
        }
        setFlipCount((prev) => prev + 1);
        setOpened((prev) => !prev);
    }
    function handleFirst(id, value) {
        setCurrentStatus((prev) => {
            const temp = [...prev];
            temp[id] = true;
            return temp;
        });
        setPrevValue(value);
        setPrevId(id);
    }
    function handleMatched(id) {
        setMatchedStatus((prev) => {
            const temp = [...prev];
            temp[id] = true;
            temp[prevId] = true;
            return temp;
        });
        setMatchedCount((prev) => prev + 1);
    }
    function handleMisMatched(id) {
        setCurrentStatus([...matchedStatus]);
        // setTimeout(() => setCurrentStatus([...matchedStatus]), 1000);
    }
    function handleRestart() {
        setMatchedCount(0);
        setFlipCount(0);
        setDisabled(false);
        setMatchedStatus(initialStatus);
        setCurrentStatus(initialStatus);
        setTimeout(() => setValues(randomize(arr)), 1000);
        setPrevValue(-1);
        setPrevId(-1);
        setOpened(false);
    }
    return (
        <div className="board">
            <div className="btn-holder">
                <div className="flip-count">Flips: {flipCount}</div>
                <div className="btn" onClick={handleRestart}>
                    <BiRefresh />
                </div>
            </div>
            <div className="card-container">
                {values.map((value, key) => (
                    <Card
                        key={key}
                        id={key}
                        value={value}
                        handleClick={handleClick}
                        disabled={disabled}
                        status={currentStatus[key]}
                        matchedStatus={matchedStatus[key]}
                    />
                ))}
            </div>
            {matchedCount === 8 && (
                <div className="result">
                    <h3 className="result-head">Congratulations</h3>
                    <button onClick={handleRestart} className="result-restart">
                        Restart
                    </button>
                </div>
            )}
        </div>
    );
}
