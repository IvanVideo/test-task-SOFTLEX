import React, { useEffect } from 'react';

function ReadOnlyRow({ item, index, adminValue, handleEditClick }) {

    return (
        <tr key={index}>
            <td className=''>{item.name}</td>
            <td className=''>{item.mail}</td>
            <td className=''>{item.text}</td>
            <td className='page1__status'>
                {item.status}
                {
                    adminValue ?
                        <button
                            className='btn page1__btn'
                            type="button"
                            onClick={(e) => handleEditClick(e, item)}>
                            edit
                        </button> :
                        null
                }
            </td>
        </tr>
    );
}

export default ReadOnlyRow;