import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { SerialPort } from 'serialport';
import { ReadlineParser } from 'serialport';

@Injectable()
export class MovementService implements OnModuleInit {
  private movementSerialPort: SerialPort;
  private readonly movementSerialPortPath: string = '/dev/ttyUSB0';

  private communicationSerialPort: SerialPort;
  private readonly communicationSerialPortPath: string = '/dev/ttyACM0';
  private parser: ReadlineParser;

  /**
   * Init serials port. If any port has busy.
   * Use fuser -k /dev/<port> for kill.
   * For example: fuser -k /dev/ttyACM0
   */
  async onModuleInit() {
    this.startMovement();
    this.startRemoteCommunication();
  }

  /**
   * Receiver messages from 868Mhz communication.
   */
  startRemoteCommunication() {
    this.communicationSerialPort = new SerialPort({
      path: this.communicationSerialPortPath,
      baudRate: 115200,
    });
    this.parser = this.communicationSerialPort.pipe(
      new ReadlineParser({ delimiter: '\n' }),
    );

    this.communicationSerialPort.on('open', () => {
      console.log(
        'Communication service. Listening for incoming messages from 868Mhz',
      );
    });

    this.parser.on('data', (data) => {
      /* Sending movement direction message received from 868Mhz */
      console.log('Received message:', data);
      if (data) this.sendMessage(data);
    });
  }

  /**
   * Start serial communication with movement controller.
   */
  startMovement() {
    this.movementSerialPort = new SerialPort({
      path: this.movementSerialPortPath,
      baudRate: 115200,
    });

    this.movementSerialPort.on('open', () => {
      console.log('Movement service. Waiting for send direction message');
    });
  }

  /**
   * Send message from HTTP method.
   * @param createMovementDto
   */
  createMove(createMovementDto: CreateMovementDto) {
    this.sendMessage(createMovementDto.direction[0]);
    return { action: `Move to direction: ${createMovementDto.direction}` };
  }

  /**
   * Send message by serial port to movement controller.
   * @param message
   */
  sendMessage(message: string) {
    console.log(`Send message: ${message}`);
    this.movementSerialPort.write(`${message}\n`);
  }
}
