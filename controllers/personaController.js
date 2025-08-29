const Persona = require('../models/Persona');

// CREATE - Crear una nueva persona
const crearPersona = async (req, res) => {
  try {
    const { nombres, apellidos, cedula } = req.body;

    // Verificar si ya existe una persona con esa cédula
    const personaExistente = await Persona.findByCedula(cedula);
    if (personaExistente) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una persona con esta cédula',
        data: null
      });
    }

    const nuevaPersona = new Persona({
      nombres,
      apellidos,
      cedula
    });

    const personaGuardada = await nuevaPersona.save();

    res.status(201).json({
      success: true,
      message: 'Persona creada exitosamente',
      data: personaGuardada
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// READ - Obtener todas las personas
const obtenerPersonas = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    
    // Búsqueda por nombre o apellido
    if (search) {
      query = {
        $or: [
          { nombres: { $regex: search, $options: 'i' } },
          { apellidos: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Configurar ordenamiento
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const personas = await Persona.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Persona.countDocuments(query);

    res.json({
      success: true,
      message: 'Personas obtenidas exitosamente',
      data: {
        personas,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// READ - Obtener una persona por ID
const obtenerPersonaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const persona = await Persona.findById(id);
    
    if (!persona) {
      return res.status(404).json({
        success: false,
        message: 'Persona no encontrada',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Persona obtenida exitosamente',
      data: persona
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de persona inválido',
        data: null
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// READ - Obtener persona por cédula
const obtenerPersonaPorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    
    const persona = await Persona.findByCedula(cedula);
    
    if (!persona) {
      return res.status(404).json({
        success: false,
        message: 'Persona no encontrada',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Persona obtenida exitosamente',
      data: persona
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// UPDATE - Actualizar una persona
const actualizarPersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, cedula } = req.body;

    // Verificar si la persona existe
    const personaExistente = await Persona.findById(id);
    if (!personaExistente) {
      return res.status(404).json({
        success: false,
        message: 'Persona no encontrada',
        data: null
      });
    }

    // Si se está cambiando la cédula, verificar que no exista otra persona con esa cédula
    if (cedula && cedula !== personaExistente.cedula) {
      const personaConCedula = await Persona.findByCedula(cedula);
      if (personaConCedula) {
        return res.status(400).json({
          success: false,
          message: 'Ya existe otra persona con esta cédula',
          data: null
        });
      }
    }

    const personaActualizada = await Persona.findByIdAndUpdate(
      id,
      { nombres, apellidos, cedula },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Persona actualizada exitosamente',
      data: personaActualizada
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de persona inválido',
        data: null
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// DELETE - Eliminar una persona
const eliminarPersona = async (req, res) => {
  try {
    const { id } = req.params;
    
    const persona = await Persona.findByIdAndDelete(id);
    
    if (!persona) {
      return res.status(404).json({
        success: false,
        message: 'Persona no encontrada',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Persona eliminada exitosamente',
      data: persona
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de persona inválido',
        data: null
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Estadísticas de personas
const obtenerEstadisticas = async (req, res) => {
  try {
    const totalPersonas = await Persona.countDocuments();
    
    // Personas creadas en los últimos 30 días
    const treintaDiasAtras = new Date();
    treintaDiasAtras.setDate(treintaDiasAtras.getDate() - 30);
    
    const personasRecientes = await Persona.countDocuments({
      createdAt: { $gte: treintaDiasAtras }
    });

    res.json({
      success: true,
      message: 'Estadísticas obtenidas exitosamente',
      data: {
        totalPersonas,
        personasRecientes,
        fechaConsulta: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

module.exports = {
  crearPersona,
  obtenerPersonas,
  obtenerPersonaPorId,
  obtenerPersonaPorCedula,
  actualizarPersona,
  eliminarPersona,
  obtenerEstadisticas
};
