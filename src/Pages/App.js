import { useState } from 'react';
import gitLogo from '../Assets/github.png';
import Input from '../Components/Input/index';
import Button from '../Components/Button/index';
import ItemRepo from '../Components/ItemRepo/index';
import { api } from '../Service/api';
import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
      
    }
    alert('Repositório não encontrado')
  }


  const handleRemoveRepo = (id) => {
    setRepos(prevRepos => prevRepos.filter(repo => repo.id !== id));
  };
  
  return (
    <Container>
      <img src={gitLogo} width={144} height={72} alt="Logo Github" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
