import React, { useEffect, useState } from 'react'
import './pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward} from '@fortawesome/free-solid-svg-icons'
const Pagination = ({page, setPage, last}) => {

    
    
  return (
    <div className="pagination">
      <button className="page" onClick={()=>{setPage(1)}} disabled={page < 2}><FontAwesomeIcon icon={faForward}/> </button>
      {page === last && last>2 && <button className="page" onClick={()=>{setPage(prev=>prev-2)}}>{page-2}</button>}
      {page > 1 && <button className="page" onClick={()=>{setPage(prev=>prev-1)}}>{page - 1}</button>}
      <button className="page active" disabled>{page}</button>
      {page < last && <button className="page" onClick={()=>{setPage(prev=>prev+1)}}>{page+1}</button>}
      {page === 1 && last>2  && <button className="page" onClick={()=>{setPage(prev=>prev+2)}}>{page+2}</button>}
      <button  onClick={()=>{setPage(last)}} className="page" disabled={page === last}><FontAwesomeIcon icon={faBackward} /></button>
      
    </div>
    
      )}

export default Pagination