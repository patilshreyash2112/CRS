import React from 'react'

const PoliceOfficersComp = () => {
  return (
    <div>
      <section className='home-section'>

<div className="row mt-2">
  
  <div className="col-md-1"></div>
  <div className="col-md-10">
      <div className="row mt-2">
{/* {Records.map((record)=>{
return(             */}
      <div className="col-md-4">
          <div className="card text-center m-3">
          {/* <div key={record.id}></div>
            <img src={record.city} className="card-img-top "  alt="location_Image"/> */}
            <div className="card-body">
              {/* <a href="https://goo.gl/maps/WxzX24B5UAgrrEwx8" className="btn btn-outline-danger" target="_blank">{record.name}</a> */}
              
            </div>
          </div>
        </div>
        {/* )
})}       */}
    </div>
    </div>
    <div className="col-md-1"></div>
</div>

</section>
    </div>
  )
}

export default PoliceOfficersComp
