import React, { useState } from 'react';
import AllOutOutlinedIcon from '@mui/icons-material/AllOutOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ReactPopover from './ReactPopover';


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
    , role, tableStyles, setTableStyles,
    onColumnDelete
}) => {

    console.log('columns---', columns);

    const [textFocus, setTextFocus] = useState(false);

    // console.log('data', data);
    return (
        <div >
            <div className='p-1 border text-xs'>
                <div className='text-right'>
                    <div>
                        <button
                            // className=''
                            onClick={() => { handleShowModal({ columns, data, coreIndex }) }}
                            className='icon-button m-1'
                        >
                            <OpenInFullOutlinedIcon fontSize='small' />
                        </button>

                    </div>
                </div>
                <table className='border'>
                    <thead>
                        <tr >
                            {
                                columns.map((column, index) => {
                                    return (
                                        <th
                                            onMouseEnter={(e) => { setTextFocus(true) }}
                                            onMouseLeave={(e) => {
                                                setTextFocus(false)
                                            }}
                                            className='relative' style={column.styles}>
                                            {textFocus && 
                                            <div className='cursor-pointer absolute right-0 top-0 h-6 w-6 bg-third hover:bg-hoverSecondary'>
                                            <ReactPopover
                                            content={
                                              <div className='text-left font-normal'>
                                                <ul>
                                                    <li onClick={(e)=>{onColumnDelete(e, coreIndex, index )}}>
                                                        Delete
                                                    </li>
                                                </ul>
                                                </div>
                                            }
                                            >
                                                <MoreVertIcon fontSize='small' className='text-white'/>
                                            </ReactPopover> 
                                            </div>   
                                                }
                                            <input
                                                value={column.modifiedTitle}
                                                onChange={(e) => { onColumnChange(e, coreIndex, index) }}
                                                className="min-w-full w-16 focus-within:outline-none"

                                            />
                                        </th>)
                                })
                            }
                        </tr>
                        {<div data-popover id="popover-click" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                <h3 class="font-semibold text-gray-900 dark:text-white">Popover click</h3>
                            </div>
                            <div class="px-3 py-2">
                                <p>And here's some amazing content. It's very engaging. Right?</p>
                            </div>
                            <div data-popper-arrow></div>
                        </div>}
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