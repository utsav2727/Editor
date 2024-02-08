import React from 'react'

const TableEditor = ({columns, data}) => {
    return (
        <div className='flex'>
            <table className='border'>
                <thead>
                    <tr>
                        <th>{columns}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item)=>{
                        return <tr>
                        <td>{data}</td>
                    </tr>
                    }) }
                </tbody>
            </table>
        </div>
    )
}

export default TableEditor