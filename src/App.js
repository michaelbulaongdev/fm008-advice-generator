import {useEffect, useState} from 'react';
import {ReactComponent as Divider} from './images/pattern-divider-mobile.svg';
import {ReactComponent as Dice} from './images/icon-dice.svg';
import './App.css';

function App() {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await (
				await fetch('https://api.adviceslip.com/advice')
			).json();
			setData(response.slip);
		} catch (err) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const {id, advice} = data;
	const quoteNumber = `ADVICE # ${id}`;
	const quoteText = `"${advice}"`;

	return (
		<div>
			<div className='container'>
				<div className='card'>
					<p className='quote-number'>
						{loading ? '' : quoteNumber.toUpperCase()}
					</p>
					<div className='quote-container'>
						<p className='quote'>{loading ? '' : quoteText}</p>
					</div>
					<div className='divider'>
						<Divider />
					</div>
				</div>
				<div className='button' onClick={fetchData}>
					<div className='dice'>
						<Dice />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
