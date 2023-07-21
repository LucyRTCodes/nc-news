import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle, patchArticleVotes } from "../Api";
import Comments from "./Comments";
import ArticleVote from "./ArticleVote";
import Loading from "./Loading";
import Votes from "./Votes";

function Article({ setHeader, setCurrent }) {
	const { articleId } = useParams();
	const [article, setArticle] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setHeader("");
		fetchArticle(articleId)
			.then((article) => {
				setCurrent(article);
				setError("");
				setArticle(article);
			})
			.catch((err) => {
				if (err.response.status === 404) setError("Article not found");
				else setError("Something went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (error) return <p>{error}</p>;
	if (isLoading) return <Loading />;
	return (
		<div className="article-page">
			<h1 className="article-title">{article.title}</h1>

			<section className="article">
				<p>
					<i>
						{article.created_at.slice(0, 10)} {article.created_at.slice(11, 16)}
					</i>
				</p>
				<p>By {article.author}</p>
				<img className="article-image" src={article.article_img_url}></img>
				<p>{article.body}</p>
			</section>

			<section className="comments">
				<p>
					<b>Votes</b>
				</p>
				<Votes
					votes={article.votes}
					id={articleId}
					patchVotes={patchArticleVotes}
				/>
				<p>
					<b>Comments</b>
				</p>
				<Comments articleId={article.article_id} />
			</section>
		</div>
	);
}

export default Article;
