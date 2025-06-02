import axios from 'axios';

async function generarRutinaConIA({ message, altura, peso, objetivo, nombre }) {
    const prompt = `
Eres un entrenador personal experto en fitness y nutrición, parte del equipo de FitManage.

Tu tarea es responder de forma útil, profesional y empática al requerimiento del usuario con nombre ${nombre}, este es su requerimiento:
"${message}"

Instrucciones importantes:

- Si el mensaje del usuario es un saludo (por ejemplo: "hola", "buenas", "hey"), responde de forma breve, cordial, amigable y natural, sin sugerencias excesivas. Ejemplo: "Hola ${nombre}, ¿en qué puedo ayudarte hoy?"
- Si el mensaje incluye una solicitud de rutina de entrenamiento o consulta sobre ejercicios, genera una rutina personalizada considerando que es en un ambiente de gimnasio:
  - Altura: ${altura} cm
  - Peso: ${peso} kg
  - Objetivo: ${objetivo}
   Estructura la rutina de forma clara, así:
   - Título: “Rutina para [Objetivo] – [Región o tipo solicitado]”
   - Calentamiento: indica 2–3 ejercicios básicos
   - Ejercicios : 
          - Nombre(Título)
          - Descripción breve del ejercicio(maximo 20 palabras)
          - Músculo trabajado 
          - Series: Repeticiones, recuerda la importancia de factores como la progresión y la técnica.
   - Recomendaciones generales: peso, descanso, hidratación
   - Evita asteriscos o símbolos innecesarios. Usa un lenguaje claro y profesional. Mantén la respuesta visualmente ordenada con títulos y subtítulos.

- Si el mensaje no trata sobre entrenamiento, responde con información útil y coherente relacionada con la consulta.
- Escribe siempre en español, en un tono profesional, cercano y sin usar símbolos como **asteriscos**.

Tu tono debe ser profesional pero cercano, y siempre en español.
`;

    const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            model: 'deepseek/deepseek-r1-0528:free',
            messages: [
                { role: 'system', content: 'Eres un entrenador personal experto en fitness.' },
                { role: 'user', content: prompt }
            ]
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': `${process.env.BACKEND_URL}`,
                'X-Title': 'FitManage-AI-Chat'
            }
        }

    );

    return response.data.choices[0].message.content;
};

export default {
    generarRutinaConIA,
};
