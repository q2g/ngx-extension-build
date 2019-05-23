const ExtensionService = require('../services/extension.service');
const QrsService = require('../services/qrs.service');

/**
 * continues integration for our extension
 * to import / update extension in QRS so we dont have to copy it all the time
 * or development in qlik sense extension folder (bad thing)
 *
 * @class CiPlugin
 */
class CiPlugin {

    constructor(outDir) {
        this.qrsService = new QrsService();
        this.extensionService = ExtensionService.getInstance();
        this.outputDirectory = outDir;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync("ExtensionDone", async (comp, callback) => {
            await this.deployQrs();
            callback();
        });
    }

    async deployQrs() {

        /*
        const exists = await this.qrsService.extensionExists(this.name);
            const msg = exists ? `QRS$: update extension ${this.name}` : `QRS$: import extension ${this.name}`;
            const outDir = this.outDir;
            let file;

            if (exists) {
                file = readFileSync(resolve(this.outDir, `${this.name}.js`));
                await this.qrsService.updateExtension(this.name, file);
            } else {
                file = readFileSync(resolve(this.outDir, `${this.name}.zip`));
                await this.qrsService.importExtension(this.name, file);
            }

            process.stdout.write(`\n${msg}\n`);
            process.stdout.write(`${"-".repeat(msg.length)}\n\n`);
            */
    }
}

module.exports = CiPlugin;
