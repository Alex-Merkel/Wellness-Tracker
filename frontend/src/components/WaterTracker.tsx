import { useState } from 'react';

interface WaterTrackerProps {
    waterAmount: number;
    onWaterAmountChange: (amount: number) => void;
    waterUnit: string;
    onWaterUnitChange: (newUnit: string) => void;
    onResetWater: () => void;
  }
  

  const WaterTracker = ({
    waterAmount,
    onWaterAmountChange,
    waterUnit,
    onWaterUnitChange,
    onResetWater,
  }: WaterTrackerProps) => {

    const [newAmount, setNewAmount] = useState<number>(waterAmount);

    
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
        setNewAmount(newAmount);
    };

    const handleAddWater = () => {
    onWaterAmountChange(newAmount);
    setNewAmount(0);
    };
  
    const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newUnit = event.target.value;
      onWaterUnitChange(newUnit);
    };
  
    return (
        <div className="flex flex-col items-center sticky text-xl mt-10">
            <label htmlFor="waterAmount" className="mb-1 first-letter:text-center text-white font-bold text-3xl" id='WaterTrackerText'>
                Water Tracker:
            </label>
            <div className='text-sm font-bold' id='UnitsToAddText'>
                Amount to add (and unit selecter):
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center mr-2">
                    <input
                        type="number"
                        id="waterAmount"
                        name="waterAmount"
                        value={newAmount}
                        onChange={handleAmountChange}
                        min="0"
                        className="rounded-full shadow-lg p-1 pl-4 mb-1 w-24 mr-2 text-center"
                    />
                    <select value={waterUnit} onChange={handleUnitChange} className="rounded-full shadow-lg p-1 pl-4 mb-1">
                        <option value="L">L</option>
                        <option value="oz">oz</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div className='flex mt-2 mb-2'>
                    <button onClick={handleAddWater} className="ml-2 px-2 rounded-full bg-green-600 border-2 border-black hover:border-white hover:text-white">
                        Add
                    </button>
                    <button onClick={onResetWater} className="ml-2 px-2 rounded-full bg-green-600 border-2 border-black hover:border-white hover:text-white">
                        Reset
                    </button>
                </div>
            </div>
            <div className='text-2xl font-bold' id='TotalWaterIntakeText'>
                Total Water Intake: {waterAmount} {waterUnit}
            </div>
        </div>
    );
      
};
  
export default WaterTracker