const About = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Propuestas de los Partidos Políticos</h1>
      <p className="mb-6 text-blue-900">
        Conoce las propuestas presentadas por los partidos políticos participantes en el proceso electoral de la UMSA. Esta información te ayudará a tomar una decisión informada al momento de emitir tu voto.
      </p>
      <div className="space-y-8">
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Partido Nacional <span className="text-base text-blue-700 font-normal"></span></h2>
          <ul className="list-disc list-inside text-black space-y-2 text-base">
            <li>Implementación de un programa integral de becas para estudiantes destacados y de bajos recursos.</li>
            <li>Modernización de laboratorios y bibliotecas con tecnología de punta y acceso digital a recursos académicos.</li>
            <li>Creación de un sistema de tutorías personalizadas para mejorar el rendimiento académico.</li>
            <li>Fomento de la transparencia en la gestión universitaria mediante plataformas abiertas de información.</li>
            <li>Impulso a la internacionalización de la universidad a través de convenios con instituciones extranjeras.</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Partido Verde <span className="text-base text-blue-700 font-normal"></span></h2>
          <ul className="list-disc list-inside text-black space-y-2 text-base">
            <li>Desarrollo de campañas de concientización ambiental y reciclaje en toda la universidad.</li>
            <li>Implementación de energías renovables en los edificios universitarios para reducir la huella de carbono.</li>
            <li>Creación de huertos ecológicos y espacios verdes para la comunidad universitaria.</li>
            <li>Promoción de la movilidad sostenible mediante incentivos para el uso de bicicletas y transporte público.</li>
            <li>Integración de la educación ambiental en el currículo de todas las carreras.</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Partido Liberal <span className="text-base text-blue-700 font-normal"></span></h2>
          <ul className="list-disc list-inside text-black space-y-2 text-base">
            <li>Fomento al emprendimiento estudiantil mediante incubadoras y fondos de apoyo a proyectos innovadores.</li>
            <li>Defensa de la libertad académica y la autonomía universitaria en la toma de decisiones.</li>
            <li>Mejoras en los servicios de bienestar universitario, incluyendo salud mental y asesoría legal gratuita.</li>
            <li>Impulso a la participación estudiantil en órganos de gobierno universitario.</li>
            <li>Promoción de intercambios y pasantías nacionales e internacionales para estudiantes y docentes.</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Partido del Pueblo <span className="text-base text-blue-700 font-normal"></span></h2>
          <ul className="list-disc list-inside text-black space-y-2 text-base">
            <li>Acceso gratuito a materiales y recursos educativos para todos los estudiantes.</li>
            <li>Creación de comedores universitarios con menús saludables y precios accesibles.</li>
            <li>Fortalecimiento de los programas de inclusión y apoyo a estudiantes con discapacidad.</li>
            <li>Organización de ferias de empleo y prácticas profesionales en coordinación con empresas locales.</li>
            <li>Defensa de los derechos estudiantiles y promoción de la participación activa en la vida universitaria.</li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-blue-900 text-center text-sm opacity-70">
        Si deseas conocer más detalles sobre cada propuesta, puedes consultar los documentos oficiales de cada partido o acercarte a sus representantes.
      </p>
    </div>
  );
};

export default About;