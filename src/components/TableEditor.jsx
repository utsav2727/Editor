import React from 'react';
import AllOutOutlinedIcon from '@mui/icons-material/AllOutOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


export const Rows = ({ item, columns }) => {
    return (
        <tr>
            {columns.map((column) => {
                return <td>{item[column.title]}</td>
            })}
        </tr>
    )
}

const TableEditor = ({ columns, data, handleShowModal,
    showModal, onColumnChange, coreIndex, onDeleteClick
    , role
}) => {

    // console.log('data', data);
    return (
        <div >
            <div className='p-1 border text-xs'>
                <div className='text-right'>
                    <div>
                        <button
                            // className=''
                            onClick={() => { handleShowModal({columns, data}) }}
                           className='icon-button m-1'
                        >
                            <OpenInFullOutlinedIcon fontSize='small' />
                        </button>

                    </div>
                </div>
                <table className='border'>
                    <thead>
                        <tr>
                            {
                                columns.map((column, index) => {
                                    return (
                                        <th>
                                            <input
                                                value={column.modifiedTitle}
                                                onChange={(e) => { onColumnChange(e, coreIndex, index) }}
                                                className="min-w-full w-16"
                                            /></th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return <Rows item={item} columns={columns} />
                        })}
                    </tbody>
                </table>
            </div>
            <div className='absolute -top-2 -right-2'>
                <button onMouseDown={(e) => {
                    // console.log('clicked!!');
                    onDeleteClick(e, coreIndex, role);
                }} className='bg-black rounded-full text-white'>
                    <CloseOutlinedIcon fontSize='small' />
                </button>
            </div>
        </div>
    )
}

export default TableEditor