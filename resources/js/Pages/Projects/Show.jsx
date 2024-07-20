import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link} from '@inertiajs/react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import { router } from '@inertiajs/react'

export default function Show({ auth, projects }) {

    async function deleteProject(projectId) {
        try {
           router.delete(route('projects.delete', { project: projectId}));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <Link href={route('projects.create')}>
                    <Button color="success" variant="contained">
                        <AddIcon />
                        New Project
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
                                <TableCell>User</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell component="th" scope="row">
                                        {project.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {project.user.name}
                                    </TableCell>
                                    <TableCell align="right">{project.title}</TableCell>
                                    <TableCell align="right">
                                        <Stack justifyContent="end" direction="row">
                                            <Link href={route('projects.preview', { project: project.id })}>
                                                <IconButton aria-label="delete" color="primary">
                                                    <RemoveRedEyeIcon />
                                                </IconButton>
                                            </Link>
                                            <Link href={route('projects.edit', { project: project.id })}>
                                                <IconButton aria-label="delete" color="success">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => deleteProject(project.id)}
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
    );
}
