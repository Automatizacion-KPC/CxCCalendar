import { PartialType } from '@nestjs/swagger';
import { CreateCalendarDto } from './create-calendar.dto.js';

export class UpdateCalendarDto extends PartialType(CreateCalendarDto) {}
