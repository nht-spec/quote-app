import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Author from '../Author';
import style from './style.scss';
Quote.propTypes = {};

function Quote() {
	const [quoteRandom, setQuoteRandom] = useState('');
	const [quoteInfo, setQuoteInfo] = useState('');
	const [author, setAuthor] = useState('');
	const [status, setStatus] = useState(false);

	useEffect(() => {
		if (!quoteInfo) {
			getData();
		}
	}, [quoteInfo]);

	const getData = async () => {
		try {
			const getRandomQuote = await axios.get(
				'https://quote-garden.herokuapp.com/api/v3/quotes/random'
			);
			setQuoteRandom(getRandomQuote.data);
		} catch (error) {
			console.log(error);
		}
		setStatus(false);
	};

	useEffect(() => {
		quoteRandom.data?.forEach((data) => {
			setQuoteInfo(data);
		});
	}, [quoteRandom]);

	const handleGetAuthor = (author) => {
		setAuthor(author);
		setStatus(true);
	};

	return (
		<div>
			<div className='random-quote-control'>
				<button class='btn-random' onClick={() => getData()}>
					random
				</button>
				<span class='material-icons'>autorenew</span>
			</div>
			{status === false ? (
				<div className='quoteRandom-control' key={quoteInfo.id}>
					<div className='boder-left'>
						<p className='quote-text'>"{quoteInfo.quoteText}"</p>
					</div>
					<div
						className='quote-author-genre'
						onClick={(e) => handleGetAuthor(quoteInfo.quoteAuthor)}
					>
						<div>
							<h2>{quoteInfo.quoteAuthor}</h2>
							<span>{quoteInfo.quoteGenre}</span>
						</div>
						<span class='material-icons'>arrow_right_alt</span>
					</div>
				</div>
			) : (
				<div>
					<Author getathor={author} />
				</div>
			)}
		</div>
	);
}

export default Quote;
