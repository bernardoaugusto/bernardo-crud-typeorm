import fs from 'fs';
import { GluegunCommand } from 'gluegun';

import {
    generateCamelCase,
    generateCamelCaseArray,
    generateCamelCaseUpperFirst,
    generateCamelCaseUpperFirstArray,
} from '../utils-cli/common';

const command: GluegunCommand = {
    name: 'crud-typeorm',
    description: 'Create CRUD',
    run: async toolbox => {
        const { print, parameters, template } = toolbox;

        const tableName = parameters.first;
        if (!tableName) {
            print.error('Table name must be specified');
            return;
        }
        const nameCamelCase = generateCamelCase(tableName);
        const nameCamelCaseUpperFirst = generateCamelCaseUpperFirst(nameCamelCase);

        const options = parameters.options as Record<string, string>;

        const { strings, numbers } = options;

        if (!strings && !numbers) {
            print.error('parameters must be specified, strings / numbers');
            return;
        }

        const props = {
            strings: strings ? strings.split(',') : [],
            numbers: numbers ? numbers.split(',') : [],
        };

        const properties = {
            original: props,
            camelCase: {
                strings: generateCamelCaseArray(props.strings),
                numbers: generateCamelCaseArray(props.numbers),
            },
            camelCaseUpperFirst: {
                strings: generateCamelCaseUpperFirstArray(props.strings),
                numbers: generateCamelCaseUpperFirstArray(props.numbers),
            },
        };

        // DEPENDENCYS
        if (!fs.existsSync('./src/shared/errors/AppError.ts'))
            await template.generate({
                template: 'dependencys/appError.ts.ejs',
                target: `src/shared/errors/AppError.ts`,
            });

        // ENTITY
        await template.generate({
            template: 'entity.ts.ejs',
            target: `src/modules/${nameCamelCase}/infra/http/typeorm/entities/${nameCamelCaseUpperFirst}.ts`,
            props: {
                tableName,
                nameCamelCaseUpperFirst,
                properties,
            },
        });

        // DTOs
        await template.generate({
            template: 'dtos/DTOinterface.ts.ejs',
            target: `src/modules/${nameCamelCase}/dtos/I${nameCamelCaseUpperFirst}DTO.ts`,
            props: {
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'dtos/DTOcreate.ts.ejs',
            target: `src/modules/${nameCamelCase}/dtos/I${nameCamelCaseUpperFirst}CreateDTO.ts`,
            props: {
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'dtos/DTOupdate.ts.ejs',
            target: `src/modules/${nameCamelCase}/dtos/I${nameCamelCaseUpperFirst}UpdateDTO.ts`,
            props: {
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'dtos/DTOrequestGetAll.ts.ejs',
            target: `src/modules/${nameCamelCase}/dtos/I${nameCamelCaseUpperFirst}RequestGetAllDTO.ts`,
            props: {
                nameCamelCaseUpperFirst,
                properties,
            },
        });

        // Repository DTO
        await template.generate({
            template: 'repositoryDTO.ts.ejs',
            target: `src/modules/${nameCamelCase}/repositories/I${nameCamelCaseUpperFirst}RepositoryDTO.ts`,
            props: {
                nameCamelCaseUpperFirst,
                nameCamelCase,
                properties,
            },
        });

        // Repository
        await template.generate({
            template: 'repository.ts.ejs',
            target: `src/modules/${nameCamelCase}/infra/http/typeorm/repositories/${nameCamelCaseUpperFirst}Repository.ts`,
            props: {
                nameCamelCaseUpperFirst,
                nameCamelCase,
                properties,
            },
        });

        // Services
        await template.generate({
            template: 'services/serviceCreate.ts.ejs',
            target: `src/modules/${nameCamelCase}/services/Create${nameCamelCaseUpperFirst}Service.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'services/serviceGetById.ts.ejs',
            target: `src/modules/${nameCamelCase}/services/GetById${nameCamelCaseUpperFirst}Service.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'services/serviceGetAll.ts.ejs',
            target: `src/modules/${nameCamelCase}/services/GetAll${nameCamelCaseUpperFirst}Service.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'services/serviceUpdate.ts.ejs',
            target: `src/modules/${nameCamelCase}/services/Update${nameCamelCaseUpperFirst}Service.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'services/serviceRemove.ts.ejs',
            target: `src/modules/${nameCamelCase}/services/Remove${nameCamelCaseUpperFirst}Service.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });

        // Validator
        await template.generate({
            template: 'validators/createValidator.ts.ejs',
            target: `src/modules/${nameCamelCase}/common/validations/create${nameCamelCaseUpperFirst}Validator.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'validators/updateValidator.ts.ejs',
            target: `src/modules/${nameCamelCase}/common/validations/update${nameCamelCaseUpperFirst}Validator.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });
        await template.generate({
            template: 'validators/getAllValidator.ts.ejs',
            target: `src/modules/${nameCamelCase}/common/validations/getAll${nameCamelCaseUpperFirst}Validator.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });

        // Controller
        await template.generate({
            template: 'controller.ts.ejs',
            target: `src/modules/${nameCamelCase}/http/controllers/${nameCamelCaseUpperFirst}Controller.ts`,
            props: {
                nameCamelCase,
                nameCamelCaseUpperFirst,
                properties,
            },
        });

        print.success(`Successfully generated CRUD.`);
    },
};

module.exports = command;
