import { FaBell, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="navbar p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-blue-600">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 hover:text-blue-600 cursor-pointer" size={20} />
        <div className="flex items-center space-x-2">
          <FaUserCircle size={24} className="text-blue-600" />
          <span className="text-gray-700">Usuario</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;