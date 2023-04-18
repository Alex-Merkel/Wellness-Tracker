import Background from '../assets/images/foodpic.jpg'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'



const Food = () => {
  const [showModal, setShowModal] = useState(false)
  const [foodInfo, setFoodInfo] = useState<any | null>(null)


  const handleAddFood = (info: any) => {
    setFoodInfo(info)
    setShowModal(true)
  }


  const handleCloseModal = () => {
    setShowModal(false);
    setFoodInfo(null)
    location.reload()
  }
  
    return (
      <div style={{ backgroundImage: `url(${ Background })` }} className='flex flex-row justify-center mx-auto bg-cover bg-fixed'>
          <SearchBar onAddFood={handleAddFood} />
          {showModal && foodInfo &&
            <Modal showModal={true} onClose={handleCloseModal} foodInfo={foodInfo} />
          }
      </div>
    )
}

export default Food
