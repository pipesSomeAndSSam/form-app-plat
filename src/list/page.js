import React from 'react'

function List() {
  return (
    <div>
        <div className='routecon'>
            <div className='flex-items'>
                <div className='text'>Add Person</div>
            </div>
            <div className='flex-items'>
                <div className='text'>See List</div>
            </div>
        </div>
        <div className='line'></div>
        <div className='header'>          
            <div className='website-name'>QuickFormz</div>
            <div className='website-info'>See information below.</div>
        </div>
        <div className='container'>       
            <div className='submit-container'>
                <div className="submit">Submit</div>
            </div>
        </div>
    </div>
  )
}

export default List