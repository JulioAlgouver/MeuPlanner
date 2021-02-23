import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Popup from 'reactjs-popup';

import './styles.css';

import AddNote from './Note';
import api from '../../../Services/api';
import Input from '../../../Components/Input';

interface Anotacoes {
	titulo: String;
	descricao: String;
	data_cadastro: Date;
    owner_user_apelido:String;
}

const Notes: React.FC = () => {
	const CurrentUser = (localStorage.getItem('@MeuPlanner:usuario') as string);
    const [anotacao, setAnotacao] = useState<Anotacoes[]>([]);
    
	useEffect(() => {
		api.get('anotacoes').then( response => {
			setAnotacao(response.data)
			})
	},[])

    return(
        <div id='main-Notes'>
            <div className='content'>
                <strong>Anotações</strong>
                
                <div className='grid'>

                    <Popup trigger=
                            {<button type='button' className='addNoteButton'>
                            <FiPlus size={40} color='#574273'/>
                            </button>}
                        position='bottom center' 
                        closeOnDocumentClick={false} 
                        closeOnEscape={false}
                        >
                        <AddNote />
                    </Popup>

                    {anotacao.map(Anotacao => {
                    if (Anotacao.owner_user_apelido === localStorage.getItem('@MeuPlanner:usuario')){
                        return (
                            <div>
                                <button type='button' className='noteButton'>
                                <strong className='titulo'> {Anotacao.titulo} </strong>
                                <span className='descricao'> {Anotacao.descricao} </span>
                                <span className='data_cadastro'> <b>Criado em:</b> { Anotacao.data_cadastro} </span>
                                </button>
                            </div>
                        )
                    }
                })}
                
                </div>
            </div>
        </div>
    )
}

export default Notes;