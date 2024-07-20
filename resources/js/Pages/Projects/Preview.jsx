import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FIELD_TYPE } from '@/constants/field-type';

const MAP_VALUE_COMPONENTS = {
    [FIELD_TYPE.MULTISELECT]: (value) => {
        const _value = JSON.parse(value || '[]');

        return (<span className="font-normal">{(_value.join(', ') || '-')}</span>)},
}

export default function Preview({ auth, project, fields = [] }) {

    const getComponentValueOfAdditionField = (field) => {
        const handler = MAP_VALUE_COMPONENTS[field.type];

        if (handler) return handler

        return (value) => <span className="font-normal">{(value || '-')}</span>
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project Preview</h2>}
        >
            <Head title="Project Preview" />

            <div className="py-12" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h1 className="font-semibold text-4xl text-gray-800 leading-tight">
                        {project.title}
                    </h1>

                    <div className="my-4" />

                    {fields.map((field, index) => (
                        <section className='mt-3' key={index}>
                            <div className="font-semibold text-lg text-gray-800 leading-tight">
                                {field.name}: {getComponentValueOfAdditionField(field)(project[field.key]) }
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
