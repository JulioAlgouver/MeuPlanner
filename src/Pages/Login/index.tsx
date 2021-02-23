import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import {Form} from '@unform/web';
import * as Yup from 'yup';


/* COMPONENTES */
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useAuth } from '../../Hooks/AuthContext';
import { useToast } from '../../Hooks/ToastContext';
import getValidationErrors from '../../Utils/getValidationErrors';

/* IMG */
import Notepad from '../../Images/Note_img.png';
import Vector from '../../Images/Vector1.png';
import VectorBackground from '../../Images/Vector2.png';

/* CSS */
import './styles.css';
import api from '../../Services/api';


interface SignInData {
  apelido: string;
  senha: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {usuario, signIn} = useAuth();
  const {addToast} = useToast();
  const history = useHistory();
  
  const handleSubmit = useCallback(async(data:SignInData) => {
    try{
      formRef.current?.setErrors({});
      
      const schema = Yup.object().shape({
          apelido: Yup.string().required(' '),
          senha: Yup.string().required(' '),
        });

        await schema.validate(data,{
        abortEarly: false,
      });
      
      await signIn({
        apelido: data.apelido,
        senha: data.senha,
      });
      
    }catch (err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type:'error',
        title:'Erro ao validar credenciais',
        description:'Usuario/Senha inválidos!'
      })
    }
  },[signIn, history]);

  return (
      <div id='main-SignInContainer'>
        <div className='left-content'>

          <strong>MeuPlanner</strong>

          <img src={Notepad} className='NotepadImg'/>

          <span>Seus compromissos organizados em um clique</span>

        </div>
        <div className='right-content'>
          <img src={VectorBackground} className='VectorBackground'/>
          <img src={Vector} className='Vector'/>

          <Form ref={formRef} onSubmit={handleSubmit} className='form'>
            <Input type='textbox' name='apelido' className='usuario' placeholder='Usuario'/>
            <Input type='password' name='senha' className='password' placeholder='Senha'/>

            <Button type='submit' className='SendForm'>Login</Button>
            
            <span>Esqueci minha senha!</span>

          </Form>

          <Link to='/SignUp' className='SignUpLink'>
            <FiPlus size={30}/>
          </Link>
        </div>
      </div>
    )
  }

export default Login;