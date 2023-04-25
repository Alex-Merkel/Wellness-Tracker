import Background from '../assets/images/foodpic.jpg'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import FoodGrid from '../components/FoodGrid'
import { useState } from 'react'


const Food = () => {
  const [showModal, setShowModal] = useState(false)
  const [foodInfo, setFoodInfo] = useState<any | null>(null)
  const [foodList, setFoodList] = useState<any[]>([]);
  



  const handleDisplayFood = (info: any) => {
    setFoodInfo(info)
    setShowModal(true)
  }


  const handleCloseModal = () => {
    setShowModal(false);
    setFoodInfo(null)
    // location.reload()
  }

  // const foods = [...newFoodList]

  const handleAddFoodToGrid = (food: any, quantity: number) => {
    setFoodList([...foodList, { ...food, quantity }]),
    setShowModal(false);

  }
  
  
  const handleRemove = (index: number) => {
    const updatedList = foodList.filter((_, i) => i !== index);
    setFoodList(updatedList);
  }

  const handleClear =  () => {
    setFoodList([]);
  }

  const handleQuantityChange =  (index: number, quantity: number) => {
    const updatedList = [...foodList];
    updatedList[index].quantity = quantity;
    setFoodList(updatedList);
  }

  const foodGridProps = {
    foodList: foodList,
    onRemove: handleRemove,
    onClear: handleClear,
    onQuantityChange: handleQuantityChange,
  };
  
  return (
    <div style={{ backgroundImage: `url(${Background})`, height: '100vh' }} className='flex flex-row justify-center mx-auto bg-cover bg-fixed'>
      <div className="flex flex-col items-center">
        <SearchBar onAddFood={handleDisplayFood} />
        {showModal && foodInfo && (
          <Modal showModal={true} onClose={handleCloseModal} onAddToGrid={(food) => setFoodList([...foodList, food])} foodInfo={foodInfo} />
        )}
        <div className="w-full max-w-4xl mx-auto mt-4">
          <FoodGrid {...foodGridProps} />
        </div>
      </div>
    </div>
  )
}

export default Food
