import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { Home } from 'lucide-react';

export function BackToHomeButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="secondary"
      leftIcon={<Home className="w-5 h-5" />}
      onClick={() => navigate('/')}
    >
      Dashboard
    </Button>
  );
}
