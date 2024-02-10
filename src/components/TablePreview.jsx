import { useState, useCallback, useEffect, useRef } from "react";
import './table.css'

const TablePreview = ({ data }) => {
    const [drag, setDrag] = useState(false);

    // const data = [
    //     ['Erik',    '27.10.1990', 'Barcelona'],
    //     ['Andrea',  '16.10.1993', 'Barcelona'],
    //     ['Paula',   '06.03.2005', 'Barcelona']
    // ];

    const handleStart = (e, row, col) => {

        let iniMouse = e.clientX;
        let iniSize  = document.getElementById(`${row}${col}`).offsetWidth;

        setDrag({
            iniMouse: iniMouse,
            iniSize:  iniSize
        })

    }

    const handleMove = (e, row, col) => {

        if(e.clientX){

            let iniMouse = drag.iniMouse;
            let iniSize  = drag.iniSize;
            let endMouse = e.clientX;

            let endSize = iniSize + (endMouse - iniMouse);

            document.getElementById(`${row}${col}`).style.width = `${endSize}px`;

        }

    }

    return(
        <table className='m-12'>
            <thead>
                        <tr>
                            {
                                data.columns.map((column, index) => {
                                    return (
                                        <th>
                                            <div
                                                className="min-w-full w-16 text-start">
                                                {column.modifiedTitle}
                                            </div>

                                        </th>)
                                })
                            }
                        </tr>
            </thead>
            <tbody>
                {data.data.map((row, i) => 
                    <tr key = {i}>
                        {console.log(data.columns)}
                        {data.columns.map((col, j) => 
                            (<td  key = {j} id = {`${i}${j}`}>
                                {console.log(data.data[i][j])}
                                {console.log(data.data[i][col.title])}
                                {data.data[i][col.title]}
                                <div 
                                    className   = 'Dragger'
                                    draggable   = {true}
                                    onDragStart = {(e) => handleStart(e, i, j)}
                                    onDrag      = {(e) => handleMove(e, i, j)}
                                />
                            </td>)
                            )
                            }
                    </tr>
                )}
                {/* {data.data.map((item) => {
                            return <Rows item={item} columns={data.columns} />
                        })} */}
            </tbody>
        </table>
    );
};

export default TablePreview;