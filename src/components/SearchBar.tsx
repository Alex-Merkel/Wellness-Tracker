import Modal from './Modal';
import { useState, useRef } from 'react';
import { server_calls } from '../api/server';


interface FoodInfo {
  food_name: string,
  calories: number,
  serving_size: number,
  total_fat: number,
  saturated_fat: number,
  cholesterol: number,
  sodium: number,
  total_carbohydrate: number,
  dietary_fiber: number,
  sugars: number,
  protein: number
}


const SearchBar = () => {
  const [foodInfo, setFoodInfo] = useState<FoodInfo | null>(null)
  const [selectedFood, setSelectedFood] = useState("")
  const [showModal, setShowModal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const food_name = selectedFood
    const result = await server_calls.getNutritionInfo(food_name)
    console.log(result)
    setFoodInfo(result.foods[0])
    console.log(foodInfo)
    setShowModal(true)
    console.log(showModal)
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setFoodInfo(null)
  }


  return (
    <div>
        <div className='flex place-items-center h-screen'>
            <br />
            <form onSubmit={onSubmit}>
                Food: <input value={selectedFood} onChange={e => setSelectedFood(e.target.value)} ref={inputRef} type="text" />
                <button type="submit">Add</button>
            </form>
        </div>
        {showModal && (
            <div className='flex place-items-center h-screen'>
                {foodInfo && (
                    <Modal showModal={true} onClose={handleCloseModal} foodInfo={foodInfo}>
                    </Modal>
                )}
            </div>
        )}  
    </div>
  );
}   

export default SearchBar
