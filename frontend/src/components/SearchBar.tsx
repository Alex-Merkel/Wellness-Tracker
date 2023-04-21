import { useState } from 'react';
import { server_calls } from '../api/server';
import AutoComplete from './FoodPopup';

interface SearchBarProps {
  onAddFood: (info: any) => void;
}

const SearchBar = ({ onAddFood }: SearchBarProps) => {
  const [selectedFood, setSelectedFood] = useState('');
  const [autoCompleteFoods, setAutoCompleteFoods] = useState<string[]>([]);

  const handleSelectFood = async (food_name: string) => {
    setSelectedFood(food_name);
    const result = await server_calls.getNutritionInfo(food_name);
    console.log(result);
    onAddFood(result.foods[0]);
  };

  const handleAutoComplete = async (queryFood: string) => {
    const data = await server_calls.getFoods(queryFood);
    console.log(queryFood);
    setAutoCompleteFoods(
      data.common
        .map((food: any) => food.food_name)
        .filter((food_name: string) =>
          food_name.toLowerCase().includes(queryFood.toLowerCase())
        )
    );
    console.log(autoCompleteFoods);
  };

  return (
    <div className="flex place-items-center h-screen">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          server_calls.getNutritionInfo(selectedFood).then((result) => {
            console.log(result);
            onAddFood(result.foods[0]);
          });
        }}
        className="text-xl"
      >
        <h3 id="SearchFormText" className="text-center text-white font-bold text-2xl">
          Search for a food item:
        </h3>
        <br />
        <input
          value={selectedFood}
          onChange={(e) => setSelectedFood(e.target.value)}
          type="text"
          placeholder="Enter food here..."
          onKeyUp={(e) => handleAutoComplete(e.currentTarget.value)}
        />
        <AutoComplete foods={autoCompleteFoods} onSelectFood={handleSelectFood} />
        <button type="submit" className="ml-2 px-2 bg-green-600 border-2 border-black hover:border-white">
          Add
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
