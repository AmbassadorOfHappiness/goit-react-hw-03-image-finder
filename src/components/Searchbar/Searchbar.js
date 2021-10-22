import { Component } from "react";
import { toast } from "react-toastify";
import style from "../Searchbar/Searchbar.module.css";

export class Searchbar extends Component {
    state = {
        searchValue: '',
    };

    handleSearchSubmit = e => {
        e.preventDefault();

        if (this.state.searchValue.trim() === "") {
            return toast.error("Enter the value of your request!");
        }
        this.props.getSearchValue(this.state.searchValue);
        this.setState({searchValue: ''});

    }
    
    handleSearchChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <header className={style.Searchbar}>
                <form onSubmit={this.handleSearchSubmit} className={style.SearchForm}>
                    <button type="submit" className={style.SearchFormButton}>
                    <span className={style.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                    className={style.SearchFormInput}
                    type="text"
                    name="searchValue"
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
        
    }
}