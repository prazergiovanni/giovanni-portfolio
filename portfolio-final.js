(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const langs = ['en', 'pt', 'es'];
  const htmlKeys = new Set(['ticker.label', 'remote.rail']);

  const text = {
    en: {
      'nav.remote': 'Remote Work', 'nav.capabilities': 'Capabilities', 'nav.practiceAreas': 'Practice Areas', 'nav.journey': 'Journey', 'nav.moments': 'Highlights', 'nav.about': 'About', 'nav.resume': 'Resume', 'nav.contact': 'Contact',
      'hero.kicker': 'SYSTEMS FOR A MORE HUMAN TOMORROW', 'hero.titleLine1': 'Operations,', 'hero.titleLine2': 'Systems &', 'hero.titleLine3': 'Automation', 'hero.support': 'I turn operational friction into practical systems that make work move.',
      'ticker.label': 'TOOLS &<br>TECHNOLOGIES', 'ticker.1': 'CRM & Customer Journey', 'ticker.2': 'Transaction Coordination', 'ticker.3': 'Video Editing', 'ticker.4': 'Sales Prospecting', 'ticker.5': 'Business Operations', 'ticker.6': 'Systems & Automation', 'ticker.7': 'U.S. Real Estate', 'ticker.signature': 'IDEAS TO OPERATIONS',
      'remote.kicker': 'REMOTE WORK', 'remote.titleLine1': 'Remote doesn’t', 'remote.titleLine2': 'mean distant.', 'remote.rail': 'SAME<br>FOCUS<br>DIFFERENT<br>LOCATION',
      'remote.body1': 'Supporting U.S. real estate operations remotely across North and South Carolina with clarity, coordination and follow-through. From CRM management to client support, I help keep operations organized, people informed and results moving — no matter the distance.',
      'remote.body2': '',
      'remote.body3': '',
      'remote.m1': 'REMOTE SINCE 2014', 'remote.m2': '100% REMOTE · 2023–2026', 'remote.m3': 'BRAZIL ↔ U.S. OPERATIONS',
      'remote.e1Label': 'REMOTE SINCE 2014', 'remote.e1Body': 'Independent digital work', 'remote.e2Label': '100% REMOTE · 2023–2026', 'remote.e2Body': 'U.S. real estate operations', 'remote.e3Label': 'NORTH + SOUTH CAROLINA', 'remote.e3Body': 'Cross-state operational support', 'remote.e4Label': 'EN C1 · PT NATIVE · ES INTERMEDIATE', 'remote.e4Body': 'Communication across contexts', 'remote.s1': 'Self-Directed Learner', 'remote.s2': 'Clear Communicator', 'remote.s3': 'Reliable Follow-Through', 'remote.signature': 'A MORE HUMAN TOMORROW',
      'cap.kicker': 'CAPABILITIES', 'cap.title': 'I learn the operation, find the friction, and improve the flow.', 'cap.body': 'Across business operations, real estate, CRM, digital work and automation, I focus on clearer information, fewer manual steps and more reliable execution.',
      'cap1.t': 'Business Operations', 'cap1.b': 'Coordination, documentation, schedules, follow-up, handoffs and cross-functional execution.', 'cap2.t': 'Systems & Automation', 'cap2.b': 'Custom workflows, CRM logic, operational controls and AI-assisted tools built around real work.', 'cap3.t': 'U.S. Real Estate Operations', 'cap3.b': 'Buyer and seller transaction coordination, MLS Canopy, SkySlope, Zillow Showcase and CMA support.', 'cap4.t': 'Customer Journey & CRM', 'cap4.b': 'Lead intake, pipeline organization, follow-up, marketing actions and continuity through closing.', 'cap5.t': 'Digital & Web', 'cap5.b': 'WordPress, legacy preservation, SEO content, YouTube workflows and digital production.', 'cap6.t': 'Communication, Sales & Client Support', 'cap6.b': 'English/Portuguese communication, teaching, interpretation, sales prospecting, marketing and client support.',
      'case1.tag': 'PRACTICE AREA 01 · REAL ESTATE OPERATIONS', 'case2.tag': 'PRACTICE AREA 02 · OPERATIONAL SYSTEMS & WORKFLOW DESIGN', 'case3.tag': 'PRACTICE AREA 04 · WEB DESIGN & DIGITAL PRESERVATION', 'work04.tag': 'PRACTICE AREA 05 · PROFESSIONAL POSITIONING & DIGITAL PRESENCE',
      'mom.kicker': 'CAREER HIGHLIGHTS', 'mom.title': 'International interpretation, teaching, prospecting and continuous learning.', 'mom.body': 'Experience across different environments strengthened communication, adaptability and confidence under pressure.', 'm5.t': 'Approximately 60 SEBRAE courses',
      'm6.k': 'EDUCATION', 'm6.t': 'High school + technical Electromechanics', 'm6.b': 'High school education and technical training in Electromechanics.', 'm7.k': 'TRAINING', 'm7.t': 'Enneagram Institute training · IPOG', 'm7.b': 'Training in Enneagram Institute content at IPOG.',
      'f1.b': 'Fluent C1', 'f2.b': 'Native', 'f3.b': '3 years · buyer & seller operations', 'cta.kicker': 'OPEN TO INTERNATIONAL REMOTE WORK', 'cta.body': 'Open to international remote opportunities across operations, systems, implementation, executive and client support, real estate operations, CRM, digital operations and adjacent work where organization, initiative and process improvement matter.', 'footer.quote': 'Operations create freedom when designed with intention.', 'footer.quoteLabel': 'CLOSING THOUGHT',
      'practice.kicker': 'PRACTICE AREAS', 'practice.title': 'Applied work, organized as an operating system.', 'practice.body': 'Five connected areas show where the same discipline becomes useful: real estate operations, workflow design, content, web continuity and professional positioning.', 'practice.1.t': 'Real Estate Operations', 'practice.1.b': 'Transactions, listings and continuity.', 'practice.2.t': 'Operational Systems & Workflow Design', 'practice.2.b': 'Capture, validate and reuse information.', 'practice.3.t': 'Content Operations', 'practice.3.b': 'Edit, review and publish with rhythm.', 'practice.4.t': 'Web Design & Digital Preservation', 'practice.4.b': 'Move forward without losing history.', 'practice.5.t': 'Professional Positioning & Digital Presence', 'practice.5.b': 'Turn context into an honest public system.', 'work04.title': 'From a fragmented professional trajectory to a system for identity, practice, portfolio and activation.', 'work04.body': 'I structured an end-to-end project for an architect returning to professional practice. The work connected an identity interview, positioning, website, private development environment, data recovery and persistence, conceptual studies and opportunity research. The goal was not to manufacture experience, but to create a system that helps the professional learn, produce evidence, present herself honestly and return to the market.', 'work04.s1t': 'Diagnose', 'work04.s1b': 'Turn diffuse context into criteria and priorities.', 'work04.s2t': 'Structure', 'work04.s2b': 'Connect identity, learning, data and digital presence.', 'work04.s3t': 'Activate', 'work04.s3b': 'Connect the system to real opportunities and next actions.', 'work04.map': 'POSITIONING SYSTEM · PUBLIC METHOD', 'work04.m1t': 'Friction', 'work04.m1b': 'Fragmented trajectory and disconnected presentation.', 'work04.m2t': 'Diagnosis', 'work04.m2b': 'Identity, skills, interests, market and opportunities brought into view.', 'work04.m3t': 'System', 'work04.m3b': 'Interview, persona, portfolio, learning, research and activation plan.', 'work04.m4t': 'Flow', 'work04.m4b': 'Dispersed information becomes executable professional positioning.'
    },
    pt: {
      'nav.remote': 'Trabalho remoto', 'nav.capabilities': 'Competências', 'nav.practiceAreas': 'Áreas de atuação', 'nav.journey': 'Trajetória', 'nav.moments': 'Destaques', 'nav.about': 'Sobre', 'nav.resume': 'Currículo', 'nav.contact': 'Contato',
      'hero.kicker': 'SISTEMAS PARA UM AMANHÃ MAIS HUMANO', 'hero.titleLine1': 'Operações,', 'hero.titleLine2': 'Sistemas e', 'hero.titleLine3': 'Automação', 'hero.support': 'Transformo atrito operacional em sistemas práticos que fazem o trabalho andar.',
      'ticker.label': 'FERRAMENTAS &<br>TECNOLOGIAS', 'ticker.1': 'CRM e jornada do cliente', 'ticker.2': 'Coordenação de transações', 'ticker.3': 'Edição de vídeo', 'ticker.4': 'Prospecção de vendas', 'ticker.5': 'Operações empresariais', 'ticker.6': 'Sistemas e automação', 'ticker.7': 'Mercado imobiliário nos EUA', 'ticker.signature': 'IDEIAS PARA OPERAÇÕES',
      'remote.kicker': 'TRABALHO REMOTO', 'remote.titleLine1': 'Trabalho remoto', 'remote.titleLine2': 'não significa distância.', 'remote.rail': 'MESMO<br>FOCO<br>LOCAIS<br>DIFERENTES',
      'remote.body1': 'Apoio operações imobiliárias nos Estados Unidos, na Carolina do Norte e na Carolina do Sul, trabalhando remotamente com clareza, coordenação e continuidade. Do CRM ao suporte a clientes, ajudo a manter a operação organizada, as pessoas informadas e os resultados em movimento, independentemente da distância.',
      'remote.body2': '',
      'remote.body3': '',
      'remote.m1': 'REMOTO DESDE 2014', 'remote.m2': '100% REMOTO · 2023–2026', 'remote.m3': 'BRASIL ↔ OPERAÇÕES NOS EUA',
      'remote.e1Label': 'REMOTO DESDE 2014', 'remote.e1Body': 'Trabalho digital independente', 'remote.e2Label': '100% REMOTO · 2023–2026', 'remote.e2Body': 'Operações imobiliárias nos EUA', 'remote.e3Label': 'NORTE + SUL DA CAROLINA', 'remote.e3Body': 'Suporte operacional entre estados', 'remote.e4Label': 'EN C1 · PT NATIVO · ES INTERMEDIÁRIO', 'remote.e4Body': 'Comunicação entre contextos', 'remote.s1': 'Aprendo com autonomia', 'remote.s2': 'Comunico com clareza', 'remote.s3': 'Levo até o fim', 'remote.signature': 'UM AMANHÃ MAIS HUMANO',
      'cap.kicker': 'COMPETÊNCIAS', 'cap.title': 'Entendo a operação, identifico o atrito e melhoro o fluxo.', 'cap.body': 'Em operações empresariais, mercado imobiliário, CRM, trabalho digital e automação, meu foco é organizar melhor a informação, reduzir etapas manuais e tornar a execução mais confiável.', 'cap1.t': 'Operações Empresariais', 'cap1.b': 'Coordenação, documentação, agendas, acompanhamento, transições e execução entre áreas.', 'cap2.t': 'Sistemas e Automação', 'cap2.b': 'Fluxos personalizados, lógica de CRM, controles operacionais e ferramentas com apoio de IA construídas para o trabalho real.', 'cap3.t': 'Operações Imobiliárias nos EUA', 'cap3.b': 'Coordenação de transações de compradores e vendedores, MLS Canopy, SkySlope, Zillow Showcase e suporte a CMA.', 'cap4.t': 'Jornada do Cliente e CRM', 'cap4.b': 'Entrada de leads, organização do funil, acompanhamento, ações de marketing e continuidade até o fechamento.', 'cap5.t': 'Web e Operações Digitais', 'cap5.b': 'WordPress, preservação de legado, conteúdo para SEO, fluxos de YouTube e produção digital.', 'cap6.t': 'Comunicação, Vendas e Atendimento ao Cliente', 'cap6.b': 'Comunicação em inglês e português, ensino, interpretação, prospecção de vendas, marketing e atendimento ao cliente.',
      'case1.tag': 'ÁREA 01 · OPERAÇÕES IMOBILIÁRIAS', 'case2.tag': 'ÁREA 02 · SISTEMAS OPERACIONAIS E DESENHO DE FLUXOS', 'case3.tag': 'ÁREA 04 · DESIGN WEB E PRESERVAÇÃO DIGITAL', 'work04.tag': 'ÁREA 05 · POSICIONAMENTO PROFISSIONAL E PRESENÇA DIGITAL',
      'mom.kicker': 'DESTAQUES DA TRAJETÓRIA', 'mom.title': 'Interpretação internacional, ensino, prospecção e formação continuada.', 'mom.body': 'Experiências em ambientes distintos reforçaram comunicação, adaptabilidade e segurança sob pressão.', 'm5.t': 'Aproximadamente 60 cursos SEBRAE', 'm6.k': 'FORMAÇÃO', 'm6.t': 'Ensino médio + técnico em Eletromecânica', 'm6.b': 'Ensino médio e formação técnica em Eletromecânica.', 'm7.k': 'TREINAMENTO', 'm7.t': 'Treinamento Enneagram Institute · IPOG', 'm7.b': 'Treinamento em conteúdos do Enneagram Institute no IPOG.',
      'f1.b': 'Fluente C1', 'f2.b': 'Nativo', 'f3.b': '3 anos · operações de compradores e vendedores', 'cta.kicker': 'DISPONÍVEL PARA TRABALHO REMOTO INTERNACIONAL', 'cta.body': 'Aberto a oportunidades remotas internacionais em operações, sistemas, implementação, suporte executivo e a clientes, operações imobiliárias, CRM, operações digitais e frentes adjacentes nas quais organização, iniciativa e melhoria de processos façam diferença.', 'footer.quote': 'Operações criam liberdade quando desenhadas com intenção.', 'footer.quoteLabel': 'PENSAMENTO DE FECHAMENTO',
      'practice.kicker': 'ÁREAS DE ATUAÇÃO', 'practice.title': 'Atuação prática, organizada como um sistema operacional.', 'practice.body': 'Cinco áreas conectadas mostram onde a mesma disciplina se torna útil: operações imobiliárias, desenho de fluxos, conteúdo, continuidade web e posicionamento profissional.', 'practice.1.t': 'Operações Imobiliárias', 'practice.1.b': 'Transações, imóveis e continuidade.', 'practice.2.t': 'Sistemas Operacionais e Desenho de Fluxos', 'practice.2.b': 'Capturar, validar e reutilizar informação.', 'practice.3.t': 'Operações de Conteúdo', 'practice.3.b': 'Editar, revisar e publicar com ritmo.', 'practice.4.t': 'Design Web e Preservação Digital', 'practice.4.b': 'Avançar sem perder a história.', 'practice.5.t': 'Posicionamento Profissional e Presença Digital', 'practice.5.b': 'Transformar contexto em um sistema público honesto.', 'work04.title': 'De uma trajetória profissional fragmentada a um sistema de identidade, prática, portfólio e ativação.', 'work04.body': 'Estruturei um projeto de ponta a ponta para uma arquiteta que retornava à prática profissional. O trabalho conectou entrevista de identidade, posicionamento, site, ambiente privado de desenvolvimento, recuperação e persistência de dados, estudos conceituais e pesquisa de oportunidades. O objetivo não era fabricar experiência, mas criar um sistema que ajudasse a profissional a aprender, produzir evidências, apresentar-se com honestidade e retornar ao mercado.', 'work04.s1t': 'Diagnosticar', 'work04.s1b': 'Transformar contexto difuso em critérios e prioridades.', 'work04.s2t': 'Estruturar', 'work04.s2b': 'Conectar identidade, aprendizagem, dados e presença digital.', 'work04.s3t': 'Ativar', 'work04.s3b': 'Conectar o sistema a oportunidades reais e próximas ações.', 'work04.map': 'SISTEMA DE POSICIONAMENTO · MÉTODO PÚBLICO', 'work04.m1t': 'Atrito', 'work04.m1b': 'Trajetória fragmentada e apresentação desconectada.', 'work04.m2t': 'Diagnóstico', 'work04.m2b': 'Identidade, habilidades, interesses, mercado e oportunidades trazidos para o campo de visão.', 'work04.m3t': 'Sistema', 'work04.m3b': 'Entrevista, persona, portfólio, aprendizagem, pesquisa e plano de ativação.', 'work04.m4t': 'Fluxo', 'work04.m4b': 'Informação dispersa se torna posicionamento profissional executável.'
    },
    es: {
      'nav.remote': 'Trabajo remoto', 'nav.capabilities': 'Capacidades', 'nav.practiceAreas': 'Áreas de actuación', 'nav.journey': 'Trayectoria', 'nav.moments': 'Hitos', 'nav.about': 'Sobre mí', 'nav.resume': 'CV', 'nav.contact': 'Contacto',
      'hero.kicker': 'SISTEMAS PARA UN MAÑANA MÁS HUMANO', 'hero.titleLine1': 'Operaciones,', 'hero.titleLine2': 'Sistemas y', 'hero.titleLine3': 'Automatización', 'hero.support': 'Transformo la fricción operativa en sistemas prácticos que hacen avanzar el trabajo.',
      'ticker.label': 'HERRAMIENTAS &<br>TECNOLOGÍAS', 'ticker.1': 'CRM y experiencia del cliente', 'ticker.2': 'Coordinación de transacciones', 'ticker.3': 'Edición de vídeo', 'ticker.4': 'Prospección de ventas', 'ticker.5': 'Operaciones empresariales', 'ticker.6': 'Sistemas y automatización', 'ticker.7': 'Sector inmobiliario en EE. UU.', 'ticker.signature': 'IDEAS A OPERACIONES',
      'remote.kicker': 'TRABAJO REMOTO', 'remote.titleLine1': 'Trabajar en remoto', 'remote.titleLine2': 'no significa distancia.', 'remote.rail': 'MISMO<br>FOCO<br>LUGARES<br>DIFERENTES',
      'remote.body1': 'Apoyo operaciones inmobiliarias en Estados Unidos, en Carolina del Norte y Carolina del Sur, trabajando a distancia con claridad, coordinación y seguimiento. Desde la gestión del CRM hasta la atención al cliente, ayudo a mantener la operación organizada, a las personas informadas y los resultados en movimiento, sin importar la distancia.',
      'remote.body2': '',
      'remote.body3': '',
      'remote.m1': 'REMOTO DESDE 2014', 'remote.m2': '100 % REMOTO · 2023–2026', 'remote.m3': 'BRASIL ↔ OPERACIONES EN EE. UU.',
      'remote.e1Label': 'EN REMOTO DESDE 2014', 'remote.e1Body': 'Trabajo digital independiente', 'remote.e2Label': '100 % REMOTO · 2023–2026', 'remote.e2Body': 'Operaciones inmobiliarias en EE. UU.', 'remote.e3Label': 'CAROLINA DEL NORTE + SUR', 'remote.e3Body': 'Soporte operativo entre estados', 'remote.e4Label': 'EN C1 · PT NATIVO · ES INTERMEDIO', 'remote.e4Body': 'Comunicación entre contextos', 'remote.s1': 'Aprendo con autonomía', 'remote.s2': 'Comunico con claridad', 'remote.s3': 'Llevo las cosas hasta el final', 'remote.signature': 'UN MAÑANA MÁS HUMANO',
      'cap.kicker': 'CAPACIDADES', 'cap.title': 'Entiendo la operación, encuentro la fricción y mejoro el flujo.', 'cap.body': 'En operaciones empresariales, sector inmobiliario, CRM, trabajo digital y automatización, me enfoco en información más clara, menos pasos manuales y una ejecución más fiable.', 'cap1.t': 'Operaciones Empresariales', 'cap1.b': 'Coordinación, documentación, agendas, seguimiento, traspasos y ejecución entre áreas.', 'cap2.t': 'Sistemas y Automatización', 'cap2.b': 'Flujos personalizados, lógica de CRM, controles operativos y herramientas con apoyo de IA creadas para el trabajo real.', 'cap3.t': 'Operaciones Inmobiliarias en EE. UU.', 'cap3.b': 'Coordinación de transacciones de compradores y vendedores, MLS Canopy, SkySlope, Zillow Showcase y apoyo a CMA.', 'cap4.t': 'Experiencia del Cliente y CRM', 'cap4.b': 'Entrada de contactos, organización del embudo, seguimiento, acciones de marketing y continuidad hasta el cierre.', 'cap5.t': 'Web y Operaciones Digitales', 'cap5.b': 'WordPress, preservación de legado, contenido SEO, flujos de YouTube y producción digital.', 'cap6.t': 'Comunicación, Ventas y Atención al Cliente', 'cap6.b': 'Comunicación en inglés y portugués, enseñanza, interpretación, prospección de ventas, marketing y atención al cliente.',
      'case1.tag': 'ÁREA 01 · OPERACIONES INMOBILIARIAS', 'case2.tag': 'ÁREA 02 · SISTEMAS OPERATIVOS Y DISEÑO DE FLUJOS', 'case3.tag': 'ÁREA 04 · DISEÑO WEB Y PRESERVACIÓN DIGITAL', 'work04.tag': 'ÁREA 05 · POSICIONAMIENTO PROFESIONAL Y PRESENCIA DIGITAL',
      'mom.kicker': 'HITOS PROFESIONALES', 'mom.title': 'Interpretación internacional, enseñanza, prospección y formación continua.', 'mom.body': 'Experiencias en distintos entornos reforzaron la comunicación, la adaptabilidad y la seguridad bajo presión.', 'm5.t': 'Aproximadamente 60 cursos SEBRAE', 'm6.k': 'FORMACIÓN', 'm6.t': 'Educación secundaria + Electromecánica técnica', 'm6.b': 'Educación secundaria y formación técnica en Electromecánica.', 'm7.k': 'ENTRENAMIENTO', 'm7.t': 'Formación Enneagram Institute · IPOG', 'm7.b': 'Formación en contenidos del Enneagram Institute en IPOG.',
      'f1.b': 'Fluidez C1', 'f2.b': 'Nativo', 'f3.b': '3 años · operaciones de compradores y vendedores', 'cta.kicker': 'DISPONIBLE PARA TRABAJO REMOTO INTERNACIONAL', 'cta.body': 'Abierto a oportunidades remotas internacionales en operaciones, sistemas, implementación, soporte ejecutivo y a clientes, operaciones inmobiliarias, CRM, operaciones digitales y áreas adyacentes donde la organización, la iniciativa y la mejora de procesos importen.', 'footer.quote': 'Las operaciones crean libertad cuando se diseñan con intención.', 'footer.quoteLabel': 'PENSAMIENTO DE CIERRE',
      'practice.kicker': 'ÁREAS DE ACTUACIÓN', 'practice.title': 'Trabajo aplicado, organizado como un sistema operativo.', 'practice.body': 'Cinco áreas conectadas muestran dónde resulta útil la misma disciplina: operaciones inmobiliarias, diseño de flujos, contenido, continuidad web y posicionamiento profesional.', 'practice.1.t': 'Operaciones Inmobiliarias', 'practice.1.b': 'Transacciones, propiedades y continuidad.', 'practice.2.t': 'Sistemas Operativos y Diseño de Flujos', 'practice.2.b': 'Capturar, validar y reutilizar información.', 'practice.3.t': 'Operaciones de Contenido', 'practice.3.b': 'Editar, revisar y publicar con ritmo.', 'practice.4.t': 'Diseño Web y Preservación Digital', 'practice.4.b': 'Avanzar sin perder la historia.', 'practice.5.t': 'Posicionamiento Profesional y Presencia Digital', 'practice.5.b': 'Convertir el contexto en un sistema público honesto.', 'work04.title': 'De una trayectoria profesional fragmentada a un sistema de identidad, práctica, portafolio y activación.', 'work04.body': 'Estructuré un proyecto de principio a fin para una arquitecta que regresaba a la práctica profesional. El trabajo conectó una entrevista de identidad, posicionamiento, sitio web, entorno privado de desarrollo, recuperación y persistencia de datos, estudios conceptuales e investigación de oportunidades. El objetivo no era fabricar experiencia, sino crear un sistema que ayudara a la profesional a aprender, producir evidencia, presentarse con honestidad y regresar al mercado.', 'work04.s1t': 'Diagnosticar', 'work04.s1b': 'Convertir el contexto difuso en criterios y prioridades.', 'work04.s2t': 'Estructurar', 'work04.s2b': 'Conectar identidad, aprendizaje, datos y presencia digital.', 'work04.s3t': 'Activar', 'work04.s3b': 'Conectar el sistema con oportunidades reales y próximas acciones.', 'work04.map': 'SISTEMA DE POSICIONAMIENTO · MÉTODO PÚBLICO', 'work04.m1t': 'Fricción', 'work04.m1b': 'Trayectoria fragmentada y presentación desconectada.', 'work04.m2t': 'Diagnóstico', 'work04.m2b': 'Identidad, habilidades, intereses, mercado y oportunidades puestos en perspectiva.', 'work04.m3t': 'Sistema', 'work04.m3b': 'Entrevista, persona, portafolio, aprendizaje, investigación y plan de activación.', 'work04.m4t': 'Flujo', 'work04.m4b': 'La información dispersa se convierte en posicionamiento profesional ejecutable.'
    }
  };

  const video = {
    en: { tag: 'PRACTICE AREA 03 · CONTENT OPERATIONS', title: 'From full-length video to a coordinated publishing and discoverability workflow.', body: 'Video editing was one part of a broader content operation: shaping long-form material into shorter cuts, adapting it for social channels, and connecting review, approval, metadata, SEO and publishing protocols.', e1: 'CapCut Desktop', e2: 'YouTube editing', e3: 'Full-length video → shorter cuts', e4: 'Social adaptation', b1t: 'Condense the narrative', b1b: 'Keep the message intact while making the material easier to follow.', b2t: 'Shape the rhythm', b2b: 'Use pacing, continuity and sequence to support the story.', b3t: 'Adapt the format', b3b: 'Prepare shorter, platform-ready cuts from longer material.', b4t: 'Repeat the workflow', b4b: 'Connect editing, review, approval and publishing protocols.' },
    pt: { tag: 'ÁREA 03 · OPERAÇÕES DE CONTEÚDO', title: 'Do vídeo completo a um fluxo coordenado de publicação e descoberta.', body: 'A edição de vídeo era uma parte de uma operação de conteúdo mais ampla: transformar materiais longos em cortes curtos, adaptá-los para redes sociais e conectar revisão, aprovação, metadados, SEO e protocolos de publicação.', e1: 'CapCut Desktop', e2: 'Edição para YouTube', e3: 'Vídeo completo → cortes curtos', e4: 'Adaptação para redes', b1t: 'Condensar a narrativa', b1b: 'Preservar a mensagem e tornar o conteúdo mais fácil de acompanhar.', b2t: 'Construir o ritmo', b2b: 'Usar ritmo, continuidade e sequência para sustentar a história.', b3t: 'Adaptar o formato', b3b: 'Preparar cortes mais curtos e adequados à plataforma.', b4t: 'Repetir o fluxo', b4b: 'Conectar edição, revisão, aprovação e protocolos de publicação.' },
    es: { tag: 'ÁREA 03 · OPERACIONES DE CONTENIDO', title: 'Del video completo a un flujo coordinado de publicación y descubrimiento.', body: 'La edición de video era una parte de una operación de contenidos más amplia: convertir materiales largos en cortes breves, adaptarlos para redes sociales y conectar revisión, aprobación, metadatos, SEO y protocolos de publicación.', e1: 'CapCut Desktop', e2: 'Edición para YouTube', e3: 'Video completo → cortes cortos', e4: 'Adaptación para redes', b1t: 'Condensar la narrativa', b1b: 'Mantener el mensaje y hacer que el contenido sea más fácil de seguir.', b2t: 'Construir el ritmo', b2b: 'Usar ritmo, continuidad y secuencia para sostener la historia.', b3t: 'Adaptar el formato', b3b: 'Preparar cortes más cortos y adecuados para la plataforma.', b4t: 'Repetir el flujo', b4b: 'Conectar edición, revisión, aprobación y protocolos de publicación.' }
  };

  const panelSources = {
    en: { from: 'assets/optimized/panels/PANEL_FROM_COMPLEXITY_EN_GLASS.webp', to: 'assets/optimized/panels/PANEL_TO_PROGRESS_EN_GLASS.webp', better: 'assets/optimized/panels/PANEL_BETTER_SYSTEMS_EN_GLASS.webp' },
    pt: { from: 'assets/optimized/panels/PANEL_FROM_COMPLEXITY_PT_GLASS.webp', to: 'assets/optimized/panels/PANEL_TO_PROGRESS_PT_GLASS.webp', better: 'assets/optimized/panels/PANEL_BETTER_SYSTEMS_PT_GLASS.webp' },
    es: { from: 'assets/optimized/panels/PANEL_FROM_COMPLEXITY_ES_GLASS.webp', to: 'assets/optimized/panels/PANEL_TO_PROGRESS_ES_GLASS.webp', better: 'assets/optimized/panels/PANEL_BETTER_SYSTEMS_ES_GLASS.webp' }
  };
  const panelAlt = {
    en: { from: 'From Complexity: Processes, People, Tools, Silos, Manual work', to: 'To Progress: Clarity, Automation, Efficiency, Scalability, Freedom', better: 'Better Systems — Bigger Possibilities' },
    pt: { from: 'Da complexidade: processos, pessoas, ferramentas, silos, trabalho manual', to: 'Para o progresso: clareza, automação, eficiência, escalabilidade, liberdade', better: 'Sistemas melhores — possibilidades maiores' },
    es: { from: 'De la complejidad: procesos, personas, herramientas, silos, trabajo manual', to: 'Al progreso: claridad, automatización, eficiencia, escalabilidad, libertad', better: 'Mejores sistemas — posibilidades mayores' }
  };

  const publishedCopy = window.__PUBLISHED_COPY || {};
  const publishedSupplement = {
    en: {
      'practice.kicker': 'PRACTICE AREAS',
      'practice.title': 'Applied work across operations, systems, content, web preservation and professional positioning.',
      'practice.body': '',
      'practice.1.t': 'Real Estate Operations',
      'practice.1.b': 'A custom end-to-end operating system built around the way the agent actually works.',
      'practice.2.t': 'Operational Systems & Workflow Design',
      'practice.2.b': 'Seller Net Sheet → reusable operational tool.',
      'practice.3.t': 'Content Operations',
      'practice.3.b': 'From full-length video to a coordinated publishing and discoverability workflow.',
      'practice.4.t': 'Web Design & Digital Preservation',
      'practice.4.b': 'A new site with its history intact.',
      'practice.5.t': 'Professional Positioning & Digital Presence',
      'practice.5.b': 'From a fragmented professional trajectory to a system for identity, practice, portfolio and activation.'
    },
    pt: {
      'practice.kicker': 'ATUAÇÕES',
      'practice.title': 'Atuação aplicada em operações, sistemas, conteúdo, preservação web e posicionamento profissional.',
      'practice.body': '',
      'practice.1.t': 'Operações Imobiliárias',
      'practice.1.b': 'Um sistema operacional ponta a ponta, feito sob medida para a forma como o agente realmente trabalha.',
      'practice.2.t': 'Sistemas para Operações & Design de Fluxos',
      'practice.2.b': 'Seller Net Sheet → ferramenta operacional reutilizável.',
      'practice.3.t': 'Operações de Conteúdo',
      'practice.3.b': 'Do vídeo completo a um fluxo coordenado de publicação e descoberta.',
      'practice.4.t': 'Web Design & Preservação Digital',
      'practice.4.b': 'Um novo site com sua história preservada.',
      'practice.5.t': 'Posicionamento Profissional & Presença Digital',
      'practice.5.b': 'De uma trajetória profissional fragmentada para um sistema de identidade, prática, portfólio e ativação.'
    },
    es: {
      'practice.kicker': 'ÁREAS DE ACTUACIÓN',
      'practice.title': 'Trabajo aplicado en operaciones, sistemas, contenido, preservación web y posicionamiento profesional.',
      'practice.body': '',
      'practice.1.t': 'Operaciones Inmobiliarias',
      'practice.1.b': 'Un sistema operativo de punta a punta, diseñado alrededor de la forma real de trabajar del agente.',
      'practice.2.t': 'Sistemas para Operaciones y Diseño de Flujos de Trabajo',
      'practice.2.b': 'Seller Net Sheet → herramienta operativa reutilizable.',
      'practice.3.t': 'Operaciones de Contenido',
      'practice.3.b': 'Del video completo a un flujo coordinado de publicación y descubrimiento.',
      'practice.4.t': 'Diseño Web y Preservación Digital',
      'practice.4.b': 'Un sitio nuevo con su historia preservada.',
      'practice.5.t': 'Posicionamiento Profesional y Presencia Digital',
      'practice.5.b': 'De una trayectoria profesional fragmentada a un sistema de identidad, práctica, portafolio y activación.'
    }
  };

  // Exact copy read from the published site. The current layout remains the
  // authority for structure; this map restores only the approved wording.
  const restoredCopy = {
    en: {
      'remote.body1': 'For nearly three years, I worked 100% remotely supporting U.S. real estate operations across North and South Carolina. Transaction coordination was part of the job, but never the whole of it. I also worked across CRM and listing workflows, marketing coordination, calendars and email, documentation, executive and client support, video editing and publishing, keeping very different parts of the operation moving together.',
      'remote.body2': 'My independent digital career has kept me hands-on across web design, SEO, blogs, social media, content, video, marketing operations, sales support, CRM, workflows and practical systems. I’m comfortable learning unfamiliar tools, connecting disciplines and moving from strategy to execution without losing sight of the operation as a whole.',
      'remote.body3': 'Remote work fits that way of working. It depends less on proximity than on clarity, ownership and follow-through, and it is the environment in which I most want to continue building, supporting and improving operations.',
      'cap.body': 'I work across business operations, real estate, CRM, digital workflows and automation to organize information, reduce manual steps and keep execution moving.',
      'cap3.b': 'Buyer and seller transaction coordination across MLS Canopy, SkySlope and Zillow Showcase, with CMA support.',
      'practice.title': 'Applied work across operations, systems, content, web preservation and professional positioning.', 'practice.body': '',
      'practice.1.t': 'Real Estate Operations', 'practice.1.b': 'A custom end-to-end operating system built around the way the agent actually works.',
      'practice.2.t': 'Operational Systems & Workflow Design', 'practice.2.b': 'Seller Net Sheet → reusable operational tool.',
      'practice.3.t': 'Content Operations', 'practice.3.b': 'From full-length video to a coordinated publishing and discoverability workflow.',
      'practice.4.t': 'Web Design & Digital Preservation', 'practice.4.b': 'A new site with its history intact.',
      'practice.5.t': 'Professional Positioning & Digital Presence', 'practice.5.b': 'From a fragmented professional trajectory to a system for identity, practice, portfolio and activation.',
      'case1.t': 'A custom end-to-end operating system built around the way the agent actually works.', 'case1.b': "Built around the agent's actual operating rhythm, the system connects the work that happens before a listing with CRM context, transaction data, documents, deadlines, closing follow-up and stage-based marketing needs. The point was not to force a professional into a generic workflow, but to turn the way that person already worked into a structured, reusable operating system.",
      'case2.t': 'Seller Net Sheet → reusable operational tool.', 'case2.b': 'I turned the recurring information in a Seller Net Sheet into a lightweight workflow using HTML and Google tools. It captures information once, keeps it consistent and carries it into later transaction work.',
      'case2.vt': 'Capture once. Carry the information forward.', 'case2.vb': 'One structured entry can support the next operational step without being rebuilt.',
      'case3.tag': 'PRACTICE AREA 04 · WEB DESIGN & DIGITAL PRESERVATION', 'case3.t': 'A new site with its history intact.', 'case3.b': 'I rebuilt an outdated WordPress presence on a new platform while keeping the original site available as a working archive and reference. The new environment supports current publishing while preserving years of content, context and SEO value.',
      'case3.b1': 'Rebuild', 'case3.d1': 'Keep the context', 'case3.d2': 'Migration, preservation and continuity stayed connected throughout the work.', 'case3.vb': 'A current site can move forward while the legacy environment remains a working reference.', 'case3.v2b': 'Use the archive to inform current content decisions.', 'case3.v3b': 'Support current publishing without erasing the past.',
      'work04.tag': 'PRACTICE AREA 05 · PROFESSIONAL POSITIONING & DIGITAL PRESENCE',
      'journey.title': 'A trajectory across operations, sales, communication and service.', 'journey.body': 'Real estate, ERP sales, teaching, coordination, marketing, events, hospitality and digital work shaped a practical mix of commercial awareness, communication, process improvement and initiative.', 'j3.b': 'Teaching, communication and coordination across people and processes.', 'j5.b': 'Customer-facing service, coordination and problem-solving in hospitality.', 'j6.b': 'Inbound marketing, visual identity, websites, e-commerce, social media and paid traffic.', 'j8.b': 'Organizing processes, connecting systems and reducing avoidable manual work.',
      'proof.intro': 'The work also involves people: creating clarity, making complex ideas easier to follow and keeping handoffs moving.', 'proof1.title': 'Clarity and facilitation in group settings.', 'proof2.title': 'Practical communication for complex work.', 'proof2.body': 'Interpretation, teaching and client-facing work shaped a clear working style: set the context, make the process visible and name the next action.', 'proof3.title': 'Remote operations with clear ownership and follow-through.', 'proof3.body': 'In 100% remote U.S. real estate operations, I coordinated calendars, email, listings, transactions and continuity across the people and systems involved.',
      'mom.body': 'These experiences sharpened communication, adaptability and steadiness under pressure.', 'm4.t': 'Sales prospecting across ERP and luxury real estate', 'm5.t': '60 SEBRAE courses', 'm6.k': 'TECHNICAL BACKGROUND', 'm6.t': 'High School + Technical Diploma in Electromechanics', 'm6.b': 'Technical training in Electromechanics at CEFET.', 'm7.k': 'ENNEAGRAM TRAINING', 'm7.t': 'Enneagram Institute training · IPOG', 'm7.b': 'Emotional-intelligence training through the Enneagram Institute at IPOG.',
      'about.body': 'Jack of All Trades is probably the shortest way to describe the shape of my career. What once looked like a collection of unrelated experiences became the advantage I rely on most: I can move between operations, systems, content, technology, communication and people, understand how the pieces affect one another, and turn that breadth into practical work. The range is not the absence of a direction. It is what taught me how to connect one.',
      'resume.body': 'Choose the English, Portuguese or Spanish ATS version.', 'cta.kicker': "LET'S TALK", 'cta.title': 'Ready to contribute where operations, systems and execution meet.', 'cta.body': 'Operations, systems, implementation, executive support, client support, real estate operations, CRM and digital operations are relevant when the work benefits from organization, initiative and process improvement.'
    },
    pt: {
      'remote.body1': 'Por quase três anos, trabalhei 100% remotamente apoiando operações imobiliárias nos Estados Unidos, na Carolina do Norte e na Carolina do Sul. A coordenação de transações fazia parte do trabalho, mas nunca foi o trabalho inteiro. Minha atuação também passava por CRM e fluxos de imóveis, coordenação de marketing, agendas e e-mails, documentação, suporte executivo e a clientes, edição e publicação de vídeos, mantendo diferentes partes da operação funcionando em conjunto.',
      'remote.body2': 'Minha trajetória digital independente me manteve atuando diretamente com web design, SEO, blogs, redes sociais, conteúdo, vídeo, operações de marketing, apoio comercial, CRM, fluxos de trabalho e sistemas práticos. Tenho facilidade para aprender ferramentas novas, conectar disciplinas e transitar da estratégia à execução sem perder de vista a operação como um todo.',
      'remote.body3': 'O trabalho remoto combina com essa forma de atuar. Ele depende menos de proximidade e mais de clareza, responsabilidade e continuidade, e é o ambiente em que mais quero continuar construindo, apoiando e melhorando operações.',
      'cap.body': 'Atuo entre operações, mercado imobiliário, CRM, fluxos digitais e automação para organizar informações, reduzir etapas manuais e manter a execução em movimento.', 'cap3.b': 'Coordenação de transações de compradores e vendedores em MLS Canopy, SkySlope e Zillow Showcase, com apoio em CMA.',
      'practice.title': 'Atuação aplicada em operações, sistemas, conteúdo, preservação web e posicionamento profissional.', 'practice.body': '', 'practice.1.t': 'Operações Imobiliárias', 'practice.1.b': 'Um sistema operacional ponta a ponta, feito sob medida para a forma como o agente realmente trabalha.', 'practice.2.t': 'Sistemas para Operações & Design de Fluxos', 'practice.2.b': 'Seller Net Sheet → ferramenta operacional reutilizável.', 'practice.3.t': 'Operações de Conteúdo', 'practice.3.b': 'Do vídeo completo a um fluxo coordenado de publicação e descoberta.', 'practice.4.t': 'Web Design & Preservação Digital', 'practice.4.b': 'Um novo site com sua história preservada.', 'practice.5.t': 'Posicionamento Profissional & Presença Digital', 'practice.5.b': 'De uma trajetória profissional fragmentada para um sistema de identidade, prática, portfólio e ativação.',
      'case1.t': 'Um sistema operacional ponta a ponta, feito sob medida para a forma como o agente realmente trabalha.', 'case1.b': 'Construído em torno do ritmo real de trabalho do agente, o sistema conecta o que acontece antes de um imóvel entrar em anúncio ao contexto de CRM, dados de transação, documentos, prazos, acompanhamento do fechamento e necessidades de marketing por etapa. A ideia não era forçar um profissional a seguir um fluxo genérico, mas transformar a forma como aquela pessoa já trabalhava em um sistema operacional estruturado e reutilizável.', 'case2.t': 'Seller Net Sheet → ferramenta operacional reutilizável.', 'case2.b': 'Transformei a lógica da Seller Net Sheet em um fluxo leve com HTML e ferramentas Google. O processo captura a informação uma vez, mantém os dados consistentes e os leva para as etapas posteriores da transação.', 'case2.vt': 'Capture uma vez. Leve a informação adiante.', 'case2.vb': 'Um registro estruturado pode alimentar a próxima etapa sem ser reconstruído.', 'case3.tag': 'ÁREA 04 · DESIGN WEB E PRESERVAÇÃO DIGITAL', 'case3.t': 'Um novo site com sua história preservada.', 'case3.b': 'Reconstruí uma presença antiga em WordPress numa nova plataforma e mantive o site original disponível como arquivo funcional e referência. O novo ambiente atende às necessidades atuais de publicação, preservando conteúdo, contexto e valor de SEO.', 'case3.b1': 'Reconstruir', 'case3.d1': 'Manter o contexto', 'case3.d2': 'Migração, preservação e continuidade permaneceram conectadas no trabalho.', 'case3.vb': 'O site atual avança enquanto o ambiente legado permanece disponível como referência de trabalho.', 'case3.v2b': 'Use o arquivo como contexto para as decisões atuais de conteúdo.', 'case3.v3b': 'Sustente a publicação atual sem apagar o passado.', 'work04.tag': 'ÁREA 05 · POSICIONAMENTO PROFISSIONAL E PRESENÇA DIGITAL',
      'journey.title': 'Uma trajetória entre operações, vendas, comunicação e serviço.', 'journey.body': 'Mercado imobiliário, vendas de ERP, ensino, coordenação, marketing, eventos, hotelaria e trabalho digital formaram uma combinação prática de visão comercial, comunicação, melhoria de processos e iniciativa.', 'j3.b': 'Ensino, comunicação e coordenação de pessoas e processos.', 'j5.b': 'Atendimento ao cliente, coordenação e resolução de problemas em hotelaria.', 'j6.b': 'Marketing de atração, identidade visual, sites, comércio eletrônico, mídias sociais e tráfego pago.', 'j8.b': 'Organização de processos, conexão entre sistemas e redução de trabalho manual evitável.',
      'proof.intro': 'O trabalho também envolve pessoas: criar clareza, tornar ideias complexas mais fáceis de acompanhar e manter as etapas em movimento.', 'proof1.title': 'Clareza e facilitação em contextos de grupo.', 'proof2.title': 'Comunicação prática para trabalhos complexos.', 'proof2.body': 'Interpretação, ensino e atendimento ao cliente formaram um estilo de comunicação claro: definir o contexto, tornar o processo visível e indicar a próxima ação.', 'proof3.title': 'Operações remotas com responsabilidade e continuidade.', 'proof3.body': 'Em operações imobiliárias 100% remotas nos EUA, atuei na coordenação de calendários, e-mails, anúncios, transações e continuidade entre as pessoas e os sistemas envolvidos.',
      'mom.body': 'Essas experiências reforçaram comunicação, adaptabilidade e segurança sob pressão.', 'm4.t': 'Prospecção de vendas em ERP e imóveis de luxo', 'm5.t': '60 cursos SEBRAE', 'm6.k': 'FORMAÇÃO TÉCNICA', 'm6.t': 'Ensino médio + técnico em eletromecânica', 'm6.b': 'Formação técnica em eletromecânica no CEFET.', 'm7.k': 'FORMAÇÃO EM INTELIGÊNCIA EMOCIONAL', 'm7.t': 'Formação do Enneagram Institute · IPOG', 'm7.b': 'Formação em inteligência emocional pelo Enneagram Institute no IPOG.', 'about.body': 'Pau pra toda obra talvez seja a forma mais curta de descrever o formato da minha carreira. O que antes parecia uma coleção de experiências sem relação se tornou a principal vantagem em que confio: consigo transitar entre operações, sistemas, conteúdo, tecnologia, comunicação e pessoas, entender como as partes se afetam e transformar essa amplitude em trabalho prático. Essa variedade não é ausência de direção. Foi ela que me ensinou a conectar uma.', 'resume.body': 'Escolha a versão ATS em inglês, português ou espanhol.', 'cta.kicker': 'VAMOS CONVERSAR', 'cta.title': 'Pronto para contribuir onde operações, sistemas e execução se encontram.', 'cta.body': 'Aberto a oportunidades internacionais remotas em operações, sistemas, implementação, suporte executivo, sucesso do cliente, operações imobiliárias, CRM e operações digitais — especialmente quando o trabalho exige organização, iniciativa e melhoria de processos.'
    },
    es: {
      'remote.body1': 'Durante casi tres años trabajé de forma 100 % remota apoyando operaciones inmobiliarias en Estados Unidos, en Carolina del Norte y Carolina del Sur. La coordinación de transacciones era parte del trabajo, pero nunca fue todo el trabajo. Mi función también abarcaba CRM y flujos de propiedades, coordinación de marketing, agendas y correo electrónico, documentación, soporte ejecutivo y a clientes, edición y publicación de video, manteniendo distintas partes de la operación funcionando de forma coordinada.',
      'remote.body2': 'Mi trayectoria digital independiente me ha mantenido trabajando directamente con diseño web, SEO, blogs, redes sociales, contenido, video, operaciones de marketing, apoyo comercial, CRM, flujos de trabajo y sistemas prácticos. Me siento cómodo aprendiendo herramientas nuevas, conectando disciplinas y pasando de la estrategia a la ejecución sin perder de vista la operación en su conjunto.',
      'remote.body3': 'El trabajo remoto encaja con esa forma de trabajar. Depende menos de la proximidad que de la claridad, la responsabilidad y el seguimiento, y es el entorno en el que más me interesa seguir construyendo, apoyando y mejorando operaciones.',
      'cap.body': 'Trabajo entre operaciones, sector inmobiliario, CRM, flujos digitales y automatización para organizar la información, reducir pasos manuales y mantener la ejecución en movimiento.', 'cap3.b': 'Coordinación de transacciones de compradores y vendedores en MLS Canopy, SkySlope y Zillow Showcase, con apoyo en CMA.',
      'practice.title': 'Trabajo aplicado en operaciones, sistemas, contenido, preservación web y posicionamiento profesional.', 'practice.body': '', 'practice.1.t': 'Operaciones Inmobiliarias', 'practice.1.b': 'Un sistema operativo de punta a punta, diseñado alrededor de la forma real de trabajar del agente.', 'practice.2.t': 'Sistemas para Operaciones y Diseño de Flujos de Trabajo', 'practice.2.b': 'Seller Net Sheet → herramienta operativa reutilizable.', 'practice.3.t': 'Operaciones de Contenido', 'practice.3.b': 'Del video completo a un flujo coordinado de publicación y descubrimiento.', 'practice.4.t': 'Diseño Web y Preservación Digital', 'practice.4.b': 'Un sitio nuevo con su historia preservada.', 'practice.5.t': 'Posicionamiento Profesional y Presencia Digital', 'practice.5.b': 'De una trayectoria profesional fragmentada a un sistema de identidad, práctica, portafolio y activación.',
      'case1.t': 'Un sistema operativo de punta a punta, diseñado alrededor de la forma real de trabajar del agente.', 'case1.b': 'Construido alrededor del ritmo real de trabajo del agente, el sistema conecta lo que ocurre antes de publicar una propiedad con el contexto del CRM, los datos de la transacción, los documentos, los plazos, el seguimiento del cierre y las necesidades de marketing por etapa. El objetivo no era imponer un flujo genérico, sino convertir la forma en que esa persona ya trabajaba en un sistema operativo estructurado y reutilizable.', 'case2.t': 'Seller Net Sheet → herramienta operativa reutilizable.', 'case2.b': 'Convertí la lógica de la Seller Net Sheet en un flujo ligero con HTML y herramientas de Google. El proceso captura la información una vez, mantiene los datos consistentes y los lleva a las etapas posteriores de la transacción.', 'case2.vt': 'Captura una vez. Lleva la información hacia adelante.', 'case2.vb': 'Un registro estructurado puede alimentar la siguiente etapa sin reconstruirse.', 'case3.tag': 'ÁREA 04 · DISEÑO WEB Y PRESERVACIÓN DIGITAL', 'case3.t': 'Un sitio nuevo con su historia preservada.', 'case3.b': 'Reconstruí una presencia antigua en WordPress sobre una nueva plataforma y mantuve el sitio original disponible como archivo funcional y referencia. El nuevo entorno responde a las necesidades actuales de publicación y conserva años de contenido, contexto y valor SEO.', 'case3.b1': 'Reconstruir', 'case3.d1': 'Mantener el contexto', 'case3.d2': 'Migración, preservación y continuidad permanecieron conectadas durante el trabajo.', 'case3.vb': 'El sitio actual puede avanzar mientras el entorno legado permanece como referencia de trabajo.', 'case3.v2b': 'Usa el archivo para orientar las decisiones actuales de contenido.', 'case3.v3b': 'Sostén la publicación actual sin borrar el pasado.', 'work04.tag': 'ÁREA 05 · POSICIONAMIENTO PROFESIONAL Y PRESENCIA DIGITAL',
      'journey.title': 'Una trayectoria entre operaciones, ventas, comunicación y servicio.', 'journey.body': 'Sector inmobiliario, ventas de ERP, enseñanza, coordinación, marketing, eventos, hotelería y trabajo digital formaron una combinación práctica de visión comercial, comunicación, mejora de procesos e iniciativa.', 'j3.b': 'Enseñanza, comunicación y coordinación de personas y procesos.', 'j5.b': 'Atención al cliente, coordinación y resolución de problemas en hotelería.', 'j6.b': 'Marketing de entrada, identidad visual, sitios web, comercio electrónico, redes sociales y tráfico de pago.', 'j8.b': 'Organizar procesos, conectar sistemas y reducir el trabajo manual evitable.',
      'proof.intro': 'El trabajo también involucra personas: crear claridad, hacer más fáciles de seguir las ideas complejas y mantener las etapas en movimiento.', 'proof1.title': 'Claridad y facilitación en contextos de grupo.', 'proof2.title': 'Comunicación práctica para trabajos complejos.', 'proof2.body': 'La interpretación, la enseñanza y la atención al cliente formaron un estilo de comunicación claro: definir el contexto, hacer visible el proceso e indicar la próxima acción.', 'proof3.title': 'Operaciones remotas con responsabilidad y continuidad.', 'proof3.body': 'En operaciones inmobiliarias 100% remotas en EE. UU., coordiné calendarios, correo, anuncios, transacciones y continuidad entre las personas y los sistemas involucrados.',
      'mom.body': 'Estas experiencias reforzaron la comunicación, la adaptabilidad y la serenidad bajo presión.', 'm4.t': 'Prospección de ventas en ERP y sector inmobiliario de lujo', 'm5.t': '60 cursos SEBRAE', 'm6.k': 'FORMACIÓN TÉCNICA', 'm6.t': 'Bachillerato + título técnico en electromecánica', 'm6.b': 'Formación técnica en electromecánica en CEFET.', 'm7.k': 'FORMACIÓN EN INTELIGENCIA EMOCIONAL', 'm7.t': 'Formación del Enneagram Institute · IPOG', 'm7.b': 'Formación en inteligencia emocional a través del Enneagram Institute en IPOG.', 'about.body': 'Ser un todoterreno quizá sea la forma más breve de describir la trayectoria de mi carrera. Lo que antes parecía una colección de experiencias sin relación se convirtió en la ventaja en la que más confío: puedo moverme entre operaciones, sistemas, contenido, tecnología, comunicación y personas, entender cómo se afectan las piezas y convertir esa amplitud en trabajo práctico. La variedad no es ausencia de dirección. Es lo que me enseñó a conectar una.', 'resume.body': 'Elige la versión ATS en inglés, portugués o español.', 'cta.kicker': 'HABLEMOS', 'cta.title': 'Listo para aportar donde se encuentran operaciones, sistemas y ejecución.', 'cta.body': 'Operaciones, sistemas, implementación, soporte ejecutivo, atención al cliente, operaciones inmobiliarias, CRM y operaciones digitales son relevantes cuando el trabajo se beneficia de organización, iniciativa y mejora de procesos.'
    }
  };

  function applyPublishedCopy() {
    langs.forEach(lang => {
      const source = { ...(publishedCopy[lang] || {}), ...(publishedSupplement[lang] || {}), ...(restoredCopy[lang] || {}) };
      const target = text[lang] || (text[lang] = {});
      Object.entries(source).forEach(([key, value]) => {
        if (key.startsWith('hero.') || key.startsWith('ticker.')) return;
        target[key] = value;
      });
    });
  }

  function currentLanguage() {
    let stored = '';
    try { stored = localStorage.getItem('gb-lang') || ''; } catch (_) {}
    if (langs.includes(stored)) return stored;
    const documentLang = document.documentElement.lang || 'en';
    return documentLang.toLowerCase().startsWith('pt') ? 'pt' : documentLang.toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  function setValue(element, value, key) {
    if (!element || value === undefined) return;
    if (htmlKeys.has(key)) element.innerHTML = value;
    else element.textContent = value;
  }

  function applyPanels(lang) {
    const sources = panelSources[lang] || panelSources.en;
    const alts = panelAlt[lang] || panelAlt.en;
    $$('.panel[data-panel-key]').forEach(panel => {
      const key = panel.dataset.panelKey;
      panel.src = sources[key] || panel.src;
      panel.alt = alts[key] || panel.alt;
    });
  }

  function applyVideo(lang) {
    const values = video[lang] || video.en;
    $$('#practice-area-03 [data-video-i18n], #video [data-video-i18n]').forEach(element => {
      const key = element.dataset.videoI18n;
      if (values[key] !== undefined) element.textContent = values[key];
    });
    const image = $('.video-photo');
    if (image) image.alt = lang === 'pt' ? 'Giovanni Barcelos organizando um fluxo de produção de vídeo em uma lousa' : lang === 'es' ? 'Giovanni Barcelos organizando un flujo de producción de video en una pizarra' : 'Giovanni Barcelos organizing a video production workflow on a whiteboard';
  }

  function applyLocale(lang) {
    const safe = langs.includes(lang) ? lang : 'en';
    const values = text[safe] || text.en;
    document.documentElement.lang = safe === 'pt' ? 'pt-BR' : safe;
    $$('.language').forEach(button => {
      const active = button.dataset.setlang === safe;
      button.classList.toggle('current', active);
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    $$('[data-i18n]').forEach(element => setValue(element, values[element.dataset.i18n], element.dataset.i18n));
    $$('[data-final-i18n]').forEach(element => setValue(element, values[element.dataset.finalI18n], element.dataset.finalI18n));
    $$('[data-i18n-alt]').forEach(element => { const value = values[element.dataset.i18nAlt]; if (value !== undefined) element.alt = value; });
    $$('[data-final-alt]').forEach(element => { const value = values[element.dataset.finalAlt]; if (value !== undefined) element.alt = value; });
    applyVideo(safe);
    applyPanels(safe);
    try { localStorage.setItem('gb-lang', safe); } catch (_) {}
    window.GIOVANNI_FINAL_LANGUAGE = safe;
  }

  function preloadPanels(lang = currentLanguage()) {
    const locale = panelSources[lang] || panelSources.en;
    Object.values(locale).forEach(href => {
      if ($(`link[rel="preload"][href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'preload'; link.as = 'image'; link.href = href;
      document.head.appendChild(link);
    });
  }

  function setupTicker() {
    const track = $('.ticker-track');
    if (!track || track.dataset.grouped === 'true') return;
    const items = [...track.children];
    if (items.length < 2) return;
    const half = Math.floor(items.length / 2);
    const first = items.slice(0, half);
    const groupA = document.createElement('span');
    const groupB = document.createElement('span');
    groupA.className = groupB.className = 'ticker-group';
    first.forEach(item => groupA.appendChild(item));
    first.forEach(item => groupB.appendChild(item.cloneNode(true)));
    track.replaceChildren(groupA, groupB);
    track.dataset.grouped = 'true';
  }

  function setupPracticeAreas() {
    const first = $('#work');
    const second = $('#work02');
    const web = $('#work03');
    const positioning = $('#work04');
    const videoSection = $('#video');
    const capabilities = $('#capabilities');
    const anchor = $('#practice-areas');
    if (!first || !second || !web || !positioning || !videoSection || !capabilities || !anchor) return;

    anchor.className = 'screen practice-overview';
    anchor.removeAttribute('aria-hidden');
    anchor.innerHTML = `<div class="wrap"><div class="section-head"><div class="eyebrow" data-final-i18n="practice.kicker">PRACTICE AREAS</div><div><h2 data-final-i18n="practice.title">Applied work, organized as an operating system.</h2><p class="practice-intro" data-final-i18n="practice.body">Five connected areas show where the same discipline becomes useful: real estate operations, workflow design, content, web continuity and professional positioning.</p></div></div><div class="practice-grid"><a class="practice-tile" href="#practice-area-01"><span class="num">01</span><strong data-final-i18n="practice.1.t">Real Estate Operations</strong><span data-final-i18n="practice.1.b">Transactions, listings and continuity.</span></a><a class="practice-tile" href="#practice-area-02"><span class="num">02</span><strong data-final-i18n="practice.2.t">Operational Systems &amp; Workflow Design</strong><span data-final-i18n="practice.2.b">Capture, validate and reuse information.</span></a><a class="practice-tile" href="#practice-area-03"><span class="num">03</span><strong data-final-i18n="practice.3.t">Content Operations</strong><span data-final-i18n="practice.3.b">Edit, review and publish with rhythm.</span></a><a class="practice-tile" href="#practice-area-04"><span class="num">04</span><strong data-final-i18n="practice.4.t">Web Design &amp; Digital Preservation</strong><span data-final-i18n="practice.4.b">Move forward without losing history.</span></a><a class="practice-tile" href="#practice-area-05"><span class="num">05</span><strong data-final-i18n="practice.5.t">Professional Positioning &amp; Digital Presence</strong><span data-final-i18n="practice.5.b">Turn context into an honest public system.</span></a></div></div>`;
    capabilities.after(anchor);

    const rename = (section, id, oldId) => {
      const alias = document.createElement('span');
      alias.id = oldId; alias.className = 'anchor-alias'; alias.setAttribute('aria-hidden', 'true');
      section.parentElement.insertBefore(alias, section);
      section.id = id; section.classList.add('practice-area'); section.dataset.practiceArea = id.slice(-2);
      return section;
    };
    const area1 = rename(first, 'practice-area-01', 'work');
    const area2 = rename(second, 'practice-area-02', 'work02');
    const area4 = rename(web, 'practice-area-04', 'work03');
    const area5 = rename(positioning, 'practice-area-05', 'work04');
    const area3 = rename(videoSection, 'practice-area-03', 'video');

    const labelMap = [[area1, 'case1.tag'], [area2, 'case2.tag'], [area4, 'case3.tag'], [area5, 'work04.tag']];
    labelMap.forEach(([section, key]) => { const label = section.querySelector(`[data-i18n="${key}"]`); if (label) label.dataset.finalI18n = key; });
    const videoTag = area3.querySelector('[data-video-i18n="tag"]');
    if (videoTag) videoTag.dataset.finalVideoI18n = 'tag';

    const sequence = document.createElement('div');
    sequence.className = 'practice-sequence';
    anchor.after(sequence);
    [area1, area2, area3, area4, area5].forEach(section => sequence.appendChild(section));
  }

  function setupHumanProofChapter() {
    const journey = $('#journey');
    const expansion = $('#capability-expansion');
    const highlights = $('#highlights');
    if (!journey || !expansion || !highlights) return;
    const chapter = document.createElement('div');
    chapter.className = 'human-proof-chapter';
    journey.after(chapter);
    chapter.append(expansion, highlights);
    const list = $('#highlights .moment-list');
    if (list && !list.querySelector('[data-highlight="education"]')) {
      list.insertAdjacentHTML('beforeend', '<div class="moment" data-highlight="education"><div class="k" data-final-i18n="m6.k">EDUCATION</div><h3 data-final-i18n="m6.t">High school + technical Electromechanics</h3><p data-final-i18n="m6.b">High school education and technical training in Electromechanics.</p></div><div class="moment" data-highlight="training"><div class="k" data-final-i18n="m7.k">TRAINING</div><h3 data-final-i18n="m7.t">Enneagram Institute training · IPOG</h3><p data-final-i18n="m7.b">Training in Enneagram Institute content at IPOG.</p></div>');
    }
  }

  function moveQuoteToFooter() {
    const footer = $('#contact .wrap');
    if (!footer || $('.closing-quote', footer)) return;
    const quote = document.createElement('div');
    quote.className = 'closing-quote';
    quote.innerHTML = '<span data-final-i18n="footer.quote">Operations create freedom when designed with intention.</span><small data-final-i18n="footer.quoteLabel">CLOSING THOUGHT</small>';
    const footerline = $('.footerline', footer);
    if (footerline) footerline.before(quote); else footer.appendChild(quote);
  }

  function removeSceneCTAs() {
    $$('.site-header .action, .hero .buttons, .hero > .quote').forEach(element => element.remove());
    const footerLogo = $('.footer-logo');
    if (footerLogo) footerLogo.src = 'assets/brand/GIOVANNI_BARCELOS_WORDMARK_USER_20260921.png';
  }

  function setupSubmenu() {
    const nav = $('.site-nav');
    const link = nav && nav.querySelector('a[href="#practice-areas"]');
    if (!nav || !link || $('.nav-practice-wrap', nav)) return;
    const wrap = document.createElement('span');
    wrap.className = 'nav-practice-wrap';
    const toggle = document.createElement('button');
    toggle.className = 'nav-submenu-toggle'; toggle.type = 'button'; toggle.textContent = '⌄'; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', 'practice-submenu'); toggle.setAttribute('aria-label', 'Open Practice Areas submenu');
    const menu = document.createElement('span');
    menu.className = 'nav-submenu'; menu.id = 'practice-submenu';
    const entries = [
      ['01', '#practice-area-01', 'practice.1.t'], ['02', '#practice-area-02', 'practice.2.t'], ['03', '#practice-area-03', 'practice.3.t'], ['04', '#practice-area-04', 'practice.4.t'], ['05', '#practice-area-05', 'practice.5.t']
    ];
    entries.forEach(([number, href, key]) => { const item = document.createElement('a'); item.className = 'nav-subitem'; item.href = href; item.dataset.finalI18n = key; item.textContent = `${number} — ${text.en[key]}`; menu.appendChild(item); });
    link.parentNode.insertBefore(wrap, link); wrap.append(link, toggle, menu);
    const close = () => { menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); const open = menu.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
    menu.querySelectorAll('a').forEach(item => item.addEventListener('click', close));
    document.addEventListener('click', event => { if (!wrap.contains(event.target)) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  function setupActiveNavigation() {
    const nav = $('.site-nav');
    if (!nav) return;
    const links = $$('.site-nav > a:not(.language):not(.action), .nav-practice-link', nav).filter(link => !link.classList.contains('nav-subitem'));
    const targets = ['remote-work', 'capabilities', 'practice-areas', 'journey', 'highlights', 'about', 'resume', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
    const update = () => {
      const marker = window.innerHeight * .34;
      let activeId = '';
      targets.forEach(target => { if (target.getBoundingClientRect().top <= marker) activeId = target.id; });
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
    };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
  }

  function setupLanguageControls() {
    $$('[data-setlang]').forEach(button => button.addEventListener('click', () => requestAnimationFrame(() => applyLocale(button.dataset.setlang))));
  }

  function setupMobileMenuClose() {
    const nav = $('.site-nav');
    const toggle = $('.mobile-nav-toggle');
    if (!nav || !toggle) return;
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('mobile-open'); toggle.setAttribute('aria-expanded', 'false'); }));
  }

  function boot() {
    applyPublishedCopy();
    removeSceneCTAs();
    setupTicker();
    setupPracticeAreas();
    setupHumanProofChapter();
    setupSubmenu();
    setupActiveNavigation();
    setupLanguageControls();
    setupMobileMenuClose();
    preloadPanels();
    const subject = $('.layer-subject .subject');
    if (subject) subject.src = 'assets/optimized/layers/HERO_GIOVANNI_CHAIR_LOCKED.webp';
    applyLocale(currentLanguage());
    window.GIOVANNI_FINAL_READY = true;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
