import './Page1.css';
import React, { useEffect } from 'react';
import Form from '../Form/Form';
import ReadOnlyRow from '../ReadOnlyRow/ReadOnlyRow';
import EditRow from '../EditRow/EditRow';

const Page1 = ({ createItem, dataItems, currentUser, logout, adminValue, editRowTable, newValue }) => {
    const [visibleItem, setVisibleItem] = React.useState(5); //значение отображаемых строк таблицы
    const [filterValue, setFilterValue] = React.useState(''); //значение по которому фильтруем данные
    const [editItemId, setEditItemId] = React.useState(null); //значение строки, которую будем редактировать
    const [editFormData, setEditFormData] = React.useState(dataItems);

    const showMorItems = () => {
        setVisibleItem(visibleItem + 3);
    };

    const handleExitProfile = () => {
        logout()
    }

    const handleEditClick = (e, data) => {
        setEditItemId(data._id)
    }

    const handleSaveValue = (e, item, values) => {
        const itemId = item._id;
        const newItemValues = { text: values.text, status: values.status }
        editRowTable(newItemValues, itemId);
        setEditItemId(null);
    }

    return (
        <section className='page1'>
            <section className='page1__header'>
                <p className='page1__profile'>{currentUser.name}</p>
                <button onClick={handleExitProfile} className='page1__button'>выйти</button>
            </section>
            <h1 className='page1__title'>Список задач</h1>
            <Form createItem={createItem} />
            <article className='container page1__container'>
                <div className='page1__filter'>
                    <input
                        className='page1__input'
                        onChange={(e) => { setFilterValue(e.target.value) }}
                    />
                    <p className='page1__about'>фильтрация по name, mail, status</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <table className='table table-bordered page1__table'>
                        <thead>
                            <tr>
                                <th className=''>name</th>
                                <th className=''>mail</th>
                                <th className=''>text</th>
                                <th className=''>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataItems.length > 0 ? (
                                    dataItems.slice(0, visibleItem).filter((value) => {
                                        if (filterValue === '') {
                                            return value
                                        } else if (
                                            value.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            value.mail.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            value.status.toLowerCase().includes(filterValue.toLowerCase())
                                        ) {
                                            return value
                                        }
                                    }).map((item, index) => (
                                        <>
                                            {
                                                editItemId === item._id ? (
                                                    <EditRow item={item} index={index} handleSaveValue={handleSaveValue} />
                                                )
                                                    : (
                                                        <ReadOnlyRow item={item} index={index} adminValue={adminValue} handleEditClick={handleEditClick} editFormData={editFormData} />
                                                    )
                                            }
                                        </>
                                    ))
                                ) : null
                            }
                        </tbody>
                    </table>
                </form>
                <button
                    className='page1__button'
                    onClick={showMorItems}>
                    Еще
                </button>
            </article>
        </section>
    );
}

export default Page1;