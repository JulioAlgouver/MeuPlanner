import React from 'react'
import pageNotFound from '../../Images/pageNotFound.png'

import './styles.css';

const PageNotFound: React.FC = () => {
    return(
        <div id='main_landing'>
        <div className='error'>
           <img src={pageNotFound}/>
        
           <strong>ERROR 404!</strong>
           <p>PAGINA NÃO ENCONTRADA</p>
        </div>
     </div>
   );
};

export default PageNotFound;