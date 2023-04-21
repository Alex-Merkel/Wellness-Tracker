interface AutoCompleteProps {
  foods: string[];
  onSelectFood: (food: string) => void;
}

const AutoComplete = ({ foods, onSelectFood }: AutoCompleteProps) => {
  if (foods.length === 0) {
    return null;
  }

  return (
    <ul>
      {foods.map((food) => (
        <li key={food} onClick={() => onSelectFood(food)}>
          {food}
        </li>
      ))}
    </ul>
  );
};

export default AutoComplete;
