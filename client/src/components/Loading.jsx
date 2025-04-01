import React from 'react'
import "../styles/Loading.css";

const Loading = () => {
    return (
        <div className='loading-container'>
            <div className='loading-wave'>
                <div className='loading-bar'></div>
                <div className='loading-bar'></div>
                <div className='loading-bar'></div>
                <div className='loading-bar'></div>
            </div>
        </div>
    );
};

export default Loading;
