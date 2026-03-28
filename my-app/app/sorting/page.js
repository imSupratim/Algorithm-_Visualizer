import Card from '@/components/Card'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const sortingPage = () => {
  return (
    <div>
      <div className='bg-gray-200 w-screen h-screen flex gap-10'>
        <Sidebar />
        <div className='py-10 ml-9 flex gap-15 flex-wrap'>
            <Card name="Selection Sort" destination="/sorting/selection-sort" photo="/Sorting-1.jpg"/>
            <Card name="Insertion Sort" destination="/sorting/insertion-sort" photo="/Sorting-2.jpg" />
            <Card name="Bubble Sort" destination="/sorting/bubble-sort" photo="/Sorting-3.jpeg" />
        </div>
      </div>
    </div>
  )
}

export default sortingPage
