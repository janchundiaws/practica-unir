const express = require('express');
const router = express.Router();
const {
  crearPersona,
  obtenerPersonas,
  obtenerPersonaPorId,
  obtenerPersonaPorCedula,
  actualizarPersona,
  eliminarPersona,
  obtenerEstadisticas
} = require('../controllers/personaController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Persona:
 *       type: object
 *       required:
 *         - nombres
 *         - apellidos
 *         - cedula
 *       properties:
 *         nombres:
 *           type: string
 *           description: Nombres de la persona
 *           example: "Juan Carlos"
 *           minLength: 2
 *           maxLength: 50
 *         apellidos:
 *           type: string
 *           description: Apellidos de la persona
 *           example: "Pérez González"
 *           minLength: 2
 *           maxLength: 50
 *         cedula:
 *           type: string
 *           description: Número de cédula (10 dígitos)
 *           example: "1234567890"
 *           pattern: '^[0-9]{10}$'
 *         _id:
 *           type: string
 *           description: ID único de la persona
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *     
 *     PersonaResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operación exitosa"
 *         data:
 *           $ref: '#/components/schemas/Persona'
 *     
 *     PersonasListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Personas obtenidas exitosamente"
 *         data:
 *           type: object
 *           properties:
 *             personas:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Persona'
 *             pagination:
 *               type: object
 *               properties:
 *                 page:
 *                   type: number
 *                   example: 1
 *                 limit:
 *                   type: number
 *                   example: 10
 *                 total:
 *                   type: number
 *                   example: 25
 *                 pages:
 *                   type: number
 *                   example: 3
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error en la operación"
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Los nombres son obligatorios"]
 *         error:
 *           type: string
 *           example: "Error interno del servidor"
 */

/**
 * @swagger
 * /api/personas:
 *   post:
 *     summary: Crear una nueva persona
 *     description: Crea una nueva persona con nombres, apellidos y cédula
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *           example:
 *             nombres: "Juan Carlos"
 *             apellidos: "Pérez González"
 *             cedula: "1234567890"
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonaResponse'
 *       400:
 *         description: Error de validación o cédula duplicada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', crearPersona);

/**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: Obtener todas las personas
 *     description: Obtiene una lista paginada de personas con opciones de búsqueda y ordenamiento
 *     tags: [Personas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de elementos por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda en nombres o apellidos
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [nombres, apellidos, cedula, createdAt, updatedAt]
 *           default: createdAt
 *         description: Campo para ordenar
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden de clasificación
 *     responses:
 *       200:
 *         description: Lista de personas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonasListResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', obtenerPersonas);

/**
 * @swagger
 * /api/personas/stats:
 *   get:
 *     summary: Obtener estadísticas de personas
 *     description: Obtiene estadísticas generales sobre las personas en el sistema
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Estadísticas obtenidas exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalPersonas:
 *                       type: number
 *                       example: 25
 *                     personasRecientes:
 *                       type: number
 *                       example: 5
 *                     fechaConsulta:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', obtenerEstadisticas);

/**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: Obtener persona por ID
 *     description: Obtiene una persona específica por su ID único
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la persona
 *     responses:
 *       200:
 *         description: Persona obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonaResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Persona no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', obtenerPersonaPorId);

/**
 * @swagger
 * /api/personas/cedula/{cedula}:
 *   get:
 *     summary: Obtener persona por cédula
 *     description: Obtiene una persona específica por su número de cédula
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9]{10}$'
 *         description: Número de cédula (10 dígitos)
 *     responses:
 *       200:
 *         description: Persona obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonaResponse'
 *       404:
 *         description: Persona no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/cedula/:cedula', obtenerPersonaPorCedula);

/**
 * @swagger
 * /api/personas/{id}:
 *   put:
 *     summary: Actualizar una persona
 *     description: Actualiza los datos de una persona existente
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *           example:
 *             nombres: "Juan Carlos"
 *             apellidos: "Pérez González"
 *             cedula: "1234567890"
 *     responses:
 *       200:
 *         description: Persona actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonaResponse'
 *       400:
 *         description: Error de validación, ID inválido o cédula duplicada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Persona no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', actualizarPersona);

/**
 * @swagger
 * /api/personas/{id}:
 *   delete:
 *     summary: Eliminar una persona
 *     description: Elimina una persona del sistema
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la persona
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonaResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Persona no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', eliminarPersona);

module.exports = router;
