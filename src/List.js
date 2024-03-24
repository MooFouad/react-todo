import React from 'react';
import './App.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({items, removeItem, editItem}) => {
    return ( 
        <section>
            {/* iterate over the list */}
            {items.map((item)=>{
                // destucture 2 proberty that I've in my item
                const {id,title} = item;
                return(
                    // for every item I return an article
                    <article key={id} className='single-item'>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button onClick={()=>editItem(id)} type='button' className='edit-btn'>
                                <FaEdit/>
                            </button>
                            <button onClick={()=>removeItem(id)} type='button' className='delete-btn'>
                                <FaTrash/>
                            </button>
                            
                        </div>
                    </article>
                )
            })}
        </section>
    );
}

export default List;