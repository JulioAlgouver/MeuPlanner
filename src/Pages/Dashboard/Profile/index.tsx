import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../../../Components/Button';

import User_Profile_Image from '../../../Images/user_profile_image.png';
import api from '../../../Services/api';

import './styles.css';

interface UserData {
    nome: string;
    apelido: string;
    email: string;
    data_cadastro: string;
    ultimo_acesso: string;
    nascimento: string;
    telefone: string;
    foto: Array<{
        id: number;
        url: string;
    }>;
}

const Profile: React.FC = () => {

    const [user, setUser] = useState<UserData[]>([]);
    const [image, setImage] = useState<File[]>([]);
    const [previewImage, setPreviewImage] = useState<string[]>([]);

    async function handleSelectImage(event:ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return;
        }
        const selectedImage = Array.from(event.target.files);
        setImage(selectedImage);

        const selectedImagePreview = selectedImage.map(image => {
            return URL.createObjectURL(image);
        });
        setPreviewImage(selectedImagePreview)
    }

    async function handleSubmitImage(event:FormEvent) {
        event.preventDefault();
        
        const data = new FormData();

        image.forEach(image => {
            data.append('images', image);
          })

        await api.post('usuarios', data)
    }

    useEffect(()=>{
        api.get('usuarios').then(response => {
            setUser(response.data)
        })
    },[])


    return(
        <div id='main-Profile'>
            <div className='content'>
                <strong><b>Meu Perfil</b></strong>
                <p/>
                <br/>

                {user.map(Usuario => {
                    if(Usuario.apelido === (localStorage.getItem('@MeuPlanner:usuario')))
                    return(
                        <div>
                            <div className='user_data'>
                                <strong>Dados Pessoais</strong>
                                <p/>
                                <br/>
                                
                                <span><b>Nome:</b> {Usuario.nome}</span>
                                <span><b>Apelido:</b> {Usuario.apelido} </span>
                                <span><b>E-mail:</b> {Usuario.email} </span>
                                <span><b>Data de Cadastro:</b> {Usuario.data_cadastro} </span>
                                <span><b>Nascimento:</b> {Usuario.nascimento} </span>
                                <span><b>Telefone:</b> {Usuario.telefone} </span>
                            </div>
        
                            <hr/>
        
                            <div className='profile_user'>
                                <strong>Perfil</strong>
                                <p/>
                                <br/>
                                <span><b>Ultimo Acesso:</b> </span>
        
                                <div className='userPhoto'>
                                    <img src={User_Profile_Image} />
                                    
                                    <input onChange={handleSelectImage} type="file" className='imageButton'/>
                                    {/*<Button type='button' onClick={handleSubmitImage}> Alterar Foto </Button>*/}
                                </div>
            
                                <p/>
                                <br/>
                                <div className='security'>
                                    <strong>Segurança</strong>
                                    <p/>
                                    <Button type='button'> Alterar Senha </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile;