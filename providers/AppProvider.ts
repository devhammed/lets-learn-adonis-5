import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    /**
     * Disable Session for API routes.
     */
    this.app.container.withBindings(['Adonis/Core/Server'], (Server) => {
      /**
       * Initiate session store.
       */
      Server.hooks.before(async ({ session }) => {
        await session.initiate(false);
      });

      /**
       * Commit store mutations.
       */
      Server.hooks.after(async ({ session, route }) => {
        if (!route?.name?.startsWith('api')) {
          await session.commit();
        }
      });
    });
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
