import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head, Link } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import Checkbox from '@/Components/Checkbox';
import Select from '@/Components/Select';
import DynamicFieldOptions from '@/Components/DynamicFieldOptions';
import { FIELD_TYPE } from '@/constants/field-type';

const DEFAULT_OPTIONS = [{ value: '' }];

export default function Edit({ auth, field, entities = [] }) {
    const title = field ? 'Edit Field' : 'Create Field';

    let options = field?.options;
    options = Array.isArray(options) && options.length ? options : DEFAULT_OPTIONS

    const { data, setData, post, patch, errors, processing } = useForm({
        id: field?.id,
        name: field?.name || '',
        type: field?.type || FIELD_TYPE.STRING,
        options,
        entities: field?.entities || [],
        is_required: field?.is_required || false,
    });

    const submit = (e) => {
        e.preventDefault();
        const action = field ? 'update' : 'store';
        const routeParams = [`fields.${action}`, field ? { field: field.id } : {}]

        field ? patch(route(...routeParams)) : post(route(...routeParams));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{ title }</h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section>
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="type" value="Type" />

                                    <Select
                                        id="type"
                                        name="type"
                                        className="mt-1 block w-full"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                    >
                                        <option value={FIELD_TYPE.STRING}>String</option>
                                        <option value={FIELD_TYPE.SELECT}>Select</option>
                                        <option value={FIELD_TYPE.MULTISELECT}>Multiselect</option>
                                        <option value={FIELD_TYPE.DATE}>Date</option>
                                    </Select>

                                    <InputError className="mt-2" message={errors.type} />
                                </div>

                                { [FIELD_TYPE.SELECT, FIELD_TYPE.MULTISELECT].includes(data.type) ?
                                    <DynamicFieldOptions
                                        options={data.options}
                                        onChange={(options) => setData('options', options)}
                                    /> : ''
                                }

                                <div>
                                    <label className="flex items-center">
                                        <Checkbox
                                            id="required"
                                            name="required"
                                            checked={data.is_required}
                                            onChange={(e) => setData('is_required', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Required</span>
                                    </label>
                                </div>

                                <div>
                                    <InputLabel htmlFor="entities" value="Entities" />

                                    <Select
                                        id="entities"
                                        name="entities"
                                        className="mt-1 block w-full"
                                        value={data.entities}
                                        multiple
                                        onChange={(e) => {
                                            const values = Array.from(e.target.selectedOptions, option => option.value);

                                            setData('entities', values);
                                        }}
                                    >
                                        {entities.map((entity, index) => (
                                            <option key={index} value={entity}>{entity}</option>
                                        ))}
                                    </Select>

                                    <InputError className="mt-2" message={errors.entities} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                    <Link href={route('fields.show')}>
                                        <SecondaryButton>Cancel</SecondaryButton>
                                    </Link>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
