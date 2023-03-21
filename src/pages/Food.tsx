import Background from '../assets/images/foodpic.jpg'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'



const Food = () => {
    return (
        <div
            style={{ backgroundImage: `url(${ Background })`}}
            className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
        >
            <SearchBar/>
      
        </div>
    )
}

export default Food
