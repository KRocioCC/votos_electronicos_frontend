import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-lg shadow p-8">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Voto electrónico"
        className="w-32 h-32 mb-6 drop-shadow-lg"
      />
      <h1 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
        Bienvenido al Sistema de Votos Electrónicos UMSA
      </h1>
      <p className="text-lg text-blue-900 mb-6 text-center max-w-xl">
        Este sistema te permite participar de manera segura, rápida y transparente en los procesos electorales de la universidad.
      </p>
      <div className="w-full max-w-2xl bg-blue-50 rounded-xl p-6 mb-8 shadow text-blue-900">
        <h2 className="text-xl font-bold mb-3">¿Cómo votar?</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Inicia sesión con tu correo institucional UMSA.</li>
          <li>Si eres estudiante o docente, accede a la sección <span className="font-semibold">Votar</span>.</li>
          <li>Selecciona tu opción preferida y confirma tu voto.</li>
          <li>Recuerda: solo puedes votar una vez por proceso electoral.</li>
        </ol>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow border border-blue-100 text-blue-900">
        <h2 className="text-lg font-semibold mb-2">¿Por qué usar voto electrónico?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Mayor seguridad y confidencialidad.</li>
          <li>Resultados inmediatos y sin errores humanos.</li>
          <li>Acceso desde cualquier lugar con tu cuenta institucional.</li>
        </ul>
      </div>
      <footer className="mt-10 text-blue-900 opacity-60 text-sm text-center">
        © {new Date().getFullYear()} UMSA - Sistema de Votación Electrónica
      </footer>
    </div>
  );
};

export default Home;