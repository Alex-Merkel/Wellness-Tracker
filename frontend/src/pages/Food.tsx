import Background from '../assets/images/foodpic.jpg'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import FoodGrid from '../components/FoodGrid'
import WaterTracker from '../components/WaterTracker'
import { useState, useEffect } from 'react'
import { useAuth0, User } from '@auth0/auth0-react';


const baseURL = "https://wellness-tracker.onrender.com/"


const Food = () => {
  const [showModal, setShowModal] = useState(false)
  const [foodInfo, setFoodInfo] = useState<any | null>(null)
  const [foodList, setFoodList] = useState<any[]>([]);
  const [waterAmount, setWaterAmount] = useState(0);
  const [waterUnit, setWaterUnit] = useState("L");
  const [emailAddress, setEmailAddress] = useState("");
  const { user } = useAuth0();
  
  useEffect(() => {
    setEmailAddress(user?.email || "");
    // If Email, get data. If no data, set data for food list and waterAmount
    const fetchData = async () => {
      if (emailAddress) {
        const result: any = await handleGetData();
        if (result.foodList && result.waterAmount === undefined && result.waterUnit === undefined) {
          saveUserDataAndGetData();
        }
      }
    };
  
    fetchData();
  }, [user?.email, emailAddress]);
  


  const handleDisplayFood = (info: any) => {
    setFoodInfo(info)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setFoodInfo(null)
  }

  // Add food to food grid, keep previous foodData as well
  const handleAddFoodToGrid = (food: any) => {
    setFoodList(prevFoodList => [...prevFoodList, { ...food, quantity: 1 }]),
    setShowModal(false);
    handleSaveData({ food_list: [...foodList, { ...food, quantity: 1 }] });
  }
  
  // Remove food from foodGrid when user selects remove
  const handleRemove = (index: number) => {
    const updatedList = foodList.filter((_, i) => i !== index);
    setFoodList(updatedList);
    handleSaveData({ food_list: updatedList });
  };

  // Remove ALL food from foodGrid when user selects
  const handleClear = () => {
    setFoodList([]);
    handleSaveData({ food_list: [] });
  }; 

  // Handle foodData update when user changes quantity
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
    handleSaveData({ food_list: updatedFoodList });
  };
  

  const foodGridProps = {
    foodList: foodList,
    onRemove: handleRemove,
    onClear: handleClear,
    onQuantityChange: handleQuantityChange,
  };

  // Handle waterAmount quantity change
  const handleWaterAmountChange = (newAmount: number) => {
    setWaterAmount(waterAmount + newAmount);
    handleSaveData({ water_amount: waterAmount + newAmount });
  };

  // Reset water amount to 0
  const handleResetWater = () => {
    setWaterAmount(0);
    handleSaveData({ water_amount: 0 });
  };

  // Handle water unit changes between L / C / oz
  const handleWaterUnitChange = (newUnit: string | React.ChangeEvent<HTMLSelectElement>) => {
    setWaterUnit(typeof newUnit === 'string' ? newUnit : newUnit.target.value);
    handleSaveData({ water_unit: newUnit })
  };
  
  const handleGetData = async () => {
    try {
      const response = await fetch(`${baseURL}getdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress: emailAddress,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        setFoodList(result.foodList || []);
        setWaterAmount(result.waterAmount || 0);
        setWaterUnit(result.waterUnit || 'L');
        return result;
      } else {
        console.log("Error: ", response.status);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  

  const handleSaveData = async (data: any) => {
    const response = await fetch(`${baseURL}savedata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        food_list: foodList,
        water_amount: waterAmount,
        water_unit: waterUnit,
        email_address: emailAddress,
        ...data,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  const saveUserDataAndGetData = async () => {
    await handleSaveData({});
    handleGetData();
  };


  return (
    <div
      style={{ 
        backgroundImage: `url(${Background})`,
      }}
      className="bg-fixed bg-cover"
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
            onAddToGrid={handleAddFoodToGrid}
            foodInfo={foodInfo}
          />
        )}
        <div className="w-full max-w-4xl mx-auto mt-8 mb-80">
          <FoodGrid {...foodGridProps} />
        </div>
      </div>
    </div>
  );
  
  
}

export default Food