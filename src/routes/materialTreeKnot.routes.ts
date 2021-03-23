import { Router } from 'express';
import { middleware, validation } from '@seidor-cloud-produtos/lib-seidor-common';

import * as MaterialTreeKnotController from '../controllers/materialTreeKnotController';
import {
    createMaterialTreeKnotSchema,
    getAllMaterialTreeKnotSchema,
    updateMaterialTreeKnotSchema,
} from '../utils/materialTreeKnot/validators';

const router = Router();

/**
 * @swagger
 * /api/material-tree-knot:
 *   post:
 *     tags:
 *       - MaterialTreeKnot
 *     description: Create MaterialTreeKnot
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - name: materialTreeKnot
 *         description: JSON with MaterialTreeKnot attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/MaterialTreeKnotCreate'
 *     responses:
 *       201:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/MaterialTreeKnot'
 */

router.post(
    '/',
    middleware.validatorMiddleware({ body: createMaterialTreeKnotSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeKnotController.create,
);

/**
 * @swagger
 * /api/material-tree-knot/:materialTreeKnotId:
 *   get:
 *     tags:
 *       - MaterialTreeKnot
 *     description: Get MaterialTreeKnot by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: materialTreeKnotId
 *         type: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/MaterialTreeKnot'
 */

router.get(
    '/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeKnotController.findOne,
);

/**
 * @swagger
 * /api/material-tree-knot:
 *   get:
 *     tags:
 *      - MaterialTreeKnot
 *     description: GetAll MaterialTreeKnot
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: query
 *         name: page
 *         type: number
 *       - in: query
 *         name: size
 *         type: number
 *       - in: query
 *         name: withPagination
 *         type: boolean
 *       - in: query
 *         name: showInactive
 *         type: boolean
 *       - in: query
 *         name: sortParam
 *         type: string
 *         enum: [ code, level_id, category_id, material_id, created_at, created_by_name, created_by_email, updated_at, updated_by_name, updated_by_email, active, inactivation_date ]
 *       - in: query
 *         name: sortOrder
 *         type: string
 *         enum: [asc, desc, ASC, DESC]
 *       - in: query
 *         name: dateFilter
 *         type: enum [created_at, updated_at, inactivation_date]
 *       - in: query
 *         name: startDateFilter
 *         type: string
 *         example: '2021-01-01'
 *       - in: query
 *         name: endDateFilter
 *         type: string
 *         example: '2021-01-31'
 *       - in: query
 *         name: code
 *         type: string
 *       - in: query
 *         name: level_id
 *         type: string
 *       - in: query
 *         name: category_id
 *         type: string
 *       - in: query
 *         name: material_id
 *         type: string
 *       - in: query
 *         name: created_by_name
 *         type: string
 *       - in: query
 *         name: created_by_email
 *         type: string
 *       - in: query
 *         name: updated_by_name
 *         type: string
 *       - in: query
 *         name: updated_by_email
 *         type: string
 *       - in: query
 *         name: active
 *         type: boolean
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - title: GetAll MaterialTreeKnot with pagination
 *                   allOf:
 *                     - type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             type: object
 *                             $ref: '#/definitions/MaterialTreeKnot'
 *                     - $ref: '#/definitions/PaginationResponse'
 *                 - title: GetAll MaterialTreeKnot without pagination
 *                   allOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         $ref: '#/definitions/MaterialTreeKnot'
 */

router.get(
    '/',
    middleware.validatorMiddleware({ headers: validation.commomValidators.tenantidSchema, query: getAllMaterialTreeKnotSchema }),
    MaterialTreeKnotController.findAll,
);

/**
 * @swagger
 * /api/material-tree-knot/:materialTreeKnotId:
 *   put:
 *     tags:
 *       - MaterialTreeKnot
 *     description: Update MaterialTreeKnot
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: materialTreeKnotId
 *         type: uuid
 *         required: true
 *       - name: materialTreeKnot
 *         description: JSON with materialTreeKnot attributes.
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/MaterialTreeKnotUpdate'
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/MaterialTreeKnot'
 */

router.put(
    '/:id',
    middleware.validatorMiddleware({
        body: updateMaterialTreeKnotSchema,
        params: validation.commomValidators.idParamSchema,
        headers: validation.commomValidators.tenantidSchema,
    }),
    MaterialTreeKnotController.update,
);

/**
 * @swagger
 * /api/material-tree-knot/activation/:materialTreeKnotId:
 *   post:
 *     tags:
 *       - MaterialTreeKnot
 *     description: Activate MaterialTreeKnot
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: materialTreeKnotId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successful
 */

router.post(
    '/activation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeKnotController.activation,
);

/**
 * @swagger
 * /api/material-tree-knot/inactivation/:materialTreeKnotId:
 *   post:
 *     tags:
 *       - MaterialTreeKnot
 *     description: Inactivate MaterialTreeKnot
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: materialTreeKnotId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successful
 */

router.post(
    '/inactivation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeKnotController.inactivation,
);

export default router;
