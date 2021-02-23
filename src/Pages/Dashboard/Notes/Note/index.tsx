import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../../../Utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import TextArea from '../../../../Components/TextField';

/* CSS */
import './styles.css';
import api from '../../../../Services/api';
import { useToast } from '../../../../Hooks/ToastContext';

interface SignUpData {
	titulo: String;
	descricao: String;
}

const AddNote: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const {addToast} = useToast();
	const CurrentUser = (localStorage.getItem('@MeuPlanner:usuario') as string);

	const handleSubmit = useCallback(async(data:SignUpData) => {
			try{
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					titulo: Yup.string().required(' '),
					descricao: Yup.string().required(' '),
				});

				await schema.validate(data,{
					abortEarly:false,
				})

				console.log(data);

				api.post('/anotacoes', data)

				addToast({
					type:'success',
					title:'Registro realizado!'
				})

			} catch (err) {
				if (err instanceof Yup.ValidationError){
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)
					console.log(err);

					addToast({
						type:'error',
						title:'Erro ao registrar anotação',
						description:'Verifique o preencimento dos campos obrigatórios'
					})
				}
			}
		},[])

	return(
		<div id='main-addNote'>
				<div className='content'>
				<strong>Nova anotação</strong>
	
					<Form ref={formRef} onSubmit={handleSubmit} className='form'>
						<Input name='titulo' className='titulo' placeholder='Titulo'/>
						<TextArea name='descricao' className='descricao' rows={7}/>
						<Input name='owner_user_apelido' value={CurrentUser} hidden={true} />

						<Button type='submit' className='btn_salvar'> Salvar </Button>
					</Form>
				</div>
		</div>
	)
}

export default AddNote;