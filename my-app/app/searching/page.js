import Card from '@/components/Card'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const searchingPage = () => {
  return (
    <div>
      <div className='bg-gray-200 w-screen h-screen flex gap-10'>
        <Sidebar />
        <div className='py-10 ml-9 flex gap-15 flex-wrap'>
            <Card name="Linear Search" destination="/searching/linear-search" photo="/Searching-1.jpeg"/>
            <Card name="Binary Search" destination="/searching/binary-search" photo="/Searching-1.jpeg"/>
            
        </div>
      </div>
    </div>
  )
}

export default searchingPage;
