import React, { useState, useCallback, useMemo, useEffect } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const MATERIAS = [
  // Semestre 1
{id:"CAL1",semestre:1,nombre:"Cálculo I",creditos:9,previaturas:[],programa_analitico:"Conceptos de cálculo diferencial: números reales y complejos, funciones elementales, límites, continuidad y derivadas. Teoremas de Rolle, Lagrange y Cauchy. Problemas de optimización.",bibliografia_recomendada:["Larson, R. - Cálculo 1. De una variable","Stewart, J. - Cálculo de una variable","Swokowsky, E. - Álgebra y Trigonometría"]}
,{id:"QUI",semestre:1,nombre:"Química",creditos:5,previaturas:[],programa_analitico:"Estructura atómica y enlace químico. Reacciones químicas, equilibrio químico y físico, y electroquímica aplicada a la mecatrónica.",bibliografia_recomendada:["Andoni Garritz - Química Universitaria","Brawn, LeMay, Bursten - Química, la Ciencia Central","Chang, R. - Química"]}
,{id:"IMI",semestre:1,nombre:"Introducción a la Mecatrónica Industrial",creditos:4,previaturas:[],programa_analitico:"Presentación de la carrera y mercado laboral. Introducción a métodos científicos y uso de software MATLAB para ingeniería.",bibliografia_recomendada:["LOGAN, Daryl L. - First Course in the Finite Element Method","LINGE, Svein - Programming for Computations-A Gentle Introduction to Numerical Simulations with MATLAB/Octave"]}
,{id:"CAD",semestre:1,nombre:"Herramientas CAD",creditos:7,previaturas:[],programa_analitico:"Normas de diseño técnico, proyecciones ortogonales y escalas. Uso de software CAD (Autodesk Inventor y AutoCAD) para creación de piezas 3D, montajes y planos técnicos.",bibliografia_recomendada:["Tutoriales del software Autodesk Inventor y AutoCAD","Normas UNIT-ISO de dibujo técnico"]}
,{id:"APC",semestre:1,nombre:"Algoritmos y Programación en C",creditos:9,previaturas:[],programa_analitico:"Lógica de programación, diagramas de flujo y estructuras de control. Desarrollo de programas en lenguaje C: tipos de datos, funciones, matrices, strings y punteros.",bibliografia_recomendada:["FORBELLONE, A. L. V. - Lógica de Programação","HOLLOWAY, J. P. - Introdução À Programação para Engenharia","LOPES, A. - Introdução à programação: 500 algoritmos resolvidos"]}
,{id:"MIC",semestre:1,nombre:"Metodología de la Investigación y Producción Científica",creditos:4,previaturas:[],programa_analitico:"El método científico, niveles y tipos de investigación. Variables, recolección de datos, interpretación de resultados y normas para trabajos académicos (ABNT/APA).",bibliografia_recomendada:["Hernández R. - Metodología de la investigación","Martínez E. - Ciencia, tecnología y desarrollo","Bueno. E. - Metodología de la Investigación"]}
,{id:"ING1",semestre:1,nombre:"Inglés I",creditos:4,previaturas:[],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel I.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
//Semestre 2
,{id:"CAL2",semestre:2,nombre:"Cálculo II",creditos:9,previaturas:["CAL1"],programa_analitico:"Cálculo integral (Riemann, Barrow), ecuaciones diferenciales ordinarias de primer y segundo orden. Funciones de varias variables e integrales dobles y triples.",bibliografia_recomendada:["Stewart, J. - Cálculo de varias variables","Larson, R. - Cálculo 2. De varias variables","Zill, D. - Ecuaciones diferenciales"]}
,{id:"GAL1",semestre:2,nombre:"Geometría Analítica y Álgebra Lineal I",creditos:9,previaturas:[],programa_analitico:"Sistemas de ecuaciones lineales, matrices y determinantes. Vectores en el plano y espacio, espacios vectoriales y transformaciones lineales.",bibliografia_recomendada:["Hernández, Eugenio - Álgebra y geometría","Stanley-Grossman - Álgebra lineal","Larson, Ron - Fundamentos de Álgebra lineal"]}
,{id:"CMA",semestre:2,nombre:"Ciencias de los Materiales",creditos:5,previaturas:["QUI"],programa_analitico:"Estructura de los materiales (metálicos, cristalinos, cerámicos). Propiedades mecánicas (elasticidad, tenacidad, ductilidad) y tratamientos térmicos.",bibliografia_recomendada:["Cembrero, J. - Ciencia y Tecnología de Materiales","Smith, W. - Fundamentos de la ciencia e ingeniería de los materiales","Chang, R. - Química"]}
,{id:"FIS1",semestre:2,nombre:"Física I",creditos:8,previaturas:["CAL1"],programa_analitico:"Cinemática y dinámica de partículas. Leyes de Newton, trabajo, energía, conservación de la energía, cantidad de movimiento y dinámica de rotación.",bibliografia_recomendada:["Serway Raymond - Física Volumen 1","Halliday, Resnick - Física I","Tipler, P. - Física para cientistas e engenheiros"]}
,{id:"POO",semestre:2,nombre:"Programación Orientada a Objetos",creditos:9,previaturas:["APC"],programa_analitico:"Conceptos de POO usando Python: clases, objetos, polimorfismo, herencia y abstracción. Integración de software con hardware mediante Raspberry Pi.",bibliografia_recomendada:["Barry, P. & Griffiths, D. - Use a cabeça! Programação","Menezes, N. N. C. - Introdução à programação com Python"]}
,{id:"PI1",semestre:2,nombre:"Proyecto Integrador I",creditos:4,previaturas:[],programa_analitico:"Desarrollo interdisciplinario de un proyecto conceptual integrando conocimientos de CAD, Ciencias de los Materiales y Programación.",bibliografia_recomendada:["Bibliografía de las disciplinas involucradas","Koval, S. K. - Manual para la elaboración de trabajos académicos"]}
,{id:"ING2",semestre:2,nombre:"Inglés II",creditos:4,previaturas:[],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel II.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
//Semestre 3
,{id:"ACE",semestre:3,nombre:"Análisis de Circuitos Eléctricos",creditos:9,previaturas:["CAL2"],programa_analitico:"Análisis de circuitos resistivos en CC, elementos de almacenamiento de energía, circuitos de primer y segundo orden. Análisis fasorial en CA y circuitos polifásicos.",bibliografia_recomendada:["Dorf Richard - Circuitos Eléctricos","Boylestad Robert L. - Introducción al análisis de circuitos","Alexander, Charles - Fundamentos de circuitos eléctricos"]}
,{id:"MAC",semestre:3,nombre:"Manufactura Asistida por Computadora",creditos:7,previaturas:["CAD"],programa_analitico:"Prototipado rápido (impresión 3D), fundamentos de mecanizado CNC y programación en lenguaje G. Integración CAD/CAM para fabricación de piezas.",bibliografia_recomendada:["Zeid, I. - Mastering CAD/CAM","Tornero, F. - Mecanizado por control numérico","El-Hofy, H. A. G. - Fundamentals of Machining Processes"]}
,{id:"SSL",semestre:3,nombre:"Señales y Sistemas Lineales",creditos:7,previaturas:["CAL2"],programa_analitico:"Análisis de señales y sistemas LTI en tiempo continuo y discreto. Uso de series de Fourier, transformada de Laplace y transformada Z.",bibliografia_recomendada:["Lathi, B. P. - Linear Systems and Signals","Haykin, S. - Señales y Sistemas","Oppenheim, A. V. - Señales y Sistemas"]}
,{id:"FIS2",semestre:3,nombre:"Física II",creditos:8,previaturas:["FIS1"],programa_analitico:"Electricidad y magnetismo: ley de Coulomb, campo eléctrico, ley de Gauss, capacitancia, circuitos de corriente continua, inducción de Faraday y óptica geométrica.",bibliografia_recomendada:["Serway Raymond - Física Volumen 2","Halliday, Resnick - Física 2 y 3","Sears, Zemansky - Física Universitaria"]}
,{id:"DL",semestre:3,nombre:"Diseño Lógico",creditos:9,previaturas:["APC"],programa_analitico:"Sistemas numéricos (binario, hexadecimal), álgebra booleana y simplificación lógica (Karnaugh). Diseño de circuitos combinacionales, secuenciales y máquinas de estados.",bibliografia_recomendada:["Thomas L Floyd - Fundamentos de sistemas digitales","Ronald J Tocci - Sistemas digitales principios y aplicaciones","M. Morris Mano - Fundamentos de Diseño Lógico y de Computadoras"]}
,{id:"PI2",semestre:3,nombre:"Proyecto Integrador II",creditos:4,previaturas:["PI1","CAD","CMA","FIS1"],programa_analitico:"Desarrollo práctico de un proyecto que incluye modelado físico, fabricación aditiva (código G) y definición de componentes eléctricos.",bibliografia_recomendada:["Bibliografía de las disciplinas involucradas","Koval, S. K. - Manual para la elaboración de trabajos académicos"]}
,{id:"ELL",semestre:3,nombre:"Ética Profesional y Legislación Laboral",creditos:4,previaturas:[],programa_analitico:"Ética general y profesional. Derecho laboral uruguayo: contratos de trabajo, derechos del trabajador, seguridad social y propiedad intelectual.",bibliografia_recomendada:["Constitución de la República Oriental del Uruguay","Santiago Pérez del Castillo - Manual Práctico de Normas Laborales","Americo Plá Rodríguez - Los Principios del Derecho del Trabajo"]}
,{id:"ING3",semestre:3,nombre:"Inglés III",creditos:4,previaturas:[],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel III.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]},

    //Semestre 4
 {id:"ELA",semestre:4,nombre:"Electrónica Analógica",creditos:9,previaturas:["ACE"],programa_analitico:"Estudio de semiconductores, diodos y aplicaciones. Transistores BJT, FET y MOSFET. Amplificadores operacionales, filtros activos, compensadores lineales, osciladores y reguladores de voltaje.",bibliografia_recomendada:["Malvino, A. P. - Principios de electrónica","Coughlin, R. & Driscoll, F. - Amplificadores operacionales y circuitos integrados lineales","Boylestad, R. L. - Electrónica: Teoría de circuitos y dispositivos electrónicos"]}
,{id:"REMA",semestre:4,nombre:"Resistencia de Materiales",creditos:7,previaturas:["FIS1","CMA"],programa_analitico:"Análisis de esfuerzos y deformaciones en sólidos elásticos. Carga axial, torsión, flexión y esfuerzo cortante transversal. Teorías de falla para materiales dúctiles y frágiles.",bibliografia_recomendada:["Beer, F., Johnston, J. and DeWolf, J. - Mecánica de materiales","Hibbeler, R. C. - Mecánica de materiales","Gere, J.M. - Resistencia de Materiales"]}
,{id:"ISC",semestre:4,nombre:"Introducción a los Sistemas de Control",creditos:9,previaturas:["SSL"],programa_analitico:"Modelado y linealización de sistemas dinámicos continuos. Análisis de estabilidad (Routh-Hurwitz, Nyquist), respuesta transitoria y error en estado estacionario. Diseño de controladores PID y por lugar de raíces.",bibliografia_recomendada:["Dorf, R. C. & Bishop, R. H. - Modern Control Systems","Ogata, K. - Ingeniería de control moderna","Nise, N. S. - Sistemas de Control para Ingeniería"]}
,{id:"FETR",semestre:4,nombre:"Fenómenos de Transporte",creditos:4,previaturas:["FIS2"],programa_analitico:"Principios de mecánica de fluidos (estática, dinámica, Navier-Stokes). Transferencia de calor por conducción, convección y radiación. Nociones básicas de transferencia de masa.",bibliografia_recomendada:["Fox, R. W. - Introducción a la Mecánica de Fluidos","Bird, R. - Fenómenos de Transporte","Incropera, F. & De Witt, D. - Fundamentos de Transferencia de Calor y Masa"]}
,{id:"MIC",semestre:4,nombre:"Microcontroladores",creditos:9,previaturas:["DL"],programa_analitico:"Arquitectura de microprocesadores y microcontroladores. Programación en ensamblador y C. Manejo de periféricos: puertos E/S, timers, ADC/DAC, interrupciones y comunicación serial.",bibliografia_recomendada:["Angulo Usategui, J. M. - Microcontroladores PIC Diseño práctico de aplicaciones","Palacios, E. - Microcontrolador PIC16F84 Desarrollo de proyectos","Sayers, I. L. & Adams, A. E. - Principios de Microprocesadores"]}
,{id:"PI3",semestre:4,nombre:"Proyecto Integrador III",creditos:4,previaturas:["PI2","FIS2","SSL"],programa_analitico:"Desarrollo interdisciplinario que integra teoría de control y microcontroladores. Modelado físico de sistemas, simulación en Matlab e implementación práctica en hardware.",bibliografia_recomendada:["Bibliografía de las disciplinas involucradas","Koval, S. K. - Manual para la elaboración de trabajos académicos"]}
,{id:"SLSO",semestre:4,nombre:"Seguridad Laboral y Salud Ocupacional",creditos:4,previaturas:[],programa_analitico:"Normativa vigente en seguridad y prevención de accidentes. Evaluación de riesgos industriales, higiene laboral, equipos de protección personal (EPP) y planes de evacuación.",bibliografia_recomendada:["Bestratén, M. - Manual Básico de Seguridad en el Trabajo","Cutuli, J. A. - Seguridad y Salud Ocupacional","Chávez Donoso, S. - Repensando la seguridad como una ventaja competitiva"]}
,{id:"ING4",semestre:4,nombre:"Inglés IV",creditos:4,previaturas:["ING3"],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel IV.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
//Semestre 5
,{id:"MAM",semestre:5,nombre:"Mecánica Aplicada a Máquinas",creditos:7,previaturas:["REMA"],programa_analitico:"Dimensionamiento de componentes mecánicos para transmisión de potencia: ejes, árboles, tornillos de potencia, trenes de engranajes y transmisiones flexibles (correas y cadenas). Análisis de fatiga.",bibliografia_recomendada:["Budynas, R. G. & Nisbett, J. K. - Shigley's mechanical engineering design","Juvinall, R. C. & Marshek, K. M. - Fundamentals of machine component design","Norton, R. L. - Proyecto: una abordagem integrada"]}
,{id:"AEM",semestre:5,nombre:"Actuadores Electromecánicos",creditos:8,previaturas:["ELA","FIS2"],programa_analitico:"Principios de conversión electromecánica. Funcionamiento y modelos de transformadores, motores CC y motores de inducción (monofásicos y trifásicos). Accionamiento electrónico y parametrización de inversores.",bibliografia_recomendada:["Chapman, S. J. - Fundamentos de Máquinas Eléctricas","Fitzgerald, A. E. - Máquinas eléctricas","Mohan, N. - Power Electronics: Converters, Applications and Design"]}
,{id:"HINE",semestre:5,nombre:"Hidráulica y Neumática",creditos:7,previaturas:["FETR"],programa_analitico:"Estudio de sistemas de potencia fluida. Simbología, componentes y dimensionamiento de circuitos neumáticos e hidráulicos. Automatización con válvulas de mando y diseño de mandos secuenciales.",bibliografia_recomendada:["Parr, A. - Hydraulics and pneumatics","Creus, A. - Neumática e hidráulica","Parker Training - Tecnología Hidráulica Industrial"]}
,{id:"IIN",semestre:5,nombre:"Informática Industrial",creditos:8,previaturas:["APC","MIC"],programa_analitico:"Arquitectura y programación de controladores lógicos programables (PLC). Lenguajes Ladder, FBD, AWL y Grafcet. Aplicación en control de procesos industriales y sintonización de lazos.",bibliografia_recomendada:["Hackworth, J. R. & Hackworth, F. D. - Programmable Logic Controllers","Franchi, C. M. - Controladores lógicos programáveis: sistemas discretos","Prudente, F. - Automação Industrial - Plc - Programação e Instalação"]}
,{id:"ELEC",semestre:5,nombre:"Electrotécnica",creditos:7,previaturas:["CAD","ACE","FIS2"],programa_analitico:"Diseño de instalaciones eléctricas, sistemas de puesta a tierra, cálculo luminotécnico y protección contra descargas atmosféricas. Normativa de seguridad y eficiencia energética en edificios.",bibliografia_recomendada:["Brian Scaddan - Electrical Installation Work","Antonio J. Conejo - Instalaciones Eléctricas","Helio Creder - Instalações Elétricas"]}
,{id:"PI4",semestre:5,nombre:"Proyecto Integrador IV",creditos:4,previaturas:["PI3","ELA","ISC","MIC"],programa_analitico:"Construcción final e instrumentación de un sistema mecatrónico. Integración de SCADA/HMI, dimensionamiento mecánico de componentes críticos y validación del sistema de control.",bibliografia_recomendada:["Bibliografía de las disciplinas involucradas","Koval, S. K. - Manual para la elaboración de trabajos académicos"]}
,{id:"ING5",semestre:5,nombre:"Inglés V",creditos:4,previaturas:["ING4"],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel V.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
//Semestre 6
,{id:"PFTI",semestre:6,nombre:"Proyecto Final de Titulación Intermedia",creditos:6,previaturas:[],programa_analitico:"Desarrollo individual de una monografía técnica en el área de mecatrónica. Requiere investigación, sistematización de datos, redacción bajo normas científicas y defensa ante tribunal.",bibliografia_recomendada:["Sampieri, R. - Metodología de la investigación","Gustavii, B. - How to write and illustrate scientific papers","Project Management Institute - PMBOK guide"]}
,{id:"IRI",semestre:6,nombre:"Introducción a la Robótica Industrial",creditos:9,previaturas:["IIN"],programa_analitico:"Historia y componentes de robots industriales. Modelado cinemático (directa, inversa, jacobiano). Programación en lenguaje RAPID, simulación en RobotStudio e introducción a robots móviles y ROS.",bibliografia_recomendada:["Spong, M. W. - Robot modeling and control","Lewis, F. L. - Robot manipulator control: theory and practice","Rojas, J. C. - Modelamiento y diseño de robots industriales"]}
,{id:"ININ",semestre:6,nombre:"Instrumentación Industrial",creditos:8,previaturas:["ELA"],programa_analitico:"Principios de medición de temperatura, presión, nivel y caudal en la industria. Especificación de sensores, transmisores y válvulas de control. Simbología y estándares de instrumentación.",bibliografia_recomendada:["Claiton Moro Franchi - Instrumentação De Processos Industriais","William C. Dunn - Fundamentals of Industrial Instrumentation","Northrop, R. B. - Introduction to Instrumentation and Measurements"]}
,{id:"REIN",semestre:6,nombre:"Redes Industriales",creditos:8,previaturas:["IIN"],programa_analitico:"Protocolos de comunicación industrial (AS-i, CAN, Profibus, Modbus, Profinet). Modelo OSI aplicado, redes de sensores y campo. Introducción a sistemas jerárquicos SCADA y DCS.",bibliografia_recomendada:["Lugli, A. B. & Santos, M. M. D. - Sistemas Fieldbus para Automação Industrial","Guerrero, V. - Comunicaciones Industriales","Mackay, S. - Practical Industrial Data Networks"]}
,{id:"AOGP",semestre:6,nombre:"Administración de Organizaciones y Gestión de Proyectos",creditos:4,previaturas:[],programa_analitico:"Paradigma sistémico de la administración. Gestión de personas, estructuras y cultura organizacional. Metodologías de gestión de proyectos según el PMI: alcance, plazos, costos y riesgos.",bibliografia_recomendada:["Goldratt, E. M. - Cadena Crítica","Klastorin, T. - Administración de Proyectos","Senge, P. - La quinta disciplina"]}
,{id:"ING6",semestre:6,nombre:"Inglés VI",creditos:4,previaturas:["ING5"],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel VI.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
    
    
   //Semestre 7
,{id:"CAL3",semestre:7,nombre:"Cálculo III",creditos:9,previaturas:["CAL1","CAL2"],programa_analitico:"Estudio de cálculo vectorial: operadores rotacionales, divergentes y teoremas fundamentales (Green, Stokes, Divergencia). Introducción a funciones de variables complejas, sucesiones y series numéricas.",bibliografia_recomendada:["Stewart, J. - Cálculo de varias variables","Larson, R. - Cálculo 2. De varias variables","Leithold, L. - El Cálculo"]}
,{id:"MECL",semestre:7,nombre:"Mecánica Clásica",creditos:7,previaturas:["FIS1","CAL1","CAL2"],programa_analitico:"Cinemática y dinámica avanzada aplicando leyes de Newton, conservación del momento y energía. Formulación Lagrangiana, oscilaciones, movimiento rotacional de cuerpos rígidos y osciladores acoplados.",bibliografia_recomendada:["Taylor, J. R. - Classical mechanics","Morin, D. - Introduction to classical mechanics","Marion, J. B. - Classical dynamics of particles and systems"]}
,{id:"GAL2",semestre:7,nombre:"Geometría Analítica y Álgebra Lineal II",creditos:7,previaturas:["GAL1","CAL3","FIS2"],programa_analitico:"Espacios con producto interno, normados y métricos. Teoría de operadores lineales, ortogonalización (Gram-Schmidt), diagonalización de matrices, álgebra matricial numérica y formas cuadráticas.",bibliografia_recomendada:["Poole, D. - Álgebra Lineal: Una Introducción Moderna","Giraldo, H. - Algebra Lineal con el uso de Matlab","Lay, D. C. - Álgebra Lineal y sus Aplicaciones"]}
,{id:"SISU",semestre:7,nombre:"Sistemas de Supervisión",creditos:5,previaturas:["REIN"],programa_analitico:"Conceptos y desarrollo de sistemas SCADA. Diseño de pantallas (HMI), gestión de etiquetas (tags), scripts, alarmas e informes. Integración con bases de datos y ciberseguridad industrial.",bibliografia_recomendada:["Bailey D. & Wright E. - Practical SCADA for Industry","Boyer, S. A. - SCADA: supervisory data control and acquisition","Krutz, R. - Securing SCADA Systems"]}
,{id:"ELEM",semestre:7,nombre:"Electromagnetismo",creditos:9,previaturas:["FIS1","FIS2","CAL1","CAL2"],programa_analitico:"Fundamentos de análisis vectorial aplicados a campos eléctricos y magnéticos. Leyes de Coulomb, Gauss, Ampère y Faraday. Propiedades de materiales conductores y dieléctricos, y campos variables en el tiempo.",bibliografia_recomendada:["Hayt, W. H. Jr. - Electromagnetismo","Edminister, J. A. - Electromagnetismo (Schaum)","Sadiku, M. N. O. - Elementos de Electromagnetismo"]}
,{id:"ING7",semestre:7,nombre:"Inglés VII",creditos:4,previaturas:["ING6"],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel VII.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
 
//Semestre 8
,{id:"ECDI",semestre:8,nombre:"Ecuaciones Diferenciales",creditos:9,previaturas:["CAL1","CAL2"],programa_analitico:"Series de potencias (Taylor, Maclaurin), series de Fourier y transformada de Laplace. Resolución de ecuaciones diferenciales ordinarias de orden superior, sistemas de ecuaciones lineales y ecuaciones en derivadas parciales.",bibliografia_recomendada:["Fernández, C. - Ecuaciones diferenciales y en diferencias","Zill, M. R. - Ecuaciones diferenciales","Boyce & Di Prima - Ecuaciones diferenciales y problemas con valores en la frontera"]}
,{id:"SCTD",semestre:8,nombre:"Sistemas de Control en Tiempo Discreto",creditos:7,previaturas:["SSL","ISC","GAL1"],programa_analitico:"Modelado y análisis de sistemas lineales en tiempo discreto. Técnicas de discretización, convertidores A/D y D/A, diseño de filtros digitales, controlabilidad, estabilidad (Jury, Nyquist) y control óptimo.",bibliografia_recomendada:["Ogata, K. - Engenharia de Controle Moderno","Phillips, C. L. - Sistemas de controle e realimentação","Bazanella, A. S. - Sistemas de controle - princípios e métodos de proyecto"]}
,{id:"TERM",semestre:8,nombre:"Termodinámica",creditos:9,previaturas:["FIS1","FIS2","CAL2"],programa_analitico:"Propiedades de sustancias puras, balances de masa, energía y entropía. Análisis de ciclos termodinámicos de potencia (Rankine, Brayton, Otto, Diesel) y sistemas de refrigeración.",bibliografia_recomendada:["Moran, M. J. - Fundamentos de termodinámica técnica","Çengel, Y. A. - Termodinámica","Bejan, A. - Advanced engineering thermodynamics"]}
,{id:"MCED",semestre:8,nombre:"Modelado y Control de Sistemas a Eventos Discretos",creditos:7,previaturas:["ISC"],programa_analitico:"Fundamentos de Sistemas a Eventos Discretos (SED). Modelado mediante Redes de Petri y autómatas de estados finitos. Control supervisado y simulación computacional de procesos de espera.",bibliografia_recomendada:["Cassandras, C. G. - Introduction to discrete event systems","René, D. - Discrete, continuous, and hybrid Petri nets","Moreira, M. V. - Bridging the gap between design and implementation of discrete-event controllers"]}
,{id:"CANU",semestre:8,nombre:"Cálculo Numérico",creditos:7,previaturas:["GAL2","POO"],programa_analitico:"Algoritmos numéricos para resolución de ecuaciones no lineales, optimización multivariable, sistemas de ecuaciones lineales (Gauss, Jacobi), interpolación, diferenciación e integración numérica.",bibliografia_recomendada:["Mathews, J. - Métodos numéricos con Matlab","Burden, R. - Análisis Numérico","Gerald, C. - Análisis numérico con aplicaciones"]}
,{id:"ING8",semestre:8,nombre:"Inglés VIII",creditos:4,previaturas:["ING7"],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel VIII.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
 
//Semestre 9
,{id:"PFMA",semestre:9,nombre:"Procesos de Fabricación Mecánica para la Automatización",creditos:5,previaturas:[],programa_analitico:"Estudio de los procesos de manufactura mecánica: fundición, laminado, forjado, extrusión y trefilado. Formado de hojas metálicas, moldeo de plásticos y procesos de soldadura por fusión y estado sólido.",bibliografia_recomendada:["Kalpakjian, S. - Manufactura, Ingeniería y Tecnología","Groover, M. P. - Introducción a los procesos de manufactura","Callister, W. D. - Ciencia e ingeniería de materiales"]}
,{id:"MSPR",semestre:9,nombre:"Modelado y Simulación de Procesos",creditos:6,previaturas:["MCED"],programa_analitico:"Modelado avanzado de sistemas dinámicos continuos y complejos (SISO/MIMO). Técnicas de reducción de orden, sistemas caóticos, lógica fuzzy y control predictivo basado en modelo (MPC).",bibliografia_recomendada:["Chaturvedi, D. K. - Modeling and Simulation of Systems Using Matlab and Simulink","Savi, M. A. - Dinâmica Não-linear e Caos","Simões, M. G. - Controle e modelagem Fuzzy"]}
,{id:"ELPC",semestre:9,nombre:"Electrónica de Potencia y Control",creditos:9,previaturas:["ACE","ELEM","SCTD"],programa_analitico:"Convertidores estáticos de potencia (CC-CC, CC-CA, CA-CC). Modelado de señales pequeñas, diseño de lazos de control y estabilidad. Aspectos prácticos: diseño térmico, magnético y circuitos de accionamiento.",bibliografia_recomendada:["Erickson, R. W. - Fundamentals of Power Electronics","Mohan, N. - Power Electronics: Converters, Applications and Design","Rashid, M. H. - Power Electronics: Circuits, Devices & Applications"]}
,{id:"EMPR",semestre:9,nombre:"Emprendedurismo",creditos:4,previaturas:[],programa_analitico:"Conceptos de economía aplicados al emprendimiento. Procesos de creación de organizaciones, modelos de negocio, fuentes de financiación y habilidades intrínsecas del emprendedor.",bibliografia_recomendada:["Senge, P. - La quinta disciplina"]}
,{id:"INAR",semestre:9,nombre:"Inteligencia Artificial",creditos:6,previaturas:["POO","MIC"],programa_analitico:"Fundamentos de Inteligencia Artificial: redes neuronales (BackPropagation, convolucionales), sistemas expertos, algoritmos genéticos y machine learning. Aplicación en robótica, industria y procesamiento de datos.",bibliografia_recomendada:["Goodfellow, I. - Aprendizaje Profundo","Haykin, S. - Redes Neuronais: Princípios e Práticas","Lee, K-F. - Inteligencia Artificial"]}
,{id:"PREST",semestre:9,nombre:"Probabilidad y Estadística",creditos:7,previaturas:["CAL1","CAL2"],programa_analitico:"Tratamiento y análisis de datos: estadística descriptiva, teoría de probabilidades y distribuciones (Binomial, Normal). Estimación de parámetros, intervalos de confianza y pruebas de hipótesis.",bibliografia_recomendada:["Walpole, Myers - Probabilidad y Estadística para Ingeniería y Ciencias","Montgomery, D. C. - Probabilidad y Estadística Aplicada a la Ingeniería","Devore, J. L. - Probabilidad y Estadística para Ingenieros y Ciencias"]}
,{id:"OPT1",semestre:9,nombre:"Optativa I",creditos:6,previaturas:[],programa_analitico:"Unidad curricular electiva orientada a la especialización o desarrollo de habilidades transversales avanzadas.",bibliografia_recomendada:["Bibliografía dependiente de la unidad electiva cursada"]}, 
,{id:"ING9",semestre:9,nombre:"Inglés IX",creditos:4,previaturas:["ING8"],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel IX.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
 
//Semestre 10
,{id:"PFC",semestre:10,nombre:"Proyecto Final de Carrera",creditos:15,previaturas:["80% créditos ICA","PFTI"],programa_analitico:"Desarrollo individual de un proyecto de ingeniería de carácter profesional o de investigación. Requiere la aplicación integral de conocimientos, redacción de monografía y defensa ante tribunal.",bibliografia_recomendada:["Sampieri, R. - Metodología de la investigación","Gustavii, B. - How to write and illustrate scientific papers","Project Management Institute - PMBOK guide"]}
,{id:"IAC",semestre:10,nombre:"Ingeniería Asistida por Computadora (Optativa)",creditos:7,previaturas:["CAD","REMA","MAM","FETR"],programa_analitico:"Simulaciones numéricas de mecánica de sólidos y fluidos con ANSYS. Métodos de elementos finitos y diferencias/volúmenes finitos para análisis de tensión, deformación y flujo.",bibliografia_recomendada:["Logan, D. L. - First Course in the Finite Element Method","Madenci, E. - The finite element method and applications in engineering using ANSYS","Patankar, S. - Numerical heat transfer and fluid flow"]}
,{id:"MEL",semestre:10,nombre:"Movilidad Eléctrica (Optativa)",creditos:7,previaturas:["ELA"],programa_analitico:"Tecnología de autos eléctricos. Motores, electrónica de potencia aplicada, tecnología de baterías, sistemas de carga inteligente y mantenimiento de vehículos eléctricos.",bibliografia_recomendada:["Hart, D. W. - Introducción a la Eletrónica de Potencia","Arrabaça, D. A. - Eletrônica de Potencia Conversores CA/CC","Denton, T. - Veículos Elétricos e Híbridos"]}
,{id:"OPT2",semestre:10,nombre:"Optativa II",creditos:7,previaturas:[],programa_analitico:"Unidad curricular electiva orientada a la especialización o desarrollo de habilidades transversales avanzadas.",bibliografia_recomendada:["Bibliografía dependiente de la unidad electiva cursada"]}, 
,{id:"ING10",semestre:10,nombre:"Inglés X",creditos:4,previaturas:["ING9"],programa_analitico:"Desarrollo de competencias lingüísticas en el idioma inglés nivel X.",bibliografia_recomendada:["Programa de Inglés de la UTEC"]}
 
];

const OPTATIVAS = [
    {id:"EEI",semestre:9,nombre:"Eficiencia Energética en la Industria",creditos:6,previaturas:[],programa_analitico:"Conceptos de eficiencia energética aplicados a sectores industriales: terminología, factores que influyen en el consumo, gestión y auditoría energética, e integración de fuentes de energía renovable al sector.",bibliografia_recomendada:["Palm, J., & Thollander, P. - An interdisciplinary perspective on industrial energy efficiency","Twidell, J. - Renewable Energy Resources"]}
    ,{id:"SDIN",semestre:9,nombre:"Sistemas Dinámicos",creditos:6,previaturas:[],programa_analitico:"",bibliografia_recomendada:[]}
    ,{id:"SEMB",semestre:9,nombre:"Sistemas Embebidos",creditos:6,previaturas:[],programa_analitico:"",bibliografia_recomendada:[]}
    ,{id:"IOT",semestre:9,nombre:"Internet de las Cosas e Ind. 4.0",creditos:6,previaturas:[],programa_analitico:"",bibliografia_recomendada:[]}


    ,{id:"IAC",semestre:10,nombre:"Ingeniería Asistida por Computadora",creditos:7,previaturas:["CAD","REMA","MAM","FETR"],programa_analitico:"Análisis computacional de ingeniería enfocado en simulaciones numéricas de mecánica de sólidos y fluidos mediante métodos de elementos finitos y diferencias/volúmenes finitos.",bibliografia_recomendada:["LOGAN, Daryl L. - First Course in the Finite Element Method","MADENCI, Erdogan - The finite element method and applications in engineering using ANSYS"]}
    ,{id:"MEL",semestre:10,nombre:"Movilidad Eléctrica",creditos:7,previaturas:["ELA"],programa_analitico:"Estudio de la tecnología de vehículos eléctricos: funcionamiento, motores, electrónica de potencia, tecnología de baterías, carga de vehículos eléctricos y carga inteligente.",bibliografia_recomendada:["Hart, Daniel W. - Introducción a la Eletrónica de Potencia","Denton, Tom - Veículos Elétricos e Híbridos"]}
    ,{id:"SMDM",semestre:10,nombre:"Selección de materiales para el diseño mecánico",creditos:7,previaturas:[],programa_analitico:"Fundamentos sobre la selección de materiales y procesos para proyectos mecánicos. Evaluación de propiedades de materiales y su afectación por los procesos de fabricación para cumplir demandas de diseño.",bibliografia_recomendada:["ASHBY, Michael - Seleção de Materiais no Projeto Mecânico","CALLISTER, William D. - Ciência e engenharia de materiales"]}
    ,{id:"CMA2",semestre:10,nombre:"Ciencia de los Materiales II",creditos:7,previaturas:[],programa_analitico:"",bibliografia_recomendada:[]}
    ,{id:"CIBER",semestre:10,nombre:"Ciberseguridad",creditos:7,previaturas:[],programa_analitico:"",bibliografia_recomendada:[]}
 
];

const SEMESTRES = [1,2,3,4,5,6,7,8,9,10];

// ─── THEMES ───────────────────────────────────────────────────────────────────
// Base helper to quickly construct UI palettes.
function buildTheme(label, { pageBg, headerBg, headerBorder, semHdrBg, semNum, semLabel, semCr, hintText, hintPrev, hintHab, cNBg, cNBorder, cNBar, cNName, cNId, cNBadgeBg, cDBg, cDName, cSBg, cSBorder, cSName, cPBg, cPBorder, cPName, cPId, cPBadgeBg, cHBg, cHBorder, cHName, cHId, cHBadgeBg, infoBg, infoColor, mBg, mTitle, mText, mDivider, mBadgePrevBg, mBadgePrevText, mBadgeHabBg, mBadgeHabText, toggleBg, toggleColor }) {
  return {
    label, pageBg, headerBg, headerBorder, semHdrBg, semHdrBorder: headerBorder, semNum, semLabel, semCr, hintText, hintPrev, hintHab,
    cNBg, cNBorder, cNBar, cNName, cNId, cNBadgeBg,
    cDBg: cDBg || pageBg, cDBorder: cNBorder, cDName: cDName || hintText,
    cSBg, cSBorder, cSBar: cSBorder, cSName, cSId: cSName, cSBadgeBg: cNBadgeBg,
    cPBg, cPBorder, cPBar: cPBorder, cPName, cPId, cPBadgeBg,
    cHBg, cHBorder, cHBar: cHBorder, cHName, cHId, cHBadgeBg,
    infoBg, infoColor, infoHover: cSBg,
    mBg, mBorder: headerBorder, mTitle, mText, mDivider, mLabel: semLabel, mFootBg: pageBg,
    mBadgePrevBg, mBadgePrevBorder: cPBorder, mBadgePrevText,
    mBadgeHabBg, mBadgeHabBorder: cHBorder, mBadgeHabText,
    closeBg: infoBg, closeColor: infoColor,
    sBarPrev: hintPrev, sBarHab: hintHab, sBarBiblio: cNBar,
    sLabelPrev: cPName, sLabelHab: cHName, sLabelBiblio: cNId,
    bullet: cNBar, toggleBg, toggleColor, logoColor: cNId,
    legDotSel: cSBorder, legDotPrev: hintPrev, legDotHab: hintHab, legText: semLabel, clearColor: hintText
  };
}

const THEMES = {
  dark: buildTheme("Dark", { pageBg:"#111", headerBg:"rgba(17,17,17,0.93)", headerBorder:"rgba(255,255,255,0.09)", semHdrBg:"#1e1e1e", semNum:"#d8d8d8", semLabel:"rgba(255,255,255,0.38)", semCr:"rgba(255,255,255,0.28)", hintText:"rgba(255,255,255,0.32)", hintPrev:"#d97706", hintHab:"#16a34a", cNBg:"#1c1c1c", cNBorder:"rgba(255,255,255,0.1)", cNBar:"#333", cNName:"#e0e0e0", cNId:"rgba(255,255,255,0.4)", cNBadgeBg:"#282828", cDBg:"#161616", cDName:"rgba(255,255,255,0.18)", cSBg:"#222", cSBorder:"#e0e0e0", cSName:"#f5f5f5", cPBg:"#1f1800", cPBorder:"#b45309", cPName:"#fde68a", cPId:"#fbbf24", cPBadgeBg:"#2a1c00", cHBg:"#0d1f12", cHBorder:"#15803d", cHName:"#bbf7d0", cHId:"#4ade80", cHBadgeBg:"#0a1a0e", infoBg:"#252525", infoColor:"rgba(255,255,255,0.5)", mBg:"#181818", mTitle:"#f0f0f0", mText:"rgba(255,255,255,0.72)", mDivider:"rgba(255,255,255,0.08)", mBadgePrevBg:"#2a1800", mBadgePrevText:"#fcd34d", mBadgeHabBg:"#081a10", mBadgeHabText:"#6ee7b7", toggleBg:"#232323", toggleColor:"#f0c060" }),
  
  light2026: buildTheme("Light 2026", { pageBg:"#f0ede8", headerBg:"rgba(240,237,232,0.93)", headerBorder:"rgba(0,0,0,0.09)", semHdrBg:"#e6e2dc", semNum:"#1a1a1a", semLabel:"rgba(0,0,0,0.4)", semCr:"rgba(0,0,0,0.3)", hintText:"rgba(0,0,0,0.38)", hintPrev:"#b45309", hintHab:"#15803d", cNBg:"#faf8f5", cNBorder:"rgba(0,0,0,0.1)", cNBar:"#d6d0c8", cNName:"#1a1a1a", cNId:"#666", cNBadgeBg:"#ede9e3", cDBg:"#f0ede8", cDName:"rgba(0,0,0,0.22)", cSBg:"#faf8f5", cSBorder:"#1a1a1a", cSName:"#111", cPBg:"#fffbf0", cPBorder:"#d97706", cPName:"#78350f", cPId:"#92400e", cPBadgeBg:"#fef3c7", cHBg:"#f0fdf4", cHBorder:"#16a34a", cHName:"#14532d", cHId:"#166534", cHBadgeBg:"#dcfce7", infoBg:"#e8e4de", infoColor:"#555", mBg:"#faf8f5", mTitle:"#111", mText:"#374151", mDivider:"rgba(0,0,0,0.07)", mBadgePrevBg:"#fef3c7", mBadgePrevText:"#92400e", mBadgeHabBg:"#dcfce7", mBadgeHabText:"#14532d", toggleBg:"#e0dcd6", toggleColor:"#374151" }),
  
  softLight: buildTheme("Soft Light (Eye Care)", { pageBg:"#fbf8f1", headerBg:"rgba(251,248,241,0.95)", headerBorder:"rgba(0,0,0,0.08)", semHdrBg:"#f2ede4", semNum:"#4a443a", semLabel:"rgba(74,68,58,0.5)", semCr:"rgba(74,68,58,0.4)", hintText:"rgba(74,68,58,0.45)", hintPrev:"#c27027", hintHab:"#438543", cNBg:"#ffffff", cNBorder:"rgba(0,0,0,0.08)", cNBar:"#d8d3c9", cNName:"#4a443a", cNId:"#7d7568", cNBadgeBg:"#f2ede4", cDBg:"#fbf8f1", cDName:"rgba(74,68,58,0.3)", cSBg:"#ffffff", cSBorder:"#5a87b8", cSName:"#2a4b6e", cPBg:"#fdf6eb", cPBorder:"#d28b4b", cPName:"#9e530b", cPId:"#c27027", cPBadgeBg:"#f6e8d2", cHBg:"#f0fae8", cHBorder:"#679967", cHName:"#2e5c2e", cHId:"#438543", cHBadgeBg:"#def0d5", infoBg:"#f2ede4", infoColor:"#665e52", mBg:"#ffffff", mTitle:"#36312a", mText:"#5e574d", mDivider:"rgba(0,0,0,0.08)", mBadgePrevBg:"#f6e8d2", mBadgePrevText:"#9e530b", mBadgeHabBg:"#def0d5", mBadgeHabText:"#2e5c2e", toggleBg:"#e5decb", toggleColor:"#4a443a" }),

  nord: buildTheme("Nord", { pageBg:"#2e3440", headerBg:"rgba(46,52,64,0.95)", headerBorder:"#3b4252", semHdrBg:"#3b4252", semNum:"#eceff4", semLabel:"#d8dee9", semCr:"#d8dee9", hintText:"#4c566a", hintPrev:"#ebcb8b", hintHab:"#a3be8c", cNBg:"#434c5e", cNBorder:"#4c566a", cNBar:"#4c566a", cNName:"#eceff4", cNId:"#d8dee9", cNBadgeBg:"#3b4252", cDBg:"#2e3440", cDName:"#4c566a", cSBg:"#4c566a", cSBorder:"#88c0d0", cSName:"#8fbcbb", cPBg:"#3b4252", cPBorder:"#ebcb8b", cPName:"#ebcb8b", cPId:"#ebcb8b", cPBadgeBg:"#2e3440", cHBg:"#3b4252", cHBorder:"#a3be8c", cHName:"#a3be8c", cHId:"#a3be8c", cHBadgeBg:"#2e3440", infoBg:"#3b4252", infoColor:"#d8dee9", mBg:"#434c5e", mTitle:"#eceff4", mText:"#e5e9f0", mDivider:"#4c566a", mBadgePrevBg:"#3b4252", mBadgePrevText:"#ebcb8b", mBadgeHabBg:"#3b4252", mBadgeHabText:"#a3be8c", toggleBg:"#3b4252", toggleColor:"#88c0d0" }),

  dracula: buildTheme("Dracula Official", { pageBg:"#282a36", headerBg:"rgba(40,42,54,0.95)", headerBorder:"#44475a", semHdrBg:"#44475a", semNum:"#f8f8f2", semLabel:"#6272a4", semCr:"#6272a4", hintText:"#6272a4", hintPrev:"#f1fa8c", hintHab:"#50fa7b", cNBg:"#44475a", cNBorder:"#6272a4", cNBar:"#6272a4", cNName:"#f8f8f2", cNId:"#8be9fd", cNBadgeBg:"#282a36", cDBg:"#282a36", cDName:"#6272a4", cSBg:"#6272a4", cSBorder:"#bd93f9", cSName:"#bd93f9", cPBg:"#44475a", cPBorder:"#f1fa8c", cPName:"#f1fa8c", cPId:"#f1fa8c", cPBadgeBg:"#282a36", cHBg:"#44475a", cHBorder:"#50fa7b", cHName:"#50fa7b", cHId:"#50fa7b", cHBadgeBg:"#282a36", infoBg:"#282a36", infoColor:"#f8f8f2", mBg:"#44475a", mTitle:"#f8f8f2", mText:"#f8f8f2", mDivider:"#6272a4", mBadgePrevBg:"#282a36", mBadgePrevText:"#f1fa8c", mBadgeHabBg:"#282a36", mBadgeHabText:"#50fa7b", toggleBg:"#6272a4", toggleColor:"#ff79c6" }),

  materialDark: buildTheme("Material Dark", { pageBg:"#212121", headerBg:"rgba(33,33,33,0.95)", headerBorder:"#424242", semHdrBg:"#303030", semNum:"#eeffff", semLabel:"rgba(238,255,255,0.5)", semCr:"rgba(238,255,255,0.4)", hintText:"rgba(238,255,255,0.3)", hintPrev:"#ffcb6b", hintHab:"#c3e88d", cNBg:"#303030", cNBorder:"#424242", cNBar:"#545454", cNName:"#eeffff", cNId:"rgba(238,255,255,0.6)", cNBadgeBg:"#212121", cDBg:"#212121", cDName:"rgba(238,255,255,0.2)", cSBg:"#424242", cSBorder:"#82aaff", cSName:"#82aaff", cPBg:"#303030", cPBorder:"#ffcb6b", cPName:"#ffcb6b", cPId:"#ffcb6b", cPBadgeBg:"#212121", cHBg:"#303030", cHBorder:"#c3e88d", cHName:"#c3e88d", cHId:"#c3e88d", cHBadgeBg:"#212121", infoBg:"#212121", infoColor:"#eeffff", mBg:"#303030", mTitle:"#eeffff", mText:"rgba(238,255,255,0.8)", mDivider:"#424242", mBadgePrevBg:"#212121", mBadgePrevText:"#ffcb6b", mBadgeHabBg:"#212121", mBadgeHabText:"#c3e88d", toggleBg:"#424242", toggleColor:"#c792ea" }),

  materialOcean: buildTheme("Material Ocean", { pageBg:"#0f111a", headerBg:"rgba(15,17,26,0.95)", headerBorder:"#1a1c29", semHdrBg:"#1a1c29", semNum:"#a6accd", semLabel:"rgba(166,172,205,0.5)", semCr:"rgba(166,172,205,0.4)", hintText:"rgba(166,172,205,0.3)", hintPrev:"#ffcb6b", hintHab:"#c3e88d", cNBg:"#1a1c29", cNBorder:"#292d3e", cNBar:"#292d3e", cNName:"#a6accd", cNId:"rgba(166,172,205,0.6)", cNBadgeBg:"#0f111a", cDBg:"#0f111a", cDName:"rgba(166,172,205,0.2)", cSBg:"#292d3e", cSBorder:"#82aaff", cSName:"#82aaff", cPBg:"#1a1c29", cPBorder:"#ffcb6b", cPName:"#ffcb6b", cPId:"#ffcb6b", cPBadgeBg:"#0f111a", cHBg:"#1a1c29", cHBorder:"#c3e88d", cHName:"#c3e88d", cHId:"#c3e88d", cHBadgeBg:"#0f111a", infoBg:"#0f111a", infoColor:"#a6accd", mBg:"#1a1c29", mTitle:"#a6accd", mText:"rgba(166,172,205,0.8)", mDivider:"#292d3e", mBadgePrevBg:"#0f111a", mBadgePrevText:"#ffcb6b", mBadgeHabBg:"#0f111a", mBadgeHabText:"#c3e88d", toggleBg:"#292d3e", toggleColor:"#82aaff" }),

  materialPalenight: buildTheme("Material Palenight", { pageBg:"#292d3e", headerBg:"rgba(41,45,62,0.95)", headerBorder:"#32374d", semHdrBg:"#32374d", semNum:"#a6accd", semLabel:"rgba(166,172,205,0.5)", semCr:"rgba(166,172,205,0.4)", hintText:"rgba(166,172,205,0.3)", hintPrev:"#ffcb6b", hintHab:"#c3e88d", cNBg:"#32374d", cNBorder:"#444a73", cNBar:"#444a73", cNName:"#a6accd", cNId:"rgba(166,172,205,0.6)", cNBadgeBg:"#292d3e", cDBg:"#292d3e", cDName:"rgba(166,172,205,0.2)", cSBg:"#444a73", cSBorder:"#82aaff", cSName:"#82aaff", cPBg:"#32374d", cPBorder:"#ffcb6b", cPName:"#ffcb6b", cPId:"#ffcb6b", cPBadgeBg:"#292d3e", cHBg:"#32374d", cHBorder:"#c3e88d", cHName:"#c3e88d", cHId:"#c3e88d", cHBadgeBg:"#292d3e", infoBg:"#292d3e", infoColor:"#a6accd", mBg:"#32374d", mTitle:"#a6accd", mText:"rgba(166,172,205,0.8)", mDivider:"#444a73", mBadgePrevBg:"#292d3e", mBadgePrevText:"#ffcb6b", mBadgeHabBg:"#292d3e", mBadgeHabText:"#c3e88d", toggleBg:"#444a73", toggleColor:"#c792ea" }),

  oneDarkPro: buildTheme("One Dark Pro", { pageBg:"#282c34", headerBg:"rgba(40,44,52,0.95)", headerBorder:"#353b45", semHdrBg:"#353b45", semNum:"#abb2bf", semLabel:"rgba(171,178,191,0.5)", semCr:"rgba(171,178,191,0.4)", hintText:"rgba(171,178,191,0.3)", hintPrev:"#e5c07b", hintHab:"#98c379", cNBg:"#353b45", cNBorder:"#3e4451", cNBar:"#3e4451", cNName:"#abb2bf", cNId:"rgba(171,178,191,0.6)", cNBadgeBg:"#282c34", cDBg:"#282c34", cDName:"rgba(171,178,191,0.2)", cSBg:"#3e4451", cSBorder:"#61afef", cSName:"#61afef", cPBg:"#353b45", cPBorder:"#e5c07b", cPName:"#e5c07b", cPId:"#e5c07b", cPBadgeBg:"#282c34", cHBg:"#353b45", cHBorder:"#98c379", cHName:"#98c379", cHId:"#98c379", cHBadgeBg:"#282c34", infoBg:"#282c34", infoColor:"#abb2bf", mBg:"#353b45", mTitle:"#abb2bf", mText:"rgba(171,178,191,0.8)", mDivider:"#3e4451", mBadgePrevBg:"#282c34", mBadgePrevText:"#e5c07b", mBadgeHabBg:"#282c34", mBadgeHabText:"#98c379", toggleBg:"#3e4451", toggleColor:"#61afef" }),

  horizonDark: buildTheme("Horizon Dark", { pageBg:"#1c1e26", headerBg:"rgba(28,30,38,0.95)", headerBorder:"#232530", semHdrBg:"#232530", semNum:"#d5d8da", semLabel:"rgba(213,216,218,0.5)", semCr:"rgba(213,216,218,0.4)", hintText:"rgba(213,216,218,0.3)", hintPrev:"#fac863", hintHab:"#09f7a0", cNBg:"#232530", cNBorder:"#2e303e", cNBar:"#2e303e", cNName:"#d5d8da", cNId:"rgba(213,216,218,0.6)", cNBadgeBg:"#1c1e26", cDBg:"#1c1e26", cDName:"rgba(213,216,218,0.2)", cSBg:"#2e303e", cSBorder:"#e95678", cSName:"#e95678", cPBg:"#232530", cPBorder:"#fac863", cPName:"#fac863", cPId:"#fac863", cPBadgeBg:"#1c1e26", cHBg:"#232530", cHBorder:"#09f7a0", cHName:"#09f7a0", cHId:"#09f7a0", cHBadgeBg:"#1c1e26", infoBg:"#1c1e26", infoColor:"#d5d8da", mBg:"#232530", mTitle:"#d5d8da", mText:"rgba(213,216,218,0.8)", mDivider:"#2e303e", mBadgePrevBg:"#1c1e26", mBadgePrevText:"#fac863", mBadgeHabBg:"#1c1e26", mBadgeHabText:"#09f7a0", toggleBg:"#2e303e", toggleColor:"#e95678" }),

  horizonBright: buildTheme("Horizon Bright", { pageBg:"#fdf0ed", headerBg:"rgba(253,240,237,0.95)", headerBorder:"#fadad1", semHdrBg:"#fadad1", semNum:"#1c1e26", semLabel:"rgba(28,30,38,0.5)", semCr:"rgba(28,30,38,0.4)", hintText:"rgba(28,30,38,0.3)", hintPrev:"#f09383", hintHab:"#09f7a0", cNBg:"#ffffff", cNBorder:"#fadad1", cNBar:"#f09383", cNName:"#1c1e26", cNId:"rgba(28,30,38,0.6)", cNBadgeBg:"#fdf0ed", cDBg:"#fdf0ed", cDName:"rgba(28,30,38,0.2)", cSBg:"#ffffff", cSBorder:"#e95678", cSName:"#e95678", cPBg:"#ffffff", cPBorder:"#f09383", cPName:"#f09383", cPId:"#f09383", cPBadgeBg:"#fdf0ed", cHBg:"#ffffff", cHBorder:"#09f7a0", cHName:"#1c1e26", cHId:"#09f7a0", cHBadgeBg:"#fdf0ed", infoBg:"#fdf0ed", infoColor:"#1c1e26", mBg:"#ffffff", mTitle:"#1c1e26", mText:"rgba(28,30,38,0.8)", mDivider:"#fadad1", mBadgePrevBg:"#fdf0ed", mBadgePrevText:"#f09383", mBadgeHabBg:"#fdf0ed", mBadgeHabText:"#09f7a0", toggleBg:"#fadad1", toggleColor:"#e95678" })
};

// Also keep existing default fallbacks to ensure nothing breaks
const fallbackThemes = {
  monokaiDimmed: buildTheme("Monokai Dimmed", { pageBg:"#1e1e1e", headerBg:"rgba(30,30,30,0.93)", headerBorder:"rgba(255,255,255,0.07)", semHdrBg:"#272727", semNum:"#c8c8c8", semLabel:"rgba(200,200,200,0.4)", semCr:"rgba(200,200,200,0.3)", hintText:"rgba(200,200,200,0.35)", hintPrev:"#e5c07b", hintHab:"#98c379", cNBg:"#252525", cNBorder:"rgba(255,255,255,0.09)", cNBar:"#383838", cNName:"#c8c8c8", cNId:"rgba(200,200,200,0.42)", cNBadgeBg:"#2e2e2e", cDBg:"#1e1e1e", cDName:"rgba(200,200,200,0.18)", cSBg:"#2d2d2d", cSBorder:"#c8c8c8", cSName:"#f0f0f0", cPBg:"#2a2000", cPBorder:"#e5c07b", cPName:"#ffe5a0", cPId:"#e5c07b", cPBadgeBg:"#332800", cHBg:"#1a2a1a", cHBorder:"#98c379", cHName:"#c3f0a0", cHId:"#98c379", cHBadgeBg:"#1e301e", infoBg:"#2e2e2e", infoColor:"rgba(200,200,200,0.5)", mBg:"#222222", mTitle:"#e8e8e8", mText:"rgba(200,200,200,0.78)", mDivider:"rgba(255,255,255,0.07)", mBadgePrevBg:"#332800", mBadgePrevText:"#ffe5a0", mBadgeHabBg:"#1a2a1a", mBadgeHabText:"#c3f0a0", toggleBg:"#2e2e2e", toggleColor:"#e5c07b" }),
  monokai: buildTheme("Monokai", { pageBg:"#272822", headerBg:"rgba(39,40,34,0.94)", headerBorder:"rgba(255,255,255,0.08)", semHdrBg:"#3e3d32", semNum:"#f8f8f2", semLabel:"rgba(248,248,242,0.42)", semCr:"rgba(248,248,242,0.32)", hintText:"rgba(248,248,242,0.36)", hintPrev:"#e6db74", hintHab:"#a6e22e", cNBg:"#3e3d32", cNBorder:"rgba(255,255,255,0.1)", cNBar:"#5c5b50", cNName:"#f8f8f2", cNId:"rgba(248,248,242,0.45)", cNBadgeBg:"#49483e", cDBg:"#2e2d27", cDName:"rgba(248,248,242,0.2)", cSBg:"#49483e", cSBorder:"#f8f8f2", cSName:"#ffffff", cPBg:"#3a3300", cPBorder:"#e6db74", cPName:"#fff5a0", cPId:"#e6db74", cPBadgeBg:"#443e00", cHBg:"#1e2e10", cHBorder:"#a6e22e", cHName:"#d8f5a0", cHId:"#a6e22e", cHBadgeBg:"#243615", infoBg:"#49483e", infoColor:"rgba(248,248,242,0.55)", mBg:"#3e3d32", mTitle:"#f8f8f2", mText:"rgba(248,248,242,0.8)", mDivider:"rgba(255,255,255,0.08)", mBadgePrevBg:"#443e00", mBadgePrevText:"#fff5a0", mBadgeHabBg:"#1e2e10", mBadgeHabText:"#d8f5a0", toggleBg:"#49483e", toggleColor:"#e6db74" }),
  solarizedLight: buildTheme("Solarized Light", { pageBg:"#fdf6e3", headerBg:"rgba(253,246,227,0.93)", headerBorder:"rgba(147,161,161,0.22)", semHdrBg:"#eee8d5", semNum:"#073642", semLabel:"rgba(7,54,66,0.45)", semCr:"rgba(7,54,66,0.35)", hintText:"rgba(7,54,66,0.4)", hintPrev:"#b58900", hintHab:"#2aa198", cNBg:"#fdf6e3", cNBorder:"rgba(147,161,161,0.28)", cNBar:"#93a1a1", cNName:"#073642", cNId:"#657b83", cNBadgeBg:"#eee8d5", cDBg:"#fdf6e3", cDName:"rgba(7,54,66,0.22)", cSBg:"#eee8d5", cSBorder:"#073642", cSName:"#002b36", cPBg:"#fffbef", cPBorder:"#b58900", cPName:"#7b5e00", cPId:"#b58900", cPBadgeBg:"#f5ecc8", cHBg:"#eefcfa", cHBorder:"#2aa198", cHName:"#005f5a", cHId:"#2aa198", cHBadgeBg:"#d4f4f2", infoBg:"#eee8d5", infoColor:"#657b83", mBg:"#fdf6e3", mTitle:"#002b36", mText:"#354a50", mDivider:"rgba(147,161,161,0.18)", mBadgePrevBg:"#f5ecc8", mBadgePrevText:"#7b5e00", mBadgeHabBg:"#d4f4f2", mBadgeHabText:"#005f5a", toggleBg:"#eee8d5", toggleColor:"#073642" })
};

Object.assign(THEMES, fallbackThemes);

const THEME_ORDER = ["dark", "light2026", "softLight", "nord", "dracula", "materialDark", "materialOcean", "materialPalenight", "oneDarkPro", "horizonDark", "horizonBright", "monokaiDimmed", "monokai", "solarizedLight"];


// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ materia, effectiveMaterias, onClose, t, onSelectOptativa, onRemoveOptativa }) {
  const [selecting, setSelecting] = useState(false);

  // Automatically switch to selecting mode if it's an unconfigured slot
  useEffect(() => {
    if (materia?.isUnconfiguredOptativa) setSelecting(true);
    else setSelecting(false);
  }, [materia]);

  if (!materia) return null;

  const prevObjs = (materia.previaturas || []).map(pid => effectiveMaterias.find(m => m.id === pid)).filter(Boolean);
  const habilitadas = effectiveMaterias.filter(m => m.previaturas && m.previaturas.includes(materia.id));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ border:`1px solid ${t.mBorder}`, backgroundColor:t.mBg, maxHeight:"90vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 shrink-0" style={{ borderBottom:`1px solid ${t.mDivider}` }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor:t.cNBadgeBg, color:t.mLabel }}>
                  Semestre {materia.semestre === "Opt" ? (materia.slotSemestre || "?") : materia.semestre}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ backgroundColor:t.cNBadgeBg, color:t.mLabel }}>
                  {materia.id}
                </span>
              </div>
              <h2 className="text-base font-bold leading-snug" style={{ color:t.mTitle }}>
                {selecting ? `Elegir Optativa para ${materia.originalName || materia.nombre}` : materia.nombre}
              </h2>
            </div>
            <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition" style={{ backgroundColor:t.closeBg, color:t.closeColor }}>×</button>
          </div>
          
          {!selecting && (
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor:t.cNBadgeBg, color:t.mLabel, border:`1px solid ${t.mBorder}` }}>
                {materia.creditos} créditos
              </span>
              {prevObjs.length > 0 && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor:t.mBadgePrevBg, color:t.mBadgePrevText, border:`1px solid ${t.mBadgePrevBorder}` }}>
                  ↑ {prevObjs.length} previa{prevObjs.length > 1 ? "s" : ""}
                </span>
              )}
              {habilitadas.length > 0 && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor:t.mBadgeHabBg, color:t.mBadgeHabText, border:`1px solid ${t.mBadgeHabBorder}` }}>
                  ↓ habilita {habilitadas.length}
                </span>
              )}
              {materia.isConfiguredOptativa && (
                 <button onClick={() => setSelecting(true)} className="text-xs font-bold px-2.5 py-1 rounded-full ml-auto transition hover:opacity-80" style={{ backgroundColor:t.toggleBg, color:t.toggleColor }}>
                   Cambiar Optativa
                 </button>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1" style={{ maxHeight:"58vh" }}>
          {selecting ? (
            <div className="space-y-3">
              <p className="text-xs" style={{ color:t.mText }}>Selecciona la unidad curricular optativa que deseas cursar en este espacio:</p>
              {OPTATIVAS.map(opt => (
                <div key={opt.id} className="p-4 rounded-xl border transition-all" style={{ borderColor: t.mDivider, backgroundColor: t.cDBg }}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-sm" style={{ color: t.mTitle }}>{opt.nombre}</span>
                        <button onClick={() => { onSelectOptativa(materia.slotId, opt.id); setSelecting(false); }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-transform hover:scale-105"
                          style={{ backgroundColor: t.mBadgeHabBg, color: t.mBadgeHabText, border: `1px solid ${t.mBadgeHabBorder}` }}>
                          Elegir
                        </button>
                    </div>
                    <div className="text-xs mb-2 font-mono" style={{ color: t.mLabel }}>{opt.id} · {opt.creditos}cr</div>
                    <div className="text-xs flex flex-wrap gap-1 items-center mb-2">
                        <span style={{ color: t.sLabelPrev }}>Previas:</span>
                        {opt.previaturas.length > 0 ? opt.previaturas.map(p => (
                          <span key={p} className="px-1.5 py-0.5 rounded" style={{ backgroundColor: t.mBadgePrevBg, color: t.mBadgePrevText }}>{p}</span>
                        )) : <span style={{ color: t.hintText }}>Ninguna</span>}
                    </div>
                    <p className="text-xs" style={{ color: t.mText }}>{opt.programa_analitico}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-0.5 rounded" style={{ backgroundColor:t.sBarBiblio }}></span>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color:t.sLabelBiblio }}>Programa Analítico</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color:t.mText }}>{materia.programa_analitico}</p>
              </div>

              {prevObjs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-0.5 rounded" style={{ backgroundColor:t.sBarPrev }}></span>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color:t.sLabelPrev }}>Previaturas requeridas</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {prevObjs.map(p => (
                      <span key={p.id} className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ backgroundColor:t.mBadgePrevBg, color:t.mBadgePrevText, border:`1px solid ${t.mBadgePrevBorder}` }}>
                        {p.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {habilitadas.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-0.5 rounded" style={{ backgroundColor:t.sBarHab }}></span>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color:t.sLabelHab }}>Materias que habilita</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {habilitadas.map(m => (
                      <span key={m.id} className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ backgroundColor:t.mBadgeHabBg, color:t.mBadgeHabText, border:`1px solid ${t.mBadgeHabBorder}` }}>
                        {m.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {materia.bibliografia_recomendada && materia.bibliografia_recomendada.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-0.5 rounded" style={{ backgroundColor:t.sBarBiblio }}></span>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color:t.sLabelBiblio }}>Bibliografía Recomendada</span>
                  </div>
                  <ul className="space-y-2">
                    {materia.bibliografia_recomendada.map((b, i) => (
                      <li key={i} className="text-sm flex gap-2.5 items-start">
                        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor:t.bullet }}></span>
                        <span style={{ color:t.mText }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 shrink-0" style={{ borderTop:`1px solid ${t.mDivider}`, backgroundColor:t.mFootBg }}>
          <button onClick={onClose} className="w-full py-2 rounded-xl text-sm font-semibold transition hover:opacity-90" style={{ backgroundColor:t.closeBg, color:t.closeColor }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ materia, state, t, onCardClick, onInfo }) {
  const dim  = state === "dim";
  const sel  = state === "selected";
  const prev = state === "previa";
  const hab  = state === "habilitada";
  const isUnconf = materia.isUnconfiguredOptativa;
  const isConfOpt = materia.isConfiguredOptativa; 

  let bg, border, bar, nameC, idC, badgeBg;
  if (dim)       { bg=t.cDBg; border=t.cDBorder; bar="transparent"; nameC=t.cDName; idC=t.cDName; badgeBg=t.cNBadgeBg; }
  else if (sel)  { bg=t.cSBg; border=t.cSBorder; bar=t.cSBar; nameC=t.cSName; idC=t.cSId; badgeBg=t.cSBadgeBg; }
  else if (prev) { bg=t.cPBg; border=t.cPBorder; bar=t.cPBar; nameC=t.cPName; idC=t.cPId; badgeBg=t.cPBadgeBg; }
  else if (hab)  { bg=t.cHBg; border=t.cHBorder; bar=t.cHBar; nameC=t.cHName; idC=t.cHId; badgeBg=t.cHBadgeBg; }
  else           { bg=t.cNBg; border=t.cNBorder; bar=t.cNBar; nameC=t.cNName; idC=t.cNId; badgeBg=t.cNBadgeBg; }

  if (isUnconf && !sel && !dim) {
    bg = "transparent";
    border = t.mDivider;
    bar = "transparent";
    nameC = t.hintText;
  }

  return (
    <div
      onClick={dim ? undefined : onCardClick}
      className="relative rounded-xl overflow-hidden transition-all duration-150 flex flex-col"
      style={{
        backgroundColor: bg,
        border: `1.5px ${ (isUnconf || isConfOpt) ? 'dashed' : 'solid' } ${border}`,
        cursor: dim ? "default" : "pointer",
        opacity: dim ? 0.32 : 1,
        boxShadow: sel ? `0 2px 12px rgba(0,0,0,0.18)` : "none",
        minHeight: "130px"
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: bar }} />
      <div className="pl-4 pr-3 pt-3 pb-3 flex-1 flex flex-col">
        {/* Contenedor principal de la parte superior */}
        <div className="flex items-start justify-between mb-2 gap-2">
          
          {/* Columna izquierda: Código arriba, Badge de Optativa abajo */}
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-black tracking-widest uppercase px-1.5 py-0.5 rounded" style={{ backgroundColor: badgeBg, color: idC }}>
              {materia.id}
            </span>
            
            {isConfOpt && (
              <span 
                className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-md self-start" 
                style={{ 
                  backgroundColor: idC + '1F', 
                  border: `1px solid ${idC}`, 
                  color: idC
                }}
              >
                Optativa
              </span>
            )}
          </div>
          
          {/* Lado derecho: Créditos */}
          <span className="text-xs font-bold rounded px-1.5 py-0.5 whitespace-nowrap" style={{ backgroundColor: badgeBg, color: idC }}>
            Créditos: {materia.creditos}
          </span>
        </div>

        <p className="text-sm font-semibold leading-snug mb-3 flex-1" style={{ color: nameC }}>
          {isUnconf ? `[${materia.nombre}]` : materia.nombre}
        </p>
        {!dim && (
          <button
            onClick={e => { e.stopPropagation(); onInfo(); }}
            className="w-full text-xs font-semibold py-1.5 rounded-lg transition"
            style={{ backgroundColor: t.infoBg, color: t.infoColor }}
          >
            {isUnconf ? "Elegir Optativa" : "Más información"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── THEME SWITCHER ───────────────────────────────────────────────────────────
function ThemeSwitcher({ current, onChange, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
        style={{ backgroundColor: t.toggleBg, color: t.toggleColor }}
      >
        <span>🎨</span>
        <span className="hidden sm:inline">{THEMES[current]?.label || "Theme"}</span>
        <span className="opacity-60">▾</span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[180px]"
          style={{ backgroundColor: t.mBg, border: `1px solid ${t.mBorder}`, maxHeight: '60vh', overflowY: 'auto' }}
        >
          {THEME_ORDER.map(key => (
            <button
              key={key}
              onClick={() => { onChange(key); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-xs font-semibold transition flex items-center gap-2"
              style={{
                color: current === key ? t.hintHab : t.mLabel,
                backgroundColor: current === key ? (t.mBadgeHabBg || "transparent") : "transparent",
              }}
            >
              {current === key && <span>✓</span>}
              {current !== key && <span style={{ width: "1em", display: "inline-block" }}></span>}
              {THEMES[key].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  // 1. Inicializamos el estado buscando si ya existe un tema guardado en el navegador
  const [themeKey, setThemeKey] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selected-theme');
      if (saved && THEMES[saved]) return saved;
    }
    return "dark"; // Tema por defecto si no hay registro
  });

  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [modalSlotId, setModalSlotId] = useState(null);
  const [optativasConfig, setOptativasConfig] = useState({});

  const t = THEMES[themeKey] || THEMES.dark;

  // 2. Guardamos en localStorage cada vez que cambia el tema
  useEffect(() => {
    localStorage.setItem('selected-theme', themeKey);
    // Cambia el fondo del body para evitar cortes visuales raros al hacer scroll
    document.body.style.backgroundColor = t.pageBg;
  }, [themeKey, t.pageBg]);

  // Process MATERIAS taking into account selected OPTATIVAS
  const effectiveMaterias = useMemo(() => {
    return MATERIAS.map(m => {
      if (m.id.startsWith('OPT')) {
        const assignedOptId = optativasConfig[m.id];
        if (assignedOptId) {
          const optData = OPTATIVAS.find(o => o.id === assignedOptId);
          if (optData) {
            return { ...m, ...optData, slotId: m.id, slotSemestre: m.semestre, isConfiguredOptativa: true, originalName: m.nombre };
          }
        }
        return { ...m, slotId: m.id, isUnconfiguredOptativa: true };
      }
      return { ...m, slotId: m.id };
    });
  }, [optativasConfig]);

  const selected = useMemo(() => {
    if (!selectedSlotId) return null;
    return effectiveMaterias.find(m => m.slotId === selectedSlotId);
  }, [selectedSlotId, effectiveMaterias]);

  const activeModalData = useMemo(() => {
    if (!modalSlotId) return null;
    return effectiveMaterias.find(m => m.slotId === modalSlotId);
  }, [modalSlotId, effectiveMaterias]);

  const getState = useCallback((m) => {
    if (!selected) return "neutral";
    if (m.slotId === selected.slotId) return "selected";
    if (selected.previaturas && selected.previaturas.includes(m.id)) return "previa";
    if (m.previaturas && m.previaturas.includes(selected.id)) return "habilitada";
    return "dim";
  }, [selected]);

  const handleCardClick = (m) => {
    setSelectedSlotId(prev => prev === m.slotId ? null : m.slotId);
  };

  const handleSelectOptativa = (slotId, optId) => {
    setOptativasConfig(prev => ({ ...prev, [slotId]: optId }));
  };

  const handleRemoveOptativa = (slotId) => {
    setOptativasConfig(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const totalCreditos = MATERIAS.reduce((a, m) => a + m.creditos, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.pageBg, transition: "background-color 0.25s" }}>
      {/* ── Header ── */}
      <header className="sticky top-0 z-40" style={{ backgroundColor: t.headerBg, borderBottom: `1px solid ${t.headerBorder}`, backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: t.logoColor }}>UTEC</span>
              <h1 className="text-sm sm:text-base font-bold truncate" style={{ color: t.semNum }}>
                Malla Curricular · ICA / TMI
              </h1>
            </div>
            <p className="text-xs mt-0.5" style={{ color: t.hintText }}>
              {MATERIAS.length} asignaturas · {totalCreditos} créditos totales
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            {[
              { label: "Seleccionada", dot: t.legDotSel },
              { label: "Previa ↑",     dot: t.legDotPrev },
              { label: "Habilitada ↓", dot: t.legDotHab },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.dot }} />
                <span className="text-xs" style={{ color: t.legText }}>{l.label}</span>
              </div>
            ))}
          </div>
          <ThemeSwitcher current={themeKey} onChange={setThemeKey} t={t} />
        </div>
      </header>

      {/* ── Status bar ── */}
      <div className="py-2 px-4 text-center text-xs" style={{ color: t.hintText, borderBottom: `1px solid ${t.headerBorder}` }}>
        {selected ? (
          <span>
            <span style={{ color: t.hintPrev }}>↑ previas</span>{" · "}
            <span style={{ color: t.hintHab }}>↓ materias habilitadas</span>{" · "}
            <button onClick={() => setSelectedSlotId(null)} style={{ color: t.clearColor, textDecoration: "underline" }}>Limpiar selección</button>
          </span>
        ) : "Click en una materia para ver sus dependencias · ℹ para más detalles"}
      </div>

      {/* ── Grid ── */}
      <main className="max-w-[1700px] mx-auto px-3 sm:px-5 py-5">
        <div className="overflow-x-auto pb-6">
          <div className="grid gap-3 min-w-[1600px]" style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}>
            {SEMESTRES.map(s => {
              const mats = effectiveMaterias.filter(m => m.semestre === s || m.slotSemestre === s);
              return (
                <div key={s} className="flex flex-col gap-2.5">
                  <div className="rounded-xl p-3 text-center" style={{ backgroundColor: t.semHdrBg, border: `1px solid ${t.semHdrBorder}` }}>
                    <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: t.semLabel }}>Sem</div>
                    <div className="text-2xl font-black leading-none" style={{ color: t.semNum }}>{s}</div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: t.semCr }}>
                      {mats.reduce((a, m) => a + m.creditos, 0)}cr
                    </div>
                  </div>
                  {mats.map(m => (
                    <Card
                      key={m.slotId}
                      materia={m}
                      state={getState(m)}
                      t={t}
                      onCardClick={() => handleCardClick(m)}
                      onInfo={() => setModalSlotId(m.slotId)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Modal 
        materia={activeModalData} 
        effectiveMaterias={effectiveMaterias}
        t={t} 
        onClose={() => setModalSlotId(null)} 
        onSelectOptativa={handleSelectOptativa}
        onRemoveOptativa={handleRemoveOptativa}
      />
    </div>
  );
}
