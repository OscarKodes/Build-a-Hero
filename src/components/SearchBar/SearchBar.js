import React from "react";

const searchBar = (props) => (
    <form onSubmit={props.onSubmitHandler}>
        <input 
            type="text" 
            value={props.searchText} 
            onChange={props.onChangeHandler}
            placeholder={props.children} />
        <button type="submit">Submit</button>
    </form>
)

export default searchBar;

