import styles from './Search.module.css';

import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostDetails from '../../components/PostDetails';
import { Link } from 'react-router-dom';

const Search = () => {
	const query = useQuery();
	const search = query.get("q");
	const {documents: posts} = useFetchDocuments("Posts", search);
		return (
				<div className={styles.search_container}>
					<h1>Resultados</h1>
						{posts && posts.length === 0 && (
							<>
								<p>Não foram encontrados posts a partir da sua busca</p>
								<Link to="/" className='btn btn-dark'>Voltar</Link>
							</>
						)}
					{posts && posts.map((post) => <PostDetails post={post} key={post.id}/>)}
				</div>
		)
}

export default Search