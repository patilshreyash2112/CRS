import React from 'react'

function StatusComponent({buttons, isSelected, setIsSelected}) {
    
  return (
    <div>
      
            <div className="row mt-5">
            
            {
                buttons.map((text, index)=>{
                    return <div className="col-md-4">
                     <button type="button" className={isSelected === index ? 'btn btn-info' :"btn btn-outline-info"}
                    onClick={()=>setIsSelected(index)}
                    >{text}</button>
                    </div>
                })
            }
            
            </div>
            

    </div>
  )
}

export default StatusComponent
