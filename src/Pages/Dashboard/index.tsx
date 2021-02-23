import React, { useCallback, useEffect, useState } from 'react'
import Popup from 'reactjs-popup';

import './styles.css';

/* IMAGENS */
import calendar_icon from '../../Images/calendar_icon.png';
import notes_icon from '../../Images/notes_icon.png';
import badge_icon from '../../Images/badge_icon.png';
import user_icon from '../../Images/user_icon.png';
import config_icon from '../../Images/config_icon.png';
import logout_icon from '../../Images/logout_icon.png';

/* COMPONENTS */
import Agenda from './Agenda';
import Metas from './Metas';
import Notes from './Notes';
import Profile from './Profile';
import Options from './Options';


const Dashboard: React.FC = () => {
   const currentUser = (localStorage.getItem('@MeuPlanner:usuario'));

   const signOut = useCallback(async () => {
      localStorage.removeItem('@MeuPlanner:token');
      localStorage.removeItem('@MeuPlanner:usuario');
   
      window.location.reload();
   },[]);

   return(
      <div id='main_dashboard'>
         <div className='left-content'>
            <div className='menu'>
               <Popup trigger={
                        <button type='button'>
                           <img src={calendar_icon}/>
                        </button>} 
                      position={'right center'} 
                      closeOnDocumentClick={true} 
                      closeOnEscape={false}>
                         
                  <Agenda />

               </Popup>

               <Popup trigger={
                        <button type='button'>
                           <img src={notes_icon}/>
                        </button>} 
                      position={'right center'} 
                      closeOnDocumentClick={false} 
                      closeOnEscape={false}>

                  <Notes />

               </Popup>

               <Popup trigger={
                        <button type='button'>
                           <img src={badge_icon} />
                        </button>} 
                      position={'right center'} 
                      closeOnDocumentClick={true} 
                      closeOnEscape={false}>
                  
                  <Metas />

               </Popup>

               <Popup trigger={
                        <button type='button'>
                           <img src={user_icon} />
                        </button>} 
                      position={'right center'} 
                      closeOnDocumentClick={true} 
                      closeOnEscape={false}>
                  
                  <Profile />

               </Popup>

               <Popup trigger={
                        <button type='button'>
                           <img src={config_icon} />
                        </button>} 
                      position={'right center'} 
                      closeOnDocumentClick={true} 
                      closeOnEscape={false}>

                  <Options />

               </Popup>
            </div>
         </div>

         <div className='right-content'>
            <div className='welcome_message'>
               <strong>Olá <i>{currentUser}</i> </strong>
               
               <button type='button' onClick={signOut}>
                  <img src={logout_icon} />
               </button>
            </div>

         </div>
      </div>       
   )
}

export default Dashboard;