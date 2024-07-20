import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function DynamicFieldOptions({ options = [], onChange = () => {} }) {

    function addOption() {
        onChange([...options, { value: '' }]);
    }

    function onChangeValue(option, value) {
        option.value = value;

        onChange([...options]);
    }

    function deleteOption(index) {
        const _options = options.filter((item, _index) => _index !== index);

        onChange(_options.length ? _options : [{ value: '' }]);
    }

    return (
        <div>
            <InputLabel htmlFor="options">
                Options
                <IconButton
                    aria-label="delete"
                    color="success"
                    onClick={addOption}
                >
                    <AddIcon />
                </IconButton>
            </InputLabel>

            {options.map((option, index) => (
                <div className="flex" key={index}>
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={option.value}
                        onChange={(e) => onChangeValue(option, e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <div className="mx-1" />

                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => deleteOption(index)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}
        </div>
    )
}
