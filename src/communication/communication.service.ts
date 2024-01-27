import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ReadlineParser, SerialPort} from "serialport";
import {AppService} from "../app.service";
import {MovementService} from "../movement/movement.service";

@Injectable()
export class CommunicationService {
    private communicationSerialPort: SerialPort;
    private readonly communicationSerialPortPath: string;
    private parser: ReadlineParser;


    constructor() {
        this.communicationSerialPortPath = '/dev/ttyACM0';
        this.communicationSerialPort = new SerialPort({
            path: this.communicationSerialPortPath,
            baudRate: 115200,
            lock: false,
        });
        this.parser = this.communicationSerialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

    }


    startCommunication(sendMoveMessage) {
        this.communicationSerialPort.on('open', () => {
            console.log('Communication service. Listening for incoming messages');
        });
        this.parser.on('data', (data) => {

            /* Sending movement direction message */
            console.log('Received message:', data)
            // if (data) sendMoveMessage('test')

        })
    }


    sendMessage(message: string) {
        this.communicationSerialPort.write(
            `${message}\r\n`,
        );
        console.log("Send message: ",message)
    }
}
