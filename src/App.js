import {useEffect, useState} from 'react';
import {ReactComponent as Dice} from './images/icon-dice.svg';
import './App.css';

function App() {
	const [data, setData] = useState({
		id: '',
		advice: '',
	});
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
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const {id, advice} = data;
	const quoteNumber = `ADVICE # ${id}`;
	const quoteText = `"${advice}"`;

	const loadingSpinner = (
		<div className='lds-spinner'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);

	return (
		<div>
			<div className='container'>
				<div className='card'>
					{loading && loadingSpinner}
					<p className='quote-number'>
						{!loading && quoteNumber.toUpperCase()}
					</p>
					<div className='quote-container'>
						{!loading && <p className='quote'>{quoteText}</p>}
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
