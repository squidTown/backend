import { PartialType } from '@nestjs/mapped-types';
import { CreateTutoringDto } from './create-tutoring.dto';

export class UpdateTutoringDto extends PartialType(CreateTutoringDto) {}
