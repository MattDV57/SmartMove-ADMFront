import React, { useState } from 'react';
import {
    Typography,
    Button,
    TextField,
    Paper,
    Box,
    Chip,
    Divider,
    Container,
    Card,
    CardContent,
    CardHeader,
    CardActions
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    CalendarToday,
    Email,
    Phone,
    LocationOn,
    Lock
} from '@mui/icons-material';

import './Profile.scss'

// Simulación de datos del usuario
const userData = {
    nombreCompleto: "Pablo Rodríguez",
    idEmpleado: "EMP001",
    fechaNacimiento: "1985-05-15",
    email: "pablo@empresa.com",
    telefono: "+5491156781234",
    direccion: "Calle Principal 123",
    localidad: "Capital Federal",
    puesto: "Gerente de Proyectos",
    departamento: "Gestión de Proyectos",
    fechaIngreso: "2015-03-01",
    rolAcceso: "Gerente"
};

const Profile = () => {
    const [contactInfo, setContactInfo] = useState({
        email: userData.email,
        telefono: userData.telefono,
        direccion: userData.direccion,
        localidad: userData.localidad
    });
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleContactChange = (e) => {
        setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSubmitContact = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para actualizar la información de contacto
        setIsEditing(false);
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para cambiar la contraseña
        
        //TODO: chequeo que la cotraseña que ingresa como actual sea válida
        
        // TODO: modal de error para ambos casos

        if(password.new!==password.confirm){
            return null
        }
        if(password.new.length<6){
            return null
        }

        //TODO: pegada al back para guardar la nueva contraseña

        setIsChangingPassword(false);
        setPassword({ current: '', new: '', confirm: '' });
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Perfil de Usuario
                </Typography>

                <Card sx={{ mb: 4 }} variant='outlined'>
                    <CardHeader title="Información General" />
                    <CardContent>
                        <div className='data-grid'>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">Nombre Completo</Typography>
                                <Typography variant="body1">{userData.nombreCompleto}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">ID del Empleado</Typography>
                                <Typography variant="body1">{userData.idEmpleado}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CalendarToday fontSize="small" />
                                    <Typography variant="subtitle2">Fecha de Nacimiento</Typography>
                                </Box>
                                <Typography variant="body1">{userData.fechaNacimiento}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CalendarToday fontSize="small" />
                                    <Typography variant="subtitle2">Fecha de Ingreso</Typography>
                                </Box>
                                <Typography variant="body1">{userData.fechaIngreso}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">Puesto</Typography>
                                <Typography variant="body1">{userData.puesto}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">Departamento</Typography>
                                <Typography variant="body1">{userData.departamento}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Rol de Acceso</Typography>
                                <Chip label={userData.rolAcceso} color="primary" variant="outlined" />
                            </Grid>
                        </div>
                    </CardContent>
                </Card>

                <Card sx={{ mb: 4 }} variant='outlined'>
                    <CardHeader title="Información de Contacto" />
                    <CardContent>
                        {isEditing ? (
                            <form onSubmit={handleSubmitContact}>
                                <div className='data-column'>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Correo Electrónico"
                                            name="email"
                                            value={contactInfo.email}
                                            onChange={handleContactChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Teléfono"
                                            name="telefono"
                                            value={contactInfo.telefono}
                                            onChange={handleContactChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Dirección"
                                            name="direccion"
                                            value={contactInfo.direccion}
                                            onChange={handleContactChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Localidad"
                                            name="localidad"
                                            value={contactInfo.localidad}
                                            onChange={handleContactChange}
                                            required
                                        />
                                    </Grid>
                                </div>
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Guardar Cambios
                                    </Button>
                                    <Button onClick={() => setIsEditing(false)} sx={{ ml: 2 }}>
                                        Cancelar
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <div className='data-column'>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Email fontSize="small" />
                                        <Typography>{contactInfo.email}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Phone fontSize="small" />
                                        <Typography>{contactInfo.telefono}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <LocationOn fontSize="small" />
                                        <Typography>{contactInfo.direccion}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <LocationOn fontSize="small" />
                                        <Typography>{contactInfo.localidad}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" onClick={() => setIsEditing(true)}>
                                        Editar Información de Contacto
                                    </Button>
                                </Grid>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card variant='outlined'>
                    <CardHeader title="Cambiar Contraseña" />
                    <CardContent>
                        {isChangingPassword ? (
                            <form onSubmit={handleSubmitPassword}>
                                <div className='data-column'>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Contraseña Actual"
                                            name="current"
                                            type="password"
                                            value={password.current}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Nueva Contraseña"
                                            name="new"
                                            type="password"
                                            value={password.new}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Confirmar Nueva Contraseña"
                                            name="confirm"
                                            type="password"
                                            value={password.confirm}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </Grid>
                                </div>
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Cambiar Contraseña
                                    </Button>
                                    <Button onClick={() => setIsChangingPassword(false)} sx={{ ml: 2 }}>
                                        Cancelar
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Button
                                variant="outlined"
                                startIcon={<Lock />}
                                onClick={() => setIsChangingPassword(true)}
                            >
                                Cambiar Contraseña
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default Profile