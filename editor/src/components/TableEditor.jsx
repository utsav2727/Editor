import React from 'react';



const Rows = ({item, columns})=>{
    return (
        <tr>
            {columns.map((column)=>{
                return <td>{item[column.title]}</td>
            })}
        </tr>
    )
}

const TableEditor = ({columns, data ,handleShowModal, showModal, onColumnChange, coreIndex}) => {
    
    // console.log('data', data);
    return (
        <div >
            <div className='p-1 border text-sm'>
            <div className='text-right'>
                <div>
                    <button
                    // className=''
                    onClick={()=>{handleShowModal()}}
                    >
                        O
                    </button>

                </div>
            </div>
            <table className='border'>
                <thead>
                    <tr>
                        {
                            columns.map((column, index)=>{
                                return (
                                <th>
                                    <input
                                    value={column.modifiedTitle}
                                    onChange={(e)=>{onColumnChange(e, coreIndex, index)}}
                                    className="min-w-full w-16"
                                /></th>)
                            })
                            }
                    </tr>
                </thead>
                <tbody>
                    {data.map((item)=>{
                        return <Rows item={item} columns={columns}/>
                    }) }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default TableEditor