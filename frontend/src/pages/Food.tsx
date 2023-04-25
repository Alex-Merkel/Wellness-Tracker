import Background from '../assets/images/foodpic.jpg'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import FoodGrid from '../components/FoodGrid'
import WaterTracker from '../components/WaterTracker'
import { useState, useEffect } from 'react'


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


  const handleAddFoodToGrid = (food: any, quantity: number) => {
    setFoodList([...foodList, { ...food, quantity }]),
    setShowModal(false);
  }
  
  const handleRemove = (index: number) => {
    const updatedList = foodList.filter((_, i) => i !== index);
    setFoodList(updatedList);
  }

  const handleClear = () => {
    setFoodList([]);
  };

  const handleQuantityChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
    const updatedFoodList = [...foodList];
    const updatedFood = { ...foodList[index] };
    updatedFood.calories = Math.round(updatedFood.calories / updatedFood.quantity * newQuantity);
    updatedFood.total_fat = updatedFood.total_fat.toFixed(2) / updatedFood.quantity * newQuantity;
    updatedFood.protein = updatedFood.protein.toFixed(2) / updatedFood.quantity * newQuantity; 
    updatedFood.quantity = newQuantity;
    updatedFoodList[index] = updatedFood;
    setFoodList(updatedFoodList);
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
  
  useEffect(() => {
    const storedFoodList = localStorage.getItem("foodList");
    const storedWaterAmount = localStorage.getItem("waterAmount")
    if (storedFoodList) {
        setFoodList(JSON.parse(storedFoodList));
    }
    // if (storedWaterAmount) {
    //   setFoodList(JSON.parse(storedWaterAmount));
    // }
    localStorage.setItem("foodList", JSON.stringify(foodList))
    localStorage.setItem("waterAmount", JSON.stringify(waterAmount))
  }, [])

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
