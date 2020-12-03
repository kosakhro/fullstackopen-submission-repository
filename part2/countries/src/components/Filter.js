import React from 'react'


const Filter = (props) => {
    return(
        <form >
            <div>
                find countries 
                <input 
                value={props.searchValue}
                onChange={props.handleSearchPresent}
                />
            </div>
        </form> 

    )

}


export default Filter