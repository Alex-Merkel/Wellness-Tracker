interface AutoCompleteProps {
  foods: string[];
  onSelectFood: (food: string) => void;
}

const AutoComplete = ({ foods, onSelectFood }: AutoCompleteProps) => {
  if (foods.length === 0) {
    return null;
  }

  return (
    <ul className="bg-white divide-y rounded-md shadow-lg">
      {foods.slice(0,10).map((food, index) => (
        <li 
          key={index}
          onClick={() => onSelectFood(food)}
          className=" pl-5 p-1"
        >
          {food}
        </li>
      ))}
    </ul>
  );
};

export default AutoComplete;
