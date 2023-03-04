import {useState} from 'react';
import {ReactComponent as DividerDesktop} from './images/pattern-divider-desktop.svg';
import {ReactComponent as Dice} from './images/icon-dice.svg';
import './App.css';

function App() {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	const handleClick = async () => {
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

	const {id, advice} = data;
	const adviceNumber = `Advise # ${id}`;

	return (
		<div>
			<div className='container'>
				<div className='card'>
					<p className='quote-number'>{adviceNumber.toUpperCase()}</p>
					<div className='quote-container'>
						{data !== {} && !loading && <p className='quote'>"{advice}"</p>}
					</div>
					<div className='divider'>
						<DividerDesktop />
					</div>
				</div>
				<div className='button' onClick={handleClick}>
					<div className='dice'>
						<Dice />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
