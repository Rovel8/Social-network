import classes from "../../parts/FindUsers/FindUsers.module.css"
import React, {useState} from "react";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    setPage: (pageNumber: number) => void
    currentPage: number
}

export const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, setPage, currentPage}) => {
    let pagesCounter = Math.ceil(totalUsersCount / pageSize)

    const portionSize = 10;
    const portionCount = Math.ceil(pagesCounter / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const firstPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const lastPortionPageNumber = portionNumber * portionSize;

    let pages = [];

    for (let i = 1; i <= pagesCounter; i++) {
        pages.push(i)
    }

    return (
        <React.Fragment>
            <div className={classes.pages}>
                {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}
                {pages.filter(p => p >= firstPortionPageNumber && p <= lastPortionPageNumber)
                    .map(p => <span onClick={() => {
                    setPage(p)
                }} className={currentPage === p ? classes.selectedPage : classes.AllPages}>{p}</span>)}
                {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
            </div>
        </React.Fragment>
    );
}





