import styles from './CreatePost.module.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState("");
	const {insertDocument, response} = useInsertDocument("Posts");
	const {user} = useAuthValue();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError("");
		try {
			new URL(image);
		} catch (error) {
			setFormError("A imagem precisa ser uma URL.");
			return;
		};
		const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

		if(!title || !image || !body || !tags){
			setFormError("Preencha todos os campos!");
		};

		insertDocument({
			title,
			image,
			body,
			tagsArray,
			uid: user.uid,
			createdBy: user.displayName
		});

		navigate('/');
	}

		return (
				<div className={styles.create_post}>
					<h2>CreatePost</h2>
					<p>Escreva sobre o que quiser e compartilhe conhecimento!</p>
					<form onSubmit={handleSubmit}>
						<label>
							<span>Título: </span>
							<input type="text" name='title' required placeholder='Título da postagem' value={title} onChange={(e) => {setTitle(e.target.value)}}/>
						</label>
						<label>
							<span>URL da Imagem: </span>
							<input type="text" name='image' required placeholder='Uma imagem para o post' value={image} onChange={(e) => {setImage(e.target.value)}}/>
						</label>
						<label>
							<span>Conteúdo: </span>
							<textarea name='body' required placeholder='Conteúdo da postagem' value={body} onChange={(e) => {setBody(e.target.value)}}/>
						</label>
						<label>
							<span>Tags: </span>
							<input type="text" name='tags' required placeholder='Insira as tags separadas por vírgula' value={tags} onChange={(e) => {setTags(e.target.value)}}/>
						</label>
						{!response.loading  && (
							<button className='btn'>Salvar</button>
						)}
						{response.loading  && (
							<button className='btn' disabled>Aguarde...</button>
						)}	
						{response.error && (
							<p className={styles.error}>{response.error}</p>
						)}
						{formError && (
							<p className={styles.error}>{formError}</p>
						)}
					</form>
				</div>
		)
};

export default CreatePost;