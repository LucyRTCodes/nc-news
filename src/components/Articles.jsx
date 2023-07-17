import { useEffect, useState } from "react";
import { fetchArticles } from "../App";

function Articles() {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		fetchArticles()
			.then((articles) => {
				setArticles(articles);
			})
			.catch((err) => {
				setError("Something went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h1>Articles</h1>
			{articles.map(({ title, author, created_at, votes }, index) => {
				return (
					<div key={created_at + index} className="article-card">
						<p>
							<strong>{title}</strong>
						</p>
						<p>By {author}</p>
						<p>{created_at.slice(0, 10)}</p>
						<p>votes: {votes}</p>
					</div>
				);
			})}
		</div>
	);
}

export default Articles;
