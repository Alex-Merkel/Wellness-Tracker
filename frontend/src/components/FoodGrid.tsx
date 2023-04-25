import { useState, useEffect } from "react";
import Modal from "./Modal";


interface FoodGridProps {
  foodList: any[];
  onRemove: (index: number) => void;
  onClear: () => void;
  onQuantityChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
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

  const handleQuantityChange = (index: number, newValue: number) => {
    const event: React.ChangeEvent<HTMLInputElement> = {
      target: {
        value: newValue.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onQuantityChange(index, event);
  };
  

  // Calculate the total values for all foods
  useEffect(() => {
    const storedFoodList = localStorage.getItem("foodList");
    if (storedFoodList) {
    //   setFoodList(JSON.parse(storedFoodList));
    }
  
    let newTotalCalories = 0;
    let newTotalFat = 0;
    let newTotalProtein = 0;
    for (let i = 0; i < foodList.length; i++) {
      newTotalCalories += foodList[i].calories
      newTotalFat += foodList[i].total_fat
      newTotalProtein += foodList[i].protein
    }
    setTotalCalories(Math.round(newTotalCalories));
    setTotalFat(newTotalFat);
    setTotalProtein(newTotalProtein);
  
    // localStorage.setItem("foodList", JSON.stringify(foodList));
  }, [foodList]);
  
  const canAddMore = foodList.length < 20;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="bg-white border-2 border-black shadow">
        <table className="w-full border-collapse">
            <thead className="border-b-2 border-black">
                <tr>
                    <th className="px-4 py-2 text-xl text-center border-b">Food Name</th>
                    <th className="px-4 py-2 text-xl text-center border-b">Quantity</th>

                    <th className="px-4 py-2 text-xl text-center border-b">Calories</th>
                    <th className="px-4 py-2 text-xl text-center border-b">Total Fat</th>
                    <th className="px-4 py-2 text-xl text-center border-b">Protein</th>
                    <th className="px-4 py-2 text-xl text-center border-b">Remove</th>
                </tr>
            </thead>
            <tbody>
                {foodList.map((food, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="px-4 py-2 text-center border-b">
                        {food.food_name.charAt(0).toUpperCase() + food.food_name.slice(1)}
                    </td>
                    <td className="px-4 py-2 text-center border-b">
                        <input
                        type="number"
                        min="1"
                        value={food.quantity}
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        className="w-16 border-gray-300 rounded-md text-sm text-center pl-3"
                        />
                    </td>
                    <td className="px-4 py-2 text-center border-b">{ Math.round(food.calories) }</td>
                    <td className="px-4 py-2 text-center border-b">{ food.total_fat.toFixed(2) }</td>
                    <td className="px-4 py-2 text-center border-b">{ food.protein.toFixed(2) }</td>
                    <td className="px-4 py-2 text-center border-b">
                        <button
                        onClick={() => handleRemove(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                        Remove
                        </button>
                    </td>
                    </tr>
                ))}
                <tr className="bg-white border-t-2 border-black">
                    <td className="pl-9 py-2 text-xl font-bold" colSpan={2}>
                        Totals:
                    </td>
                    <td className="px-4 py-2 text-xl text-center font-bold">{totalCalories}</td>
                    <td className="px-4 py-2 text-xl text-center font-bold">{totalFat.toFixed(2)}g</td>
                    <td className="px-4 py-2 text-xl text-center font-bold">{totalProtein.toFixed(2)}g</td>
                    <td className="px-4 py-2 text-center border-b">
                        <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Clear All
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
  
  export default FoodGrid;

  