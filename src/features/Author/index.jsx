import axios from 'axios';
import React, {useEffect, useState} from 'react';
import style from './style.scss';

Author.propTypes = {};

function Author({getathor}) {
	const [quote, setQuote] = useState([]);
	const [authorAllquote, setAuthorAllquote] = useState();
	const [authorTitle, setAuthorTitle] = useState('');

	useEffect(() => {
		const getData = async () => {
			try {
				const getQuoteofAuthor = await axios({
					method: 'get',
					url: 'https://quote-garden.herokuapp.com/api/v3/quotes',
					params: {
						author: getathor,
					},
				});
				setQuote((prevArray) => [...prevArray, getQuoteofAuthor.data]);
			} catch (error) {
				console.log(error);
			}
		};
		getathor && getData();

		const timeWait = setTimeout(() => {
			setAuthorTitle(getathor);
		}, 600);
		return () => clearTimeout(timeWait);
	}, [getathor]);

	quote.length > 1 && quote.shift();

	useEffect(() => {
		quote?.map((quote) => {
			setAuthorAllquote(quote.data);
		});
	}, [quote]);

	return (
		<div className='quote-control'>
			<h2>{authorTitle}</h2>
			<div>
				{authorAllquote?.map((data, idx) => (
					<div className='boder-left' key={idx}>
						<p>"{data.quoteText}"</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Author;
