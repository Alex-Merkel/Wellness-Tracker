import { useState, useEffect } from "react";
import Modal from "./Modal";


interface FoodGridProps {
  foodList: any[];
  onRemove: (index: number) => void;
  onClear: () => void;
  onQuantityChange: (index: number, quantity: number) => void;
}

const FoodGrid = ({ foodList, onRemove, onClear, onQuantityChange }: FoodGridProps) => {
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalFat, setTotalFat] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);

  const handleRemove = (index: number) => {
    onRemove(index);
  };

  const handleClear = () => {
    onClear();
  };

  const handleQuantityChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    onQuantityChange(index, newQuantity);
  };

  // Calculate the total values for all foods
  useEffect(() => {
    // const storedFoods = localStorage.getItem('foods');
    // if (storedFoods) {
    //   const parsedFoods = JSON.parse(storedFoods);
    //   setFoods(parsedFoods);
    // }
  
    let newTotalCalories = 0;
    let newTotalFat = 0;
    let newTotalProtein = 0;
    for (let i = 0; i < foodList.length; i++) {
      newTotalCalories += foodList[i].calories * foodList[i].quantity;
      newTotalFat += foodList[i].total_fat * foodList[i].quantity;
      newTotalProtein += foodList[i].protein * foodList[i].quantity;
    }
    setTotalCalories(newTotalCalories);
    setTotalFat(newTotalFat);
    setTotalProtein(newTotalProtein);
  }, [foodList]);
  

  // Limit the number of foods to 20
  const canAddMore = foodList.length < 20;

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-xl font-medium">Food Grid</h2>
        <button onClick={handleClear} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4">
          Clear All
        </button>
      </div>
      <div className="bg-white border rounded shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Food Name</th>
              <th className="px-4 py-2 text-left border-b">Quantity</th>
              <th className="px-4 py-2 text-left border-b">Serving Size</th>
              <th className="px-4 py-2 text-left border-b">Calories</th>
              <th className="px-4 py-2 text-left border-b">Total Fat</th>
              <th className="px-4 py-2 text-left border-b">Protein</th>
              <th className="px-4 py-2 text-left border-b">Remove</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="px-4 py-2 border-b">{food.food_name}</td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="number"
                    min="1"
                    value={food.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                    className="w-16 border-gray-300 rounded-md text-sm"
                  />
                </td>
                <td className="px-4 py-2 border-b">{food.serving_size}</td>
                <td className="px-4 py-2 border-b">{food.calories}</td>
                <td className="px-4 py-2 border-b">{food.total_fat}</td>
                <td className="px-4 py-2 border-b">{food.protein}</td>
                <td className="px-4 py-2 border-b">
                  <button onClick={() => handleRemove(index)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-4">
        <p className="mr-2">Total Calories: {totalCalories}</p>
        <p className="mr-2">Total Fat: {totalFat}g</p>
        <p className="mr-2">Total Protein: {totalProtein}g</p>  
      </div>
    </div>
  );
}
  
  export default FoodGrid;

  