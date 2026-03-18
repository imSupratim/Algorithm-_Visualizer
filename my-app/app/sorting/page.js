import Card from '@/components/Card'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const sortingPage = () => {
  return (
    <div>
      <div className='bg-gray-400 w-screen h-screen flex gap-10'>
        <Sidebar />
        <div className='py-10 flex gap-10'>
            <Card name="Selection Sort" destination="/sorting/selection-sort" photo="/Sorting-1.jpg"/>
        </div>
      </div>
    </div>
  )
}

export default sortingPage
