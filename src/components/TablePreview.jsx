import { useState, useCallback, useEffect, useRef } from "react";
import './table.css'

const TablePreview = ({ data, setShowModal, handleSaveButton }) => {
    const [drag, setDrag] = useState(false);

    const [columns, setColumns] = useState(data.columns);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index) => {
        if (draggedIndex !== null && draggedIndex !== index) {
            const newColumns = [...columns];
            const [draggedColumn] = newColumns.splice(draggedIndex, 1);
            newColumns.splice(index, 0, draggedColumn);
            setColumns(newColumns);
            setDraggedIndex(index);
        }
    };
    console.log('columns preview--', columns);

    const handleStart = (e, row, col) => {

        let iniMouse = e.clientX;
        let iniSize = document.getElementById(`${row}${col}`).offsetWidth;

        setDrag({
            iniMouse: iniMouse,
            iniSize: iniSize
        })

    }

    const submitChanges = () => {
        console.log('preview-columns', columns);
    }

    const handleMove = (e, row, col, column) => {

        if (e.clientX) {

            let iniMouse = drag.iniMouse;
            let iniSize = drag.iniSize;
            let endMouse = e.clientX;

            let endSize = iniSize + (endMouse - iniMouse);
            // console.log('row---', )
            document.getElementById(`col-${col}`).style.width = `${endSize}px`;
            console.log(column, `width: ${endSize}px`);

            console.log(columns);
            columns[col] = { ...columns[col], formatter: { width: `${endSize}px` } }

            setColumns([...columns]);

            // console.log(endSize);

        }

    }

    return (
        <div>
            <table className='m-12 text-xs'>
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => {
                                return (
                                    <th style={column.formatter}>
                                        <div
                                            id={`col-${index}`}
                                            className="min-w-full w-16 text-start hover:cursor-move"
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={() => handleDragOver(index)}
                                            onDragEnd={() => setDraggedIndex(null)}
                                        >
                                            {column.caption}

                                        </div>

                                    </th>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((row, i) =>
                        <tr key={i}>
                            {columns.map((col, j) =>
                            (<td key={j} id={`${i}${j}`}>
                                {/* {console.log(data.data[i][j])} */}
                                {/* {console.log(data.data[i][col.title])} */}
                                {data.data[i][col.field]}
                                <div
                                    className='Dragger'
                                    draggable={true}
                                    onDragStart={(e) => handleStart(e, i, j, col)}
                                    onDrag={(e) => handleMove(e, i, j, col)}
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
            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="text-red-500 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
                <button
                    className="bg-third hover:bg-hoverSecondary text-white active:bg-hoverSecondary uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { handleSaveButton(columns, data.coreIndex) }}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default TablePreview;