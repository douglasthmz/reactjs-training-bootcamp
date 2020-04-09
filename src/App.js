import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const exampleRepo = {
      url: 'https://github.com/Rocketseat/umbriel',
      title: `New title ${Date.now()}`,
      techs: ['Node', 'Express', 'TypeScript'],
    };

    let res = await api.post('repositories', exampleRepo);

    console.log(res.data);

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    let res = await api.delete(`repositories/${id}`);

    if (res.status !== 204) {
      return;
    }
    const updateRepos = repositories.filter((repo) => repo.id !== id);
    setRepositories(updateRepos);
  }

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {console.log(repositories)}
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
