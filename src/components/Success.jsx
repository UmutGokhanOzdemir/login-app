import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center' }}>
      <h1>Success</h1>
      <p>Giriş başarılı. Hoş geldin!</p>
      <Button color="primary" onClick={() => navigate('/')}>
        Geri dön
      </Button>
    </div>
  );
}