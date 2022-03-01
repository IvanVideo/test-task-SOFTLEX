import React, { useEffect } from 'react';

function EditRow({ item, index, handleSaveValue }) {
    const [values, setValues] = React.useState({}); //значение полей формы
    const [isValid, setIsValid] = React.useState(false); //валидность данных

    //Записываем все значения полей
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
    }

    useEffect(() => {
        if (values.text || values.status) {
            setIsValid(true)
        }
    }, [values])

    return (
        <tr key={index}>
            <td className=''>{item.name}</td>
            <td className=''>{item.mail}</td>
            <td className=''>
                <input type='text' required name='text' placeholder={item.text} onChange={handleChange} />
            </td>
            <td className='page1__status'>
                <select
                    className='form__input_status'
                    name='status'
                    defaultValue={'ok'}
                    required
                    onChange={handleChange}>
                    <option value='ok'>ok</option>
                    <option>false</option>
                </select>
                <div>
                    <button
                        className='btn page1__btn'
                        type="button"
                        disabled={!isValid}
                        onClick={(e) => handleSaveValue(e, item, values)}>
                        save
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default EditRow;