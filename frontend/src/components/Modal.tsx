import { useState } from "react";

interface ModalProps {
    showModal?: boolean;
    onClose: () => void;
    onAddToGrid: (food: any) => void;
    foodInfo: any;
    // ***Add these props too? : 
    // food_name: string, 
    // calories: number, 
    // serving_size: number, 
    // total_fat: number, 
    // saturated_fat: number, 
    // cholesterol: number, 
    // sodium: number, 
    // total_carbohydrate: number, 
    // dietary_fiber: number, 
    // sugars: number, 
    // protein: number

}

const Modal = ({ showModal, onClose, onAddToGrid, foodInfo }: ModalProps ) => {
    const [quantity, setQuantity] = useState<number>(1);
    
    const handleClose = () => {
        onClose();
    }

    const handleAddToGrid = () => {
        const food = {
          food_name: foodInfo.food_name,
          quantity,
          serving_size: foodInfo.serving_size,
          calories: foodInfo.nf_calories,
          total_fat: foodInfo.nf_total_fat,
          protein: foodInfo.nf_protein
        };
        onAddToGrid(food);
        // localStorage.setItem('foods', JSON.stringify([...foods, food]));
        onClose();
      };
  
    if ( !showModal ) return (<></>);
    return (
        <div
            onClick={ handleClose }
            className='fixed w-full h-full flex overflow-auto
            justify-center align-middle bg-gray-300 bg-opacity-90'
        >
            <div
                className='max-w-600px w-3/5 fixed flex z-1 m-64 p-5 bg-white shadow-xl rounded'
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >

                <div className="w-full flex flex-col">
                    <div className="flex justify-between">
                        <img src={ foodInfo.photo.thumb } alt={foodInfo.food_name} className="h-32 w-44"/>
                        <p>Serving Size: <br /> { foodInfo.serving_qty }</p>
                        <p className="flex justify-center items-center h-10 w-8 m-2 bg-slate-300 rounded hover:bg-slate-800 text-white"
                        onClick={ handleClose }>
                            X
                        </p>
                    </div>
                    <h2 className="capitalize ml-16">{ foodInfo.food_name }</h2>
                    <br />
                    <br />
                    <div className="grid grid-cols-3 grid-rows-3 gap-y-8 text-center">
                        <p>Calories: <br /> { foodInfo.nf_calories }</p>
                        <p>Total Fat: <br /> { foodInfo.nf_total_fat }g</p>
                        <p>Saturated Fat: <br /> { foodInfo.nf_saturated_fat }g</p>
                        <p>Cholesterol: <br /> { foodInfo.nf_cholesterol }mg</p>
                        <p>Sodium: <br /> { foodInfo.nf_sodium }mg</p>
                        <p>Total Carbohydrate: <br /> { foodInfo.nf_total_carbohydrate }g</p>
                        <p>Dietary Fiber: <br /> { foodInfo.nf_dietary_fiber }g</p>
                        <p>Sugars: <br /> { foodInfo.nf_sugars }g</p>
                        <p>Protein: <br /> { foodInfo.nf_protein }g</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleAddToGrid}>Add to Grid</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Modal

