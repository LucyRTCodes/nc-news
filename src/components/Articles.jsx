import { useEffect, useState } from "react";
import { fetchArticles } from "../Api";
import { Link, useParams } from "react-router-dom";
import { BsHeartFill, BsHeartbreakFill } from "react-icons/bs";
import SortArticles from "./SortArticles";
import Loading from "./Loading";
import Error from "./Error";

function Articles({ setHeader, articles, setArticles }) {
	const { topic } = useParams();
	const [order, setOrder] = useState(null);
	const [sortBy, setSortBy] = useState("created_at");
	const [isLoading, setIsLoading] = useState(true);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		setHeader(topic ? topic[0].toUpperCase() + topic.slice(1) : "Articles");
		setIsLoading(true);
		fetchArticles(topic, order, sortBy)
			.then((articles) => {
				setArticles(articles);
			})
			.catch((err) => {
				setStatus(err.response.status);
				setError(err.response.data.msg);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [topic, order, sortBy]);

	if (isLoading) return <Loading />;
	if (error) return <Error status={status} error={error} />;
	return (
		<div className="content">
			<SortArticles
				setOrder={setOrder}
				order={order}
				setSortBy={setSortBy}
				sortBy={sortBy}
			/>
			<div>
				{articles.map(
					(
						{ article_id, title, author, created_at, comment_count, votes },
						index
					) => {
						return (
							<div key={created_at + index} className="article-card">
								<Link to={`/articles/${article_id}`}>
									<h2>
										<b>{title}</b>
									</h2>
								</Link>
								<h3>By {author}</h3>
								<p>{created_at.slice(0, 10)}</p>
								<p style={{ wordSpacing: 5 }}>
									{votes >= 0 ? (
										<BsHeartFill style={{ marginRight: "10px" }} />
									) : (
										<BsHeartbreakFill style={{ marginRight: "10px" }} />
									)}
									Votes: {votes} Comments: {comment_count}
								</p>
								<p></p>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
}

export default Articles;
