import React , {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css'
const Search = () => {
    const [keyword, setKeyword] = useState()

    const navigate = useNavigate()
       
    const searchSubmitHandler = (e)=>{
        e.preventDefault()
        if(keyword !== ""){
            navigate(`/products/${keyword}`)
        }else {
            navigate(`/products`)
        }
    }
    return (
        <div>
            <div className='container'>
         
                <form className='searchBox' onSubmit={searchSubmitHandler}> 
                <input type="submit" value="جست و جو"/>
                <input type="text" placeholder='یک محصول را جست و جو کنید ....' onChange={(e)=>{setKeyword(e.target.value)}}/>
                </form>
            </div>
        </div>
    );
}

export default Search;
