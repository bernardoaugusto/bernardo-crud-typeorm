import { Router } from 'express';
import { middleware, validation } from '@seidor-cloud-produtos/lib-seidor-common';

import * as MaterialTreeNodeController from '../controllers/materialTreeNodeController';
import {
    createMaterialTreeNodeSchema,
    getAllMaterialTreeNodeSchema,
    updateMaterialTreeNodeSchema,
} from '../utils/materialTreeNode/validators';

const router = Router();

/**
 * @swagger
 * /api/material-tree-node:
 *   post:
 *     tags:
 *       - MaterialTreeNode
 *     description: Create MaterialTreeNode
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
 *       - name: materialTreeNode
 *         description: JSON with MaterialTreeNode attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/MaterialTreeNodeCreate'
 *     responses:
 *       201:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/MaterialTreeNode'
 */

router.post(
    '/',
    middleware.validatorMiddleware({ body: createMaterialTreeNodeSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeNodeController.create,
);

/**
 * @swagger
 * /api/material-tree-node/:materialTreeNodeId:
 *   get:
 *     tags:
 *       - MaterialTreeNode
 *     description: Get MaterialTreeNode by Id
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
 *         name: materialTreeNodeId
 *         type: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/MaterialTreeNode'
 */

router.get(
    '/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeNodeController.findOne,
);

/**
 * @swagger
 * /api/material-tree-node:
 *   get:
 *     tags:
 *      - MaterialTreeNode
 *     description: GetAll MaterialTreeNode
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
 *                 - title: GetAll MaterialTreeNode with pagination
 *                   allOf:
 *                     - type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             type: object
 *                             $ref: '#/definitions/MaterialTreeNode'
 *                     - $ref: '#/definitions/PaginationResponse'
 *                 - title: GetAll MaterialTreeNode without pagination
 *                   allOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         $ref: '#/definitions/MaterialTreeNode'
 */

router.get(
    '/',
    middleware.validatorMiddleware({ headers: validation.commomValidators.tenantidSchema, query: getAllMaterialTreeNodeSchema }),
    MaterialTreeNodeController.findAll,
);

/**
 * @swagger
 * /api/material-tree-node/:materialTreeNodeId:
 *   put:
 *     tags:
 *       - MaterialTreeNode
 *     description: Update MaterialTreeNode
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
 *         name: materialTreeNodeId
 *         type: uuid
 *         required: true
 *       - name: materialTreeNode
 *         description: JSON with materialTreeNode attributes.
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/MaterialTreeNodeUpdate'
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/MaterialTreeNode'
 */

router.put(
    '/:id',
    middleware.validatorMiddleware({
        body: updateMaterialTreeNodeSchema,
        params: validation.commomValidators.idParamSchema,
        headers: validation.commomValidators.tenantidSchema,
    }),
    MaterialTreeNodeController.update,
);

/**
 * @swagger
 * /api/material-tree-node/activation/:materialTreeNodeId:
 *   post:
 *     tags:
 *       - MaterialTreeNode
 *     description: Activate MaterialTreeNode
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
 *         name: materialTreeNodeId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successful
 */

router.post(
    '/activation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeNodeController.activation,
);

/**
 * @swagger
 * /api/material-tree-node/inactivation/:materialTreeNodeId:
 *   post:
 *     tags:
 *       - MaterialTreeNode
 *     description: Inactivate MaterialTreeNode
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
 *         name: materialTreeNodeId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successful
 */

router.post(
    '/inactivation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    MaterialTreeNodeController.inactivation,
);

export default router;
