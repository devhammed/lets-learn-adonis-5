import { Server, Socket } from 'socket.io';
import Logger from '@ioc:Adonis/Core/Logger';
import AdonisServer from '@ioc:Adonis/Core/Server';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type Listener = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => void;

class Ws {
  private io: Server;

  private booted = false;

  public boot() {
    /**
     * Ignore multiple calls to the boot method.
     */
    if (this.booted) {
      return;
    }

    /**
     * Setup boot.
     */
    this.booted = true;

    /**
     * Setup socket.io with the http server instance.
     */
    this.io = new Server(AdonisServer.instance!);

    /**
     * Log boot.
     */
    Logger.info('Socket server booted.');
  }

  public emit(event: string, data?: Record<string, any>) {
    this.io.emit(event, data);
  }

  public on(event: string, listener: Listener) {
    this.io.on(event, listener);
  }
}

export default new Ws();
