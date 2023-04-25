import { useState } from 'react';
import { server_calls } from '../api/server';
import AutoComplete from './AutoComplete';

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
    setSelectedFood("")
    setAutoCompleteFoods([])
  };

  const handleAutoComplete = async (queryFood: string) => {
    if (queryFood === '') {
        setAutoCompleteFoods([]);
        return;
    }
    
    const data = await server_calls.getFoods(queryFood);
    console.log(queryFood);
    setAutoCompleteFoods(
        Array.from(new Set(data.common
            .map((food: any) => food.food_name)
            .filter((food_name: string) =>
                food_name.toLowerCase().includes(queryFood.toLowerCase())
            ))
        )
    );
    console.log(autoCompleteFoods);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const result = await server_calls.getNutritionInfo(selectedFood);
        console.log(result);
        onAddFood(result.foods[0]);
    } catch (error:any) {
        console.error(error);
        alert(error.message);
        setSelectedFood("")
}
  };
  

  return (
    <div className="flex flex-col items-center sticky -mt-8">
      <form onSubmit={handleSubmit} className="text-xl">
        <h3 id="SearchFormText" className="mb-6 text-center text-white font-bold text-3xl">
          Search for food info:
        </h3>
        <div className="flex items-center justify-center">
          <input
            className="rounded-full shadow-lg p-1 pl-4 mb-1"
            value={selectedFood}
            onChange={(e) => setSelectedFood(e.target.value)}
            type="text"
            placeholder="Enter food here..."
            onKeyUp={(e) => handleAutoComplete(e.currentTarget.value)}
          />
          <button type="submit" className="ml-2 px-2 rounded-full bg-green-600 border-2 border-black hover:border-white hover:text-white">
            Add
          </button>
        </div>
        <AutoComplete foods={autoCompleteFoods} onSelectFood={handleSelectFood} />
      </form>
    </div>
  );
  
};

export default SearchBar;
