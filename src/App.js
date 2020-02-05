import React, { useState } from 'react';
import './media.css';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
	const [text, setText] = useState('');
	const [memes, setMemes] = useState([]);

	async function getMemes() {
		const key = 'koPIZe5K7AQl3ZbCeEbNMiLItDyZ1kYF';
		let url = 'https://api.giphy.com/v1/gifs/search?';
		url += 'api_key=' + key;
		url += '&q=' + text;
		const r = await fetch(url);
		const body = await r.json();
		setMemes(body.data);
		setText('');
	}

	return (
		<div className="App">
			<header className="App-header">
				<div className="input-wrap">
					<TextField
						value={text}
						fullWidth
						label="Search for memes!"
						variant="outlined"
						onChange={e => setText(e.target.value)}
						onKeyPress={e => {
							if (e.key === 'Enter') getMemes();
						}}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={getMemes}
					>
						Primary
					</Button>
				</div>
			</header>
			<div className="memes">
				{memes.map((meme, i) => (
					<Meme key={i} {...meme} />
				))}
			</div>
		</div>
	);
}

function Meme({ title, images }) {
	return (
		<div className="meme">
			<img src={images.fixed_height.url} alt="meme" />
			<div className="meme-title">{title}</div>
		</div>
	);
}

export default App;
