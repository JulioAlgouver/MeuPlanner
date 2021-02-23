import React, { useCallback, useRef } from 'react';
import {Form} from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import {FiArrowLeft} from 'react-icons/fi';
import * as Yup from 'yup';


/* IMG */
import Notepad from '../../Images/Note_img.png';
import Vector from '../../Images/Vector3.png';
import VectorBackground from '../../Images/Vector4.png';

/* CSS */
import './styles.css';

/* COMPONENTES */
import api from '../../Services/api';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useToast } from '../../Hooks/ToastContext';
import getValidationErrors from '../../Utils/getValidationErrors';


interface SignUpData {
  usuario: string;
  senha: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {addToast} = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async(data:SignUpData) => {
    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required(' '),
        apelido: Yup.string().required(' '),
        email: Yup.string().required(' '),
        senha: Yup.string().required(' ')
      })

      await schema.validate(data,{
        abortEarly:false
      });
      
      await api.post('/usuarios', data);

      addToast({
        type:'success',
        title:'Cadastro realizado com sucesso!',
      })

      history.push('/');

    } catch (err) {
      if (err instanceof Yup.ValidationError){
         const errors = getValidationErrors(err);

         formRef.current?.setErrors(errors);

         console.log(errors);

         addToast({
           type:'error',
           title:'Erro ao efetuar o cadastro!',
           description:'Verifique os campos foram preenchidos corretamente.'
         })
      }
   }
},[addToast, history])

  return (
    <div id='main-SignUpContainer'>
      <div className='left-content'>
        <img src={VectorBackground} className='VectorBackground'/>
        <img src={Vector} className='Vector'/>

        <Form ref={formRef} onSubmit={handleSubmit} className='form'>
          <Input type='textbox' name='nome' className='nome' placeholder='Nome Completo'/>
          <Input type='textbox' name='apelido' className='usuario' placeholder='Usuario'/>
          <Input type='email' name='email' className='email' placeholder='E-mail'/>
          <Input type='password' name='senha' className='password' placeholder='Senha'/>

          <Button type='submit' className='SendForm'>Cadastrar</Button>

        </Form>

          <Link to='/' className='SignInLink'>
            <FiArrowLeft size={30}/>
          </Link>

      </div>
      <div className='right-content'>
          
        <strong>MeuPlanner</strong>

        <img src={Notepad} className='NotepadImg'/>

        <span>Cadastre-se agora, é rapido e facil!</span>

        </div>
    </div>
  )
}

export default SignUp;