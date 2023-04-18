import Background from '..//assets/images/journal.jpg'
import FoodJournal from '../components/FoodJournal'

const Journal = () => {
    return (
        <div 
            style={{ backgroundImage: `url(${ Background })`}}
            className='flex justify-center mx-auto bg-cover bg-fixed'
        >
            <div className='flex place-items-center h-screen'>
                <FoodJournal/>
            </div>
        </div>
      )
}

export default Journal

