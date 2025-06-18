const Contact = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-blue-900 mb-2">Contacto</h1>
      <p className="mb-4 text-gray-700">
        Si tienes problemas para realizar tu votación o tu correo institucional no es autenticado, puedes comunicarte con el soporte del sistema:
      </p>
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-black">
        <p className="mb-2"><span className="font-semibold">Correo:</span> soporte.votacion@umsa.bo</p>
        <p><span className="font-semibold">Teléfono:</span> +591 700 12345</p>
      </div>
      <p className="mt-4 text-sm text-blue-900 opacity-70">
        El equipo de soporte responderá tus consultas lo antes posible.
      </p>
    </div>
  );
};

export default Contact;