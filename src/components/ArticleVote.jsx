import { useState } from "react";
import {
	BsHeart,
	BsHeartFill,
	BsHeartbreak,
	BsHeartbreakFill,
} from "react-icons/bs";
import { patchArticleVotes } from "../Api";

function ArticleVote({ votes, articleId }) {
	const [voteCount, setVoteCount] = useState(0);
	const updateVotes = (display, actual) => {
		setVoteCount(display);
		patchArticleVotes(articleId, actual).catch(() => {
			setVoteCount(0);
		});
	};

	return (
		<div className="votes">
			{voteCount === 1 ? (
				<BsHeartFill
					size={20}
					onClick={(e) => {
						updateVotes(0, -1);
					}}
				/>
			) : (
				<BsHeart
					size={20}
					onClick={(e) => {
						updateVotes(1, 1);
					}}
				/>
			)}

			<p>{votes + voteCount}</p>
			{voteCount === -1 ? (
				<BsHeartbreakFill
					size={20}
					onClick={(e) => {
						updateVotes(0, 1);
					}}
				/>
			) : (
				<BsHeartbreak
					size={20}
					onClick={(e) => {
						updateVotes(-1, -1);
					}}
				/>
			)}
		</div>
	);
}

export default ArticleVote;
