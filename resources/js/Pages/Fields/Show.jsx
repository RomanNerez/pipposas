import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { router } from '@inertiajs/react'

export default function Show({ auth, fields }) {

    function deleteField(fieldId) {
        router.delete(route('fields.delete', { field: fieldId }));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fields</h2>}
        >
            <Head title="Fields" />

            <div className="py-12" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <Link href={route('fields.create')}>
                    <Button color="success" variant="contained">
                        <AddIcon />
                        New Field
                    </Button>
                </Link>
            </div>

            <div className="py-2" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Required</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fields.map(field => (
                                <TableRow key={field.id}>
                                    <TableCell component="th" scope="row">
                                        {field.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {field.name}
                                    </TableCell>
                                    <TableCell align="right">{field.type}</TableCell>
                                    <TableCell align="right">{field.is_required ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="right">
                                        <Stack justifyContent="end" direction="row">
                                            <Link href={route('fields.edit', { field: field.id })}>
                                                <IconButton aria-label="delete" color="success">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => deleteField(field.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </AuthenticatedLayout>
    )
}
