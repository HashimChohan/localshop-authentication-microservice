import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { System } from './entities/system.entity';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(private readonly systemService: SystemService) { }

  // @MessagePattern('findSystemJSON')
  // findOne() {
  //   return this.systemService.findJSON();
  // }

  // @MessagePattern('modifySystemJSON')
  // update(@Payload() system: System[]) {
  //   return this.systemService.modifyJSON(system);
  // }

}
