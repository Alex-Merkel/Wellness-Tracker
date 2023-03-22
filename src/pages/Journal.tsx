import Background from '..//assets/images/journal.jpg'

const Journal = () => {
    return (
        <div 
            style={{ backgroundImage: `url(${ Background })`}}
            className='flex justify-center mx-auto bg-cover bg-fixed'
        >
            <div className='flex place-items-center h-screen'>
                <h3 className='p-5 text-3xl bg-white bg-opacity-60 text-black rounded'>Journal</h3>
            </div>
        </div>
      )
}

export default Journal

