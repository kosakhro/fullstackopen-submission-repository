import React from 'react'


const Filter = (props) => {
    return(
        <form >
            <div>
                filter shown with: 
                <input 
                value={props.searchValue}
                onChange={props.handleSearchPresent}
                />
            </div>
        </form> 

    )

}


export default Filter