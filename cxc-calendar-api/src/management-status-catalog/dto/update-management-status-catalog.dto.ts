import { PartialType } from '@nestjs/swagger';
import { CreateManagementStatusCatalogDto } from './create-management-status-catalog.dto.js';

export class UpdateManagementStatusCatalogDto extends PartialType(CreateManagementStatusCatalogDto) {}
