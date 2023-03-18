import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit} className='flex my-10 w-full flex-row items-center '>
        <div className=' w-full'>
            <input type='text ' 
            className='category-input w-full px-4 py-2'
            placeholder='Enter new Category'
            value={value
            }
            onChange={(e) => setValue(e.target.value)}/>
        </div>
        <button type = 'submit' className='bg-black ml-3 text-white rounded-lg py-2 px-4 '>     
             Add
        </button>
      </form>
    </>
  )
}

export default CategoryForm