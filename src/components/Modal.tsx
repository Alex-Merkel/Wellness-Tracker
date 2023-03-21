

interface Props {
    id?: string[];
    showModal?: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    foodInfo: any;
}

const Modal = ( props: Props ) => {
    const handleClose = () => {
        props.onClose();
    }
  
    if ( !props.showModal ) return (<></>);
    return (
        <div
            onClick={ handleClose }
            className='fixed w-full h-full flex overflow-auto mr-80
            justify-center align-middle bg-gray-300 bg-opacity-90'
        >
            <div
                className='max-w-600px w-3/5 fixed flex z-1 mt-20 bg-black shadow-xl rounded'
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >

                <div className="w-full flex flex-col space-apart">
                    <h2>{props.foodInfo.food_name}</h2>
                    <p>Calories: {props.foodInfo.nf_calories}</p>
                    <p>Serving Size: {props.foodInfo.serving_qty}</p>
                    <p>Total Fat: {props.foodInfo.nf_total_fat}</p>
                    <p>Saturated Fat: {props.foodInfo.nf_saturated_fat}</p>
                    <p>Cholesterol: {props.foodInfo.nf_cholesterol}</p>
                    <p>Sodium: {props.foodInfo.nf_sodium}</p>
                    <p>Total Carbohydrate: {props.foodInfo.nf_total_carbohydrate}</p>
                    <p>Dietary Fiber: {props.foodInfo.nf_dietary_fiber}</p>
                    <p>Sugars: {props.foodInfo.nf_sugars}</p>
                    <p>Protein: {props.foodInfo.nf_protein}</p>
                    <p className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
                    onClick={ handleClose }>
                        X
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Modal

