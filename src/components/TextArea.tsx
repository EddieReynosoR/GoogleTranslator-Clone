import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"
import React, { FC } from "react"


interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyles = {border: 0, height: '200px', resize: 'none'}

const getPlaceholder = ({type, loading} : {type:SectionType, loading?: boolean}) => {
    if(type===SectionType.From) return 'Introducir texto' 
    if(loading) return 'Cargando...'
    return 'Traducción'
}

export const TextArea: FC<Props> = ({ loading, type, value, onChange}) => {
    const styles = type === SectionType.From ? 
    commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5'}

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { 
        onChange(event.target.value)
    }



    return (
        <Form.Control
        autoFocus={type===SectionType.From}
            as='textarea' // Que elemento quiere renderizar
            placeholder={getPlaceholder({type, loading})}
            disabled={type === SectionType.To}
            style={styles}
            value={value}
            onChange={handleChange}
            />
    )
}