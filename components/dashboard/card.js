import React from 'react';

const Card = ({ heading, number, span, img }) => {
    // console.log()
    return (
        <div className='card'> 
            <div className='card-flex'>
                <div className='card-text'>
                    <p className='profit-para'>{heading}</p>
                    <p className='profit-num'>{number} <span className='text-green-400' >{span}</span></p>
                </div>
                <div className='card-icon'>
                    <img width={25} height={25} src={img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Card;