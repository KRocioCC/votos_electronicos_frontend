import { Link } from 'react-router-dom';

const Button = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="btn-primary"  // Usa la clase de Tailwind personalizada
    >
      {text}
    </Link>
  );
};

export default Button;