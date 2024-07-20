import { FIELD_TYPE } from '@/constants/field-type'
import TextInput from './TextInput'
import Select from './Select'
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

const getSelectElement = (props, options) => (
    <Select
        {...props}
    >
        {options.map((option, index) => (
            <option key={index} value={option.value}>{ option.value }</option>
        ))}
    </Select>
)

const MAP_FIELDS_COMPONENTS = {
    [FIELD_TYPE.STRING]: (props) => (<TextInput type="text" {...props} />),
    [FIELD_TYPE.DATE]: (props) => (<TextInput type="date" {...props} />),
    [FIELD_TYPE.SELECT]: (props, field) => getSelectElement(props, field.options),
    [FIELD_TYPE.MULTISELECT]: (props, field) => getSelectElement({...props, multiple: true }, field.options),
}

export default function AdditionFields({ fields = [], errors, data = {}, onChange = () => {} }) {

    function onChangeField(event, field) {
        let value = event.target.value;

        if (field.type === FIELD_TYPE.MULTISELECT) {
            value = Array.from(event.target.selectedOptions, option => option.value);
        }

        onChange(field.key, value);
    }

    return (fields.map(field => (
        <div key={field.id}>
            <InputLabel
                htmlFor={field.key}
                value={field.name}
            />

            { MAP_FIELDS_COMPONENTS[field.type]({
                id: field.key,
                className: 'w-full',
                name: field.key,
                required: field.is_required,
                value: data[field.key],
                onChange: (e) => onChangeField(e, field)
            },  field) }

            <InputError className="mt-2" message={errors[field.key]} />
        </div>
    )))
}
