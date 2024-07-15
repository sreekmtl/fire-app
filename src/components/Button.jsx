import Image from 'next/image';
import React from 'react';


const Button = ({type, title, icon, variant,clickEvent}) => {
  return (
    <button className={`flexCenter gap-3 rounded-full border ${variant}`}
    onClick={clickEvent}
    type={type}>
        {icon && <Image src={icon} alt={title} width={24} height={24}/>}
        <label className='bold-16 whitespace-nowrap'>{title}</label>
    </button>
  )
}

export default Button