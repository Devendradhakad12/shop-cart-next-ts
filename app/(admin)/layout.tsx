import Sidebar from '@/components/sidebar'
import React from 'react'


const LayoutRoute = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    
      <div className='dashboard z-50'>
      <Sidebar />
        {children}
      </div>
    
  )
}

export default LayoutRoute
