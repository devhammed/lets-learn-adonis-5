import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class RequestProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Request = this.app.container.use('Adonis/Core/Request');

    Request.macro('ajax', function () {
      const types = this.types();

      return (
        (types[0] &&
          (types[0].includes('/json') || types[0].includes('+json'))) ||
        this.completeUrl(true).includes('/api/v')
      );
    });
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
