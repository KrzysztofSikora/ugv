import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { SerialPort } from 'serialport';
import { ReadlineParser } from "serialport";
import * as Readline from "readline";
import {CommunicationService} from "../communication/communication.service";
import {AppService} from "../app.service";

// fuser -k /dev/ttyACM0
@Injectable()
export class MovementService implements OnModuleInit {
  private movementSerialPort: SerialPort;
  private readonly movementSerialPortPath: string;

  constructor(private readonly communicationService: CommunicationService) {
    this.movementSerialPortPath = '/dev/ttyACM1';
    this.movementSerialPort = new SerialPort({
      path: this.movementSerialPortPath,
      baudRate: 115200,
      lock: false,
    });


  }
  async onModuleInit() {
    this.startSerialPortConnection();
    this.communicationService.startCommunication(this.sendMoveMessage);

  }
  startSerialPortConnection() {
    this.movementSerialPort.on('open', () => {
      console.log('Movement service. Waiting for send direction message');
    });
  }
  sendMoveMessage(message: string) {
    this.movementSerialPort.write(
        `${message}\r\n`,
    );
    console.log("Send message: ",message)
  }
  createMove(createMovementDto: CreateMovementDto) {


    // send data
    this.communicationService.sendMessage(createMovementDto.direction)

    // this.movementSerialPort.write(
    //   `${createMovementDto.direction}\r\n`,
    // );
    return `Move to dirdsection: ${createMovementDto.direction}`;
  }
}
