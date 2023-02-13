import styles from './Home.module.css';

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';


const Home = () => {
	const [search, setSearch] = useState("");
	const {documents: posts, loading} = useFetchDocuments("Posts");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if(search){
			return navigate(`search/?q=${search}`);
		}
	};

		return (
				<div className={styles.home}>
					<h1>Veja os nossos posts mais recentes</h1>
					<form onSubmit={handleSubmit} className={styles.search_form}>
						<input type="text" placeholder='Ou busque por tags...' onChange={(e) => setSearch(e.target.value)}/>
						<button className='btn btn-dark'>Pesquisar</button>
					</form>
					<div>
						{loading && (
						<p>Carregando...</p>
						)}
						{posts && posts.map((post) => <PostDetails post={post} key={post.id}/>)}
						{posts && posts.length === 0 && (
							<div className={styles.noposts}>
								<p>Não foram encontrados posts</p>
								<Link to="posts/create" className='btn'>Criar primeiro Post</Link>
							</div>
						)}
					</div>
				</div>
		)
}

export default Home