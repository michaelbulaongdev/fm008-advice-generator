import {useState} from 'react';
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

	return (
		<div>
			<div className='container'>
				<div className='card'>
					<p className='quote-number'>Advise # {id}</p>
					<div className='quote-container'>
						{data !== {} && !loading && <p className='quote'>"{advice}"</p>}
					</div>
					<div className='divider'></div>
				</div>
				<div className='btn-container'>
					<button onClick={handleClick}>Click Me</button>
					<div className='dice'></div>
				</div>
			</div>
		</div>
	);
}

export default App;
