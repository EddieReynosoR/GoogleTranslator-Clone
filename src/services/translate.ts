import { OpenAI } from "openai";
import { FromLanguage, Language } from "../types.d";
import { SUPPORTED_LANGUAGES } from "../constants";

const apiKey = import.meta.env.VITE_OPENAIA_API_KEY

const openai = new OpenAI({
    apiKey: apiKey
})


export async function translate ({
    fromLanguage,
    toLanguage,
    text
}: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) {

    if(fromLanguage === toLanguage) return text
    
    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]

    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    
    const completion = await openai.chat.completions.
    create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'system',
                content: 'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. The language you translate to is surrouunded by `[[` and `]]`.'
            },
            {
                role: 'user',
                content: 'Hola mundo {{Español}} [[English]]'
            },
            {
                role: 'assistant',
                content: 'Hello world'
            },
            {
                role: 'user',
                content: 'How are you? {{auto}} [[Deutsch]]'
            },
            {
                role: 'assistant',
                content: 'Wie geht es dir?'
            },
            {
                role: 'user',
                content: 'Bon día, com estas? {{auto}} [[English]]'
            },
            {
                role: 'assistant',
                content: 'Buenos días, ¿cómo estás?'
            },
            {
                role: 'user',
               content: `${text} {{${fromCode}}} [[${toCode}]]`
            }
        ]
    })

    return completion.choices[0]?.message?.content
}