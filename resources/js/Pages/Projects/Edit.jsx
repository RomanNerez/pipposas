import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head, Link } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import AdditionFields from '@/Components/AdditionFields';
import { FIELD_TYPE } from '@/constants/field-type';

export default function Edit({ auth, project, fields = [] }) {
    const title = project ? 'Edit Project' : 'Create Project';

    const additionFields = fields.reduce((acc, field) => {
        const key = field.key;

        if (field.type === FIELD_TYPE.MULTISELECT) {
            acc[key] = JSON.parse(project?.[key] || '[]');
        } else {
            acc[key] = project?.[key] || '';
        }

        return acc;
    }, {});

    const { data, setData, post, patch, errors, processing } = useForm({
        id: project?.id,
        title: project?.title || '',
        ...additionFields
    });

    const submit = (e) => {
        e.preventDefault();
        const action = project ? 'update' : 'store';
        const routeParams = [`projects.${action}`, project ? { project: project.id } : {}]

        project ? patch(route(...routeParams)) : post(route(...routeParams));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section>
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <AdditionFields
                                    fields={fields}
                                    errors={errors}
                                    data={data}
                                    onChange={(key, value) => setData(key, value)}
                                />

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                    <Link href={route('projects.show')}>
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
