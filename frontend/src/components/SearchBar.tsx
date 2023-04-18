import { useState, useRef } from 'react';
import { server_calls } from '../api/server';

interface SearchBarProps {
    onAddFood: (info: any) => void;
}


const SearchBar = ({ onAddFood }: SearchBarProps) => {
 
  const [selectedFood, setSelectedFood] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const food_name = selectedFood
    const result = await server_calls.getNutritionInfo(food_name)
    console.log(result)
    onAddFood(result.foods[0])
  }

 
  return (
    <div>
        <div className='flex place-items-center h-screen'>
            <br />
            <form onSubmit={onSubmit} className='text-xl'>
                <h3 id='SearchFormText' className='text-center text-white font-bold text-2xl'>Search for a food item:</h3>
                <br />
                <input 
                    value={selectedFood} onChange={e => setSelectedFood(e.target.value)} 
                    ref={inputRef} type="text" placeholder="Enter food here..."
                />
                <button 
                    type="submit" 
                    className='ml-2 px-2 bg-green-600 border-2 border-black
                    hover:border-white'
                >
                    Add
                </button>
            </form>
        </div>
    </div>
  );
}   

export default SearchBar
