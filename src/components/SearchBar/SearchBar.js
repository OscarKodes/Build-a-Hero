import React from "react";

const searchBar = (props) => (
    <form onSubmit={props.onSubmitHandler} >
        <input 
            type="text" 
            value={props.searchText} 
            onChange={props.onChangeHandler}
            placeholder="Search Products" />
        <button type="submit">Submit</button>
    </form>
)

export default searchBar;

