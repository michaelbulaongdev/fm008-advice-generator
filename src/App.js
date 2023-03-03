import {useState} from 'react';
import './App.css';

function App() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const api = 'https://api.adviceslip.com/advice';

	const fetchData = async (api) => {
		setLoading(true);
		try {
			const response = await fetch(api);

			if (!response.ok) {
				throw new Error(response.status);
			}
			let actualData = await response.json();
			setData(actualData);
			setError(null);
		} catch (err) {
			setError(err.message);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className='container'>
				<div className='card'>
					<p className='adviseNumber'>Advise # {data.slip_id}</p>
					<div className='advise-container'>
						{loading && <p>Seeking advise...</p>}
						{error && <p>Seek again...</p>}
						{data !== null && <p className='advise'>`"${data.advise}"`</p>}
					</div>
					<div className='divider'></div>
				</div>
				<div onClick={fetchData(api)} className='btn-container'>
					<div className='dice'></div>
				</div>
			</div>
		</div>
	);
}

export default App;
