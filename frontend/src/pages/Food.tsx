import Background from '../assets/images/foodpic.jpg'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import FoodGrid from '../components/FoodGrid'
import WaterTracker from '../components/WaterTracker'
import { useState } from 'react'


const Food = () => {
  const [showModal, setShowModal] = useState(false)
  const [foodInfo, setFoodInfo] = useState<any | null>(null)
  const [foodList, setFoodList] = useState<any[]>([]);
  const [waterAmount, setWaterAmount] = useState(0);
  const [waterUnit, setWaterUnit] = useState("L");
  



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

  const handleQuantityChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
    const updatedFood = { ...foodList[index] };
    updatedFood.quantity = newQuantity;
    updatedFood.calories = updatedFood.caloriesPerServing * newQuantity;
    updatedFood.total_fat = updatedFood.totalFatPerServing * newQuantity;
    updatedFood.protein = updatedFood.proteinPerServing * newQuantity;
    const newFoodList = [...foodList];
    newFoodList[index] = updatedFood;
    setFoodList(newFoodList);
  };

  const foodGridProps = {
    foodList: foodList,
    onRemove: handleRemove,
    onClear: handleClear,
    onQuantityChange: handleQuantityChange,
  };

  const handleWaterAmountChange = (newAmount: number) => {
    setWaterAmount(waterAmount + newAmount);
  };

  const handleWaterUnitChange = (newUnit: string | React.ChangeEvent<HTMLSelectElement>) => {
    setWaterUnit(newUnit as string);
  };

  const handleResetWater = () => {
    setWaterAmount(0);
  };
  
  return (
    <div
      style={{ backgroundImage: `url(${Background})`, height: '100vh' }}
      className="flex flex-row justify-between mx-auto bg-cover bg-fixed"
    >
      
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center justify-evenly w-full mt-40">
          <SearchBar onAddFood={handleDisplayFood} />
          <WaterTracker
            waterAmount={waterAmount}
            onWaterAmountChange={handleWaterAmountChange}
            waterUnit={waterUnit}
            onWaterUnitChange={handleWaterUnitChange}
            onResetWater={handleResetWater}
          />
        </div>
        {showModal && foodInfo && (
          <Modal
            showModal={true}
            onClose={handleCloseModal}
            onAddToGrid={(food) => setFoodList([...foodList, food])}
            foodInfo={foodInfo}
          />
        )}
        <div className="w-full max-w-4xl mx-auto mt-4">
          <FoodGrid {...foodGridProps} />
        </div>
      </div>
    </div>
  );
  
  
}

export default Food
